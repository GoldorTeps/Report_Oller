---
title: Jornada 12 de septiembre — ProgramaFichar: turno de noche verificado en uso real y corrección de la hora de entrada
date: 2026-09-12
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 12 de septiembre de 2026

## Qué se hizo

### ProgramaFichar — Cierre del tercer día y el arreglo que faltaba en las correcciones

**El tercer día (viernes 11), revisado**
- **42 personas** fichando, ningún error de servidor, ningún reinicio, nadie bloqueado.
- **El turno de noche, verificado con gente real:** cuatro salidas pasada la medianoche cerraron bien su jornada del día anterior, sin cierres automáticos. El arreglo del día 10 funciona.
- **El panel de correcciones, verificado por uso:** Marc hizo 19 correcciones seguidas sin ningún rechazo por el fallo de la hora, y con ellas dejó bien cuatro jornadas que estaban pendientes.
- El aviso automático de las 9:00 sobre jornadas que se quedaron abiertas salió como debía.

**Un fallo nuestro: la corrección de la hora de entrada**
- **Dos de las 19 correcciones respondieron «guardado» y no cambiaron nada.** Las dos eran de hora de entrada.
- La causa estaba en el arreglo de la noche del día 10: la validación y el recálculo se pusieron para la **salida** y la **entrada quedó fuera**. No se vio entonces porque todas las jornadas que había que arreglar eran de salida.
- Lo más serio no era la jornada sin arreglar, sino el «guardado»: quien corrige da el asunto por cerrado y no lo está. Y en uno de los dos casos el registro se contradecía consigo mismo.
- **Arreglado:** la hora de entrada pasa por las mismas comprobaciones que la salida (anterior al fin de la jornada, no más de 16 horas antes y por delante de cualquier otra marca del día) y una entrada corregida **mueve el inicio de la jornada**. La jornada sigue perteneciendo al día en que se abrió, que es de lo que depende el turno de noche.
- Se comprobó antes que el panel ya enviaba bien estas correcciones, para no dejar a Marc bloqueado.
- Con sus **pruebas automáticas, todas en verde** (634).

**El despliegue**
- Hecho de madrugada, sin nadie fichando. Un error de tecleo nuestro en la primera orden apuntó el servidor durante unos dos minutos a una versión que no existía; la web siguió respondiendo y nadie se vio afectado. Se relanzó con la versión correcta, arrancó limpio y sin errores. El procedimiento de despliegue tomará la versión de forma automática para que no se repita.

**Comunicación**
- Correo a Marc programado: 17 de las 19 correcciones quedaron bien y dos no, por un fallo nuestro; cómo rehacerlas (en una de ellas, primero la salida y después la entrada, en ese orden); las jornadas que quedaron abiertas el viernes; y por qué en los próximos días verá más avisos de «9 horas»: el control repasa las dos últimas semanas y, ahora que suma el día completo, saca de golpe los días partidos que antes no vigilaba.

## Estado actual

ProgramaFichar en uso real, estable. El turno de noche y las correcciones de salida, verificados con gente real; la corrección de entrada, arreglada y en producción.

## Pendiente

- Marc, el lunes: rehacer las dos correcciones de entrada y cerrar las jornadas abiertas del viernes.
- Comprobar que los avisos de «9 horas» bajan en los próximos días.
- El panel todavía no avisa en pantalla al corregir mal una entrada (el sistema la rechaza con el motivo escrito): mejora anotada.
- Tablets de Moll de càrrega y Cobert de maquinària, sin instalar.
