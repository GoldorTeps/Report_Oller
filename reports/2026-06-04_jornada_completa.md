---
title: Jornada completa — ZeroCog hub expansion + embeddings / Hotel Ollers Cassandra review / MICE kanban / Reunión Frank + Laia
date: 2026-06-04
project: Victor (multi-proyecto)
type: sesion
---

# Sesión de trabajo — 4 de junio de 2026

## Qué se hizo

### ZeroCog — Diagnóstico y fix VGestion

- Identificadas dos causas raíz de que las facturas de VGestion no fueran accesibles: (1) el endpoint `GET /zerocog/sync` solo existía en la rama `feature/zerocog-integration` de Gestor_Mail_facturas — cada rebuild de producción lo eliminaba; (2) el Dockerfile local de ZerocogFrank no tenía los `COPY` de los archivos `victor_mapper.py`, `victor_bootstrap.py`, `fichar_bootstrap.py`, `fichar_live.py`, `fichar_mapper.py`.
- Fix: merge de `feature/zerocog-integration` → `main`. Deploy de `backend/main.py` al servidor. Verificado: 114 facturas VGestion accesibles.

### ZeroCog — Arquitectura hub (refactor mayor)

Toda la aplicación estaba construida con BC como centro; VGestion y Fichar eran extras hardcodeados. Cada nueva fuente requería modificar la app y el HTML.

- **Nuevo archivo `source_registry.py`**: define cada fuente (BC, VGestion) como un bloque con id, name, color, entity_types, labels, keywords, company_ids, refresh_secs. Helper functions para toda la app. Plantilla comentada para hotel, restaurante, etc. Añadir fuente = añadir un bloque.
- **`zerocog_bc_app.py` refactorizado**: `_source_company_ids` por source, `_BOOTSTRAP_FNS` como dict, `_source_sync_loop()` genérico, `_expand_company_ids()` que expande virtual IDs a company_ids reales. Endpoint `/sources` nuevo. `/companies`, `/summary` y `/reload` todos basados en el registro.
- **`chat_bc.html` refactorizado**: `loadSources()` carga `/sources` al arrancar y construye dinámicamente `_ENTITY_LABELS`, `_SOURCE_ORDER`, `_SOURCE_NAMES`, estilos de color. Tabs sidebar, data footer, source cards, corpus graph, modal — todos dinámicos. Title "ZeroCog", answer source "ZeroCog".

### ZeroCog — Fix similitud: embeddings cosine reales (spec §4.2 Opción A)

- `sim()` usaba Jaccard → devolvía ~0 siempre → `activate()` caía en `domain_out_of_distribution` → el sistema era solo RAG, sin activación de eventos.
- **Nuevo archivo `embed_cache.py`**: `build_event_text()`, `cosine_sim()` pure Python, `embed_texts()` batch OpenAI, `embed_query()`, `ensure_all_embedded()`.
- **`zerocog_engine.py`**: `score()` acepta `sim_val` pre-calculado, `activate()` usa embeddings con fallback Jaccard, pre-filtro `sim > 0.15` (spec §4.3), SIM_STRICT gate funcional.
- Columna `embedding JSONB` añadida a `zc_events`. 556/556 eventos embebidos al cerrar.

### ZeroCog — SYSTEM_PROMPT conversacional y corpus por agregados

- El LLM recibía 450+ líneas de registros individuales → no podía extraer totales → inventaba cifras.
- **`_build_corpus_summary()`**: nueva función que genera solo agregados (RESUMEN por estado con totales reales) sin registros individuales.
- SYSTEM_PROMPT reescrito: persona CFO/asesor operacional, prosa conversacional, sin headers numerados, "primero la conclusión con los números reales". Glosario de estados: BC Open/Draft/Released = pendiente; VGestion pendiente = por pagar.

### ZeroCog — Expansión BC: 7 nuevos tipos de entidad

Antes se indexaban 4 tipos (salesInvoice, purchaseInvoice, salesOrder, vendor) = 227 eventos. Se amplió a 11 tipos = 385 eventos de BC.

Nuevos mappers en `zerocog_mapper.py`:
- `customer` — gestionar_cliente
- `item` — gestionar_producto (80 items disponibles en CRONUS)
- `salesQuote` — emitir_presupuesto (EC: Accepted = positivo, Expired = negativo)
- `purchaseOrder` — crear_orden_compra (EC: fullyReceived = positivo)
- `purchaseCreditMemo` — nota_credito_compra (EC: Paid = positivo)
- `employee` — gestionar_empleado (EC: Active = positivo, Terminated = negativo)
- `contact` — gestionar_contacto (EC: privacyBlocked = negativo)

### ZeroCog — Hotel Ollers de Mar integrado como fuente

- Nuevo bloque "hotel" en `source_registry.py` (color azul, entity_type `hotel_reservation`, keywords hoteleros).
- `hotel_mapper.py` y `hotel_bootstrap.py` creados. El backend del hotel expone `GET /api/zerocog/sync` con API key.
- `_BOOTSTRAP_FNS`: `"hotel": run_hotel_bootstrap`. Deploy. 52 reservas indexadas y embebidas.
- Corpus final: **556 eventos embebidos (BC 385, VGestion 116, Hotel 52)**.

### ZeroCog — Fichar deshabilitado

- Solo 3 eventos, pipeline de señales sin verificar, calidad incierta.
- Eliminado de `source_registry.py`, `_BOOTSTRAP_FNS`, `_load_corpus()` y `_refresh()`. Datos en DB intactos. Reactivar = descomentar bloque + añadir a `_BOOTSTRAP_FNS`.

### ZeroCog — UI líquida (exploración descartada)

- David expuso su visión de UI no-convencional: espacio líquido con blobs non-Newtonian que flotan y se arrastran, se expanden en abanico (chat + datos + grafos) al tocarlos. Fondo blanco, tipografía fina. Tablet con dedo, PC con cursor.
- **Intento 1** (descartado): SVG gooey filter + 3 capas DOM. Blobs no visibles, no se movían, el panel expandido parecía otra ventana.
- **Intento 2** (descartado): blobs CSS simples con física real + clip-path circle() animado. Rechazado por David.
- Restaurada la **versión oscura con orbs** que funcionaba. La UI líquida queda para construir en fichero separado (`chat_liquid.html`) cuando se retome.

### Hotel Ollers de Mar — Cassandra review: 10 bugs corregidos (commit bad913f)

Se invocó Cassandra y se lanzaron 3 agentes en paralelo (correctness scan, cross-file tracer, security review). 10 bugs encontrados y todos corregidos:

**Seguridad crítica:**
1. `get_current_user` no validaba `payload["type"] == "access"` — cualquier refresh token funcionaba como access token en cualquier endpoint. Corregido.
2. API key ZeroCog hardcodeada en código fuente y en docker-compose como fallback. Eliminada — se lee solo del `.env` del servidor.
3. `DELETE /reservations/{id}/deposits/{dep_id}` no requería `require_admin` — cualquier recepcionista podía borrar anticipos.

**Seguridad alta:**
4. `/zerocog/logs` exportaba PII completa. Ahora hashea `actor_id` (SHA-256 12 chars) y excluye campos PII de `previous_value`/`new_value`.

**Bugs funcionales altos:**
5. SES/IEET nunca se disparaba en check-in por `MissingGreenlet`: se accedía a `r.main_guest.id` después de `db.commit()`. Fix: capturar `guest_id` antes del commit. Obligación legal RD 933/2021 (multas hasta €30.000).
6. Depósitos invisibles en folio: `folio.paid_amount` no incluía anticipos. Añadida línea separada `deposits_total`.

**Bugs funcionales medios:**
7. `/pay` devolvía balance incorrecto ignorando depósitos. Ahora SELECT adicional y devuelve `balance` real, `total_paid`, `deposits_total`.
8. `paid_pct` en zerocog/sync daba error con `total_amount = 0` o `None`. Corregido.
9. Backup service: `PGPASSWORD` visible en `docker inspect`. Cambiado a `.pgpass` con `chmod 600`.
10. `document_number: ""` en seed → cambiado a `NULL` y notas demo reemplazadas por texto realista.

Seed re-ejecutado tras fixes. Demo operativa: 51 reservas, 25 huéspedes, 3 VIP, 5 reservas con depósitos, 3 campañas.

### Hotel Ollers de Mar — Integración ZeroCog

- Implementados `hotel_mapper.py`, `hotel_bootstrap.py` y endpoint `GET /api/zerocog/sync` en el backend del hotel.
- Mapper: C = room_type, regime, source_channel, adults, season. D = locator, check_in, check_out, total_amount, status. EC: checked_out = validado, cancelled/no_show = débil.
- Corrección de bug crítico en seed: reservas históricas tenían `nights` negativo (offset de checkout confundido con duración de estancia).
- Capa de logs implementada según spec v3 Anexo Logs.
- 52 reservas indexadas y embebidas en el hub ZeroCog.

### MICE / Gestión Comercial — Seed demo + kanban con drag & drop

- `backend/seed_demo.py` creado con datos realistas para dos marcas (BLE y Castlexperience): 8 clientes por marca de todos los tipos, contactos, 19-20 partidas en catálogo de todas las categorías (una desactivada), 10 peticiones por marca en todos los estados del pipeline, peticiones "en el aire" (last_contact_at > 5 días), peticiones con evento próximo (< 7 días), ganadas con `confirmed_at`, perdidas. Dos usuarios comerciales demo. Ejecutado con `docker cp` al contenedor en caliente.
- Fix token de autenticación: el frontend leía `localStorage.getItem('victor_token')` en lugar de `'mice_token'`. Corregido.
- **Pipeline kanban completo**: `Pipeline.tsx` reescrito con 6 columnas (Recibida / Cotizada / Enviada / Negociación / Ganada / Perdida). Cada columna muestra contador + total de valor estimado. Cada tarjeta muestra título, cliente, PAX, fecha evento, valor, canal y alertas (borde rojo/ámbar).
- **Drag & drop con `@dnd-kit/core`**: `PointerSensor` con umbral de 5px para evitar drags accidentales. `DragOverlay` con fantasma visual. Ring de color en columna destino (verde Ganada, rojo Perdida, azul resto). Al soltar llama a `PATCH /pipeline/{brand_id}/{req_id}/stage`.
- **Responsive**: `overflow-x-auto` + `flex` con columnas `w-[220px] shrink-0`. Scroll lateral en pantallas pequeñas, todas visibles en 1440px+.

### Reunión online con Frank y Laia (16:00–17:45)

Reunión de seguimiento con los dos clientes activos del portfolio:

- **Frank** (ZeroCog / Business Central): revisión del estado de la integración ZeroCog con BC real del cliente. Pendiente el acceso a la instancia BC de producción para poder activar `DEMO_MODE=false` y el Azure App Registration multi-tenant.
- **Laia** (Hotel Ollers de Mar): revisión del sistema PMS. Pendiente confirmar API key Brevo para las campañas, modelo exacto de cerraduras TESA y decisión sobre servidor local vs cloud.

---

## Estado actual

**ZeroCog** (`http://46.225.69.8:7861/`): corpus de 556 eventos embebidos (BC 385, VGestion 116, Hotel 52), motor cosine real con pre-filtro sim > 0.15, arquitectura hub dinámica desde `source_registry.py`, SYSTEM_PROMPT conversacional con corpus por agregados. Fichar deshabilitado.

**Hotel Ollers de Mar**: 10 bugs de seguridad y funcionalidad corregidos (commit bad913f), demo operativa en producción, integración ZeroCog activa.

**MICE**: kanban funcional con drag & drop en `http://46.225.69.8:5176`, seed demo completo cargado.

---

## Pendiente

**ZeroCog:**
- Bucle de señales: webhook Victor (factura pagada) + webhook Hotel (checkout)
- Reunión BC real con Frank — bloqueante para MVP en producción
- Regenerar API keys expuestas (OPENAI_API_KEY, BC_CLIENT_SECRET)
- Azure App Registration multi-tenant para `DEMO_MODE=false`
- UI líquida (blobs non-Newtonian) — construir en `chat_liquid.html` separado

**Hotel Ollers de Mar:**
- API key Brevo del cliente
- Confirmar modelo exacto cerraduras TESA
- Decisión servidor local vs cloud
- Alembic: migraciones reales antes de escalar
- Redsys CaixaBank — integración cobro real

**MICE:**
- Ficha de petición (click en tarjeta abre detalle)
- Panel de presupuestos (Fase 2)
- Cambiar credenciales admin por las definitivas
