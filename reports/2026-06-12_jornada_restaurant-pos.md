---
title: Jornada Restaurant-POS — Floor plan, KDS, reservas, merge, ESC/POS, export y bugfixes
date: 2026-06-12
project: Hotel Ollers de Mar — Restaurant-POS
type: sesion
---

# Sesión de trabajo — 12 de junio de 2026 (viernes)

---

## Qué se hizo

---

### Floor plan interactivo, WebSocket KDS y gestión de reservas

Implementación completa del bloque de funcionalidades de camarero avanzado.

**Backend:**

- **Migración 0005:** `pos_x`, `pos_y` (posición en plano) a tabla `tables`; `guest_name`, `guest_phone` a `table_reservations`
- **Floor plan routes:** `PATCH /tables/{id}/position` (admin), `PATCH /tables/reservations/{id}/seat`, `PATCH /tables/reservations/{id}/cancel` (409 si ya cancelada)
- **Merge de mesas:** `POST /orders/{order_id}/merge` — mueve líneas activas de source a target, cancela source (admin only)
- **WebSocket KDS:** `app/ws/kitchen_manager.py` con `KitchenConnectionManager`; `send_to_kitchen` y `update_line_status` emiten broadcast al KDS en tiempo real
- **ESC/POS:** `app/services/escpos_service.py` — `kitchen_ticket()`, `customer_receipt()`, `send_to_printer(ip, port, data)` TCP síncrono; `print_router.py` con endpoints graceful no-op si sin IP configurada
- **`security.py`:** `verify_token(token) → int` para autenticación WebSocket
- **Config:** `PRINTER_KITCHEN_IP/PORT`, `PRINTER_RECEIPT_IP/PORT`, `RESTAURANT_NAME`

**Frontend:**

- **`TableMap.jsx`:** toggle Map/Grid, canvas floor plan 1000×640px escalado responsive; drag-drop con pointer events (admin); mesas sin posición en tray inferior con opción "posicionar"
- **`Kitchen.jsx`:** hook `useKitchenWebSocket` con auto-reconexión 5s; refetch 30s con WS activo, 8s como fallback; indicador Wifi/WifiOff en header
- **`Order.jsx`:** `MergeModal` con lista de mesas ocupadas y botón fusionar (admin only)
- **`Reservations.jsx`** (nuevo — `/admin/reservations`): navegación por fecha, lista de reservas activas + historial, `CreateModal` con guest_name/phone/date/time/party_size/table_id/notes; acciones Confirmar / En mesa / Cancelar

**Tests:** `test_tables_extended.py` (6 tests), `test_orders.py` (+4 merge), `test_print.py` (8 tests ESC/POS). **103/103 passing.**

---

### Bugs de producción y mejoras de seguridad

**WebSocket KDS roto en producción — RESUELTO:**
- `nginx.conf`: bloque `location /api/ws/` con headers `Upgrade`/`Connection` para proxy WebSocket
- `Kitchen.jsx`: `window.location.hostname:8002` → `window.location.host` (pasa por nginx, funciona en producción)

**Test falso negativo — CORREGIDO:**
- `test_bill_open_order_rejected` reescrito como `test_bill_autoclosing_open_order` — el auto-close de pedidos OPEN al hacer checkout es el comportamiento correcto de negocio

**Rate limiting en `/auth/token`:**
- `app/core/limiter.py` con `Limiter(key_func=get_remote_address)`
- `@limiter.limit("10/minute")` en login + handler 429 en `main.py`
- Protección contra fuerza bruta sin necesitar HTTPS

**Impresión automática al enviar a cocina:**
- `send_to_kitchen`: si `PRINTER_KITCHEN_IP` configurado, lanza `asyncio.create_task(_print_kitchen_ticket(...))` fire-and-forget; no bloquea el endpoint

**Indicador de reservas de hoy en el plano de mesas:**
- `list_tables`: sub-query de reservas `pending`/`confirmed` de hoy por mesa
- `TableCard.jsx`: muestra hora de reserva y nombre del cliente en lugar del estado de mesa

**Validación de conflictos de reserva:**
- Al crear reserva con mesa específica: ventana ±90 minutos → 409 con detalle del conflicto

**Tests:** `test_caja.py` (7 tests), `test_tables_basic.py` (9 tests). **120/120 passing.** Deploy a producción.

---

### Split por ítems, factura completa y export CSV

**Split por ítems en Checkout:**
- Toggle `splitMode: 'equal' | 'items'` — en modo ítems, cada línea del pedido muestra checkbox
- Líneas ya cobradas se atienden y desactivan (`paidLineIds`); al completar todas → checkout cerrado
- Frontend-only, sin cambios de backend

**UI Factura completa (NIF/recipient):**
- Acordeón "Factura completa" en Checkout con `recipientName`, `recipientTaxId`, `recipientAddress`
- Al crear bill: si activo, añade `bill_type: 'full'` al POST `/bills` (el backend ya soportaba estos campos)

**Export CSV desde Dashboard (backend + frontend):**
- `GET /api/dashboard/export?range=today|yesterday|week` (admin): CSV con número, fecha, hora, mesa, total, método, propina
- `StreamingResponse` con `content-type: text/csv`
- Botón "Exportar CSV" con descarga programática desde el frontend

**Bug fix CORS_ORIGINS con pydantic-settings v2:**
- Campo `Any` + validator que intenta `json.loads` primero, luego split por coma
- Soporta tanto `http://a,http://b` como `["http://a","http://b"]`

**Bug fix producción — conflictos de puerto:**
- Puerto 5435 (postgres externo) eliminado del docker-compose prod
- Puertos 8004:8002 y 5178:80 corregidos; CORS_ORIGINS actualizado en `.env`

**Tests:** `test_dashboard.py` (+4 export). **124/124 passing.** Deploy a producción.

---

### Bugfixes críticos post-review

**Kitchen ticket ciego (CRÍTICO):**
- `send_to_kitchen`: añadido `selectinload` de `lines.menu_item` y `table_history.table` ANTES del commit de la transacción
- Datos pre-construidos como `lines_data` (name_es/ca/en reales) y pasados a `_print_kitchen_ticket`
- Resultado: la cocina ve "Paella Valenciana x2" en lugar de "#42 x2"

**Propina duplicada en split por ítems:**
- `Checkout.jsx`: la propina se aplicaba en cada pago parcial en modo ítems
- Fix: propina solo se añade al último pago cuando todos los ítems están seleccionados

**REDSYS_BASE_URL apuntando a localhost en producción:**
- `.env` producción: `REDSYS_BASE_URL=http://46.225.69.8:5178`
- Sin esto, el webhook S2S de Redsys nunca llegaba → pagos TPV cobrados pero no confirmados en el sistema

**Security headers nginx:**
- `nginx.conf`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
- Verificados activos en producción con `curl -sI`

**Tests:** +2 tests (ticket nombre real, integración kitchen). **126/126 passing.** Deploy completo.

**Estado del sistema tras todos los fixes:**

| Escenario | Valoración |
|-----------|------------|
| Demo interna | ✅ Completo |
| Cliente real (sin HTTPS) | ⚠️ Funcional, Redsys en sandbox |
| Producción real | ⚠️ Pendiente HTTPS y credenciales Redsys reales |

---

## Estado actual

Restaurant-POS **126/126 tests**, sistema completo para demo, en producción `http://46.225.69.8:5178` (frontend) / `http://46.225.69.8:8004` (backend). Todos los features del backlog cerrados.

---

## Pendiente

1. **Info BC/Azure de Victor** — solicitud formal el lunes para poder construir la integración con el ERP
2. **HTTPS** — cuando el cliente tenga dominio propio o se configure Let's Encrypt
3. **`--reload` en docker-compose.prod.yml** — flag de desarrollo activo en producción, fix de 30 minutos
4. **Credenciales Redsys reales** — cambiar de sandbox a producción cuando el cliente esté listo
5. **PDF de factura** — solo existe CSV, no PDF
6. **Usuarios staff** — crear camareros y dependientas en restaurant y boutique
7. **Carta y catálogo** — configurar platos y productos con el cliente
