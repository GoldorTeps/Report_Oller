---
title: Jornada 6 de octubre — CaptuFact: las facturas mal leídas, marcadas, y el conector de Business Central ampliado · ProgramaFichar: la foto de la ficha y la comida en la cantina
date: 2026-10-06
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 6 de octubre de 2026

## Qué se hizo

### CaptuFact — Los correos de Paco y de Frank, atendidos en el día

**El diagnóstico (consultas de solo lectura en producción)**
- Paco avisó de que en Golf y Heretat había muchas facturas con base e IVA que no cuadraban. La causa: líneas mal leídas en la carga masiva del 1 de octubre (138 de 594 en Golf, 40 de 307 en Heretat, 6 de 111 en Marbori). **La actualización de la víspera no lo rompió: lo hizo visible**, porque desde entonces la ficha enseña la suma de las líneas.
- En el ejemplo que mandó, el texto del propio PDF viene roto: hay que ponerla a mano.
- La dimensión EMPRESA no se asigna en Golf y Heretat porque sus compañías de Business Central no la tienen; es una decisión de finanzas, y se le dijo.

**Desplegado por la mañana**
- **Marca «A mano»:** las facturas cuyas líneas no cuadran con el documento salen con una marca en la lista y un panel ámbar en la ficha con los totales del documento. Una factura con IRPF que sí cuadra no se marca. Se marcaron 199 facturas ya existentes.
- **Nova Finca pasa a ser parte de Marbori**, como pidió Paco: 14 facturas movidas y su buzón asignado a Marbori. Las ya volcadas a Business Central se dejaron como estaban.
- La lista de reasignación de empresas bajó de 29 a 13 facturas, con tres casos que explicar a finanzas (dos facturas duplicadas y un PDF que no se pudo leer).

**El conector de Business Central, ampliado (tarde y noche)**
- Nueva versión del conector que deja ver qué valores de dimensión están **bloqueados en Business Central** y la configuración contable de cada proveedor. **Quedó instalada en el Business Central de producción esa misma noche.**
- Con ella, CaptuFact:
  - deja de ofrecer los valores bloqueados y marca en rojo los que ya estaban puestos;
  - **comprueba la ficha del proveedor en Business Central antes de la Cola**: si le faltan los términos de pago o los grupos contables, la factura se para en «Preparar» con el motivo, en lugar de fallar al volcar, y avisa en ámbar desde que entra.
- «Posibles duplicados»: un clic abre la ficha y se puede corregir allí mismo.
- El PDF ya no caduca a los dos minutos; la ficha dice en una banda cuándo una factura **no llegó a Business Central** y por qué; los nombres de los grupos contables, en castellano.
- **Revisión de código a fondo** y **control de calidad**: sin fallos críticos; dejaron varios puntos medios que se corrigen antes de desplegar, para que lo anunciado en el correo a Frank y Paco sea cierto el día que llegue.
- Más de 2.100 pruebas automáticas en el motor y 480 en la interfaz, en verde. Esta parte queda **sin desplegar**.

### ProgramaFichar — Los tres correos de Marc

- **Botones de comer solo en la cantina:** como pidió Marc, las seis opciones solo salen en la tablet de la cantina; el resto vuelve a las cuatro de siempre.
- **La foto de la ficha no se guardaba:** el servidor web cortaba los archivos de más de 1 MB, y una foto de móvil pesa más. Se amplió el límite (cada función sigue aplicando el suyo) y se añadió una prueba automática que lo vigila. Desplegado y comprobado desde fuera; falta una subida real de punta a punta.
- **Pausa de 30 minutos para el equipo de viña (11 personas):** el programa ya lo permite con un horario propio. Se comprobó que las 11 personas están activas, pero ninguna tiene horario asignado. Como es configuración de RR. HH., se le explicaron a Marc los pasos.
- Un solo correo a Marc con los tres puntos.

## Estado actual

CaptuFact: marca «A mano» y Nova Finca en Marbori, en producción; el conector nuevo, instalado en Business Central; la comprobación de proveedores y bloqueados, lista y revisada, pendiente de desplegar. ProgramaFichar: cantina y límite de subida en producción.

## Pendiente

- CaptuFact: corregir los puntos de la revisión y desplegar; refrescar los datos de Business Central; asignar a cada cuenta de finanzas sus empresas; correo a Paco con la lista de las 13; volver a leer las facturas mal leídas de Golf y Heretat.
- ProgramaFichar: que Marc cree el horario de viña y comprobar que Regularizar propone 30 minutos a esas 11 personas; confirmar que la foto se guarda con una subida real.
