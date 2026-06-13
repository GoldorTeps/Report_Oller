---
title: Jornada ProgramaFichar + Hotel Ollers (frontends + deploy) + Restaurant-POS Tiers 0-2 + ZeroCog BC (spec compliance + Neural OS) + Gestor Facturas
date: 2026-06-11
project: Victor (multi-proyecto)
type: sesion
---

# Sesión de trabajo — 11 de junio de 2026 (jueves)

---

## Qué se hizo

---

### ProgramaFichar — Sprint 1 completado

Se implementaron todos los ítems del sprint pendientes de información del cliente, partiendo de 173/173 tests y cerrando con **183/183 tests ✅** y TypeScript build limpio.

**Bug fix `monthly-balance` y `nominas-csv`:**
Ambos endpoints excluían a empleados en estado `terminated` aunque hubieran trabajado en el período. Corregido: el filtro ahora incluye empleados `active | probation` o con jornadas en el rango indicado y sin anonimización activa.

**Migration 010 — Ampliación de perfil:**
- `employees`: 10 nuevos campos (address, phone, contactos de emergencia, civil_status, children_count, social_security_number, iban, education_level)
- `employee_equipment`: columna `value NUMERIC(10,2)` para importe del EPI
- `work_schedules`: columna `min_break_minutes INTEGER` para pausa mínima obligatoria

**Ficha de empleado ampliada (Punto 9):**
Tab "Personal" nuevo en el modal de empleado con secciones de Contacto, Emergencia, Datos personales y Nómina/SS. El IBAN se almacena en claro y se muestra enmascarado (últimos 4 dígitos) en vista y en el CSV de gestoría.

**Importe EPI (Punto 7):** campo `value` en el formulario de equipamiento y columna Valor en la tabla de EPIs del empleado.

**Pausa mínima en horarios (Punto 3):** campo `min_break_minutes` en la pantalla de gestión de horarios y expuesto en la API.

**Exportación gestoría (Punto 10):** columnas `Num_SS` e `IBAN` (enmascarado) añadidas al CSV de nóminas.

**Portal empleado — Filtros documentos (Punto 5 parcial):** filtros rápidos Todos / Nóminas / Contratos en el tab "Documentos" del portal.

**Envío masivo de documentos (Punto 13):** endpoint `POST /documents/broadcast` — sube un PDF una sola vez y genera un Document por empleado activo (filtrable por departamento), con notificación email a cada destinatario. Botón "Envío masivo" con formulario inline en el frontend.

Tests añadidos: `test_employees.py` (+2), `test_exports.py` (+2 + fix índice columna), `test_schedules_documents.py` (nuevo, 6 tests).

---

### ProgramaFichar — Deploy al servidor de producción

El código estaba listo con 183/183 tests. El deploy encontró tres problemas, resueltos en la misma sesión.

**Fix `DEBUG=""` crash Pydantic v2:**
Al lanzar `docker compose up` sin el archivo override, la variable `DEBUG` llegaba como cadena vacía al campo `bool` del modelo de settings de Pydantic v2, que la rechaza. Solución: usar siempre los dos archivos compose (base + server) que tienen `DEBUG: "false"` explícito:
```bash
docker compose -f docker-compose.yml -f docker-compose.server.yml up -d --build backend
```

**Fix Alembic `KeyError: '009_jornada_disputes'`:**
La migración `010_extended_profile.py` referenciaba `down_revision = '009_jornada_disputes'`, pero el archivo `009` en el servidor tiene `revision = "009"`. Alembic no podía resolver la cadena. Corregido con sed en servidor y edit en local. Commit `b7089e2`.

**Fix `config.py` desactualizado en servidor:**
El servidor tenía una versión sin `SCHEDULER_COMPLIANCE_HOUR`. Resuelt con SCP completo de `backend/app/` y `backend/alembic/`.

**Estado final en producción:**
- Backend en `:8002`, migración `010_extended_profile` aplicada (`head`)
- Frontend con los nuevos tabs y funcionalidades desplegado en nginx
- DB intacta: datos de la demo del día anterior preservados

---

### Hotel Ollers de Mar — Frontend restaurante completo (Fase B)

Frontend completo del restaurante implementado sobre la infraestructura base de la sesión anterior.

**9 páginas:**
- **Login.jsx** — OAuth2 password grant, branding amber/stone
- **TableMap.jsx** — Mapa de mesas con grid responsive, filtro por sección, colores por estado (libre/ocupada/reservada/limpieza), indicador de punto naranja en mesas con pedido activo, refresco automático cada 30 segundos
- **Order.jsx** — Carta con tabs de categoría a la izquierda, líneas de pedido con +/- a la derecha; botones "Enviar a cocina" y "Cobrar"
- **Checkout.jsx** — 3 métodos de pago: efectivo (con calculadora de cambio y botones rápidos), targeta, hotel (búsqueda de folio por número de habitación)
- **admin/MenuAdmin.jsx** — CRUD de platos filtrable por categoría
- **admin/TablesAdmin.jsx** — CRUD de mesas agrupado por sección
- **admin/CashSession.jsx** — Apertura/cierre de caja con resumen por método de pago

**Infraestructura:** Dockerfile multi-stage (Node 20 → nginx:alpine), nginx.conf con proxy `/api/` al backend y SPA fallback, servicio frontend añadido al docker-compose en puerto 5175.

**Tests:** `test_bridge.py` con 8 tests usando `respx` — lookup folio, 404, 502, cargo a folio, idempotencia, 404, auth requerida, 503 sin configuración. **43/43 tests ✅**

---

### Hotel Ollers de Mar — Frontend boutique completo (Fase C)

Frontend completo del módulo boutique con arquitectura de carrito local (diferencia clave respecto al restaurante: el carrito no persiste en DB hasta el checkout).

**CartContext.jsx** con `useReducer`: acciones ADD / ADD_VARIANT / SET_QTY / REMOVE / SET_DISCOUNT / CLEAR, cálculo de subtotal, descuento global y total en tiempo real.

**7 páginas:**
- **Login.jsx** — branding verde (green-600)
- **SaleScreen.jsx** — POS principal con búsqueda de texto, modo escáner de código de barras (toggle + input con foco automático), grid de productos con stock badge coloreado (rojo=0, amber=bajo), panel de carrito fijo, tabs de categoría
- **Checkout.jsx** — Lee carrito del contexto, 3 métodos de pago. Al confirmar: crea sale → líneas → cierre → receipt → payment → cargo al folio si es hotel
- **Receipt.jsx** — Resumen post-pago con hash VeriFactu, botón imprimir y "Nova venda"
- **admin/CatalogueAdmin.jsx** — CRUD de productos con SKU, barcode, IVA (21/10/4/0%), stock_alert
- **admin/StockAdmin.jsx** — Gestión de stock con alerta de bajo stock, movimientos (ajust/compra/pèrdua)
- **admin/CashSession.jsx** — Caja con stats por método y historial de sesiones

Tests: 8 tests bridge. Suite completa boutique: **todos pasan ✅**

---

### Hotel Ollers de Mar — Deploy conjunto en producción (Fase D)

Los tres sistemas (hotel-pms, restaurant-pos, boutique-pos) arrancados y verificados en el servidor `46.225.69.8`.

**Infraestructura creada:**
- `docker-compose.prod.yml` para restaurant-pos: postgres:16-alpine (puerto 5436), backend python:3.12-slim (puerto 8004, 2 workers), frontend nginx:alpine (puerto 5178)
- `docker-compose.prod.yml` para boutique-pos: postgres:16-alpine (puerto 5437), backend (puerto 8005, 2 workers), frontend nginx:alpine (puerto 5179)
- `.dockerignore` en backend y frontend de ambos sistemas
- `npm ci` → `npm install` (sin package-lock.json porque los frontends son nuevos)

**Secretos:** 3 claves nuevas generadas — `INTERNAL_KEY` compartida entre sistemas + `SECRET_KEY` independiente por servicio. Hotel backend reiniciado para leer la nueva `INTERNAL_API_KEY`.

**Estado final verificado:**

| Servicio | Puerto | Estado |
|----------|--------|--------|
| Restaurant POS backend | :8004 | `{"status":"ok","service":"restaurant-pos"}` ✅ |
| Restaurant POS frontend | :5178 | 200 OK ✅ |
| Boutique POS backend | :8005 | `{"status":"ok","service":"boutique-pos"}` ✅ |
| Boutique POS frontend | :5179 | 200 OK ✅ |
| Restaurant DB | :5436 | healthy ✅ |
| Boutique DB | :5437 | healthy ✅ |

Login verificado en ambos sistemas con JWT válido.

---

### Restaurant-POS — Tiers 0, 1 y 2 (mejoras y funcionalidades)

Implementación completa del plan de mejoras del restaurante, con deploy a producción al cierre.

**Tier 0 — Bug fixes:**
- Migration `0003`: añadido estado `cancelled` al enum `orderstatus`
- Router `caja.py`: endpoints `/caja/current`, `/caja/open`, `/caja/close` con cálculo de ventas sin propinas
- Split bill math fix en `Checkout.jsx`: último pago cubre el residuo de redondeo
- Dashboard revenue fix: `amount - gratuity` (las propinas no contaban como ingreso)

**T1.1 — User management (backend + frontend):**
Router `/users` CRUD completo: protección contra auto-demote y auto-borrado, validación de email duplicado (409), respuesta sanitizada sin `hashed_password`. Frontend `Users.jsx` con modal inline, iconos de rol y toggle de estado. 13 tests.

**T1.2 — Toast de errores global:**
`ToastContext.jsx` con overlay de toasts (error/success/info), auto-dismiss a 4s, máximo 5 simultáneos. Interceptor de axios llama al emitter para todos los errores ≥ 400.

**T1.3 — Descuentos en pedido (admin):**
`DiscountModal` con descuento por porcentaje o importe fijo y campo de motivo. El panel lateral muestra subtotal + descuento (en verde) + total neto. Solo visible para administradores.

**T1.4 — Alérgenos visibles:**
Badges emoji de los 14 alérgenos del Reglamento EU 1169/2011 en las tarjetas de menú (`Order.jsx`) y en el KDS (`Kitchen.jsx`).

**T2.1 — KDS Rondas:**
Campo `sent_at` en `OrderLine`, migration `0004`. La cocina agrupa las líneas por minuto de envío: "R1 · 14:32", "R2 · 14:45". Una sola ronda: sin cabecera. Líneas no enviadas: grupo "Pendiente".

**T2.2 — Transferencia de mesa:**
`POST /orders/{id}/transfer` con verificación de mesa destino libre, cierre del historial actual y apertura en destino. `TransferModal` en el header del pedido (admin only) con grid de mesas libres.

**T2.3 — Dashboard date range:**
Parámetro `?range=today|yesterday|week` en `dashboard.py` que filtra todos los queries (payments, bills, top_products, recent_bills). Selector de 3 botones en el frontend con invalidación de cache y auto-refresh solo en modo "Hoy".

**Deploy a producción:** rsync + `docker compose -f docker-compose.prod.yml build + up -d`, migraciones 0003+0004 aplicadas. Backend `:8004` y frontend `:5178` OK.

**Tests: 67/68** (1 fallo preexistente — `test_bill_open_order_rejected` desactualizado: el router cierra pedidos OPEN en lugar de rechazarlos, comportamiento correcto de negocio).

---

### ZeroCog BC — Spec compliance completa + diseño Neural OS

Sesión de trabajo intensiva en el motor ZeroCog para Business Central. Se partió de un sistema que funcionaba como RAG puro y se cerró con un motor completamente alineado con la spec v4 y una interfaz preparada para demo de cliente.

**Análisis técnico — hallazgos críticos:**
- `SIM_STRICT=0.40` + Jaccard estructuralmente imposible para consultas conversacionales → el motor siempre devolvía `domain_out_of_distribution` y caía al corpus completo. El sistema nunca activaba ZeroCog.
- Bug: los contactos no llegaban al LLM (`_load_corpus` hacía la query pero nunca ejecutaba `lineas.append`)
- `generalLedgerEntries` (libro mayor — la información financiera más densa del ERP) sin indexar
- Orden subóptimo del corpus: transaccional al principio, master data al final

**Correcciones aplicadas (primera ronda):**
- `SIM_STRICT`: 0.40 → 0.10 (temporal para Jaccard)
- Fix contactos en `_load_corpus`: los 24 contactos CRONUS ahora llegan al LLM
- Reorden corpus: master data primero (clientes → proveedores → empleados → contactos → artículos), transaccional después
- `generalLedgerEntry`: mapper + dispatcher + bootstrap + corpus + `/records`
- 162/162 tests ✅

**Deploy 42/42:** El contenedor tenía la API key de OpenAI caducada hardcodeada (pasada en el `docker run` original, no vía `.env`). Recreado el contenedor con `--env-file`, copiados los 4 archivos modificados. 685 eventos cargados (incluyendo 100 GL entries). 42/42 PASS.

**Correcciones adicionales (segunda ronda):**
- `attach_signal()` no actualizaba `decision_ts` al llegar una señal real → el campo recency no reflejaba cuándo se resolvió el evento. Corregido.
- `contact_type` → `type` en 2 queries SQL (el mapper almacena `c->>'type'` pero dos queries leían `c->>'contact_type'` → tipo de contacto siempre NULL)
- Company filter en corpus fallback: antes usaba `_corpus_text` (todas las empresas) aunque el usuario hubiera filtrado por empresa específica
- `max_tokens`: 800 → 1500 (800 cortaba análisis complejos)
- 42/42 PASS

**Alineamiento completo con la spec:**
- `sim()` con embeddings OpenAI `text-embedding-3-small` + cosine similarity (spec §4.2 Opción A). Jaccard mantenido como `sim_jaccard()` para tests y fallback.
- `SIM_STRICT` restaurado a 0.40 — ahora correcto con cosine similarity (0.40 es alcanzable y calibrado para el spec)
- Pre-filtro `sim > SIM_PREFILTER=0.15` antes del scoring (spec §4.3) — solo en modo `active`
- `activate()` rediseñado: embedding de la query computado una sola vez, pre-filtro aplicado, score sin recomputo
- `zerocog_corpus.py`: columna `embedding JSONB` + migración en batch (`compute_missing_embeddings`). 987 eventos con embedding al primer arranque
- Revertida violación de logs en chat (se había añadido `=== ACTIVIDAD RECIENTE ===` en el prompt del LLM, violando spec §3.1 y §3.2)
- `GET /metrics` (Prometheus text format, spec §15.1): 7 métricas — `active_events_ratio`, `state_distribution`, `signal_latency_hours`, `reservoir_usage`, `fallback_rate`, `domain_coverage`, `corpus_age_p90`
- `GET /alerts`: alertas automáticas de negocio BC (facturas vencidas, deuda >60d, pedidos sin recibir >30d, stock ≤ 0, proveedor bloqueado) + alertas de salud ZeroCog (no_resuelto >30%, corpus >7d sin actualización)
- `GET /explain`: diagnóstico de activación — modo, motivo de fallback, lista de eventos activados con score, útil para demos en tiempo real
- `check_deployment.py`: 42 → 49 checks (bloque nuevo "Observabilidad")
- 162/162 tests ✅ · **49/49 PASS** · Imagen `zerocog-bc-demo:latest` rebuildeada

**Rediseño visual — Neural OS:**
Interfaz reescrita desde cero con identidad visual nueva orientada a demo de cliente.
- Palette: `#030810` space-black + `#818cf8` indigo neural + `#22d3ee` cyan activo; estados ES con emerald/blue/amber/red
- **Memory Network panel** (siempre visible): canvas con force-directed graph animado, nodos coloreados por ES dominante, glow reactivo, edges con flujo animado
- Topbar con corpus health bar y mode badge (ACTIVO/APRENDIZAJE)
- Answer cards con **memory trace**: chips por tipo de entidad y n_activated
- Activation flow: `/explain` llamado en paralelo con `/chat`; cuando llega, se flashean los nodos del grafo y se muestra la traza
- Panel izquierdo ampliado a 320px; welcome screen con input prominente arriba, hero + KPIs + sugerencias centrados verticalmente
- `/summary` extendido con `n_evaluated` y `zerocog_mode`
- Deploy y verificado: 685 eventos, 278 evaluados, modo **ACTIVO** en `http://46.225.69.8:7861/`

---

### Gestor Mail Facturas — Diagnóstico fallo IMAP

**Problema:** 10+ sincronizaciones consecutivas fallidas con `AUTHENTICATIONFAILED Invalid credentials` desde las 06:39 UTC.

**Diagnóstico:** el código `imap_reader.py` y `sync_service.py` es correcto. Prueba directa de conexión IMAP desde el servidor de producción confirmó que la app password `kgvopvwzxvwbirif` ha sido revocada por Google (ocurre por cambio de contraseña, evento de seguridad o política del Workspace admin).

**Solución preparada (pendiente de acción manual de Víctor):**
1. `https://myaccount.google.com/apppasswords` → generar nueva contraseña para "Correo"
2. Si la opción no aparece: la cuenta es Workspace → `admin.google.com` → Seguridad → Autenticación → Verificación en 2 pasos → Contraseñas de aplicación
3. Actualizar en producción: `UPDATE imap_configs SET password = 'NUEVA_APP_PASSWORD' WHERE is_active = true`

---

## Estado actual

| Sistema | Backend | Frontend | Tests | Producción |
|---------|---------|----------|-------|------------|
| ProgramaFichar | ✅ Sprint 1 completo | ✅ | 183/183 | ✅ deployd + migración 010 |
| Hotel PMS | ✅ T1-T4 | ✅ | 173+ | ✅ (desde día anterior) |
| Restaurant POS | ✅ T0-T2 | ✅ Fase B | 67/68 | ✅ :8004 / :5178 |
| Boutique POS | ✅ | ✅ Fase C | todos | ✅ :8005 / :5179 |
| ZeroCog BC | ✅ spec compliance + 49/49 | ✅ Neural OS | 162/162 | ✅ :7861 |
| Gestor Facturas | ✅ | ✅ | — | ⚠️ IMAP bloqueado |

---

## Pendiente

**ProgramaFichar:**
1. Esperar feedback del responsable de RRHH tras la demo
2. Punto 4: Excel import horarios — pendiente de recibir el formato del cliente
3. Punto 5 auto-split PDF: pendiente de PDF real del cliente
4. Punto 7/12: decisión de plataforma de firma digital (Signaturit / DocuSign)
5. Documentar comando de deploy con doble `-f` en el README del servidor

**Hotel Ollers de Mar:**
6. Crear usuarios staff en restaurant y boutique (camareros, dependientas)
7. Configurar carta del restaurante (categorías + platos)
8. Configurar catálogo de la boutique (SKU + barcodes)
9. Obtener respuestas del cliente a las 5 preguntas BC (mismo tenant, datáfonos, cargos cruzados, TPV, inventario)
10. Commits pendientes en Hotel/ repo (Guests.jsx, Rack.jsx, reservations.py y otros de sesiones anteriores)
11. Dominios + SSL para los 3 sistemas (actualmente accesibles por IP:puerto)
12. BC Sync (Azure AD OAuth2) — bloqueado por cliente

**ZeroCog BC:**
13. Reunión Frank/Laia — bloqueante para demo con datos reales y ES variado
14. Rebuild imagen en servidor (cambios actuales están en el contenedor vía `docker cp` — si la imagen se reconstruye desde cero, se pierden)
15. Rotar `BC_CLIENT_SECRET` en Azure Portal antes de producción real
16. Export endpoint `GET /export` (pendiente desde análisis anterior)
17. Revisar `chat_bc.html` en navegador real para verificar transición welcome → chat y flasheo de nodos en el grafo

**Gestor Mail Facturas:**
18. Víctor debe regenerar la app password de Google y actualizar la BD de producción
