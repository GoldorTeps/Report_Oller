---
title: Jornada 22 de octubre — ProgramaFichar: turno partido de viña resuelto · CaptuFact: comprobación previa al volcado reforzada · Hotel: el nombre de la casa, corregido
date: 2026-10-22
project: ProgramaFichar, CaptuFact, Hotel
type: sesion
---

# Sesión de trabajo — 22 de octubre de 2026

## Qué se hizo

### ProgramaFichar — El turno partido de viña: diagnóstico, tres arreglos y despliegue en el día

Marc escribió a las 10:23: en la tablet del cobertizo, el personal de viña ficha entrada, salida, entrada y salida, pero solo aparece una entrada y una salida, y las horas salen mal.

**Diagnóstico**
- Los fichajes sí se guardaban: siete personas de viña fichan cuatro veces al día y el programa registraba sus dos tramos. El problema estaba en **cómo se mostraban**: la pantalla de Fichajes enseñaba dos filas iguales y confundía.
- En un caso, la regularización automática completó una jornada a la que le faltaba la salida, y de ahí salía la fila con «una entrada y una salida».
- El lunes 19 faltaron los fichajes de la mañana de los siete, y la tablet rechazó algunos intentos sin dejar rastro. Se ha preguntado a Marc qué pasó con la tablet ese día.
- Ninguna de estas personas tiene horario asignado, y la pausa de 30 minutos acordada el 7 de octubre no llegó a configurarse.

**Los tres arreglos**
- **Fichajes muestra una fila por persona y día**, con la etiqueta «Turno partido», sus tramos, el total y el estado del día. Cada tramo se corrige por separado, y un tramo imposible queda marcado. A petición de David, fecha en formato dd/mm/aaaa y «Cerrada» en lugar de «Activo».
- **La tablet guía a la persona:** solo enseña los botones que tienen sentido en ese momento (no ofrece «Salida» a quien no ha entrado).
- **Un fichaje rechazado ya deja rastro**, y aparece en el correo diario de las 9 para que RR. HH. lo vea.

**Control de calidad**
- David probó la tablet y la pantalla de Fichajes antes de desplegar.
- Revisor independiente y revisión de código a fondo: 14 correcciones aplicadas.
- Pruebas automáticas en verde: más de 1.220 en el motor y 429 en la interfaz.

**Desplegado a las 13:56** y comprobado en producción. Correo a Marc enviado a las 14:15 con el diagnóstico, cómo corregir las jornadas afectadas, la pausa pendiente de configurar y el aviso de recargar las tablets. El correo del día anterior había salido por la mañana y Marc respondió «¡Genial!».

### CaptuFact — Los cinco huecos de la comprobación previa al volcado, cerrados

El lunes, al volcar las facturas aprobadas, salieron cinco casos que la comprobación previa no detectaba y que Business Central rechazaba o dejaba mal. Hoy se cerraron los cinco en el programa:

- La **combinación de grupos de IVA** que de verdad llega a Business Central, no solo la elegida a mano.
- Una factura cuyo **IVA en Business Central saldría distinto** del de la factura.
- **Importes en negativo** sin marcar como abono.
- **Total que no cuadra** con las líneas más el IVA.
- **Descuadres de céntimos:** no bloquean, como pidió Paco, pero la factura queda avisada con las dos cifras para ajustarla en Business Central.

**Medido antes de encenderlo**, sin tocar nada: aplicada a las últimas 1.000 facturas ya volcadas, pasan 971 y las 29 que se paran lo hacen con motivo. Entre ellas, **10 abonos que están en Business Central como facturas en negativo** y tres facturas con un impuesto de seguros contabilizado como IVA, que hay que comentar con Paco.

Revisión de código a fondo, con todas sus condiciones aplicadas. Pruebas automáticas en verde: 2.650 en el motor y 584 en la interfaz. **Construido y medido, todavía sin desplegar.**

El correo a Frank y Paco salió el martes a las 7:00; Frank aprobó ese día las 65 facturas comprobadas.

### Hotel — El nombre de la casa, corregido a «Oller del Mas»

- **Laia contestó** al correo de la demo, con Frank en copia: la revisará y dirá algo la semana que viene. Señaló que la pantalla de acceso ponía un nombre equivocado del hotel.
- El error era nuestro: un cambio del 18 de octubre unificó el nombre al revés y dejó el equivocado.
- Corregido a **«Oller del Mas»** en todo el programa: pantalla de acceso, menú, pantalla de bloqueo, título de la web, Asistente, correos de confirmación y recordatorio, pago con tarjeta y SMS. Una prueba automática impide que vuelva el nombre equivocado.
- Pruebas automáticas en verde (52 en la interfaz y 40 en el motor). **Desplegado y comprobado en la demo.**

## Estado actual

ProgramaFichar: el turno partido, en producción y en vigilancia de 48 horas. CaptuFact: la comprobación reforzada, lista para desplegar. Hotel: demo con el nombre correcto, a la espera de los comentarios de Laia.

## Pendiente

- ProgramaFichar: confirmar el lunes 26 que la tablet de viña registra todos los fichajes y que no quedan jornadas de segundos; la respuesta de Marc sobre la tablet del lunes 19; nóminas masivas, firma de documentos y reinicio de saldos de 2027, cada una por separado.
- CaptuFact: visto bueno para desplegar la comprobación reforzada y, al día siguiente, contrastar los avisos de céntimos con Business Central; comentar con Paco los 10 abonos en negativo y las tres facturas de seguros; las 9 facturas de las 380 pendientes y los retoques en Business Central.
- Hotel: pasar a Laia los accesos por un canal aparte; recoger sus comentarios; segunda tanda del nuevo diseño.
