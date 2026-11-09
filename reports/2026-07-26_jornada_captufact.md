---
title: Jornada 26 de julio — CaptuFact: nueva versión en el servidor, buzones de MARBORI y Nova Finca conectados y panel de control para Frank
date: 2026-07-26
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 26 de julio de 2026

## Qué se hizo

### CaptuFact — De esperar a Microsoft a tener la versión nueva funcionando con facturas reales

El objetivo del día era conectar los buzones de proveedores de MARBORI y Nova Finca. La migración del correo a Microsoft **no había terminado**, pero se dejó todo listo y, al final, la nueva versión quedó funcionando en el servidor con facturas reales.

**Preparado para Microsoft, sin depender de cuándo acabe la migración**
- Configuradas las credenciales para leer el correo por Microsoft.
- Nueva **comprobación de migración**: dice si cada buzón ya está en Microsoft, si aún no ha migrado o si el acceso está denegado. También servirá para verificar que el permiso de lectura queda limitado a los buzones de facturas.
- Resultado: los dos buzones **aún no estaban migrados**.
- Los buzones pueden darse de alta desde el propio programa indicando su tipo de conexión y su empresa.
- Dadas de alta las empresas **MARBORI** y **Nova Finca**, con la protección del CIF propio y su destino en BC.

**Conexión con los buzones actuales: facturas reales desde el primer día**
- En lugar de esperar, se conectaron los dos buzones **tal y como están hoy**. Cuando migren, solo habrá que cambiar el tipo de conexión; el programa no duplicará facturas.
- Primera prueba con un correo real con 7 PDFs: **7 facturas leídas**. Tres completas, dos a revisar por descuadre de importes y dos en las que la **protección anuló el CIF de la propia empresa**, que el lector había tomado por error. Los cuatro proveedores identificados existen ya en BC.
- Una factura de diciembre de 2025 no pudo enviarse porque BC no admite esa fecha en su serie actual: la aprobación queda guardada y el envío se puede reintentar.
- Otra factura de febrero de 2026: **borrador creado en BC con su PDF adjunto**. Es la primera factura real de un buzón definitivo enviada contra un proveedor que ya existía en BC.
- Pendiente de comprobar: en ese borrador BC muestra el importe sin IVA; hay que confirmar si BC lo añade al validar o si el programa debe enviar el desglose.
- El archivado de las facturas en SharePoint queda **apagado a propósito**: se encenderá en otra fase, avisando antes a Frank.

**Perfiles: cada nivel con su vista**
- **Propietario (Frank):** ve y gestiona todo. Entra en un **panel de control** con el resumen por empresa, la actividad reciente, las facturas que esperan su visto bueno (con aprobación directa), los usuarios y el estado del sistema.
- **Administración:** el mismo panel, con menos permisos.
- **Operador (el administrativo del día a día):** la aplicación de siempre. La antigua casilla de "listo" se sustituye por un **botón explícito "Preparar → BC"**, que no toca el estado de pago y se deshabilita, explicando el motivo, si la factura tiene algo por revisar. El envío a BC lo aprueba administración o el propietario.
- **Borrado de usuarios** con salvaguardas: hay que escribir el correo del usuario para confirmarlo, nadie puede borrarse a sí mismo y no se puede borrar al último propietario ni al último administrador.
- **Registro de actividad:** se apuntan las acciones de administración (altas, cambios, borrados de usuarios), sin guardar nunca contraseñas.
- **Fallo corregido:** el historial de auditoría **no mostraba nunca ningún registro**. Ahora muestra la actividad real con su empresa y quién aprobó cada factura.
- **Contraseñas:** cada usuario puede **cambiar la suya** desde el icono de la llave, y administración puede asignar una **contraseña temporal** a quien la haya olvidado. La recuperación por correo ("he olvidado mi contraseña") queda para la semana siguiente.
- Los niveles se ajustaron a cómo trabaja el grupo: el operador prepara, administración (con las empresas que le asigne el propietario) revisa y puede dar de alta proveedores, y Frank lo crea todo. La asignación de empresas a cada administrador y el alta de proveedores desde el programa quedan como fases siguientes.

**Nueva versión en el servidor, esa misma noche**
- **Copia de seguridad completa** antes de tocar nada.
- Actualización con todas las mejoras desde junio. Las actualizaciones de base de datos pendientes se aplicaron limpias.
- Mejora de seguridad: la base de datos y el motor del programa **dejaron de estar accesibles desde fuera** del servidor.
- Creada la cuenta de **propietario para Frank** y las de los dos buzones de proveedores como operadores de su empresa.
- Comprobado tras el despliegue: acceso de Frank como propietario, panel de control funcionando y **entrada real de facturas** (7 nuevas). La revisión automática cada 15 minutos recoge los buzones.
- La persona de administración de Castlexperience **sigue trabajando como siempre** con sus 118 facturas y su buzón de Gmail; su casilla de "listo" es ahora el botón "Preparar → BC". El envío a BC de Castlexperience no se activa hasta que tenga su propio Business Central.
- **Seguridad:** se desactivó una cuenta de demostración que, en la versión nueva, tenía permisos de administrador.
- Se comprobó que los permisos de Azure ya están completos para desplegar allí.
- Se preparó el correo a Frank con el acceso al servidor (sin contraseñas escritas), la recomendación de cambiar la contraseña en el primer acceso y la decisión pendiente: **nombrar a la persona de administración** que aprobará los envíos a BC en su ausencia y llevará el alta de proveedores.

Todo cubierto con **pruebas automáticas en verde** (325).

## Estado actual

CaptuFact, versión nueva **en funcionamiento en el servidor**, con entrada real de facturas de los buzones de MARBORI y Nova Finca, panel de control para el propietario y administración, y envío a Business Central contra el entorno de pruebas. Azure, listo para el traslado.

## Pendiente

- Frank: primer acceso, cambio de contraseña y nombrar a la persona de administración.
- Comprobar el IVA en el borrador de BC (importe sin IVA).
- Procesar el resto de correos con facturas de los buzones de MARBORI y Nova Finca.
- Recuperación de contraseña por correo.
- Auditoría completa de todas las acciones, asignación de empresas a cada administrador y alta de proveedores en BC desde el programa.
- Cuando migren los buzones a Microsoft: cambiar el tipo de conexión y limitar el permiso de lectura a esos buzones.
- Traslado a Azure, con revisión previa.
