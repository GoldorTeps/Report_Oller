---
title: Jornada 3 de septiembre — CaptuFact: dimensiones obligatorias de Business Central en cada factura + ProgramaFichar: segunda tablet en marcha
date: 2026-09-03
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 3 de septiembre de 2026

## Qué se hizo

### CaptuFact — El aviso de facturas pendientes, verificado con Frank

- Por la mañana el aviso aún no había salido, y se averiguó por qué: nadie había marcado facturas para aprobar desde el 31, y el interruptor de avisos seguía apagado (el cambio del día anterior no llegó a guardarse). Se encendió a mediodía.
- **A las 14:50, alguien del grupo marcó una factura para aprobar y el aviso salió a Frank y a Paco**, comprobado en los registros. Primer resumen diario previsto para el día siguiente a las 9:00.

### CaptuFact — Protección de las cuentas de administración

- En la revisión de código salió un hueco: era posible, en el orden equivocado, **dejar la aplicación sin ningún dueño**, desactivarse a uno mismo, o que un administrador rebajara a un dueño. Se cerró con sus pruebas y se desplegó.
- **Funcionó el mismo día:** al ordenar las cuentas de administración, el sistema frenó un paso que no tocaba. El cambio de cuentas queda a medias, a repetir en el orden correcto.

### CaptuFact — Los dos correos de Paco, contrastados con el programa

- Se revisaron sus dos correos y su Excel (324 facturas, 151 proveedores). **El Excel cambió el diagnóstico:** 26 proveedores llevan dimensiones distintas según la factura, así que la regla «por proveedor» propuesta el día anterior no sirve. Hay que corregírselo, igual que la afirmación de que el programa ya sabía hacerlo de tres formas: no era exacta.
- Listado de **nueve puntos** con su estado y el cambio que falta en cada uno.

### CaptuFact — Dimensiones obligatorias en cada factura (desplegado)

Sin las dimensiones obligatorias de Business Central, **ninguna factura se podría contabilizar**. Ahora:
- En cada factura hay **un selector por dimensión**, en la cabecera y en cada línea, con los valores reales de BC. «Aplicar a todas» rellena las líneas **sin pisar** lo que ya tuvieran.
- En Ajustes → Maestra, el grupo marca **qué dimensiones son obligatorias**. Es decisión del grupo, no nuestra.
- **Si falta una obligatoria, la factura muestra un aviso rojo y no se puede enviar a BC.** Y un código mal escrito ya no se pierde en silencio: solo valen valores que existen en BC.
- Desplegado por la tarde en el orden que no interrumpe a nadie; verificado sin errores y con el **volcado a BC intacto**.
- Ya en producción se trajeron de BC los valores para cuatro empresas, se retiraron del catálogo las dos dimensiones antiguas y se marcaron dos como obligatorias.
- Al hacerlo se vio que la carga de dimensiones **iba siempre a la misma compañía de BC**, fuera cual fuera la empresa elegida. Hoy no causó ningún error (esas empresas comparten compañía), pero se corrigió para que cada empresa cargue la suya. **Queda pendiente de desplegar.**

Todo con sus **pruebas automáticas en verde** (1.313 en el motor y 266 en la interfaz).

### ProgramaFichar — Seguimiento: segunda tablet

- Revisión del servidor de producción, solo en lectura: el miércoles por la tarde se instaló la **segunda tablet, la de la Cantina**, que quedó cargada sin fichajes todavía. **2 de 7 tablets** en marcha; el arranque avanza una tablet por sesión.
- **Fallo nuestro detectado:** el aviso diario de jornadas abiertas **sale duplicado** cada mañana desde el 1 de septiembre, porque las tareas programadas del servidor se ejecutan dos veces. Afecta también a otras tareas programadas. Diagnosticado; el arreglo toca producción y se hará con su planificación y su prueba.
- Se mejoró la herramienta de seguimiento del arranque y se amplió el informe con este seguimiento.

## Estado actual

CaptuFact: en producción con las dimensiones obligatorias en cada factura y el aviso de facturas pendientes llegando a Frank. ProgramaFichar: 2 de 7 tablets en marcha y un aviso duplicado pendiente de corregir.

## Pendiente

- CaptuFact: desplegar la corrección de la carga de dimensiones por empresa; terminar el orden de las cuentas de administración; confirmar el resumen de las 9:00; responder a Paco con el listado y las dos correcciones; siguientes pasos: dimensión EMPRESA automática y sugerencia de dimensiones por factura.
- ProgramaFichar: escribir a RR. HH. (jornada abierta, fichaje de prueba, disculpa por el aviso duplicado y si necesitan algo para las otras cinco tablets); corregir el aviso duplicado.
