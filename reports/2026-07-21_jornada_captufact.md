---
title: Jornada 21 de julio — CaptuFact: vuelve la entrada de facturas en producción, nueva aprobación y maestro de proveedores para BC
date: 2026-07-21
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 21 de julio de 2026

## Qué se hizo

### CaptuFact — Producción recuperada y un paso más hacia Business Central

**La entrada de facturas vuelve a funcionar en producción**
- Suitech respondió: los recursos de Azure ya están activados, se trabajará sobre su suscripción, y el permiso que impedía borrar en BC está cubierto por el conjunto de permisos que ya tiene la aplicación.
- Se comprobó que **el correo de Castlexperience sigue llegando a Gmail**: la migración a Microsoft está en curso, pero aún no se ha hecho el cambio.
- Con la nueva contraseña de aplicación del buzón, probada antes desde fuera, se actualizó **solo esa credencial** en producción. Sin actualizaciones de base de datos y sin riesgo para los datos.
- Verificado en el momento: **13 correos procesados, 2 facturas nuevas, ningún error**. La revisión automática cada 15 minutos ya usa la credencial nueva sin reiniciar nada.
- Para el cambio a Microsoft, se dejó **solicitado (sin conceder)** el permiso de lectura del correo en la aplicación del grupo, y se envió a Suitech la petición, limitada al buzón de facturas y solo de lectura. Se comprobó después que **Suitech no puede concederlo**: lo tiene que hacer un administrador del grupo.

**Aprobación de facturas, más clara**
- Aprobar una factura y enviarla a BC son ahora **dos cosas distintas**: la aprobación queda guardada aunque el envío a BC falle, y se puede reintentar el envío sin volver a aprobar.
- Cada factura muestra su estado: **Sin aprobar / Aprobada / En BC**. El remitente pasa a la ficha de detalle, como se había pedido.

**Ensayo de la actualización de producción, sobre una copia**
- Con una copia de la base de datos de producción, en local y aislada, se aplicaron las **16 actualizaciones pendientes**: todas limpias sobre datos reales. La actualización de producción queda ensayada.
- Las facturas se repartieron solas por empresa, y la persona de administración de Castlexperience verá las suyas.
- Hallazgo: **solo 9 de los 119 proveedores de Castlexperience existen en el maestro de MARBORI**. Es una decisión para Frank: a qué sociedad van esas facturas y si se dan de alta los proveedores.

**Maestro de proveedores para BC**
- Al preparar el listado salió un fallo real del lector: en facturas de **proveedores extranjeros** tomaba el CIF del comprador (Castlexperience) como si fuera el del proveedor. Se añadió una **protección**: si el CIF leído es el de la propia empresa, se anula y la factura pasa a revisión. Nunca se crea un proveedor falso.
- El lector ahora recoge la **ficha completa del proveedor**: dirección, ciudad, código postal, provincia, país, teléfono y correo. Las facturas nuevas ya entran con esos datos.
- Entregable: maestro de **67 proveedores** con el formato de importación de BC (40 con CIF, 62 con dirección), sin CIF inventados, con los extranjeros y dudosos marcados y los grupos contables en blanco para el contable.

Todo cubierto con **pruebas automáticas en verde** (252).

## Estado actual

Producción vuelve a recoger facturas cada 15 minutos. La nueva versión, con aprobación y ficha completa del proveedor, está lista y su actualización ensayada sobre datos reales. Se avisó a Frank de que CaptuFact está lista para conectarse a su BC.

## Pendiente

- Frank: sociedad de destino de las facturas de Castlexperience, alta de proveedores (fichero preparado) y cuenta contable por tipo de gasto.
- Actualizar producción con la versión nueva, con copia de seguridad y revisión previas.
- Cuando termine la migración del correo: que un administrador del grupo conceda el permiso de lectura, limitado al buzón de facturas.
- Reforzar la protección de las credenciales del buzón en la base de datos.
- Mejora de fondo del lector para distinguir proveedor y comprador.
