---
title: Jornada ProgramaFichar + Hotel Ollers de Mar — Demo lista, bugs resueltos, arquitectura Ollers completa, restaurant-pos y boutique-pos arrancados
date: 2026-06-10
project: Victor (multi-proyecto)
type: sesion
---

# Sesión de trabajo — 10 de junio de 2026 (miércoles)

---

## Qué se hizo

---

### ProgramaFichar — Demo preparada y enviada al responsable de RRHH

Se verificó formalmente que la FASE 1 del roadmap estaba completa antes de lanzar la demo. Checks realizados:

- `test_employees.py`: 17 tests (create, update, status, reset_pin, equipment CRUD) ✅
- `test_admin.py`: 12 tests (weekly_overtime, overtime_approval, alerts, rest_balance) ✅
- `Employees.test.tsx`, `Dashboard.test.tsx`, `Absences.test.tsx`: flujos UI principales ✅

Se ejecutó el seed de demo en el servidor con datos representativos:
- **Empresa 1:** Construcciones Martínez SL — 12 empleados, admin `admin@martinez.es`
- **Empresa 2:** Clínica San Rafael SL — 13 empleados, admin `admin@sanrafael.es`
- Empleado demo portal: `carlos.rodriguez@martinez.es` + PIN

URL pública activa vía HTTPS (Cloudflare Tunnel): `https://hydraulic-targeted-framing-contracting.trycloudflare.com`

Se redactó el **email ejecutivo** para Victor que resume las funcionalidades implementadas, la fase actual (validación con usuario real), las credenciales de acceso y los elementos pendientes para producción: hardening, onboarding cliente real y firma digital.

**Fix crítico pre-demo:** las páginas de empleados, fichajes y ausencias aparecían vacías al acceder desde Cloudflare. Diagnóstico: FastAPI devolvía un `307 Temporary Redirect` con `Location: http://...` (sin `s`) porque no leía el header `X-Forwarded-Proto` del proxy. El navegador en HTTPS bloqueaba silenciosamente el redirect a HTTP. Fix: `ProxyHeadersMiddleware` de uvicorn con `trusted_hosts="*"`. Verificado con curl: `Location` correcto en `https://`, 12 empleados devueltos.

---

### ProgramaFichar — Corrección de bugs detectados durante la demo

La sesión UAT con el responsable de RRHH expuso 5 incidencias que se corrigieron y desplegaron en producción en la misma jornada.

**1. Admin solo accedía a una empresa**
El usuario `admin@martinez.es` tenía `role="company_admin"` y `company_id` fijo en el seed, lo que le acotaba el JWT a una sola empresa. Cambiado a `role="super_admin"` con `company_id=None`: accede al panel de super-administrador y usa el selector de empresa para entrar en cada una sin modificar el login.

**2. Tokens del kiosko inestables**
El seed generaba el token del dispositivo con `secrets.token_urlsafe(32)` en cada ejecución, produciendo un hash diferente. El kiosko mostraba "dispositivo no configurado" tras cualquier re-seed. Fix: diccionario `DEMO_DEVICE_TOKENS` con tokens fijos conocidos, uno por kiosko de cada empresa.

**3. Kiosko pedía seleccionar empleado antes del PIN**
El estado inicial del kiosko mostraba una lista completa de empleados. Elimiada la pantalla `identify` y el componente `EmployeeSelector` por completo. Estado inicial con token configurado: directamente al PIN. El backend ya soportaba verificación solo por PIN sin `employee_id`.

**4. Botón atrás llevaba al login en vez de al panel de super-admin**
`navigate('/admin', { replace: true })` en el switch de empresa eliminaba `/superadmin` del historial del navegador. Fix en dos partes: (1) quitado `replace: true` para preservar historial; (2) nuevo componente `SuperAdminRoute.tsx` que detecta la llegada por back-button con token de `company_admin` y restaura el `super_admin_token` desde `sessionStorage`.

**5. Panel admin sin identificación visual de la empresa**
`AdminLayout.tsx` ahora lee `sessionStorage.managed_company_name` (guardado en el switch de empresa) y lo muestra: subtítulo gris en el sidebar y barra azul sobre el contenido principal.

**Verificación E2E (Playwright headless):** 9/9 flujos pasando contra la URL de Cloudflare — desde login hasta logout, pasando por kiosko, portal empleado, navegación por las dos empresas y botón atrás.

---

### Hotel Ollers de Mar — Tiers 1 y 2 completos

Revisión crítica del estado del PMS antes de iniciar trabajo: bugs críticos activos, gaps de facturación y housekeeping sin cubrir. Se ejecutó la implementación completa de Tier 1 y Tier 2 en la misma jornada.

**Bugs críticos resueltos:**

- `channel_manager.py`: `generate_locator()` se llamaba sin `await` y sin pasar `db`. Cualquier reserva entrante por webhook Beds24 crashaba. Fix: `await generate_locator(db)`.
- `folio.py`: `r.rate or 0` mostraba €0/noche cuando `rate` era `None`. Fix: si `rate` es None, se divide `total_amount / nights`. La UI de nueva reserva envía ahora el precio/noche calculado automáticamente del tipo de habitación.
- CORS: `CORS_ORIGINS` era una lista hardcodeada solo con localhost. Migrado a `field_validator` en `config.py` que parsea un string CSV desde variable de entorno.

**Email automático check-in online:**
`send_checkin_link` tenía un `# TODO` pendiente desde semanas. Implementado `_send_checkin_email` como background task vía Brevo. Si el huésped no tiene email, el link se devuelve igualmente para copia manual. Fix adicional: `expires_at` se guardaba como timezone-aware en columna `TIMESTAMP WITHOUT TIME ZONE` → corregido a `datetime.utcnow()`.

**Facturas completas (router `/api/invoices`):**
- Crear borrador desde el folio de una reserva (alojamiento + servicios extras + anticipos)
- Emitir con hash VeriFactu SHA-256 y cambio de reserva a `INVOICED`
- Cancelar borrador; las emitidas requieren rectificativa
- Añadir/quitar líneas en borrador
- Generación de PDF con `fpdf2` (pure Python): cabecera del hotel, datos del cliente, tabla de líneas con IVA, totales, hash VeriFactu al pie
- Migración `0005_invoices.py` — las tablas `invoices` e `invoice_lines` existían en el modelo pero nunca habían sido migradas
- Frontend `Invoices.jsx`: listado con filtro de estado, fila expandible con detalle de líneas e IVA, botones Emitir / Cancelar / Descargar PDF, ruta `/admin/invoices` y entrada en sidebar

**Housekeeping:**
- Modelo con 5 estados: `dirty / cleaning / clean / inspected / do_not_disturb`
- Migración `0006_housekeeping.py`
- Router: GET estado de todas las habitaciones (default `dirty` si no hay registro), PATCH para actualizar estado, POST checkout→dirty automático
- Widget visual en `Rack.jsx`: punto de color clickable en cada habitación, popup picker con 5 estados y checkmark en el estado actual, leyenda visible en el header, refresco automático cada 60 segundos

Suite al cerrar Tier 1 + Tier 2: **98/98 tests, 0 fallos.**

---

### Hotel Ollers de Mar — Redsys (TPV Virtual)

Integración completa del pago online con Redsys. No se necesitan credenciales del cliente para arrancar: sandbox público disponible.

**Algoritmo criptográfico:** 3DES-CBC para derivar la clave del pedido a partir del secreto del banco; HMAC-SHA256 para firmar los parámetros; verificación de notificación entrante con el mismo proceso. Manejo del breaking change de `cryptography>=42` (módulo `decrepit`).

**Modelo `RedsysPayment`** con estado `pending/ok/ko/error`, código de autorización y notificación raw. Migración `0007_redsys.py` con índice único en `order_number`.

**Backend:**
- `POST /api/payments/redsys/create` — genera el formulario de pago para auto-submit
- `POST /api/payments/redsys/notification` — webhook (sin auth). Verifica HMAC, actualiza estado, suma `paid_amount` en la reserva, crea `ReservationDeposit`. Idempotente; firmas inválidas retornan 200 sin modificar datos (Redsys reintentaría si recibiera error HTTP)
- `GET /api/payments/redsys/{order}` — estado para polling del frontend

**Frontend:**
- `RedsysReturn.jsx`: página de retorno OK/KO con polling hasta confirmación del backend
- Botón "Pagar con tarjeta online" en `PaymentModal` con auto-submit del formulario oculto
- Traducciones ES/CA/EN

**116/116 tests, 0 fallos** (suite completa incluyendo 18 tests nuevos de Redsys).

---

### Hotel Ollers de Mar — Tiers 3 y 4

**T3-A — Producción con Gunicorn:**
Nuevo `docker-compose.prod.yml`: backend corre con Gunicorn + UvicornWorker (4 workers, sin `--reload`). Dev mantiene `--reload`.

**T3-B — Fix backup:**
El servicio `backup` en `docker-compose.yml` no tenía `DB_PASSWORD` en el entorno. `pg_dump` fallaba silenciosamente en producción. Añadida la variable.

**T3-C — SES multi-huésped (RD 933/2021):**
`ses_service.py` refactorizado para declarar todos los viajeros adultos, no solo el titular. El RD 933/2021 obliga a comunicar todos los viajeros al Ministerio en cada check-in. `checkin_data` solo se aplica al huésped principal.

**T3-D — Paginación de reservas:**
`GET /api/reservations` devuelve `{items, total, limit, offset}`. Soporte de búsqueda por localizador, apellidos, nombre o grupo. Frontend actualizado.

**T3-E — Exports CSV:**
- Reservas: localizador, estado, fechas, noches, habitación, ocupantes, régimen, canal, importe, pagado
- IEET (taxa turística ATC): modelo 950 con todos los campos fiscales. Nombre de archivo con año y periodo

**T4-A — Panel Llegadas/Salidas:**
Nueva página `Arrivals.jsx`. Navegador de fechas con botón "Hoy". Llegadas en verde, salidas en naranja. Click en fila abre el panel de reserva. Endpoint `GET /api/reservations/arrivals-departures?day=YYYY-MM-DD`.

**T4-B — Notificaciones email:**
`notification_service.py` con `send_confirmation` (al crear reserva, como background task) y `send_checkin_reminder`. Si `BREVO_API_KEY` está vacío, retorna `False` sin error. Endpoint `POST /api/notifications/send-reminders?day=YYYY-MM-DD` para lanzar recordatorios manuales o vía crontab.

**Documentación de deploy:**
`.env.example` con todas las variables comentadas. `DEPLOY.md` actualizado con el flujo completo de producción, lista de migraciones pendientes (0005/0006/0007) y tabla de variables obligatorias/opcionales.

---

### Hotel Ollers de Mar — Diseño arquitectura Ollers de Mar completo

Sesión de diseño estratégico sin código. Se estableció la arquitectura objetivo del sistema completo: PMS + restaurante + boutique integrados sobre BC SaaS (Azure).

**Modelo elegido:** sistemas operativos propios con sincronización a BC en eventos clave (factura emitida, cobro recibido). BC no está en el camino crítico de operaciones en tiempo real.

**Estructura de 4 repositorios:**
- `hotel-pms` — este repo (en producción)
- `restaurant-pos` — construido hoy
- `boutique-pos` — construido hoy
- `ollers-shared` — paquete Python con Contact, BC sync, Redsys (pendiente crear repo)

**Objeto central `Contact`** (no `Guest`): una persona que se aloja, come o compra es el mismo contacto. Email como clave de deduplicación. Compras anónimas soportadas (`contact_id` nullable). BC Company por módulo (Company A hotel, B restaurante, C boutique).

**5 preguntas bloqueantes para BC sync** (pendientes de respuesta del cliente): mismo tenant o tres companies, datáfono compartido o por empresa, cargos cruzados hotel↔restaurante↔boutique, TPV existente en restaurante, inventario boutique en BC o sistema propio.

---

### Restaurant-POS — Backend completo

Backend del módulo restaurante construido desde cero sobre el modelo de datos diseñado en la misma jornada (9.5/10 en revisión crítica).

**Modelo de datos destacado:**
- `MenuItem` con 14 alérgenos (Reglamento EU 1169/2011), modificadores, disponibilidad por turno, estación de impresora
- `Order` + `OrderLine` con flujo de cocina: `pending → sent_to_kitchen → ready → served`
- `Bill` con VeriFactu serie `"REST"`, número correlativo, hash SHA-256 encadenado
- `BillPayment` con campo `gratuity` separado del importe para contabilidad en BC
- `CashSession` para arqueo de caja
- `TableReservation` con soporte de prepago vía Redsys

**Routers implementados:** `auth`, `menu`, `tables`, `orders`, `bills`, `bridge` (proxy hotel-pms con `origin="restaurant"`).

**Infraestructura:** mismo stack que hotel-pms (FastAPI + PostgreSQL + Docker). Puerto 8002. Alembic con migración inicial de 20 tablas.

**35/35 tests, 0 fallos.** Tests por router: auth (4), menu (7), tables (7), orders (9), bills (8).

---

### Boutique-POS — Backend completo

Backend del módulo boutique construido desde cero sobre el modelo de datos diseñado en la misma jornada (10/10 en revisión crítica).

**Diferencias clave respecto al restaurante:**
- Inventario real con audit trail completo (`StockMovement`: sale / return / adjustment / purchase_received)
- Variantes tipadas: `AttributeType` (Talla, Color…) → `AttributeValue` (S, M, L…) → `ProductVariantAttribute` — permite filtrar "stock de talla M" o "todos los artículos azules"
- Pedidos a proveedor con recepción parcial (`PurchaseOrderLine.qty_received`, estado auto-actualizado a `partial`)
- Devoluciones parciales (`SaleReturn` + `SaleReturnLine`) con restauración de stock por línea
- `TaxFreeForm` para turistas extraUE: umbral 90,90€, cálculo automático de `tax_refund_amount`, operadores global_blue/planet/diva
- Factura rectificativa (`Receipt.type=rectificativa` + `original_receipt_id`)
- VeriFactu serie `"BTQ"` con hash SHA-256 encadenado

**Routers implementados:** `auth`, `catalogue`, `inventory`, `sales`, `receipts`, `suppliers`, `bridge` (proxy hotel-pms con `origin="boutique"`).

**Infraestructura:** mismo stack. Puerto 8003. Migración inicial de 25 tablas.

**36/36 tests, 0 fallos.** Tests por módulo: auth (3), catálogo (8), inventario (5), ventas (8), recibos (7), proveedores (5).

---

### Integración end-to-end — Los tres sistemas funcionando juntos

Se integraron los tres módulos en un entorno de desarrollo local. El bridge hotel↔restaurante↔boutique permite cargar consumos al folio del hotel desde cualquiera de los otros dos sistemas.

**Hotfix aplicado al hotel DB:** la base de datos estaba en estado mixto (tablas creadas con `create_all` sin Alembic, con varios campos faltantes). Se aplicaron manualmente las columnas y tablas que faltaban y se marcó el estado en Alembic con `alembic stamp 0008`.

**Puertos activos en dev:**
- hotel-pms backend: `localhost:8001`
- restaurant-pos backend: `localhost:8002`
- boutique-pos backend: `localhost:8003`

**Smoke test de 8 pasos (8/8 pasando):**
1. Login en los tres sistemas
2. Hotel: habitación 101, crear huésped, crear reserva, check-in
3. Bridge: `GET /api/bridge/folio/by-room/101` → folio + nombre huésped
4. Bridge: cargo restaurante 45€ × 2 → folio hotel
5. Bridge: cargo boutique 25€ × 1 → folio hotel
6. Hotel: folio con 115€ de cargos externos (90€ restaurante + 25€ boutique)
7. Restaurant: proxy bridge devuelve mismo folio
8. Boutique: proxy bridge devuelve mismo folio

**Revisión crítica post-integración identificó 4 issues críticos** a resolver antes del primer deploy real (estimación 3-4 horas de trabajo): idempotencia del bridge (retries de red podrían duplicar cargos), validación de `external_origin` como enum, race condition en `total_amount` sin `SELECT FOR UPDATE`, y hotfixes del hotel DB no reproducibles en producción.

---

## Estado actual

**ProgramaFichar:**
- URL demo HTTPS activa (Cloudflare Tunnel — URL temporal)
- 9/9 flujos E2E verificados tras corrección de bugs
- Estado: demo en manos del responsable de RRHH, esperando feedback

**Hotel Ollers de Mar (PMS):**
- Backend con Tiers 1-4 implementados: facturas, Redsys, housekeeping, SES multi-huésped, paginación, exports CSV, panel llegadas/salidas, notificaciones email
- Pendiente de deploy en servidor (migraciones 0005/0006/0007)
- `.env.example` y `DEPLOY.md` listos para el cliente

**Restaurant-POS:**
- Backend completo: 35/35 tests
- Listo para integrar con hotel-pms en dev; frontend pendiente de decisión de diseño del cliente

**Boutique-POS:**
- Backend completo: 36/36 tests
- Listo para integrar con hotel-pms en dev; frontend pendiente de decisión de diseño del cliente

**Arquitectura Ollers de Mar:**
- Diseño cerrado: 4 repos, objeto Contact unificado, BC sync por empresa
- `ollers-shared` pendiente de crear

---

## Pendiente

**ProgramaFichar:**
1. Esperar feedback del responsable de RRHH tras la demo
2. Decidir plataforma de firma digital (Signaturit, DocuSign u otra)
3. Completar flujo de aceptación de disputas: crear `TimeRecord` corregido automáticamente
4. URL HTTPS permanente (DuckDNS o dominio propio — el tunnel de Cloudflare cambia al reiniciar)

**Hotel Ollers de Mar — deploy:**
5. Obtener respuestas del cliente a las 5 preguntas BC
6. Deploy en servidor: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build && alembic upgrade head` (migraciones 0005/0006/0007)
7. Credenciales Redsys de producción (solicitar al banco)
8. Resolver 4 issues críticos de integración antes del primer deploy real (idempotencia bridge, enum origin, SELECT FOR UPDATE, migration 0009 para hotfix)

**Restaurante y boutique:**
9. Respuestas del cliente sobre BC (mismo tenant o separados, datáfonos, cargos cruzados)
10. Crear repo `ollers-shared` con Contact + BC sync + Redsys migrado desde hotel-pms
11. Frontend restaurant-pos y boutique-pos (pendiente decisión de diseño del cliente)
12. VeriFactu Fase 2 — transmisión AEAT (deadline enero 2027)
