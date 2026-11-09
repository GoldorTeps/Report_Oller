---
title: Jornada 30 de septiembre — CaptuFact: el PDF de cada factura, dentro de Business Central + ProgramaFichar: Actualización 1.1 en producción
date: 2026-09-30
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 30 de septiembre de 2026

## Qué se hizo

### CaptuFact — El aviso de «este documento ya existe», resuelto

Administración de Nova Finca escribió porque varias facturas no pasaban: el aviso decía que Business Central contestaba «este documento ya existe», y no eran duplicadas.

- **La causa:** eran 13 facturas que Frank había aprobado el 8 y el 23 de septiembre. Al aprobarlas, BC las rechazó por un error de dimensiones que se corrigió el 24 de septiembre, y la aplicación lo mostraba con un texto genérico y engañoso. Al estar aprobadas, no volvían a la cola y nadie las reintentó.
- **Reintentadas con la versión actual: las 13 están en BC.** Dos de ellas tenían la cuenta cambiada a mano esa mañana para intentar quitar el aviso; se les devolvió la cuenta con la que Frank las aprobó y entraron. Nada se saltó la aprobación.
- **Para que no vuelva a pasar:** el mensaje explica ahora lo que dice BC y que no es una factura repetida; el error de «la cuenta no existe» se traduce; y antes de enviar se comprueba que la cuenta existe en el plan de cuentas de BC.
- Correo enviado a administración de Nova Finca con el detalle factura por factura y su número en BC.

### CaptuFact — Revisión a fondo de la aplicación, primera fase desplegada

Se hizo una **revisión de código a fondo** del motor, de los textos y de la interfaz, con revisores independientes, más un repaso de las 112 facturas que estaban fuera de BC con su motivo. La primera fase, la que protege el volcado a BC, quedó en producción:

- **Dos aprobaciones a la vez ya no pueden crear dos borradores** en BC (reproducido con una prueba antes de arreglarlo).
- Si el envío falla, siempre queda el motivo concreto y el resto del lote sigue.
- Lo eliminado o rechazado no se vuelca nunca.
- **Nueva vista «No llegó a BC»**, con contador, reintento en lote y reintento por factura.
- **Botón «Forzar volcado»**, con confirmación y solo para el propietario y administración.
- Mensajes de error en castellano, avisos que no desaparecen solos y varios fallos menores de pantalla corregidos.

Pruebas automáticas en verde: 1.863 en el motor (contra una base de datos real) y 410 en la interfaz.

### CaptuFact — El PDF de cada factura, a un clic desde Business Central

- Se construyó una **extensión pequeña y propia para Business Central** que deja el enlace al PDF original de cada factura en **Datos adjuntos → Vínculos**.
- Se probó primero en la empresa de demostración de BC: el enlace se ve en el borrador y **se conserva al registrar la factura**.
- Instalada en Business Central. **272 facturas ya volcadas tienen ya su enlace**, y las nuevas lo llevarán solas. Una segunda pasada confirmó que no se duplica ninguno.
- 9 facturas apuntan a borradores que ya no existen en BC; queda decidir qué se hace con ellas.
- Correo enviado a Paco y Frank con los vínculos y las mejoras del día.

### ProgramaFichar — Actualización 1.1, en producción

- **El resumen de las 9:00 de hoy salió bien:** una vez, solo a Marc. Ningún error en el servidor desde medianoche.
- **Solicitudes con horas imposibles:** una entrada pedida después de la salida de ese día ya no se puede enviar; se valida al pedirla con las mismas reglas que al aprobarla.
- **El resumen de la mañana, más fino:** nueva fila «Sigue abierta» para las jornadas de ayer que aún no llegan a 16 horas, y el aviso de «sin pausa» ya no salta por error con el turno partido. La vista previa enseña exactamente lo que llevará el correo.
- **Aprobar en un clic en Disputas:** la tarjeta dice qué quedará al aprobar (por ejemplo, «Quedará: Salida a las 16:00»). Rechazar lleva la nota de esa solicitud. Las solicitudes sin jornada ya no muestran un «Aprobar» que daba error.
- **Cambio de PIN protegido:** ya se comprobó que dos personas no pueden tener el mismo PIN, pero el aviso de «ya está en uso» permitía tantear qué PIN existen. Ahora hay un tope de intentos por persona y hora, y el intento queda registrado sin guardar el PIN.
- **Fechas sin desfase horario** en once pantallas, y en el envío a Business Central cada día que no se manda queda anotado con su motivo.
- Probado antes en un entorno local y desplegado por la tarde con punto de restauración previo. Correo enviado a Marc con las mejoras.

Pruebas automáticas en verde: 839 en el motor y 196 en la interfaz.

## Estado actual

CaptuFact: en producción con el volcado blindado, la vista «No llegó a BC» y el PDF de cada factura accesible desde Business Central.
ProgramaFichar: Actualización 1.1 en producción y verificada.

## Pendiente

- CaptuFact: segunda fase de la revisión (facturas que no entran, textos y robustez); decidir qué hacer con las 9 facturas sin borrador en BC; los céntimos de IVA, en la siguiente versión de la extensión.
- ProgramaFichar: crear una jornada desde cero y anular una marca dejando rastro (lo más importante para el registro legal), después la pausa desde el portal; horarios de sala y bajas de la mutua.
