---
title: Jornada completa — Hotel Ollers de Mar inception + Gestor Facturas feedback + ZerocogFrank pool fix
date: 2026-06-01
project: Victor (multi-proyecto)
type: sesion
---

# Sesión de trabajo — 1 de junio de 2026

## Qué se hizo

### Hotel Ollers de Mar — Inicio del proyecto (PMS desde cero)

- Definición de arquitectura para sistema de gestión hotelera completo: FastAPI + PostgreSQL + React/Vite + Docker, con integración Business Central (clientes, facturas, pagos, inventario) y channel manager con patrón adapter (Beds24 como primer adaptador, Octorate como segundo).
- Construcción del proyecto desde cero — 45+ archivos: docker-compose, backend completo (modelos Room/RoomType/Reservation/Guest/RatePlan/Invoice/User, routers auth/reservations/rooms/guests/channel_manager, servicios bc_client.py y channel_manager.py), frontend completo (React/Vite + Tailwind + TanStack Query, páginas admin y booking web público).
- Modelos clave: Reservation con locator OLLxxxxxx, ciclo de vida completo (pending→confirmed→checked_in→checked_out→invoiced→cancelled), reservas no preasignadas (room_id nullable para detectar overbooking), RatePlan + RoomRate por día.
- Resolución de conflictos de puertos Docker con Gestor_Mail_facturas (5432→5433, 8000→8001, frontend→5174). Fix baseURL hardcodeado en api.js → proxy Vite.
- Seed de datos realistas: 4 tipos de habitación (VI/VIN/AR/CAB), 14 habitaciones, 15 huéspedes internacionales, 23 reservas (6 checked-in, 14 confirmed, 2 no preasignadas en alerta naranja), 12 servicios, 2 rate plans por tipo.
- Deploy en servidor Hetzner `46.225.69.8:5174`. Race condition DB→backend corregida con healthcheck + depends_on.
- Code review `/code-review high`: 7 ángulos de análisis, 6 bugs confirmados y corregidos: (1) webhook channel manager sin secret → True incondicional, corregido a 503/401; (2) token BC cacheado indefinidamente → guard con `_token_expires_at` + refresh 60s antes; (3) `room_type_id` hardcodeado a 1 cuando room no mapeada → HTTPException 422; (4) `int(user_id)` sin try-except en security.py → 401; (5) email en Guest sin índice DB → `index=True`; (6) `STATUS_COLORS` / `STATUS_BADGE` duplicados en Rack y Reservations → extraídos a `src/lib/statusConfig.js`.
- Módulo de campañas CRM completo (Email + SMS + WhatsApp via Brevo): modelo Campaign + CampaignRecipient, brevo_client.py unificado, router campaigns.py con CRUD + /preview audiencia + /send en background task. Segmentación por: país, número de estancias, rango last_stay, tipo de habitación, gasto total acumulado, régimen, canal de origen, VIP, requiere email/teléfono. Frontend: Campaigns.jsx con constructor visual de segmentos y preview de audiencia.
- Internacionalización ES / CA / EN completa: react-i18next + i18next-browser-languagedetector, 3 locale files (284 líneas cada uno), todos los componentes actualizados (AdminLayout, Login, Rack, Reservations, Guests, Rooms, Campaigns, BookingSearch/Form/Confirm/Layout). Selector de idioma en sidebar y login. Fechas del rack localizadas. Logout sincronizado.
- i18n de componentes nuevos: Director, Audit, Legal, ReservationPanel, AdminLayout — +94 líneas por locale. Strings hardcodeados en catalán eliminados. 114 claves t() verificadas contra los 3 locales: 0 missing.
- Análisis de mercado en profundidad (15 competidores: Mews, Cloudbeds, Amenitiz, Avirato, Beds24, etc.): identificados 3 gaps legales críticos (SES.HOSPEDAJES obligatorio desde dic 2024, multas €601–€30.000; Taxa turística IEET Cataluña €0,90–€4,50/persona/noche; VeriFactu deadline enero 2027) y 12 gaps operativos vs. competencia (dashboard ADR/RevPAR, folio de cargos, depósito como pasivo BC, night audit, check-in online, precios dinámicos, etc.).
- Definición estratégica — Las dos líneas de trabajo: Línea 1 (PMS visible para el cliente, base construida) y Línea 2 (ZeroCog embebido invisible, cerebro del ecosistema multi-empresa: hotel + restaurante + vinos + tours + BC). Visión: corpus operacional acumulado de todas las empresas del cliente = switching cost real y activo estratégico.
- Módulo de tarifas por temporada: `routers/rates.py` (GET /calendar, PUT /period, DELETE /period), `Rates.jsx` — calendario 2 meses, tabs por tipo de habitación, selección click-click de rango, editor de período en footer, código de colores (verde=alto, naranja=bajo, rojo=stop_sell). Añadido al sidebar.
- Pago simulado en booking web: `BookingPayment.jsx` con formulario de tarjeta pre-rellenado (4242...), animación "procesando" 2s, siempre confirma. Flujo: BookingForm → /booking/payment → /booking/confirm. Traducciones ES/CA/EN.
- Disparador demo en Director: endpoint `POST /api/demo/fire` (habitación aleatoria disponible, huésped fake de lista, reserva confirmed+paid, campaña draft→sent), botón "⚡ Demo" en header con banner verde 6s (localizador, nombre, noches, importe, campaña activada), polling automático 8s en Director.
- Campañas mejoradas: historial siempre visible en columna izquierda, clicar campaña → panel derecho con stats/fechas/asunto/preview HTML/botón Enviar. Seed: 2 campañas (draft "Tardor 2026" + sent "Oferta Cap de Setmana Juny 2026").
- Fix KPIs a cero: bug `date_from == date_to == "2026-06-01"` → rango 0 días → ADR/RevPAR/Ocupación a cero. Fix backend: revenue sobre `ACTIVE_STATUSES` proporcional al período. Fix frontend: `date_to = monthEnd = "2026-07-01"`.
- Fix "Reserva no trobada" al clicar: `column invoices.verifactu_hash does not exist` → eliminado `selectinload(Reservation.invoices)` del endpoint (el panel usa folio vía /api/folio/{id} por separado).

### Gestor Mail Facturas — Feedback de Víctor

- Fix desfase de columnas en tabla de facturas: campo `email_from` (Remitente) tenía `<td>` en el body pero no `<th>` en el encabezado, desplazando columnas desde Importe. Fix: `<th>Remitente</th>` en thead + `colSpan={10}→{11}` en fila expandible.
- Modal de motivo de rechazo: antes el botón "Rechazar" llamaba directamente a `handleStatus` sin confirmación. Ahora: backend acepta `reason: Optional[str]` en `StatusUpdate` y graba un segundo `InvoiceEvent` con `field_name="rejection_reason"` cuando hay motivo; frontend nuevo componente `RejectModal` con textarea opcional; ambos botones de rechazo (fila y panel expandido) abren el modal; historial muestra "Motivo de rechazo: <texto>".
- Verificado con Playwright: headers correctamente alineados, modal con textarea, historial con motivo.
- Rsync completado al servidor. Contenedores pendientes de rebuild en producción.

### ZerocogFrank — Fix connection pool agotado

- Diagnóstico: `bc.zerocog.org` no cargaba datos. Token BC válido. Endpoints `/api/summary` y `/api/companies` devolvían 404 (rutas correctas: `/summary` y `/companies`). `/companies` devolvía 500: `psycopg2.pool.PoolError: connection pool exhausted`.
- Causa raíz: tres sitios en `zerocog_bc_app.py` usaban `with _conn() as conn:` como context manager. psycopg2 en modo context manager solo hace commit/rollback pero **no devuelve la conexión al pool**. Las 10 conexiones se agotaban con el tiempo.
- Fix aplicado en `_load_corpus()`, `insights()` y `records()`: cambiados a `try/finally: _put(conn)`, consistente con el resto del código en `zerocog_corpus.py`.
- Contenedor reconstruido (el anterior había entrado en crash loop). Nuevo contenedor verificado: `/companies` → 227 eventos CRONUS ES, `/insights` → 6 métricas, `/summary` → totales correctos.

## Estado actual

Hotel Ollers de Mar: producción activa en 46.225.69.8:5174. PMS completo con rack, reservas, campañas con Brevo, tarifas por temporada, SES/IEET, night audit, check-in online, booking web pública, pago simulado, disparador demo, i18n ES/CA/EN completo, 6 bugs corregidos. Listo para demo con el cliente. Gestor Mail Facturas: fixes de feedback aplicados en local, rsync al servidor completado, rebuild en producción pendiente. ZerocogFrank: pool fix desplegado, `bc.zerocog.org` operativo con 227 eventos.

