---
title: Jornada ProgramaFichar — Sistema de mensajes + cumplimiento regulatorio + integración BC + deploy Azure
date: 2026-06-08
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 8 de junio de 2026 (lunes)

> **Nota:** Jornada incompleta. Se ausentó 3 horas por cita médica. El trabajo pendiente correspondiente a ese tiempo se integrará en las próximas sesiones.

---

## Qué se hizo

### Sistema de mensajes asíncrono empleado ↔ empresa

Implementado y desplegado en producción el módulo de comunicación interna. El diseño es deliberadamente asíncrono (tipo bandeja de entrada, no chat): los mensajes tienen asunto obligatorio, se muestran en bloques apilados con cabecera de autor y fecha, y el estado del hilo es visible en todo momento.

Se añadió una **capa de integridad criptográfica** orientada a uso como prueba documental en procedimientos laborales:
- Mensajes inmutables por diseño (sin endpoints de edición ni borrado)
- Hash SHA-256 por mensaje calculado sobre campos críticos (hilo, empresa, empleado, cuerpo, timestamp)
- Registro de lectura con timestamp (`read_at`) en cada mensaje
- Endpoint de exportación JSON con el `hash_input` incluido, verificable por perito de forma independiente

Incluye vista de admin con panel split (lista de hilos + detalle), badge de mensajes no leídos con refresco automático, y botones de exportar/cerrar/reabrir hilo. La vista del empleado está integrada en el mismo área de su portal personal (misma barra de pestañas que fichajes, ausencias y horas extra).

Verificado con suite Playwright: 14/14 checks superados, incluyendo flujo completo empleado → admin → respuesta → visualización, integridad del hash SHA-256 y export JSON.

---

### Módulo de documentos — verificación y cierre

La verificación del módulo de gestión documental (implementado en sesión anterior) quedó incompleta. Se cerró con 22 checks superados y 0 fallos.

Causa raíz de los 5 fallos anteriores: el test subía documentos al empleado id=12 pero el portal usaba el empleado id=1 — empleados distintos, documentos no visibles. Corregido junto con un fix de producción crítico (orden de rutas en FastAPI: `/mine` declarado antes de `/{doc_id}` para evitar que FastAPI interprete "mine" como identificador).

---

### Análisis de gaps y correcciones funcionales

Revisión exhaustiva del sistema frente a aplicaciones de RRHH del mercado (Sesame, Factorial, Bizneo). Se identificaron y corrigieron los principales huecos:

**Bugs activos corregidos:**
- `_count_working_days` hardcodeaba lunes-viernes en lugar de usar la máscara de jornada laboral de cada empresa. Corregido con helper `_get_working_days_mask` que carga la configuración real.
- `work_center_id NOT NULL` hacía crashear el kiosko en empresas sin centros de trabajo configurados. Cambiado a nullable en modelos y migración.

**Funcionalidad añadida:**
- Campo `email` en el empleado (requerido para Signaturit y notificaciones)
- Servicio de email vía Brevo (HTTP/httpx): plantillas para ausencia aprobada/rechazada, documento subido, mensaje recibido, jornada corregida y reset de PIN. Sin clave configurada: no-op silencioso, no rompe en desarrollo.
- Endpoint `POST /employees/{id}/reset-pin` con generación de PIN único, reseteo de bloqueo, registro en log de auditoría y envío por email si el empleado tiene email registrado.
- Endpoint `GET /reports/mine/csv` para que el empleado descargue su propio registro de jornada (derecho de acceso — RDL 8/2019 Art. 34.9 ET).
- CRUDs completos de departamentos, festivos y centros de trabajo.

---

### Frontend — alertas, reset de PIN, configuración y PWA

Sobre la base de la API añadida:

- **Dashboard**: panel de alertas con refresco cada 60 segundos — ausencias pendientes de aprobar, solicitudes de compensación pendientes, jornadas abiertas de días anteriores (en rojo, distinción de urgencia).
- **EmployeeModal**: tab Datos muestra email y fecha del último cambio de PIN; botón "Resetear PIN" con display del nuevo PIN (una sola vez, con aviso) y botón copiar.
- **Settings**: secciones de Departamentos y Festivos con gestión inline completa. Los festivos nacionales (cargados automáticamente) aparecen en gris sin botón de borrado; los festivos propios de la empresa muestran botón de borrado.
- **Portal del empleado**: botones de descarga del CSV personal para el mes en curso y el mes anterior.
- **PWA**: `manifest.json` básico con nombre, `start_url`, display standalone y color de tema.

---

### Correcciones regulatorias y de calidad

Revisión line-a-línea del código aplicando criterios de cumplimiento (RDL 8/2019, LOPDGDD/RGPD, Art. 35 ET):

- Nuevo `constants.py` — centraliza constantes antes duplicadas en varios módulos: eventos de pausa/descanso/viaje, límites de intentos de login, lockout.
- Bloqueo de PIN por fuerza bruta: 5 intentos fallidos → bloqueo de 15 minutos. Reinicio en acceso correcto.
- `kiosk.py` reescrito: timezone fix (usa la zona horaria configurada en la empresa, no UTC del servidor), auto-cierre de jornadas abiertas de días anteriores con registro en log de auditoría como actor "system".
- `reports.py` reescrito: CSV exporta una fila por evento en lugar de por jornada (trail de auditoría conforme a RDL 8/2019), horas en timezone de la empresa.
- Verificación del límite anual de 80 horas extra por empleado (Art. 35 ET) antes de aprobar horas extra.
- FKs añadidas a `audit_log`, `messages` y `documents` (con NOT VALID para no bloquear la BD existente).
- Row Level Security habilitado en las 3 nuevas tablas de integración BC.

---

### Deploy y prueba del servidor

Resolución del conflicto de migraciones Alembic: la base de datos del servidor tenía el schema completo de migraciones 001-003 creado manualmente sin tracking. `alembic upgrade head` fallaba con `DuplicateTableError`. Solución: `alembic stamp 003` + `upgrade head` para aplicar solo las migraciones nuevas (004 y 005).

Verificación completa de 19 endpoints en el servidor (`46.225.69.8`). Un bug detectado y corregido en producción durante las pruebas: `PATCH /absences/{id}/reject` no seteaba `approved_by` ni `approved_at`, violando el check constraint de la base de datos. Parcheado y redesplegado.

---

### Integración Business Central — diseño y primeras implementaciones

**Webhook Signaturit**: verificación de firma HMAC-SHA256 del raw body con el header `X-Signaturit-Signature`. Configurable por variable de entorno; sin clave configurada acepta cualquier petición (desarrollo).

**Festivos nacionales España**: 10 festivos (con Viernes Santo calculado mediante algoritmo de Meeus/Jones/Butcher). Endpoint `POST /companies/holidays/seed-national?year=YYYY`. Cargados los de 2026 en la empresa demo.

**Diseño completo de integración BC** — presentado y acordado antes de implementar:

| Flujo | Dirección | Trigger |
|---|---|---|
| Empleados | BC → PF | Diario / manual (BC es el maestro) |
| Horas trabajadas | PF → BC | Cierre de mes / manual por rango |
| Ausencias aprobadas | PF → BC | Tras aprobación / manual |

Tablas nuevas: `bc_integrations` (credenciales AES-256-GCM cifradas por empresa), `bc_sync_logs`, `bc_time_exports`. Pendiente de implementación hasta confirmar tres puntos con el cliente: módulo HR de BC, coincidencia de identificadores de empleado y entorno (producción o sandbox).

**Git push-to-deploy**: configurado bare repo en el servidor con hook `post-receive` que aplica migrations y reconstruye los contenedores automáticamente en cada `git push server main`.

---

### Revisión independiente de código — 6 issues críticos corregidos

Se lanzó un agente sin contexto para revisar el código de la integración BC, Signaturit y festivos. El agente detectó 15 issues. Se aplicaron los 6 más importantes:

| Severidad | Issue | Acción |
|---|---|---|
| Crítico | `decrypt_secret` no capturaba `InvalidTag` (clave rotada → excepción silenciosa) | Corregido |
| Crítico | `BCTimeExport.jornada_id` declarado como `Integer` pero el campo es `UUID` en BD | Corregido |
| Alto | `approved_days` nunca asignado → BC recibía `quantity: 0.0` en todas las ausencias | Corregido |
| Alto | Sin RLS en las 3 tablas nuevas de BC (migración 007) | Corregido |
| Medio | Sin toggle `enabled` en formulario BC — siempre se activaba al guardar | Corregido |
| Bajo | `import json` sin usar en `bc_sync.py` | Eliminado |

Migración 007 aplicada automáticamente en el servidor vía hook post-receive.

---

### Pipeline Azure — deploy CI/CD

Preparación completa para deploy en Azure App Service cuando el cliente facilite credenciales:

- **Health check real** (`/health`): ejecuta `SELECT 1` contra la BD; devuelve 503 si la BD no responde.
- **`entrypoint.sh`**: corre `alembic upgrade head` antes de arrancar uvicorn, en cada deploy. Uvicorn hereda PID 1.
- **`nginx.conf.template`**: URL del backend configurable por variable de entorno (`${BACKEND_URL}`), compatible con Docker Compose local y Azure App Service.
- **`docker-compose.azure.yml`**: override de referencia para Azure (excluye servicio `db`, usa imágenes del ACR).
- **`.github/workflows/azure-deploy.yml`**: pipeline completo — push a main → build backend + frontend → push a Azure Container Registry con tag SHA + `latest` → deploy en App Service.

---

## Estado actual

- Servidor `46.225.69.8`: backend `:8002` y frontend `:5175` operativos.
- Alembic: migración `007 (head)`.
- Suite de verificación Playwright: 14/14 (mensajes) + 22/22 (documentos).
- Branch `main`. Deploy automático por `git push server main`.

---

## Pendiente

**Requiere información del cliente:**
1. Credenciales Azure (tenant_id, client_id, client_secret, bc_company_id) para activar y probar la integración BC.
2. Confirmar si el cliente tiene el módulo HR de Business Central (ausencias/vacaciones) o solo Finance.
3. Confirmar que `employee_number` en ProgramaFichar coincide con `number` en BC.
4. Confirmar entorno BC para primeras pruebas (production o sandbox).
5. API key Brevo + remitente para activar notificaciones por email.

**Técnico pendiente:**
6. Retry ante error 401 en llamadas BC (token expirado a mitad de paginación OData).
7. Confirmar formato exacto del header Signaturit (`sha256=<hex>` vs `<hex>` puro) antes de activar en producción.
8. Iconos PWA (`icon-192.png`, `icon-512.png`) para "Añadir a pantalla de inicio".
9. Anonimización RGPD: lógica para borrar datos de empleados dados de baja (`anonymized_at` existe en el modelo, sin lógica aún).
10. Retención de datos: purga de jornadas con más de 4 años (RDL 8/2019).
