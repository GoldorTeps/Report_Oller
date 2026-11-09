---
title: Jornada 13 de septiembre — ProgramaFichar: el sábado, limpio, y qué pasa si el sistema se cae
date: 2026-09-13
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 13 de septiembre de 2026

## Qué se hizo

### ProgramaFichar — Cierre del cuarto día y revisión de la red de seguridad

**El cuarto día (sábado 12), revisado**
- **El sistema, impecable:** ningún error de servidor ni en el registro, y el menor número de rechazos de los cuatro días.
- **Primer día completo con el arreglo de la hora de entrada, y ha aguantado:** ninguna jornada con duración imposible, ningún cierre automático sin salida, nadie bloqueado.
- El **turno de noche**, otra vez bien: doce salidas pasada la medianoche, todas sobre su jornada.
- **La gente ha empezado a fichar las pausas:** 24 personas fichan comida o pausa, y bajan las jornadas largas sin pausa registrada. No es un arreglo nuestro: es la plantilla aprendiendo a usar los botones.
- Azure reinició por su cuenta los servidores a primera hora de la tarde, por mantenimiento de su plataforma. Nadie lo notó y no hubo errores; queda anotado para vigilar si se repite.
- Quedan **dos jornadas abiertas** que el sistema no puede cerrar solo y que tiene que cerrar RR. HH. desde el panel.

**El parte para el cliente**
- Correo a Marc con el estado del sistema y lo que tiene que tocar en el panel.
- Queda como norma para el resto de la vigilancia: el parte al cliente cuenta **que el sistema no se ha caído y lo que tiene que hacer él en el panel**. Las cifras de cumplimiento (descansos, jornadas largas) las saca el programa para que RR. HH. las vea; valorarlas no es nuestro trabajo. Lo que sí se comunica siempre es cualquier aviso que el programa calcule mal, porque eso sí es nuestro.

**¿Y si el sistema se cae?**
- Se revisó, contra la configuración real de Azure, quién se entera y quién responde si el fichaje deja de funcionar. La respuesta: **hoy no hay avisos automáticos** configurados, el servidor corre con una sola copia activa, y las copias de seguridad de la base de datos existen (se guardan 35 días) pero **nunca se ha ensayado una restauración**. Azure cubre su infraestructura, no que el programa esté funcionando.
- Queda un plan de cinco puntos: **alerta automática** al correo y al móvil si el servidor falla; una **segunda copia activa** del servidor; un **ensayo de restauración** de la copia de seguridad; dejar por escrito **quién responde, en cuánto tiempo, y un plan B en papel** para fichar si el sistema no está; y retirar un guion de copias antiguo que ya no corresponde al servidor actual.
- El cuarto punto no es técnico: es un acuerdo a hablar con el grupo, para que nadie dé por hecho algo que no está cubierto.

## Estado actual

ProgramaFichar en uso real, con el cuarto día limpio y los arreglos de la semana aguantando. Sin avisos automáticos de caída todavía: es lo primero del plan.

## Pendiente

- Montar la alerta automática de caída y la segunda copia activa del servidor.
- Ensayar la restauración de una copia de seguridad.
- Redactar quién responde y el plan B en papel, para hablarlo con el grupo.
- RR. HH.: cerrar las dos jornadas abiertas; tablets de Moll de càrrega y Cobert de maquinària, sin instalar.
