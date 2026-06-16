---
title: Jornada 16 de junio — ProgramaFichar Nivel 4 + Gestor Facturas
date: 2026-06-16
project: ProgramaFichar, Gestor Mail Facturas
type: sesion
---

# Sesión de trabajo — 16 de junio de 2026

## Qué se hizo

### Gestor Mail Facturas — Restauración del servicio

**Problema 1 — Sincronización IMAP fallando desde el 11/06**
- Causa: la app password de Google Workspace había sido revocada
- Solución: generación de nueva app password desde `admin.google.com` con la cuenta `victor@castlexperience.com` como administrador del Workspace
- Actualización en base de datos de producción vía SQL
- Resultado: sincronización restaurada, 22 emails procesados, 3 facturas nuevas creadas

**Problema 2 — Login del dashboard bloqueado**
- `admin@castlexperience.com` y `goldorteps@gmail.com` no podían autenticarse
- Causa: al resetear la contraseña vía SSH directamente con SQL, los `$` del hash bcrypt fueron interpretados como variables de shell, corrompiendo el hash
- Solución: hash generado dentro del contenedor backend con `docker exec` y volcado como SQL limpio
- Estado final: `Victorjanerperez@gmail.com` y `admin@castlexperience.com` con acceso operativo; cuenta de prueba `goldorteps@gmail.com` eliminada

---

### ProgramaFichar — Nivel 4: flujo completo en producción

**Migrations en producción**
- Verificado: migrations 011 y 012 ya estaban desplegadas (`alembic current` → 012 head)
- Migration 013 creada e instalada: `documents.uploaded_by_user_id` convertido a nullable (fix de crash al subir nóminas con cuenta super_admin)

**Kiosk — testing completo**
- PINs actualizados de 6 a 5 dígitos en toda la base de datos de demostración (empresas Martínez y San Rafael)
- Prueba del flujo completo de kiosk: configuración con device token, pantalla de setup, fichaje con PIN de 5 dígitos
- 4 acciones registradas y verificadas en DB: `clock_in → pause_start → pause_end → clock_out`
- Dashboard admin: jornadas de Carlos Rodríguez visibles y correctas
- Detalle visual: texto del footer del kiosk aumentado (`text-xs` → `text-sm`) para mayor visibilidad del truco de reconfiguración por 5 clicks

**Parser de nóminas PDF**
- Detectado bug de extracción: nombres con espacios rotos (`GONZA LEZ, AINHOA`) al parsear PDFs reales del cliente
- Fix: cambio de `page.extract_text()` a `page.extract_text(extraction_mode="layout")` en `pdf_payroll_parser.py`
- Resultado: 43/43 páginas del PDF real del cliente parseadas con nombres correctos

**Integración de email (Brevo)**
- BREVO_API_KEY configurada en el servidor (`/opt/programafichar/.env`) y añadida al `docker-compose.server.yml` para futuros deploys
- 3 emails de nóminas aceptados por Brevo (HTTP 201) en prueba con PDF real del cliente
- Dominio remitente `noreply@programafichar.com` pendiente de verificación SPF/DKIM (posible clasificación como spam hasta entonces)

---

### ProgramaFichar — Mejoras de calidad y cobertura

**Renombrado `signaturit_id` → `receipt_token`**
- El campo se usa como token propio de acuse de recibo, no como integración con Signaturit; el nombre anterior era engañoso
- Migration 014 creada: `alter_column signaturit_id → receipt_token` + `UniqueConstraint`
- Actualizado en modelo, endpoint y tests

**Rate limiting en endpoint público de acknowledge**
- Añadido `@limiter.limit("20/minute")` al endpoint `GET /employees/equipment/acknowledge/{token}`
- Test estructural que verifica la presencia del decorador sin necesidad de alcanzar el límite real

**Tests del portal del empleado** (8 tests nuevos en `test_employee_portal.py`)
- Listado de documentos propios, aislamiento entre empleados, descarga de archivo propio, intentos no autorizados (401/403), documento inexistente (404)

**Tests de broadcast por centro de trabajo** (2 tests nuevos en `test_schedules_documents.py`)
- Broadcast con `work_center_id` entrega solo a empleados de ese centro
- Centro sin empleados devuelve 422

**Script `tools/fix_demo_data.py`**
- Elimina empleados de prueba duplicados (IDs 41, 42, 43) y restaura email y PIN demo de Carlos Rodríguez
- Ejecutar en servidor antes del siguiente browser test completo

**Suite al cerrar:** 252 tests, todos pasando

---

## Estado actual

Gestor Mail Facturas restaurado al 100%: IMAP sincronizando, dashboard accesible. ProgramaFichar con 252/252 tests en verde, kiosk y dashboard verificados en producción. Emails de nóminas llegando a Brevo; falta verificar dominio SPF/DKIM para asegurar la entrega en bandeja. Migration 014 en código, pendiente de desplegar en servidor junto con la limpieza de datos demo.

## Pendiente

- Verificar dominio `programafichar.com` en Brevo (DNS SPF/DKIM) para garantizar entrega de emails
- Ejecutar `fix_demo_data.py` en servidor: limpiar empleados 41/42/43, restaurar Carlos email + PIN
- Desplegar migration 014: `docker compose exec backend alembic upgrade head`
- Completar Nivel 4: probar portal del empleado en browser (login, ver fichajes, cambiar PIN)
- Revisión de seguridad sobre el código nuevo antes de la siguiente demo
- `VICTOR_API_KEY=changeme` en producción de Gestor Facturas pendiente de rotación (histórico)
