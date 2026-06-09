---
title: Jornada ProgramaFichar + Hotel Ollers — Hardening seguridad, TIER 1 y TIER 2, suite de tests completa
date: 2026-06-09
project: Victor (multi-proyecto)
type: sesion
---

# Sesión de trabajo — 9 de junio de 2026 (martes)

---

## Qué se hizo

---

### ProgramaFichar — Evaluación del estado y definición del roadmap

Se realizó un análisis exhaustivo del estado actual del producto con lectura directa del código. Resultado: **7.5/10** en vectores de calidad técnica (tests, corrección funcional, seguridad, integridad de datos, deuda técnica, observabilidad, UX, despliegue).

Se estableció el roadmap formal hasta la entrega al cliente:

| Fase | Contenido | Estado |
|---|---|---|
| FASE 1 | Cobertura completa de tests (employees, admin, frontend) | Completada hoy |
| FASE 2 | Hardening para producción (rate limiting, logs, health check, backups) | Completada hoy |
| FASE 3 | Configuración del servidor del cliente (secrets reales, empresa real, kiosk) | Pendiente acceso |
| FASE 4 | BC Integration con Azure (pendiente credenciales del cliente) | Bloqueada |

**Criterio de cierre:** FASE 3 completada + nota ≥8/10 sin omisiones en todos los vectores críticos.

---

### ProgramaFichar — Demo preparada para presentación a cliente

Se preparó la versión de demostración para mostrar a los responsables de RRHH del cliente.

**Login unificado:** eliminadas las dos pantallas separadas de acceso (administrador y empleado en páginas distintas, con un link en el pie como "puerta de servicio"). Reemplazadas por una única tarjeta con toggle Administración / Empleado, mismo peso visual, mismo color para ambos roles.

**Login de empleado por portal web:** el empleado puede acceder al portal web con email + PIN, sin necesidad de conocer el slug técnico de su empresa (que era el flujo del kiosko). El kiosko mantiene su flujo sin cambios.

**Manuales de usuario en-app:**
- Manual de administración: 10 secciones (Dashboard, Empleados, Fichajes, Ausencias, Horas extra, Mensajes, Documentos, Informes, Kiosko, Configuración). Accesible desde el sidebar en `/admin/help`.
- Manual del empleado: 7 secciones. Accesible como pestaña "Ayuda" en el portal del empleado.

**Seed de demo ejecutado en el servidor:** 2 empresas con 25 empleados en total. Todos los empleados tienen email asignado para poder entrar al portal web.

**HTTPS con Cloudflare Tunnel:** Firefox bloqueaba el servidor HTTP. Instalado `cloudflared` en el servidor con servicio systemd. URL HTTPS pública activa. Nota: la URL es temporal (cambia en cada reinicio); para URL permanente se necesita dominio propio.

---

### ProgramaFichar — Revisión crítica como herramienta de RRHH de mercado

Se evaluó el producto en términos de adecuación al mercado de RRHH, comparando con Sesame, Factorial y Bizneo. Vectores: tests, corrección funcional, seguridad, cumplimiento RDL 8/2019, RGPD, cobertura de mercado, observabilidad, UX.

**Nota inicial: 4.49/10.** Bloqueantes identificados:

- Sin rate limiting en `/auth/employee-login` (PIN atacable por fuerza bruta con email)
- Sin descanso mínimo entre jornadas (RDL 8/2019)
- Sin calendar laboral con festivos por empresa/CCAA
- Sin aviso legal/política de privacidad (RGPD obligatorio)
- Sin export de ausencias y horas extra en CSV/Excel
- Sin importación masiva de empleados
- Sin informe de presencia esperada vs real
- Sin notificaciones automáticas (ausencia aprobada/rechazada, jornada sin cerrar)
- Sin disputa formal de registros de jornada

Se definió el plan de mejora en tres tiers y se procedió a ejecutarlo en la misma jornada.

---

### ProgramaFichar — TIER 1: Hardening y cumplimiento regulatorio

**Rate limiting en autenticación** (`slowapi`): decoradores en `/auth/login` y `/auth/employee-login`. Configurable por entorno (`RATE_LIMIT_AUTH`). Tests con mini-app de 2/minute que verifica 429 en el tercer intento.

**Control de descanso mínimo entre jornadas (RDL 8/2019):** en el clock-in del kiosko, se busca el último clock-out del empleado. Si el tiempo de descanso es inferior al mínimo configurado (por defecto 12 horas), se crea un registro de incidencia (`ComplianceViolation`) y se devuelve un aviso en la respuesta. El fichaje no se bloquea — se registra y se avisa, permitiendo al responsable revisarlo.

**Política de privacidad RGPD:** página estática en `/privacy` con 7 secciones (responsable del tratamiento, datos tratados, finalidad, conservación 4 años, derechos, seguridad). Link visible en el pie de la página de login.

**Export CSV ausencias y horas extra:** dos nuevos endpoints (`GET /reports/absences-csv` y `GET /reports/overtime-csv`) con filtros por año, empleado y estado. Panel de exportación en la sección de Informes del admin, refactorizado con tarjetas unificadas para los tres tipos de export (jornadas, ausencias, horas extra).

**Informe de presencia diaria:** endpoint `GET /jornadas/presence-report` que devuelve todos los empleados activos con indicador de si han fichado hoy y si tienen ausencia justificada. Banner rojo en el Dashboard cuando hay empleados ausentes sin justificar. Los días no laborables según la máscara de la empresa devuelven lista vacía.

**Incidencias de compliance en panel admin:** endpoints para listar y revisar las incidencias de descanso insuficiente generadas por el kiosko. Badge naranja en el Dashboard. Endpoint `POST /admin/notify-stale-jornadas` para enviar emails a empleados con jornada abierta de días anteriores.

**Tests de festivos:** los endpoints de gestión de festivos (GET/POST/PATCH/DELETE + seed nacional) existían sin cobertura de test. Añadidos 8 tests incluyendo idempotencia del seed.

Suite al cerrar TIER 1: **127/127 backend · 49/49 frontend** (+28 backend, +1 frontend respecto al inicio del día).

---

### ProgramaFichar — TIER 2: Funcionalidad avanzada de RRHH

**Importación masiva de empleados por CSV:** endpoint `POST /employees/import` que acepta CSV en UTF-8 o UTF-8-BOM. Columnas obligatorias: nombre y apellidos. Opcionales: email, NIF, número de empleado, departamento, tipo de contrato, horas semanales, fecha de alta. Genera PIN único por empleado, crea registro y contrato. Devuelve `{created: N, errors: [{fila, motivo}]}`. Botón "Importar CSV" en la pantalla de Empleados con panel de resultados inline. 5 tests (autenticación, CSV válido, sin nombre, mixto válido+inválido, encoding BOM).

**Disputas formales de registros de jornada:** flujo estructurado para que el empleado pueda impugnar un fichaje. El empleado crea la disputa con tipo (`hora_incorrecta`, `entrada_sin_salida`, etc.) y motivo. El admin la revisa, acepta o rechaza con notas de resolución. Página de disputas en el panel de administración con filtro de solo pendientes y panel de resolución inline. 11 tests (crear, autenticación, tipo inválido, motivo vacío, mis disputas, admin lista, admin acepta, admin rechaza, 404, 409 ya resuelta). Nota: aceptar la disputa genera el registro de resolución pero no crea automáticamente el TimeRecord corregido — flujo pendiente de completar.

**Notificaciones automáticas programadas (APScheduler):** job diario a las 07:00 UTC que recorre todas las empresas y envía notificaciones a empleados con jornada sin cerrar del día anterior. Configurable con `SCHEDULER_ENABLED` (desactivado en tests) y `SCHEDULER_STALE_HOUR`. La lógica de notificación es compartida entre el scheduler y el endpoint manual de admin, sin duplicación. 3 tests (scheduler desactivado no arranca, lógica sin jornadas, lógica con jornada antigua).

Suite al cerrar TIER 2: **147/147 backend · 49/49 frontend** (+20 backend respecto al cierre de TIER 1).

**Nota tras TIER 1 + TIER 2: 6.3/10** (desde 4.49/10 al inicio).

| Vector | Inicio | Cierre |
|---|---|---|
| Seguridad / compliance | 3.0 | 6.0 |
| Completitud RRHH | 5.0 | 7.5 |
| Calidad técnica | 5.0 | 7.0 |
| UX / operatividad | 5.0 | 6.5 |
| Infraestructura | 4.0 | 4.5 |

**Push pendiente:** 4 commits de TIER 2 (`git push server main`).

---

### Hotel Ollers de Mar — Hardening de seguridad + suite de tests

**Auditoría de seguridad de producción.** Se verificó el estado real del servidor:
- `SECRET_KEY` en producción era `dev_secret_change_in_prod` — cualquier JWT era forjable
- `DB_PASSWORD` era `hotel_dev` (valor por defecto)
- `/auth/pin-login` sin rate limiting — PIN atacable por fuerza bruta
- Login endpoint no verificaba `is_active` — usuarios desactivados podían autenticarse
- `create_all` en startup conviviendo con Alembic (riesgo de conflicto silencioso)
- CORS con `allow_methods: ["*"]`
- `generate_locator()` sin retry en caso de colisión

**Correcciones aplicadas y desplegadas:**
- SECRET_KEY rotado: hex de 64 caracteres real en `/opt/hotel_ollers/.env` (chmod 600)
- DB_PASSWORD rotado: `ALTER USER hotel WITH PASSWORD '...'` + restart backend
- Rate limiting en `/auth/pin-login`: 5 intentos / 10 minutos por IP. Verificado: intentos 1-5 devuelven 401, intento 6 devuelve 429
- Fix en endpoint de login: añadida verificación de `is_active` — usuarios desactivados ahora reciben 401
- Demo endpoint (`/api/demo/fire`) restringido a rol admin
- `generate_locator()` reescrito como función async con consulta a BD y hasta 10 reintentos
- `create_all` eliminado del startup — Alembic es el único dueño del schema
- CORS `allow_methods` cambiado de `["*"]` a métodos explícitos

**Suite de tests (42/42 verde):** infraestructura creada desde cero (`requirements-test.txt`, `pytest.ini`, `conftest.py` con fixtures de base de datos, usuarios, habitación, huésped, reserva).

| Archivo | Tests | Cobertura |
|---|---|---|
| `test_auth.py` | 18 | Login, PIN, rate limit, refresh, /me |
| `test_folio.py` | 11 | Folio, cargos, precio personalizado |
| `test_reservations.py` | 13 | Crear, locator único, formato, listar, actualizar |

Decisiones técnicas clave: `NullPool` en el engine de test (asyncpg vincula el pool al event loop de creación), `TESTING=1` antes de importar la app para que el limiter use memoria en lugar de Redis, fixture `reset_rate_limiter` autouse para limpiar estado entre tests.

Commit: `a8d2790` — backend en producción con credenciales reales, suite verde.

---

## Estado actual

**ProgramaFichar:**
- Servidor `46.225.69.8:8002/5175`: funcional con TIER 1 desplegado
- HTTPS demo activa vía Cloudflare Tunnel (URL temporal)
- Nota de mercado RRHH: **6.3/10** (era 4.49/10)
- Backend: **147/147 · Frontend: 49/49**
- 4 commits de TIER 2 pendientes de push (`git push server main`)

**Hotel Ollers de Mar:**
- Producción: SECRET_KEY y DB_PASSWORD reales activos
- Rate limiting: activo en pin-login
- Tests: **42/42** — commit `a8d2790`
- Alembic en migración `0004`

---

## Pendiente

**ProgramaFichar — bloqueantes antes de entregar al cliente:**
1. Completar el flujo de aceptación de disputas: crear automáticamente el TimeRecord corregido.
2. URL HTTPS permanente: comprar dominio o configurar DuckDNS + certbot.
3. Backup automático de la base de datos documentado y verificado.
4. Credenciales Azure del cliente para activar integración BC.
5. Dominio definitivo del cliente para ALLOWED_ORIGINS.

**ProgramaFichar — TIER 3 pendiente (para producto maduro):**
6. Convenios colectivos configurables (días de vacaciones por categoría y antigüedad).
7. Proceso formal RGPD de ejercicio de derechos (borrado/portabilidad).
8. App móvil / PWA completa.
9. Backups automáticos verificados.

**Hotel Ollers de Mar — en espera del cliente:**
10. Brevo API key (emails completamente silenciosos hasta entonces).
11. Credenciales SES (obligatorio RD 933/2021 — cada check-in sin comunicar al Ministerio es infracción potencial).
12. Credenciales IEET (taxa turística catalana sin registrar).
13. Redsys/CaixaBank — pagos reales pendientes.
14. VeriFactu fase 2 — transmisión AEAT en tiempo real. Deadline enero 2027.
