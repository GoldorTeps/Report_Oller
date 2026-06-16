---
title: Jornada 15 de junio — ProgramaFichar features y browser testing
date: 2026-06-15
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 15 de junio de 2026

## Qué se hizo

### Planificación y comunicación técnica
- Evaluación del estado real de todos los proyectos: ProgramaFichar, Restaurant-POS, Boutique-POS, Hotel PMS
- Redacción de solicitud técnica a Victor sobre integración con Business Central y Azure: estado de contratación, servicios confirmados, y si el sistema está pensado para el Hotel Ollers exclusivamente o para varios establecimientos del grupo (13 potenciales)

### ProgramaFichar — Observabilidad
- Implementado sistema de logging estructurado en formato JSON, sin dependencias externas
- Módulo `core/logging.py` con `_JsonFormatter`, `setup_logging()` y `get_logger()`
- Logs de arranque y cierre del servidor en `main.py`
- Logs de autenticación: `login_ok`, `login_failed`, `login_locked` en `auth.py`
- Log completo de importación Excel en `schedules.py`

### ProgramaFichar — Tests y operaciones
- 8 tests nuevos para edge cases del matching de nombres al importar Excel de horarios: nombre completo, acentos normalizados, NIF exacto, nombre único en empresa, nombre ambiguo, nombre + primer apellido, sin resultado y lista vacía
- Script `scripts/backup_db.sh`: backup con `pg_dump`, retención automática 30 días
- `scripts/runbook.md`: comandos de operaciones completos y procedimiento de migración en producción

### ProgramaFichar — Feature C: alertas de desviación horaria
- Reescritura completa del endpoint `GET /schedules/discrepancies`
- Detecta 3 tipos de incidencia: turno sin jornada (`missing_record`), entrada con más de 30 minutos de retraso (`late_clockin`) y salida con más de 30 minutos de antelación (`early_clockout`)
- Conversión de timestamps UTC a hora local del centro de trabajo con `ZoneInfo`
- Excluye registros corregidos (correcciones de jornada previas) y soporta múltiples turnos el mismo día (mañana + noche)
- Respuesta enriquecida: `planned_start`, `planned_end`, `actual_start`, `actual_end`, `deviation_minutes`
- 8 tests en `test_discrepancies.py`; suite completa: 212 pasando

### ProgramaFichar — Migration 012, Feature A y Feature D
- **Migration 012**: columna `work_center_id` en empleados (FK a `work_centers`) y campos de firma en `EmployeeEquipment` (`signature_status`, `signaturit_id`, `signed_at`)
- **Feature A — Broadcast por centro de trabajo**: `POST /documents/broadcast` acepta filtro `work_center_id`; selector de centro en el frontend `Documents.tsx`; esquemas `EmployeeCreate` y `EmployeeUpdate` exponen `work_center_id`
- **Feature D — EPIs: recibo por email**: al entregar EPIs a un empleado se genera un PDF de recibo con WeasyPrint y se envía por email (Brevo) con enlace de acuse de recibo; endpoint público `GET /employees/equipment/acknowledge/{token}` marca `signature_status=signed` de forma idempotente
- 4 tests nuevos en `test_employees.py`; 23/23 en el módulo; suite: 212 pasando

### ProgramaFichar — Nivel 4: pruebas en navegador
- Prueba manual del CRUD de empleados en producción (`46.225.69.8:5175`)
- Detectados y corregidos 3 bugs:
  - **Bug 1 — NIF sin validación de formato**: añadida validación regex en el schema (DNI `^\d{8}[A-Z]$` / NIE `^[XYZ]\d{7}[A-Z]$`), normalización automática a mayúsculas
  - **Bug 2 — Email sin validación ni unicidad**: validación de formato con `EmailStr` (Pydantic v2) y comprobación de unicidad por empresa en alta y edición (409 si duplicado)
  - **Bug 3 — Kiosk reducer con PIN length de 6 dígitos**: el reducer de `KioskPage.tsx` tenía `state.pin.length === 6` aunque el sistema ya usa PIN de 5; corregido a `=== 5`
- 8 tests nuevos de validación; suite: 241 pasando; 3 commits desplegados en producción

## Estado actual

ProgramaFichar con 14 de 14 especificaciones implementadas, 241/241 tests en verde y tres bugs de validación corregidos en producción. Migrations 011 y 012 pendientes de desplegar en el servidor; hasta que no se apliquen, las features de horarios Excel, alertas de desviación, broadcast por centro y EPIs por email no están activas en producción.

## Pendiente

- Aplicar `alembic upgrade head` en servidor (`46.225.69.8`) para activar migrations 011 y 012
- Verificar que los emails de EPIs no van a spam (dominio `programafichar.com` pendiente de verificar SPF/DKIM en Brevo)
- Completar Nivel 4: probar kiosk con device token y portal del empleado (login, ver fichajes, cambiar PIN)
- Badge `signature_status` en la lista de EPIs del frontend
- Localizar el feedback del responsable de RRHH sobre la demo de la semana anterior
