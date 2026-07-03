---
title: Jornada 19 de junio — ProgramaFichar (entrega + revisión de calidad) + Gestor Facturas (scope Azure + OAuth BC)
date: 2026-06-19
project: ProgramaFichar, Gestor Mail Facturas
type: sesion
---

# Sesión de trabajo — 19 de junio de 2026

## Qué se hizo

### ProgramaFichar — Restauración del servicio y revisión de calidad

**Fix urgente de producción**
- La sesión anterior había dejado el backend caído en producción por un identificador de migración de 34 caracteres que superaba el límite de 32 del control de versiones.
- Se acortó el identificador de la migración `016_refresh_token_employee_cascade` a 22 caracteres, se commiteó y se desplegó. Producción volvió a levantar.

**Revisión de calidad y hardening del código**
- Revisión milimétrica completa del código, frontend y backend, antes de la entrega.
- **20 hallazgos detectados y corregidos** (5 en frontend, 15 en backend). Entre ellos, un bug de navegación que impedía a los empleados entrar al portal:
  - La ruta `/portal/login` no existía en el enrutador: los empleados no podían iniciar sesión. Añadida.
  - Todos los roles se redirigían al panel de administración; los empleados entraban en un bucle de rechazo. Corregida la redirección por rol (super admin, empleado y resto a su destino correcto).
- El resto de correcciones fueron mejoras internas de mantenibilidad y consistencia: eliminación de código muerto y de importaciones redundantes, nombres explícitos para valores literales (día en milisegundos, mínimo legal de descanso de 12 h), unificación de etiquetas duplicadas en un módulo compartido, y limpieza de comentarios obsoletos.
- Resultado: **261/261 tests en verde**, TypeScript sin errores, despliegue correcto en producción.

### ProgramaFichar — Entrega a RRHH

La fase de demostración quedó cerrada. El sistema pasa a ser un producto entregable para que RRHH lo use durante los primeros días, termine de configurarlo y realice las primeras evaluaciones.

**Informe de entrega y credenciales**
- Se generaron dos documentos profesionales (`informe_entrega_v1.docx` y `credenciales_demo.docx`): tipografía Calibri, cabeceras de tabla en azul marino, filas alternadas, PINs y contraseñas en monoespaciado y todas las URLs como hipervínculos clicables.
- El documento de credenciales recoge los accesos de las dos empresas de evaluación (Construcciones Martínez y Clínica San Rafael): administradores, supervisores, empleados con sus PINs y portal del empleado.
- El informe de entrega se depuró como documento técnico limpio de cara al cliente: se sustituyeron valoraciones internas por hechos concretos (cinco revisiones independientes, 265 tests en verde, sin hallazgos bloqueantes) y se reescribió el copy en tercera persona.
- La sección de alcance se reorientó a lo único relevante: el cumplimiento de la normativa de registro horario (RDL 8/2019), por qué la integración directa con la Inspección de Trabajo (ITSS) no está incluida todavía —su API no está publicada aún— y cómo se añadiría en cuanto exista.

**Demo verificada end-to-end en producción**
- Panel de administración: acceso correcto.
- Kiosco: fichaje con PIN de empleado correcto.
- Alta de empleado → generación de PIN → fichaje en kiosco correcto.
- Portal del empleado: acceso correcto.

**Email de presentación** redactado para el cliente, adjuntando ambos documentos y dando acceso al sistema.

### Gestor Mail Facturas — Entrada manual e integración Business Central

**Entrada manual de facturas**
- Completado el modal de alta manual con los tres campos que faltaban: beneficiario, modo de pago y marca de contabilizado (`is_accounted`).
- El backend ya persiste esos campos al crear una factura manual.

**Concesión OAuth2 con Business Central**
- Implementada toda la capa de autenticación con Azure AD, lista para el momento en que el cliente entregue sus credenciales.
- Backend: servicio de obtención de token y de consulta de empresas de BC, endpoints de configuración y de prueba de conexión, nuevo modelo de configuración y migración de base de datos (tabla `bc_configs`).
- Frontend: nueva pestaña "Business Central" en la configuración, con formulario (Tenant ID, Client ID, Client Secret, entorno) y botón "Probar conexión" que devuelve la lista de empresas del cliente.
- **5 tests unitarios** de la capa BC (token OK y error de autenticación, consulta de empresas OK, sin permiso y resultado vacío), todos en verde en el contenedor final.
- Migración ejecutada automáticamente al arrancar. Backend y frontend reconstruidos y desplegados.

### Gestor Mail Facturas — Clarificación de alcance e infraestructura Azure

Sesión de estrategia (sin código) para fijar el papel real del Gestor de Facturas dentro del cliente:
- El cliente gestiona 13 empresas y ha contratado Microsoft Business Central como sistema de trabajo. Lo primero que quiere ver en BC son sus facturas.
- El Gestor de Facturas queda definido como el **alimentador de BC**: captura → clasifica → envía a Business Central como borrador. La contabilización final la hace el responsable dentro de BC. La marca `is_accounted` significa "ya enviado a BC". Este flujo sustituye a un módulo externo que el cliente pagaba a 8.000 €/año.
- **Arquitectura de infraestructura decidida** para alojar la suite de forma ordenada: base de datos separada por aplicación, entornos de desarrollo y producción, plataforma de contenedores compartida y dominio propio por sistema.
- Lista de recursos Azure a solicitar: suscripción propia, registro de contenedores, entorno de contenedores (dev + prod), base de datos PostgreSQL gestionada, almacén de claves por entorno, almacenamiento de objetos y dominios. Coste estimado de infraestructura: 150-300 €/mes.

## Estado actual

ProgramaFichar entregado a RRHH y estable en producción (`http://46.225.69.8:5175`), con 261/261 tests en verde, revisión de calidad completa y documentación de entrega y credenciales lista. Gestor Mail Facturas incorpora el alta manual completa y toda la capa de conexión con Business Central (5/5 tests en verde), a la espera únicamente de las credenciales del cliente para probar la conexión real. El papel del Gestor como alimentador de BC y la infraestructura Azure objetivo quedan definidos.

## Pendiente

- **ProgramaFichar:** monitoreo de 48 h tras el arranque con usuarios reales e informe de estabilidad al cierre; recoger feedback de los responsables y de RRHH.
- **ProgramaFichar:** configurar Business Central con las credenciales del cliente cuando las aporten y completar la verificación del dominio de envío de emails (SPF/DKIM).
- **ProgramaFichar (mejoras v1.1, sin urgencia):** endpoint de reinicio de contraseña de administrador por email, tests de la integración BC con mocks y protección de errores en el frontend.
- **Gestor Facturas:** recibir credenciales del cliente (Tenant ID, Client ID, Client Secret y nombre del entorno) y probar la conexión real desde Configuración → Business Central.
- **Gestor Facturas:** siguiente fase de la integración — mapeo de las 13 empresas al beneficiario de cada factura y endpoint de envío de facturas de compra a BC.
- **Gestor Facturas:** confirmar con el cliente la suscripción Azure disponible; ampliar la cobertura de tests del resto del proyecto antes de producción.
