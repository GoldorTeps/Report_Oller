---
title: Jornada 24 de septiembre — CaptuFact: el volcado a Business Central, arreglado y verificado + ProgramaFichar: un PIN por persona en todo el grupo
date: 2026-09-24
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 24 de septiembre de 2026

## Qué se hizo

### CaptuFact — El volcado a Business Central estaba roto por nuestra parte; arreglado, la Cola limpia y 257 facturas dentro

Frank avisó a mediodía: casi 300 facturas en la Cola de volcado y ninguna llegaba a Business Central.

**La causa la pusimos nosotros.** Desde principios de septiembre, cuando CaptuFact empezó a enviar las dimensiones, 22 de cada 28 aprobaciones fallaban. Business Central ya pone dimensiones por defecto en cada línea, y CaptuFact intentaba crear otra igual. BC lo rechazaba y la pantalla lo mostraba como «ese documento ya existe», así que parecían duplicados. **Corregido:** ahora la dimensión que ya está se actualiza en vez de crearse de nuevo. La primera factura de prueba entró con sus dimensiones, su PDF y su enlace en SharePoint.

**Medir antes de aprobar.** Una herramienta de solo lectura repite todas las comprobaciones del envío sin escribir nada. De 269 facturas en la Cola, 171 estaban limpias y el resto se paraba sobre todo por el IVA.

**IVA con varios tipos, como pidió Frank** (el caso de Sorea):
- En la tabla, la suma y una marca «N tipos» con el detalle.
- En la ficha, un bloque «Desglose de IVA» con base y cuota por tipo, comparado con el total.
- Un editor para teclear a mano una línea por tipo.

**Que no vuelva a pasar.** Cuando la cabecera de IVA se ha leído mal y las líneas cuadran con el total al céntimo, la cabecera se corrige sola al entrar la factura y queda un aviso con lo que se leyó. Se aplicó a 79 facturas ya existentes. Unas pocas (seguros al 0 % y algún caso de céntimos) quedan para revisar a mano.

**A la Cola de Frank ya no llega lo que Business Central va a rechazar.** Antes de pasar una factura a la Cola, el programa comprueba la empresa, el proveedor, que no esté ya en BC, el IVA y las líneas, y dice qué falta. Se devolvieron 25 facturas a Facturas, en rojo y con el motivo. **La Cola quedó con 242, todas limpias.**

**Aprobar en tandas.** Al aprobar 100 de golpe, el navegador dio un error de tiempo de espera. Ahora la Cola aprueba de 10 en 10 y enseña el progreso. Frank volcó toda la Cola.

**Comprobado en Business Central.**
- La regla nueva no se salta: no hubo ninguna aprobación forzada.
- Se releyeron en BC 245 facturas volcadas: **233 perfectas**.
- Las incidencias quedan listadas para Frank y Paco. Las más importantes son 4 facturas con IRPF o franquicia que entraron en BC con el total bruto.
- Las 12 que Frank aprobó por la mañana se reintentaron y entraron todas. **En total, 257 facturas enviadas.**

**La propuesta de Frank de aprobar con Power Automate** queda a la espera: primero, arreglar lo que estaba roto.

Todo con **pruebas automáticas en verde** (1.650 en el motor y 347 en la interfaz). Correo a Frank y Paco con qué fallaba, qué está arreglado y qué queda, programado para la tarde.

### ProgramaFichar — Un PIN por persona en todo el grupo, garantizado por la base de datos, y la empresa en la tablet

Medida de prevención para que la tablet multiempresa nunca confunda a dos personas.

- **Auditoría previa en producción, sin ver ningún PIN:** 97 personas en 7 empresas, **ningún PIN repetido** y nadie sin PIN.
- **Hasta hoy, el PIN único en todo el grupo solo lo controlaba el programa.** Ahora lo garantiza también la base de datos: aunque fallara cualquier otra comprobación, no se pueden guardar dos PIN iguales en ninguna empresa.
- **Cuatro huecos cerrados:** dos altas simultáneas en empresas distintas, las empresas inactivas, los PIN que empiezan por cero y el alta desde Business Central, que en un caso extremo podía asignar un PIN sin comprobarlo.
- Si dos personas tuvieran el mismo PIN, la tablet **no ficha** y dice «Este PIN lo tiene más de una persona. No se ha fichado: avisa a administración» (antes decía «Error de conexión»).
- **La empresa sale en grande en la bienvenida** («Hola, …») y en la confirmación del fichaje.
- Revisión de código y de seguridad, **pruebas automáticas en verde** (717 en el motor y 153 en la interfaz) y prueba en una copia local con datos inventados. **Desplegado en producción.**

## Estado actual

CaptuFact: en producción. El volcado a Business Central funciona de nuevo, con 257 facturas dentro, el desglose de IVA por tipos y una Cola que solo recibe lo que BC va a aceptar. ProgramaFichar: en producción con el PIN único garantizado en todo el grupo y la empresa visible en la tablet.

## Pendiente

- CaptuFact: gestionar la respuesta de Frank y Paco al correo del volcado; decidir con Paco cómo entran el IRPF y las franquicias; marcar como gestionadas las que ya estaban en BC y revisar a mano las de IVA; seguros como exento y canon del agua o tasa de residuos como no sujeto, a la espera de Paco.
- ProgramaFichar: probarlo en una tablet real; seguir con las solicitudes desde el portal; cerrar los análisis de los días 12 a 15 de la vigilancia.
