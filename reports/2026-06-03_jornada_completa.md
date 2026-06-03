---
title: Jornada completa — ProgramaFichar análisis competitivo + refactor calidad + kiosk / Hotel Ollers gestión usuarios / Gestor Facturas integración ZeroCog
date: 2026-06-03
project: Victor (multi-proyecto)
type: sesion
---

# Sesión de trabajo — 3 de junio de 2026

## Qué se hizo

### ProgramaFichar — Análisis competitivo Bizneo HR + nuevas features

- Análisis competitivo basado en 32 capturas de Bizneo HR: gap analysis completo en 6 áreas (Tiempo, Ausencias, Bolsa de horas, Personas, Dashboard, Informes).
- Feedback de RRHH del cliente incorporado: sistema de mensajes empleado↔empresa, saldo de vacaciones con descuento automático, bolsa de horas acumulada anual.
- Nuevos endpoints backend: `GET /jornadas/mine`, `GET /absences/mine`, `POST /absences/request`, `GET /absences/team-timeline` (Gantt mensual de ausencias), `GET /admin/overtime/mine`, `GET /reports/monthly-balance`.
- Fix dependencias de auth en portal empleado (lambdas rotas → `require_employee`). Fix `ALLOWED_ORIGINS` como `str` para compatibilidad pydantic-settings v2.
- Nuevos componentes frontend: `OvertimePanel.tsx` (panel admin con selector de semana, tabla y aprobación con modal), `AbsenceTimeline.tsx` (Gantt horizontal de ausencias por color/tipo), `EmployeePortal.tsx` reescrito con 3 tabs (Mis fichajes / Mis ausencias / Horas extra), `Reports.tsx` con tab "Balance mensual" con colores por balance positivo/negativo.
- Gestión de equipamiento por empleado (`employee_equipment` CRUD) y saldos de vacaciones (`leave_balances` con cálculo en tiempo real y upsert).
- Horarios de trabajo — Opción B completa: plantillas (nombre, días, hora entrada/salida), asignación por empleado con historial, calendario mensual para empleado y admin. Frontend: `ScheduleSettings.tsx` y `MySchedule.tsx`. Migración `003_work_schedules.sql`. 2 bugs de compilación encontrados y corregidos antes del deploy.
- Deploy en servidor Hetzner 46.225.69.8: .env perdido en deploy anterior → recreado con nuevos secretos. Schema aplicado manualmente. Seed demo ejecutado. Backend OK, frontend 200, seed cargado (2 empresas, 25 empleados, 103 jornadas).

### ProgramaFichar — Refactor de calidad de código

- Revisión exhaustiva línea a línea de ~40 archivos (backend Python + frontend TypeScript).
- Creación de `backend/app/utils/time_calc.py`: `calc_net_minutes()` y `superseded_subquery()` — funciones únicas en sustitución de 4 y 8 duplicados respectivamente.
- N+1 queries corregidos en 6 endpoints: `list_jornadas` (201→2 queries), `my_jornadas` (91→2), `live_status` (N→3), `monthly_csv` (N→3), `monthly_balance` (N contratos + N×M records → 4), `weekly_overtime` (N→4), `dashboard` superadmin (N×(N+M) → 5 queries globales).
- Unificación Pydantic v2 (`ConfigDict`) en 8 archivos. Imports movidos al nivel de módulo en auth.py, companies.py, absences.py, schedules.py. `AuditLog.company_id` cambiado a NOT NULL.
- 10 tipos compartidos añadidos a `frontend/src/types/index.ts`: `Absence`, `OvertimeApproval`, `LeaveBalance`, `RestBalance`, `WorkSchedule`, `ScheduleAssignment`, `CalendarDay`, `EquipmentItem`, `WorkCenter`, `DeviceToken`.
- Eliminación de interfaces TypeScript duplicadas en 11 componentes (111 líneas eliminadas, 18 añadidas — solo imports).
- Creados 4 archivos de constantes y utilidades frontend: `constants/absence.ts`, `constants/event.ts`, `constants/calendar.ts`, `utils/format.ts`. 13 archivos modificados, 138 líneas eliminadas.
- Análisis intensivo con 30 hallazgos del agente. 14 bugs reales confirmados y aplicados: N+1 en `_calc_used_days`, PIN en kiosk por HMAC (1 query indexada en vez de carga completa), `localStorage.setItem` redundante, `BREAK/TRAVEL_EVENTS` duplicados, import `time` dentro de función, `_count_working_days` frágil, `date_to` complejo (→ `calendar.monthrange`), `useMemo` en listas de empleados, `key={i}` con índice, `compensation: Literal["salary","rest"]`, entre otros.
- 3 commits: `45b820e` (horarios), `a999616` (refactor N+1 + Pydantic), `b223c2f` (fixes calidad). Build TypeScript limpio. Python sin errores de sintaxis.

### ProgramaFichar — Mejoras kiosko y portal empleado

- Deploy completo al servidor tras sesión de análisis. Confirmados datos en BD: 2 empresas, 25 empleados, 103 jornadas.
- Nuevo endpoint `POST /kiosk/verify-pin`: verifica PIN por HMAC + bcrypt, devuelve `{employee_name}` si válido, 401 si no. La verificación ocurre antes de mostrar acciones — eliminado el flujo de PIN aceptado visualmente sin validar.
- Nueva página `EmployeeLoginPage.tsx` para `/portal-login`: campos slug de empresa + PIN. Links cruzados con `LoginPage` (admin↔empleado).
- Fix mensaje de error kiosk: lectura del campo `detail` del body para distinguir "PIN incorrecto" vs "Dispositivo no autorizado" vs error de conexión.
- Reset kiosk por 5 taps en footer "ProgramaFichar": limpia `kiosk_device_token` y recarga. Bug de `useState` en contador de taps resuelto migrando a `useRef`.
- Fix crítico API client: al eliminar `localStorage.setItem` en sesión anterior, `api/client.ts` perdió el token en el interceptor de axios. Corregido para leer directamente de `useAuthStore.getState().token`.
- Alerta inline cuando el fichaje falla con error 400: estado `action` con `actionError?`, banner rojo en `ActionSelector` que desaparece a los 4 segundos. Errores 400 quedan en la pantalla de acciones (sin expulsar al empleado); errores de dispositivo/conexión siguen al ERROR screen.
- 4 commits: `a4dc67d`, `f63a814`, `f794777`, `51baa67`, `60d076f`. Backend OK. Frontend 200.

### Hotel Ollers de Mar — Informe de estado y gestión de usuarios

- CRUD completo de usuarios desde el panel admin sin tocar la terminal: `backend/app/routers/users.py` con `GET /users`, `POST /users`, `PATCH /users/{id}`, `DELETE /users/{id}`, todo protegido con `require_admin`. Protección: no puedes cambiar tu propio rol ni desactivar tu propia cuenta.
- `frontend/src/pages/admin/Users.jsx`: tabla con nombre, email, badge de rol, estado activo/inactivo, fecha de alta. Modal de creación y modal de edición (nombre, rol, toggle activo, contraseña opcional). Si editas tu propia cuenta, rol y toggle aparecen desactivados con aviso en amber.
- Ruta `/admin/users` bajo `RequireAdmin` en App.jsx. "Usuaris/Usuarios/Users" con icono `UserCog` en AdminLayout. `Login.jsx` guarda `user_id` en localStorage para detectar "soy yo mismo".
- Bloque `users` completo en los tres locales (ES/CA/EN). Desplegado en producción. Backend arrancó sin errores.

### Gestor Mail Facturas — Feedback Víctor + integración ZeroCog

- Feedback de Víctor: 4 features implementadas. Migración 0022 aplicada en local y producción (columnas `beneficiary`, `is_accounted`, `payment_mode`).
  - Eliminar facturas: endpoint `DELETE /invoices/{id}` con cascade en invoice_events, invoice_notes, pdf_tokens. Modal de confirmación destructivo.
  - Columna Beneficiario: campo editable inline, filtro en barra de búsqueda.
  - Check Contabilizado ✅: boolean con toggle, visible para todos, editable solo por operator/admin.
  - Modo de pago: dropdown (Transferencia / Domiciliación / Tarjeta / Otros), mismo patrón que Categoría.
- Filas de la tabla coloreadas por beneficiario: paleta de 10 colores con hash determinista del nombre. Borde izquierdo de 4px. Leyenda con chips encima de la tabla. Desplegado.
- Integración ZeroCog — Gestor_Mail_facturas es la segunda fuente del hub ZerocogFrank:
  - En Gestor_Mail_facturas (rama `feature/zerocog-integration`): `GET /zerocog/sync` protegido por API key, devuelve las 109 facturas estructuradas.
  - En ZerocogFrank (main): `victor_mapper.py` convierte facturas Victor en eventos ZeroCog; `victor_bootstrap.py` llama a `/zerocog/sync`, mapea y upserta en `zc_events`; `zerocog_bc_app.py` actualizado con bootstrap en startup, loop de re-sync cada 30 min, endpoint `POST /webhook/victor`, `/summary` con `total_victor` y `victor_spend`.
  - Estado tras deploy: 336 total events (227 BC + 109 Victor), `victor_spend: €347.881`.
- Diferenciación visual BC vs VGestion en `bc.zerocog.org`: variables CSS `--victor/#0d9488`, tab nuevo "🧾 VGest." en sidebar, badges BC (azul) / VG (verde teal) por item, hover diferenciado, query `victor_purchaseInvoice` en `/records/`. 100 facturas VGestion accesibles desde `/records/victor_purchaseInvoice`.
- 3 commits en Gestor_Mail_facturas: `fb6b021` (zerocog demo), `bf08bc0` (feedback Víctor), `828bd89` (colores beneficiario) + `5459364` en rama `feature/zerocog-integration`.

## Estado actual

ProgramaFichar: backend OK, frontend 200, servidor Hetzner 46.225.69.8. Kiosk funcional con verificación de PIN real, alerta inline, reset por taps. Portal del empleado con login propio. Build TypeScript limpio, Python sin errores. Hotel Ollers de Mar: gestión de usuarios en producción, informe ejecutivo generado. Gestor Mail Facturas: 4 features de feedback desplegadas, integración ZeroCog activa con 109 facturas sincronizadas, diferenciación visual en bc.zerocog.org.

## Pendiente

**ProgramaFichar:**
- Sistema de mensajes/notificaciones empleado↔empresa (feature principal, pendiente de diseño)
- Migración BD: `ALTER TABLE audit_log ALTER COLUMN company_id SET NOT NULL` (modelo corregido, columna en BD sigue siendo nullable)
- Usar tipos de `types/index.ts` en los componentes que aún tienen interfaces locales (refactor progresivo)
- Deploy de cambios del último bloque de análisis al servidor (rsync + rebuild)

**Hotel Ollers de Mar:**
- Brevo API key del cliente
- Confirmar modelo exacto TESA y decisión servidor local vs cloud
- Check-in online — página pública `/booking/checkin/{token}`
- Channel manager — room IDs reales
- BC sync — reunión técnica pendiente
- Pasarela de pago real (Stripe o Redsys)
- Alembic — migraciones reales

**Gestor Mail Facturas:**
- `VICTOR_API_KEY=changeme` en producción — cambiar a valor seguro
- Webhook Victor → ZerocogFrank para señales en tiempo real
- Parsers pendientes: `parsers/generic.py` sin extracción de número de factura, SMTP en producción, dominio + HTTPS
- Decidir cuándo merge `feature/zerocog-integration` a main
