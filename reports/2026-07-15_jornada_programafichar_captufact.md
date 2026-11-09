---
title: Jornada 15 de julio — ProgramaFichar: arranca la migración a Azure + CaptuFact: lectura de BC y un fallo de pruebas corregido
date: 2026-07-15
project: ProgramaFichar, CaptuFact
type: sesion
---

# Sesión de trabajo — 15 de julio de 2026

## Qué se hizo

### ProgramaFichar — Migración a Azure: conectado y código preparado

Con los accesos a Azure recibidos el día anterior, arrancó el traslado del programa de fichaje desde el servidor provisional al Azure del grupo.

**Fase 0 — Conectar y verificar (completada)**
- Acceso comprobado al espacio de Azure reservado para las aplicaciones del grupo: es un **espacio propio y aislado**, vacío, donde desplegar no afecta a nada de lo que el grupo ya tiene en producción.
- Business Central se queda en su **entorno de pruebas**, tal y como pidió Suitech.
- Se detectó un bloqueo que no depende de nosotros: para crear los servicios en Azure, la suscripción necesita **activar 7 tipos de recursos**, y eso solo puede hacerlo quien administra la suscripción. Se pidió a Suitech por correo.
- Revisión de riesgos: la única conexión del fichaje que escribe en un sistema del grupo es la de Business Central, y nunca se dispara sola. La instalación en Azure arranca **sin ninguna conexión a BC configurada**, así que no puede tocarlo.

**Fase 1 — Unificar el código para Azure (completada)**
- Las distintas líneas de trabajo preparadas para Azure se unificaron en una sola, eligiendo la opción más profesional: aplicaciones en contenedores, **identidad gestionada** y **almacén de secretos** (las claves no viajan dentro del programa).
- **Hallazgo importante, corregido:** montar la base de datos desde cero fallaba, porque cuatro tablas de junio se habían creado fuera del sistema de actualizaciones. En el servidor actual no se notaba, pero una instalación nueva en Azure no habría arrancado. Se corrigió sin afectar a producción y ahora la base de datos se monta entera desde cero.

**Adelantado mientras se espera a Suitech**
- Guion automático para crear toda la infraestructura en Azure.
- Herramienta para trasladar fotos y documentos al almacenamiento de Azure, con modo de ensayo.
- Contenedor de producción más seguro (el programa no corre con permisos de administrador).
- Bloqueo de seguridad: la aplicación **no puede configurarse contra el BC de producción** salvo autorización expresa.
- Se detectó que publicar código de trabajo en el servidor provisional podía provocar un redespliegue de producción; se dejó anotado y no se publicó nada. Copia de seguridad del trabajo guardada aparte.

Todo cubierto con **pruebas automáticas en verde** (403 en el motor y 54 en la interfaz). Producción no se tocó.

### CaptuFact — Lectura de Business Central y un fallo de pruebas corregido

**Lectura de comprobación en BC (sin escribir nada)**
- Revisadas las **943 cuentas** y los **537 proveedores** de MARBORI en el entorno de pruebas. El sistema que identifica al proveedor de cada factura **aguanta bien los datos reales** (CIF con formatos distintos, proveedores sin CIF, CIF incompletos en el maestro). No hizo falta cambiarlo.
- Se eligió provisionalmente una cuenta de gasto genérica como cuenta por defecto. **Falta que Frank o su contable la confirmen.**
- Se comprobó que el permiso para archivar las facturas en SharePoint **ya está concedido** (se retiró esa petición del correo a Suitech).
- Lectura de las facturas con IA: el programa ya puede usar el **Azure OpenAI del propio grupo**, de forma que el texto de las facturas no salga de su entorno. Es solo configuración.
- Correo a Suitech consolidado: activación de recursos de Azure, Azure OpenAI y el permiso de borrado en BC.

**Fallo nuestro, detectado y corregido el mismo día**
- Al pasar las pruebas automáticas, **dos de ellas crearon borradores reales en el BC de pruebas**: el entorno de trabajo tenía las claves de BC cargadas y una prueba no estaba aislada.
- Se comprobó que los borradores están **en el entorno de pruebas, no en producción**.
- Corrección: ahora las pruebas automáticas **retiran cualquier clave de BC antes de ejecutarse**, de modo que ninguna prueba puede volver a tocar el Business Central del grupo. Se añadió una prueba específica que lo vigila.

## Estado actual

ProgramaFichar: migración a Azure con el código listo y verificado; **a la espera de que Suitech active los recursos** de la suscripción para crear la infraestructura.

CaptuFact: lectura de BC verificada con datos reales y pruebas automáticas blindadas. El volcado en vivo sigue parado hasta tener el permiso de borrado.

## Pendiente

- ProgramaFichar: cuando Suitech active los recursos, crear la infraestructura en Azure, desplegar con base de datos vacía y validar; después, traslado de datos y cambio de dirección.
- CaptuFact: borrar a mano en BC los borradores de prueba; respuesta de Suitech sobre el permiso de borrado; confirmación de la cuenta por defecto con Frank o su contable.
- Renovar las claves de acceso a BC antiguas.
