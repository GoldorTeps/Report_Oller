---
title: Jornada 25 de septiembre — ProgramaFichar: solicitudes del portal arregladas y aprobar es corregir + CaptuFact: ver el PDF y dimensiones con buscador
date: 2026-09-25
project: ProgramaFichar, CaptuFact
type: sesion
---

# Sesión de trabajo — 25 de septiembre de 2026

## Qué se hizo

### ProgramaFichar — Un fallo del portal, arreglado, y las solicitudes de corrección en producción

**El fallo del jueves 24.** Al revisar los registros de Azure apareció que, el día 24 por la tarde, el portal daba error al enviar una solicitud de corrección. La solicitud sí se guardaba, pero la persona no lo veía y la volvía a enviar. Dos trabajadoras de Heretat (las primeras en usar las solicitudes) enviaron 20 entre las dos. Fallo nuestro.
- **Corregido y desplegado:** el portal ya no da error al enviar y, si un envío fallara, ahora lo avisa en vez de quedarse callado.
- **Las repetidas, ordenadas con rastro:** quedan pendientes las dos buenas, listas para aceptar con un clic, y las otras 18 pasan a rechazadas con una nota que lo explica.

**Las correcciones, tal como se habló con RR. HH., en producción:**
- **Una jornada que el sistema cierra sola ya no se da por cerrada:** queda **«Sin salida»**, en ámbar, y el panel propone la hora de salida. De paso se corrigió un falso aviso de «más de 9 horas»: se contaba hasta la entrada del día siguiente.
- **Aprobar una solicitud es corregir la jornada:** sustituye la marca equivocada en vez de duplicarla, y está protegido contra el doble clic en «Aceptar».
- **Rechazar exige una nota.** Al trabajador le llega un correo solo cuando se acepta; a RR. HH. no le llega uno por cada solicitud.
- La solicitud entra ya revisada: pide la hora, el fichaje al que se refiere y no deja repetirla.
- **Una hora en el futuro** se rechaza con un mensaje claro, en vez de dar error. Era otro error del día 23.

Antes de desplegar se comprobó producción en modo solo lectura y se dejó un punto de restauración. Cuatro despliegues en el día, todos verificados y sin errores. **Pruebas automáticas en verde** (778 en el motor y 164 en la interfaz).

**Cierre de la vigilancia de 15 días.** Los quince días del piloto quedan documentados: 8 en verde, 5 con avisos y 2 en rojo, con **un solo error de servidor y ningún fichaje perdido**. De las veinte jornadas sin salida que se pasaron a Marc el día 22, ha corregido 18.

### CaptuFact — Los enlaces a SharePoint en Business Central, ver el PDF desde la Cola y dimensiones con buscador

**¿Llegan los enlaces a SharePoint a Business Central?** Una herramienta de solo lectura cruzó CaptuFact, Business Central y SharePoint:
- Todas las facturas volcadas desde el 14 de septiembre (256 de 256) tienen su PDF-enlace en BC y su fichero en SharePoint.
- Quedan 5 de agosto, anteriores al cambio, con el escaneo y sin enlace.

**Pero no está donde Paco lo quiere.** El PDF-enlace aparece en «Detalles → Archivos de documento entrante», y Paco y Frank lo quieren en **«Datos adjuntos → Vínculos»**, como vínculo directo. Además, en el PDF la dirección sale cortada. Se miró en su Business Central (en modo solo lectura) y hoy no existe ninguna vía estándar para escribir en «Vínculos». La propuesta es una **extensión propia de Business Central**, probada antes en una copia de pruebas de su entorno real y con su visto bueno. Mientras tanto, se les ofrecen dos soluciones temporales para que elijan.

**Puntos 2 y 3 del correo de Paco, desplegados:**
- **«Ver PDF» y «Descargar PDF» en Gestionadas.** Los botones de la ficha fallaban, y el de la fila decía «Ver» con el icono de descargar.
- **«Ver PDF» y «Descargar PDF» en la Cola**, sin tener que desplegar la fila.
- **Las dimensiones, con buscador:** se ven con código y texto también en las líneas, se buscan por cualquiera de los dos (sin importar las tildes) y solo se puede elegir del catálogo.
- «Completar lo que falta» pasa a llamarse **«Reescanear»**. Sigue rellenando solo los campos vacíos.

**Pruebas automáticas en verde** (1.676 en el motor y 372 en la interfaz). Correo a Frank y Paco preparado, con la respuesta a su correo de la mañana:
- seguros como IVA exento;
- canon del agua y tasa de residuos como no sujetos;
- los céntimos, según lo que dice la factura;
- la consulta sobre una factura cancelada.

## Estado actual

ProgramaFichar: en producción con las solicitudes de corrección funcionando de punta a punta, «Sin salida» en vez de cierres falsos y la vigilancia de 15 días cerrada sin ningún fichaje perdido. CaptuFact: en producción, con «Ver PDF» en Gestionadas y en la Cola y dimensiones con buscador. Los vínculos en BC están pendientes de su visto bueno a la extensión.

## Pendiente

- ProgramaFichar: correo a Marc con el fallo del 24 y su arreglo, las dos solicitudes que ya puede aceptar y cómo funcionan ahora el rechazo y «Sin salida»; decidir qué hacer con los avisos antiguos de «más de 9 horas» que salieron por error; siguientes fases (listado por nombre, un único aviso diario a RR. HH., pausa desde el portal); las alertas ante una caída, que siguen sin resolver.
- CaptuFact: probar en el navegador «Ver PDF» y el buscador de dimensiones y enviar el correo; elegir la solución temporal de los enlaces; con el visto bueno, la extensión de «Vínculos»; los compromisos del correo (seguros, canon, céntimos) y el IRPF; la lista de proveedores con reglas propias, a la espera de Paco.
