---
title: Jornada 1 de septiembre — CaptuFact: facturas recuperadas, avisos visibles en pantalla y dimensiones de BC con un botón + ProgramaFichar: seguimiento del arranque en tablets
date: 2026-09-01
project: CaptuFact, ProgramaFichar, Castlexperience
type: sesion
---

# Sesión de trabajo — 1 de septiembre de 2026

## Qué se hizo

### CaptuFact — Facturas recuperadas

- Se relanzó la pasada de recuperación de las facturas que habían entrado vacías: **86 facturas releídas y 49 salieron de «necesita revisión»**. Esta vez, con los arreglos de la noche anterior, no se perdió nada.
- **Hallazgo honesto:** algunos documentos dieron resultados distintos de un día a otro. Se concentra en los recibos de agua y en documentos raros; las facturas normales salen idénticas. La causa de fondo sigue siendo que los recibos de agua no se tratan todavía como recibos de suministro.

### CaptuFact — Dos documentos que no eran facturas

Mirando por importe aparecieron un **balance contable del propio grupo** (más de 5,3 millones) y una **ficha de un crédito bancario** (casi 619.000 €). Ninguno lleva número de factura, y la ficha del crédito llegó a aprobarse para Business Central: **solo se salvó porque el envío falló**. Por eso:
- **Una factura sin número ya no puede enviarse a Business Central.** El sistema lo bloquea y lo explica.

### CaptuFact — Avisos visibles en pantalla (desplegado)

- Los avisos de cada factura se clasifican ahora en **tres niveles de gravedad (rojo, ámbar y gris)**, con distintivos compactos en la tabla.
- **Aviso de importe desorbitado** a partir de 100.000 €, calibrado sobre las facturas reales del grupo (la mayor legítima ronda los 74.000 €).
- **Banda roja en toda la aplicación** si el servicio de lectura se cae, que dice el motivo y deja claro que **los correos no se pierden**.
- **Correo a los administradores del grupo** si la parada se alarga (unos 45 minutos), una sola vez y no cada cuarto de hora.
- **Los avisos ya salen desde el buzón propio de CaptuFact**, creado por marketing, verificado en vivo.
- Un fallo propio de diseño (la columna de avisos triplicaba la altura de las filas) se vio por captura y **se corrigió en media hora**, con pruebas que lo vigilan.

### CaptuFact — Lo que pidió Paco

- **El contador de la Cola** («veo 15 y solo hay 4»): contaba también facturas ya aprobadas. Corregido.
- **Sacar una factura de la Cola:** la pantalla lo prometía y el botón no existía; la única salida era aprobar. Ahora se puede retirar una o varias, con confirmación que deja claro que **no se borra nada**: la factura vuelve a Facturas para editarla.
- **Dimensiones de Business Central:** se leyó el **BC real de producción**: cuatro dimensiones y **491 valores**, tal como dijo Paco. Se vio que alguien del grupo estaba dándolos de alta **a mano, uno a uno**, y que un error al teclear un código hacía que la dimensión se perdiera sin avisar. Se añadió el botón **«Traer de Business Central»** por empresa: da de alta lo que falte, actualiza lo que cambie y no borra nada.
- **Corrección propia sobre los vencimientos:** el plazo que muestra CaptuFact es una propuesta interna y **no viaja a BC**; el vencimiento bueno lo calcula Business Central con las condiciones de pago de la ficha del proveedor.
- Estos cambios quedaron listos y se programó su salida a producción para el día siguiente.

### CaptuFact — Privacidad

- Se preparó la **retirada completa** de un aviso de inicios de sesión que, encendido, enviaba datos de acceso a un canal externo (estaba apagado; sale a producción al día siguiente). Los accesos siguen quedando registrados en la **auditoría del propio sistema**, que es donde deben estar. De paso se quitaron del código dos datos personales que no debían estar ahí.

Todo con sus **pruebas automáticas en verde** (más de 1.270 en el motor y 262 en la interfaz).

### ProgramaFichar — Informe del arranque en tablets

Se revisó el servidor de producción **solo en lectura** para saber cómo iba la puesta en marcha en las siete tablets tras la versión corregida del 30 de agosto.
- **Funcionó en campo:** el lunes, RR. HH. instaló la versión nueva en la tablet del Celler, ajustó un PIN y fichó para comprobar la cadena completa. **El arreglo de la pantalla en horizontal queda validado en uso real.**
- **Situación:** 1 tablet de 7 en marcha; las demás aún sin instalar. Ningún trabajador ha fichado todavía en las tablets.
- **Una jornada de prueba quedó abierta**, y el sistema manda un aviso diario hasta que se cierre desde el panel. No se tocó nada: es un fichaje de RR. HH. y la corrección le corresponde, o su permiso para hacerla.
- Informe escrito con el detalle de cómo se obtuvo cada dato.

### Castlexperience — Respuesta sobre el bot de correo, preparada

Castlexperience contestó al manual: pasan a Microsoft 365 este mes, preguntan qué tareas puede hacer David y si el bot podría servir para una segunda marca.
- **Decisión:** David hace el trabajo técnico, **como usuario invitado en cuentas que son de la empresa**. Nada queda a su nombre.
- **Qué hace falta:** el acceso al buzón (desbloquea casi la mitad del trabajo sin esperar a nadie), la cuenta del servicio de IA del bot, la fecha de salida de quien lo mantenía y el **consentimiento del administrador de Microsoft 365**, que puede bloquear la migración si nadie lo tiene.
- **Segunda marca:** sí, con una copia del bot por marca y después de que la primera lleve días funcionando.
- Respuesta redactada; queda por enviar.

## Estado actual

CaptuFact: en producción con los avisos visibles desplegados; los arreglos de la Cola y el botón de dimensiones, listos para salir. ProgramaFichar: 1 de 7 tablets en uso, el arreglo validado en campo. Castlexperience: respuesta lista para enviar.

## Pendiente

- CaptuFact: comprobar el despliegue de los arreglos de la Cola; contestar a Paco punto por punto; preguntarle de dónde sale cada dimensión en cada factura; que el grupo retire de CaptuFact los dos documentos que no son facturas.
- ProgramaFichar: escribir a RR. HH. sobre la jornada abierta, el fichaje de prueba pendiente de borrar y si necesitan algo para las demás tablets.
- Castlexperience: enviar la respuesta y, con el acceso al buzón, apuntar la regla del filtro y hacer copia de la hoja de conocimiento.
