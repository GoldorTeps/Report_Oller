---
title: Jornada 24 de julio — CaptuFact: con Frank se desbloquea Continia y llega a BC la primera factura real con su PDF
date: 2026-07-24
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 24 de julio de 2026

## Qué se hizo

### CaptuFact — Primer borrador real en Business Central, de punta a punta

**Mañana: el maestro de proveedores, preparado a fondo**
- Maestro definitivo de proveedores de Castlexperience: el histórico más los nuevos de la entrada real del día anterior, **comparado con los 537 proveedores que ya existen en MARBORI** para no duplicar ninguno. Resultado: **68 proveedores**, con numeración propia para distinguirlos.
- Revisados uno a uno los formatos que BC exige (CIF sin prefijo de país, sin guiones), los duplicados y la exclusión de la propia Castlexperience como proveedor.
- La importación en BC tropezó con **Continia**, que intercepta cualquier alta o cambio de proveedor y para la que ni la aplicación ni el usuario de desarrollo tenían permiso. Se acordó una sesión remota con Frank, cuyo usuario sí tiene la licencia.
- **Falsa alarma aclarada:** el PDF que parecía no adjuntarse en BC sí estaba adjunto; se ve en el panel lateral de "Datos adjuntos", no en el cuerpo de la factura.
- Se envió a Frank un resumen del estado de CaptuFact.

**Tarde: sesión remota con Frank, todo desbloqueado**
- **Maestro aplicado:** Frank aplicó la importación en el BC de pruebas. Verificado: 68 proveedores completos, sin duplicados y sin el CIF de la propia empresa.
- **Continia, desbloqueado para la aplicación:** Frank dio a la aplicación los permisos de Continia. Ahora CaptuFact puede **crear y modificar proveedores** en BC. Comprobado con una prueba de modificación que antes fallaba y ahora pasa.
- **Acceso completo del usuario de desarrollo** al entorno de pruebas, sin restricción de empresa.

**El circuito cerrado: primera factura real en BC**
- Primer intento: BC rechazó la factura porque al proveedor le faltaban las condiciones de pago, un dato que el maestro no llevaba. Se comprobó que todos los proveedores de MARBORI usan 30 días y se completó ese proveedor desde el programa, ya con el permiso nuevo.
- Segundo intento: **borrador creado en BC con su PDF adjunto** (un solo adjunto, sin restos).
- Circuito completo demostrado: **correo real de Castlexperience → lectura y comprobaciones de CaptuFact → aprobación → borrador en Business Central con el PDF**. Lo que por la mañana parecía imposible hasta el lunes quedó funcionando ese mismo día.

**Un error nuestro, sin consecuencias**
- Al preparar la importación, el maestro se importó por error en la **empresa de producción** de BC. Solo se llegó a importar y validar: **no se dio de alta ningún proveedor real**. Se borraron los paquetes y se comprobó que no quedaba nada.
- De paso quedó confirmado que **la aplicación no tiene acceso a producción**, ni aunque lo intentara: el aislamiento es real.

**Cambio de alcance**
- Castlexperience tendrá **su propio Business Central**, así que sale del alcance del volcado. El trabajo con Frank no se pierde: los permisos y el circuito sirven para cualquier empresa.
- El foco pasa a **MARBORI y Nova Finca**, que son la misma sociedad y comparten CIF (leído directamente de BC). Sus proveedores ya existen en BC, así que no necesitan maestro nuevo.
- Sus buzones de proveedores están migrando a Microsoft (se esperaba que terminara esa noche), así que se decidió esperar a la migración en vez de montar una conexión provisional.

## Estado actual

La cadena completa funciona contra el BC de pruebas, con Continia desbloqueado para la aplicación. Próximo paso: conectar los buzones de MARBORI y Nova Finca cuando termine su migración a Microsoft.

## Pendiente

- Cuando migren los buzones: comprobar el acceso, limitar el permiso de lectura a esos dos buzones y darlos de alta en el programa.
- Actualizar la versión de producción y dejarla en uso real.
- Limpieza opcional en el BC de pruebas de los proveedores y borradores del piloto de Castlexperience.
- Que un adjunto fallido no deje restos al reintentar.
