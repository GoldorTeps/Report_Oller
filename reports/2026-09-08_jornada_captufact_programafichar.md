---
title: Jornada 8 de septiembre — CaptuFact: ficha completa de proveedores y el CIF obligatorio + ProgramaFichar: listo para el arranque
date: 2026-09-08
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 8 de septiembre de 2026

## Qué se hizo

### CaptuFact — Proveedores con toda su información de BC, el Excel de Paco probado y el CIF como requisito

**Despliegue de la mañana**
- Entraron en producción los **vencimientos según los términos de pago de BC**, el **importador del Excel por factura** y la mejora de «Completar lo que falta». Verificado después: sistema respondiendo y sin errores.

**La pestaña de Proveedores, completa**
- Ahora muestra lo que Business Central sabe de cada proveedor: **modo de pago, términos y saldo** en la fila, y al desplegarla **dirección, correo, teléfono, moneda y si está bloqueado**. Primera sincronización real: **1.148 proveedores** y sus 16 términos de pago.
- Y lo que sabe CaptuFact de cada uno: cuántas facturas, la última, el importe del año, cuántas quedan sin volcar o en la bandeja de aprobación, si el IBAN ha cambiado y qué dimensiones repite siempre.
- Dos fallos corregidos en el momento: la pantalla marcaba **todos** los proveedores como «BLOQUEADO» por un detalle de cómo BC escribe «no bloqueado»; y un proveedor aparecía con «IBAN cambiado» porque la factura traía números de contrato que se habían leído como cuenta bancaria (ahora solo cuenta lo que tiene forma de IBAN).

**El Excel de Paco, probado de verdad**
- Primera subida: no casaba casi nada. Para no adivinar, el importador pasó a **explicar por qué** no casa cada fila. Con eso quedó claro: el Excel son **facturas de julio**, contabilizadas a mano en BC antes de que CaptuFact empezara a recibir facturas, así que no están en la aplicación. **El importador funciona;** hace falta un Excel de agosto o septiembre.
- También salió que **14 de los 15 códigos de Unidad de Gestión del Excel no existen en BC**. Los de Tipología sí están todos. Se le preguntó a Paco.
- Corregido que «Traer de Business Central» las dimensiones fallara para una sociedad cuyo mapa con BC estaba hecho por el nombre del buzón.

**Comprobado con datos reales**
- **Términos de pago:** se leyeron los 16 de BC y el cálculo de vencimientos los entiende todos. Los de varios plazos (2×30, 3×30…) llevan en BC solo el primer plazo; se le explicó a Paco.
- **EMPRESA automática:** las facturas de las sociedades ya configuradas llevan su código en la cabecera sin que nadie lo teclee.
- **«Completar lo que falta»:** sobre cuatro facturas que estaban en revisión por falta de proveedor, **rellenó el proveedor en las cuatro y el CIF en tres**. El día anterior, las mismas daban cero.

**Correo a Paco enviado**, con Frank en copia: lo hecho, la prueba real del Excel, lo que enseñan los términos de pago, dos cosas en las que me equivoqué y las decisiones que se les piden.

**El CIF del proveedor pasa a ser obligatorio**
- Frank preguntó por correo cómo era posible que una factura llegara a su aprobación sin el NIF del proveedor. **Era posible:** la aplicación pedía proveedor, importe y fecha, pero no el CIF.
- Desde ahora, una factura sin CIF del proveedor queda en **rojo**, con el campo señalado, y **no puede entrar en la bandeja de aprobación** hasta que alguien lo ponga. Y aunque entrara por otra vía, no se envía a BC sin CIF (un nombre suelto podría casar con otro proveedor que se llame igual).
- La comprobación que pedía Frank, que el nombre case con el de BC cuando hay CIF, **ya existía**; ahora siempre tendrá con qué compararse.
- Corregido además un texto de la ficha que decía «esto no impide enviarla a BC» incluso cuando había un aviso rojo que sí lo impedía.
- Se preparó la respuesta a Frank, para enviar cuando esto esté en producción.

**Teclear menos: lo que BC ya sabe de cada proveedor**
- Se analizó qué se sigue tecleando a mano en cada factura. Hallazgo: las fichas de proveedor en BC **no tienen dimensiones por defecto**, pero las facturas ya registradas en BC sí llevan, línea a línea, la cuenta contable y las dimensiones. Mirando ese histórico, para cada proveedor se repite casi siempre la misma cuenta (90 % de las veces) y la misma Tipología (92 %).
- Con eso, CaptuFact **propone en los huecos** el modo de pago de la ficha, la cuenta contable habitual y las dimensiones habituales del proveedor, solo cuando se repiten en al menos el 80 % de los casos y con dos facturas o más. **Nunca pisa** lo que ya hay y deja una marca gris para que se vea de dónde salió; si alguien lo cambia a mano, manda lo suyo.
- Construido y probado, pendiente de desplegar.

Todo con sus **pruebas automáticas en verde** (unas 1.470 en el motor y 284 en la interfaz).

### ProgramaFichar — Seguimiento antes del arranque y un arreglo en producción

**Cómo está la preparación**
- **4 de las 7 tablets instaladas** (Celler, Cantina, Recepció y Castell). Faltan Moll de càrrega y Cobert de maquinària.
- Marc ha dejado la plantilla lista: altas y bajas al día y los **PIN regenerados** para el personal de Golf y Heretat. Todavía no ha fichado ningún empleado: el arranque real está a punto.

**Dos fallos nuestros, encontrados y corregidos el mismo día**
- El control diario de cumplimiento (horas máximas, descansos…) **fallaba cada mañana** porque la base de datos no aceptaba los tipos de aviso que el programa intentaba guardar. No llegó a afectar a nadie, pero el control no estaba grabando nada.
- Una jornada cerrada automáticamente sin salida fichada **seguía sumando horas hasta el momento presente**. Ahora cuenta solo lo fichado.
- Además, el programa arrancaba dos veces su planificador de tareas, lo que podía duplicar avisos. Corregido.
- Desplegado a mediodía, en medio minuto de reinicio y sin nadie fichando: Marc no notó nada. Con sus **pruebas automáticas, todas en verde** (603).

## Estado actual

CaptuFact: en producción con la ficha completa de proveedores, vencimientos e importador. El CIF obligatorio y las propuestas desde BC, listos para desplegar.

ProgramaFichar: en producción con el control de cumplimiento corregido; plantilla y tablets preparadas para el arranque.

## Pendiente

- CaptuFact: desplegar el CIF obligatorio y las propuestas desde BC; enviar la respuesta a Frank. Esperar de Paco un Excel de agosto o septiembre y la confirmación de los códigos de Unidad de Gestión.
- ProgramaFichar: confirmar mañana que el control de cumplimiento corre limpio; escribir a Marc (tablets y PIN listos, faltan dos tablets por instalar).
