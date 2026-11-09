---
title: Jornada 10 de octubre — ProgramaFichar: la tablet ficha aunque se caiga el servidor y horario por departamento · CaptuFact: el lote de aprobación ya no se corta
date: 2026-10-10
project: ProgramaFichar, CaptuFact
type: sesion
---

# Sesión de trabajo — 10 de octubre de 2026

## Qué se hizo

### ProgramaFichar — «¿Qué pasa cuando esto se cae?»

Antes de seguir con funciones nuevas se midió qué protección había de verdad si el fichaje dejaba de responder. Resultado: ninguna alerta configurada, sin comprobaciones automáticas de salud en Azure, una restauración de copia nunca ensayada y, lo más serio, **si la tablet no conectaba con el servidor, el fichaje se perdía**.

**Vigilancia cada 5 minutos**
- Una comprobación externa revisa el fichaje cada 5 minutos y distingue si lo que falla es la base de datos, el servidor o la web. A los dos fallos seguidos avisa a soporte, recuerda cada media hora y avisa al recuperarse con la duración, para que RR. HH. sepa qué rato revisar. Probada con una caída simulada.

**Comprobaciones de salud en Azure**
- Azure comprueba ahora por sí mismo que el servidor y la web están vivos y los reinicia si no. Aplicado sin cortar el servicio en ningún momento.

**La tablet ficha aunque el servidor no conteste**
- Si no hay conexión, la tablet **guarda el fichaje con su hora**, enseña una pantalla ámbar de «guardado» y lo reenvía sola en cuanto vuelve la conexión, sin duplicarlo. El servidor registra la hora real del fichaje y también cuándo llegó.
- Si un fichaje guardado no se puede aceptar (por ejemplo, de hace más de 72 horas), queda en la auditoría y sale en el correo de las 9 para revisarlo en Fichajes.
- Pruebas automáticas en verde: más de 1.000 en el motor y 274 en la interfaz. **Control de calidad superado.** La migración se ensayó en una copia desechable, y ese ensayo destapó un fallo que se corrigió antes de subir. Punto de recuperación guardado antes del despliegue.
- **Importante:** cada tablet tiene que cerrar y volver a abrir la aplicación del kiosco para cargar la versión nueva. Hasta entonces sigue como antes.

**Hoja de continuidad para RR. HH.**
- Borradores de la hoja de continuidad (horario de soporte, tiempo de respuesta y la frase clave: *si la tablet da error, ese fichaje no se ha guardado*) y de una hoja de fichaje en papel para tener junto a las cinco tablets. Pendientes de leer antes de enviarlos a Marc, con Frank en copia.

**Cambiar el horario de un departamento entero (primer punto de Frank)**
- De los tres puntos que pidió Frank el 8 de octubre se ordenaron de más fácil a más difícil: horario por departamento, canal de grupo con acuse y calendario por áreas con supervisor. Se hizo el primero.
- **Configuración → Horarios → «Asignar a un departamento»:** se elige departamento, horario y fecha; «Ver quién cambia» enseña la lista con el horario actual de cada persona y se puede desmarcar a quien no. Todo o nada: si una persona no puede cambiar, no cambia nadie y se dice por qué. Cada cambio queda en la auditoría.
- **Se encontró que el panel ni enseñaba ni dejaba editar el departamento de cada persona**; ahora se ve y se cambia desde la ficha, y la lista de empleados se puede filtrar por departamento.
- Consulta de solo lectura en producción: **en las seis empresas no hay todavía ningún departamento, ningún horario ni ninguna asignación**. Para que esto (y los avisos de pausa y Regularizar) sirva, RR. HH. tiene que crear primero los horarios y los departamentos.
- Pruebas automáticas en verde. Desplegado pasada la medianoche y verificado.

### CaptuFact — El correo de Frank: el lote de aprobación y Heretat

Frank aprobó unas 700 facturas el 9 de octubre por la tarde; entraron 469 en Business Central y el lote se cortó con un error.

**El lote: un fallo nuestro**
- Cuando Business Central rechazaba una factura que se volvía a intentar, la siguiente del lote fallaba con un error interno. **Corregido:** cada factura va por separado, un rechazo ya no arrastra a las demás y el motivo de Business Central sale en castellano, diciendo qué campo de qué ficha falta.
- **Aviso inmediato a soporte** cuando la aplicación da un error interno, sin datos del cliente.
- Revisión de código a fondo, control de calidad y revisor independiente, con sus condiciones aplicadas. Pruebas automáticas en verde. Desplegado y comprobado en producción con dos facturas de Heretat: el parte sale con el motivo, sin errores internos.

**Heretat: configuración de Business Central**
- Los rechazos de Heretat vienen de la configuración contable de esa compañía (una combinación de IVA que Marbori tiene y Heretat no), además de algunas fichas de proveedor sin términos de pago o sin grupo contable. CaptuFact sí envía el tipo de IVA correcto.
- **Informe de solo lectura** de las fichas de proveedor sin NIF en Business Central: en Golf y Heretat más de la mitad de las fichas no tienen NIF, y hay 202 proveedores que no existen en ninguna compañía.

**Por qué no se veían las rechazadas en la Cola**
- Las facturas aprobadas que Business Central rechaza quedan como «aprobadas con error», fuera de la Cola (88 ese día: 66 de Heretat y 22 de Golf, entre otras). Se ven en Facturas → «No llegó a BC» y se pueden reintentar en lote. **El enlace del panel de control ahora abre Facturas ya filtrada**, desplegado esa noche.

**Correo a Frank y Paco**
- Enviado con las cifras y el informe. Una revisión posterior encontró **un dato inexacto en el correo**: decía que Golf nunca había tenido rechazos, y el 9 de octubre sí los tuvo, por la misma configuración. Queda por decidir cómo corregirlo.

## Estado actual

ProgramaFichar: cola local en la tablet, comprobaciones de salud y horario por departamento en producción; las tablets necesitan reabrir la aplicación para tener la cola. CaptuFact: el lote de aprobación ya no se corta y las rechazadas se encuentran desde el panel.

## Pendiente

- ProgramaFichar: reabrir la aplicación del kiosco en las cinco tablets y probar un fichaje sin red; enviar la hoja de continuidad y la de papel; ensayo de restauración un día laborable, avisando antes a Marc; explicar a Marc los tres pasos (horarios, departamentos, cada persona en el suyo); canal de grupo y calendario por áreas de Frank.
- CaptuFact: corregir el dato de Golf en el correo; que Paco decida qué hacer con las fichas sin NIF; antes del 20 de octubre, que Tesorería no cuente lo ya pagado y la vista de cierre de trimestre; desplegar la relectura por proveedor.
