---
title: Jornada completa — ProgramaFichar inception + Hotel Ollers de Mar post-reunión
date: 2026-06-02
project: Victor (multi-proyecto)
type: sesion
---

# Sesión de trabajo — 2 de junio de 2026

## Qué se hizo

### ProgramaFichar — Inicio del proyecto

- Investigación de la normativa española vigente sobre registro de jornada digital (RDL 8/2019 + borrador pendiente de BOE). Identificados requisitos técnicos obligatorios: fichaje inmutable, audit log, acceso del trabajador, retención 4 años.
- Definición de stack para SaaS multitenant profesional: FastAPI + SQLAlchemy 2.0 async + Alembic / PostgreSQL con Row-Level Security / React + Vite + TypeScript + shadcn/ui / Docker Compose.
- Diseño del MVP completo: kiosko tablet por PIN, panel admin (tiempo real + histórico + incidencias + horas extra + exportación PDF/CSV), portal del empleado, audit log inmutable. Roles: super_admin / company_admin / supervisor / employee.
- Diseño del schema de BD en 6 iteraciones de revisión hasta alcanzar solidez legal y técnica: 17 tablas, 2 vistas, RLS en todas las tablas tenant. Decisiones clave: jornadas como entidad propia, PIN por HMAC, employment_status con 7 estados legales, DPA, working_days_mask, RGPD vs retención 4 años con `anonymized_at`, jerarquía de jornada legal en 3 niveles (system_settings → companies → employees).
- Scaffolding completo del proyecto con Docker Compose, Dockerfiles, estructura backend/frontend/kiosko, modelos SQLAlchemy, routers con lógica real, auth JWT + PIN implementado, kiosko con endpoint `/punch`.
- Seed demo: dos empresas medianas con empleados, fichajes históricos, correcciones, ausencias pendientes, overtime, infracciones.
- Deploy en servidor Hetzner `46.225.69.8` (backend:8002 / frontend:5175 / postgres:5434). Resolución de 10 bugs de deploy: asyncpg multi-statement, `passlib + bcrypt==4.0.1`, `email-validator`, alias `@` en vite.config.ts, flash de hidratación Zustand, race condition en switch de empresa super admin.
- Git inicial: commit con 83 archivos, 7235 líneas, rama `main`.

### Hotel Ollers de Mar — Post-reunión con Laia

- 3 fixes de revisión de código: localizador demo con solo 1000 valores → `generate_locator()`, revenue del dashboard con `REVENUE_STATUSES` incorrecto → `ACTIVE_STATUSES`, componente `Section` muerto con referencia inexistente eliminado.
- Modal de creación de nueva reserva desde el panel admin: fechas, tipo habitación, habitación disponible por fechas vía `/api/rooms/availability`, pax, régimen, canal, importe auto-calculado, búsqueda o creación inline de huésped.
- Modelo `ReservationLog` y endpoint `GET /reservations/{id}/logs`. Logging en creación, check-in, check-out, modificaciones y cambios de precio.
- Fix "Enviar link check-in no hace nada": backend devolvía 409 si ya existía link pendiente (corregido para devolver link existente), URL hardcodeada a dominio (corregida a ruta relativa), panel azul con link copiable.
- Integración de campañas con templates de Brevo: `list_templates()` y `send_email_template()`, selector de cards de templates en Campaigns.jsx, banner amber si no hay API key.
- Code review con 3 agentes en paralelo (backend correctness, frontend correctness, arquitectura): 18 hallazgos, 13 bugs reales aplicados. Destacados: XSS eliminado, race condition double-send, CORS configurable, helper `_calc_revenue_and_nights()` compartido, folio keyed por `c.id`, stale closure en template toggle.
- VIP: toggle estrella en ReservationPanel, badge "VIP" amarillo, ★ en lista de reservas y en barra del Rack.
- Rack draggable: HTML5 DnD con ghost bar snapped a casillas, modal de confirmación amber con comparativa antes/después, banner de deshacer 8 segundos, logs automáticos de movimiento vía PATCH existente.
- Login de recepcionista sin privilegios de admin: `require_admin` en security.py, rutas campaigns/rates/audit/ieet protegidas, `make_receptionist.py`, badge "Recepción" en sidebar, guard `RequireAdmin` en App.jsx.
- Foto de documento del huésped: campo `document_photo` (base64) + migración + endpoint + upload en panel con cámara o archivo.
- Modal de cobro con calculadora de denominaciones (500€→0.10€), cálculo de cambio, log en historial.
- Catálogo real de servicios: 34 servicios en 6 categorías (Restauració, Activitats, Hípica, Conferències, Miscellania). Script `load_services.py` aditivo, ejecutado en producción.
- Menú contextual click derecho en Planning: Ver reserva, Check-in, Check-out, Nueva reserva, Cancel·lar con confirmación inline. Rack renombrado → Planning en los tres locales.
- Panel de reserva rediseñado con 4 pestañas: Resum, Folio/Càrrecs, Document, Historial. Header oscuro siempre visible. Badge de contador en pestaña Historial.
- i18n completo: tabs del panel, modal de cobro, sección documento, menú contextual Planning en ES/CA/EN. Strings hardcodeados eliminados de ReservationPanel y Rack.
- Panel ampliado a 760px con layout de dos columnas.


## Estado actual

ProgramaFichar: MVP completo desplegado en Hetzner 46.225.69.8 con dos empresas demo. Git inicializado con commit inicial. Hotel Ollers de Mar: todo desplegado en producción (46.225.69.8:5174). Post-reunión con Laia: rack draggable, VIP, panel con tabs, recepcionista, cobro, documentos, servicios reales, menú contextual, 13 bugs corregidos.

## Pendiente

**ProgramaFichar:**
- Pantalla "Horas extra" — conectar admin.py al frontend
- Portal del empleado — implementar llamadas API
- Settings.tsx — pantalla de configuración de empresa
- Nginx + subdominio para acceso sin puerto

**Hotel Ollers de Mar:**
- Brevo API key del cliente (bloqueante para envío de campañas real)
- Confirmar modelo exacto TESA y decisión servidor local vs cloud
- Check-in online — página pública `/booking/checkin/{token}` (el link se genera, la página no existe)
- Channel manager — room IDs reales
- Pasarela de pago real (Stripe o Redsys)
- Alembic — migraciones reales antes de escalar
- Línea 2 ZeroCog — mappers PMS→ZeroCog, chat embebido
