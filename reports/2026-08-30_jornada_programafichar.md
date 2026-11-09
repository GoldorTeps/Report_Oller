---
title: Jornada 30 de agosto — ProgramaFichar: el kiosco funciona en horizontal para los soportes de las tablets
date: 2026-08-30
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 30 de agosto de 2026

## Qué se hizo

### ProgramaFichar — El kiosco, en horizontal

**Por qué el piloto no había arrancado.** El 28 de agosto, ya con las tablets en la mano, Marc preguntó si el kiosco solo podía ponerse en vertical: tenía los soportes antirrobo instalados en horizontal. Al principio se le respondió que sería la rotación de la tablet, y **no lo era**: la aplicación del kiosco estaba fijada en vertical a propósito. Con sus soportes, eso era un defecto nuestro, y fue lo que le hizo parar. La lectura del 15 de agosto («no han empezado») se queda corregida: no era falta de interés, era la aplicación.

**Un segundo problema que nadie había visto.** Marc también comentó que forzándolo a mano «queda cortado». Tenía razón: el teclado del PIN y los botones no cabían en el alto de una tablet en horizontal. Desbloquear el giro sin arreglar esto le habría dejado una pantalla cortada, así que van juntos.

**El arreglo**
- **La aplicación de la tablet gira sola** al colgarla en el soporte, **aunque la tablet tenga la rotación automática desactivada**, y sin perder el PIN a medio teclear al girar.
- **La pantalla se adapta al alto disponible**: el reloj y los botones se compactan en pantallas bajas. La pantalla del PIN pasa de unos 694 a unos 416 píxeles de alto, y la de acciones del restaurante de unos 724 a unos 472. Vale también para móviles pequeños en vertical.
- **Pruebas automáticas nuevas**, comprobadas reintroduciendo el fallo para ver que lo detectan; toda la batería en verde.
- **Desplegado en producción** solo el cambio del kiosco (se verificó antes que el resto era idéntico a lo que ya había).

**Verificación real**
- En el navegador del móvil, que es lo mismo que la aplicación por dentro: **gira**, y se hizo el flujo completo de fichaje con PIN.
- En **dos tablets Android 14 de terceros**: con la rotación automática apagada, la aplicación gira igual y funciona con el PIN.
- Esa prueba cazó a tiempo un aviso de **Google Play Protect** («aplicación bloqueada… puede que no sea segura»). No es un fallo de la aplicación: el certificado de firma es nuevo (hubo que renovarlo porque no se pudo recuperar el anterior) y Google aún no lo conoce. Se instala desde «Más detalles → Instalar de todos modos».

**Entrega a Marc.** Mensaje enviado con la aplicación nueva y las instrucciones, avisando por delante del cartel de Play Protect («no le des a Entendido»). El enlace de descarga se le pasa para que lo abra **desde la propia tablet**, sin cables. En la tablet del Celler, donde ya la había instalado, tiene que desinstalar la anterior antes; los accesos de cada kiosco no cambian.

## Estado actual

Kiosco en horizontal desplegado en producción y verificado en tablets reales. Aplicación nueva entregada a Marc para empezar la prueba masiva el lunes 31.

## Pendiente

- Acompañar el arranque del piloto el lunes 31.
- Avisar a Marc de que en el panel hay fichajes de prueba a su nombre (de esta verificación) para que los borre.
- Propuesta para una siguiente versión: que los botones del kiosco guíen según el estado de cada persona (por ejemplo, si está en descanso, destacar «Fin de descanso»).
