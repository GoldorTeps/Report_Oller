---
title: Jornada 17 de junio — ProgramaFichar (datos demo + seguridad del portal) + Gestor Facturas (integración BC)
date: 2026-06-17
project: ProgramaFichar, Gestor Mail Facturas
type: sesion
---

# Sesión de trabajo — 17 de junio de 2026

## Qué se hizo

### ProgramaFichar — Seguridad del portal del empleado

**Problema detectado**
- El portal del empleado autenticaba con email + PIN del kiosk. Como el PIN es un dato compartido en el punto de fichaje, cualquier compañero que conociera el email y el PIN de otro podía entrar a ver sus fichajes. Bloqueante crítico: no podía salir la demo sin corregirlo.

**Nuevo modelo de acceso con contraseña propia**
- Migración de base de datos (015): nueva columna `portal_password_hash` en la tabla de empleados. Aplicada automáticamente en producción durante el despliegue.
- `POST /auth/employee-login` reescrito: ahora acepta email + contraseña. Si el empleado todavía no tiene contraseña de portal, devuelve una respuesta específica de "requiere configuración" en lugar de un error de credenciales.
- `POST /auth/employee-setup` (nuevo): flujo de primer acceso. Verifica el PIN del kiosk, permite establecer una contraseña propia y emite la sesión.
- `PATCH /employees/me/change-password` (nuevo): cambio de contraseña desde el portal, con validaciones (mínimo 8 caracteres, no puede coincidir con la actual y exige la contraseña vigente).

**Frontend del portal**
- Página de login reescrita. Modo login con email + contraseña. Si el empleado aún no tiene contraseña configurada, la pantalla pasa automáticamente al modo de primer acceso: PIN del kiosk + creación de contraseña con confirmación, con opción de volver al login.

**Cobertura de tests**
- Reescritos los tests de login de empleado para el nuevo esquema email + contraseña.
- Añadidos tests del flujo de primer acceso (correcto, PIN incorrecto, contraseña demasiado corta y respuesta de "requiere configuración").
- Añadidos 5 tests de cambio de contraseña (correcto, contraseña actual incorrecta, igual a la actual, demasiado corta y sin sesión).
- Corregidos dos tests desalineados con el backend (tipo de incidencia de descanso mínimo y campo obsoleto en el test de límite de peticiones).
- **Suite completa: 259/259 tests en verde.**

**Despliegue**
- Publicado en el servidor de producción con la migración 015 aplicada correctamente.

### ProgramaFichar — Limpieza y datos de demostración

- Reescrito el script de preparación de datos de demo (`fix_demo_data.py`) para dejar el entorno de producción listo y reproducible.
- Eliminados dos empleados de prueba con datos basura. La detección se hace por patrón (nombres con caracteres inválidos) en lugar de por identificadores fijos, para que sea más robusta ante futuras limpiezas.
- Eliminado un token de dispositivo de prueba usado durante depuración. Se resolvió antes una dependencia de integridad referencial (los fichajes que lo referenciaban) para poder borrarlo sin romper datos.
- Empleado de demostración (Carlos Rodríguez) restaurado: email operativo, PIN de kiosk y contraseña de portal preconfigurada, con las jornadas abiertas cerradas para una demo limpia. Esto permite mostrar tanto el acceso directo con contraseña como el flujo de primer acceso creando un empleado nuevo.
- Cuenta de administración de la empresa de demostración corregida: pasa de super administrador sin empresa asignada a administrador de empresa correctamente vinculado a Construcciones Martínez SL.

### Gestor Mail Facturas — Integración con Microsoft Business Central (propuesta)

**Origen y alcance**
- Un cliente ("Tráfico") ha planteado integrar el Gestor de Facturas con su ERP Microsoft Business Central. El cliente ya tiene Business Central activo, con licencias y la API habilitada.
- Objetivo: que las facturas procesadas por el Gestor se envíen automáticamente a Business Central. La integración sustituye a una solución de terceros que hace exactamente lo mismo (captura e introducción de facturas) y que cuesta al cliente unos 8.000 €/año.
- Arquitectura acordada: son 13 empresas dentro de un mismo contrato/tenant, lo que permite una única autenticación con Azure AD y enrutar cada factura a la empresa correspondiente por el nombre de empresa en la petición. Es la opción más sencilla y directa de las dos posibles.

**Documento para el cliente**
- Elaborada una propuesta de una página, en lenguaje de negocio (sin tecnicismos), que explica las fases del trabajo, qué se necesita del cliente para arrancar y el plazo estimado, dejando margen para pruebas e imprevistos.
- Entregada en Markdown y en PDF limpio para su envío.
- Plazo comunicado al cliente: **dos semanas desde que entregue el acceso al entorno de pruebas de Business Central.**

**Información que se requiere del cliente para empezar**
- Credenciales de Azure AD (client ID, client secret, tenant ID).
- Acceso al entorno de pruebas (sandbox) de Business Central — el plazo empieza a contar desde ese momento.
- Nombres exactos de las 13 empresas en Business Central.
- Export de la ficha de proveedores desde Business Central (para el mapeo).

## Estado actual

ProgramaFichar con 259/259 tests en verde y desplegado en producción: el portal del empleado ya usa contraseña propia (con flujo de primer acceso vía PIN) y el entorno de demostración está limpio y listo. Gestor Mail Facturas operativo; la integración con Business Central queda a la espera de que el cliente entregue credenciales y acceso al sandbox para iniciar el desarrollo.

## Pendiente

- ProgramaFichar: verificar el dominio `programafichar.com` (SPF/DKIM) para asegurar la entrega de emails de nóminas en bandeja de entrada.
- ProgramaFichar: revisión final de calidad y seguridad del código antes de la demo (Nivel 6).
- Gestor Facturas: recibir del cliente credenciales de Azure AD y acceso al sandbox de Business Central para arrancar el desarrollo.
- Gestor Facturas: confirmar con el cliente en la reunión si las facturas deben crearse como borradores o contabilizadas directamente en Business Central.
- Gestor Facturas: incorporar cobertura de tests a todo el código nuevo de la integración.
