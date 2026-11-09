---
title: Jornada 22 de septiembre — ProgramaFichar, CaptuFact y Hotel: arranque de Castlexperience, base e IVA en la tabla de facturas y una conexión antigua cerrada
date: 2026-09-22
project: ProgramaFichar, CaptuFact, Hotel
type: sesion
---

# Sesión de trabajo — 22 de septiembre de 2026

## Qué se hizo

### ProgramaFichar — El fin de semana analizado y las guardias, listas para enseñar

**Los tres días que faltaban (sábado 19, domingo 20 y lunes 21), analizados.**
- **El domingo a primera hora, Azure movió el servidor del programa dos veces por su cuenta**, sin ningún despliegue nuestro. El fichaje estuvo sin responder unos 50 segundos la primera vez y unos 35 la segunda. Se comprobó una por una: **no se perdió ningún fichaje**, porque el programa volvió a arrancar a la primera. Nadie se enteró hasta hoy. Es justo el caso que describe la nota de «qué hacer si se cae» del viernes, y la razón para tener alertas.
- Hay **veinte jornadas sin salida real** entre el 9 y el 21. Es el caso que plantea la petición de Frank, ahora con ejemplos reales.

**Puesta al día con Marc y Frank.** Se envió el correo con los partes de la semana anterior y la lista de jornadas que hay que repasar desde el panel. Antes de enviarlo se reescribió entero, siguiendo el formato de los correos anteriores: dice cómo corregir cada caso, sin plazos y sin juicios sobre el trabajo de nadie.

**Guardias: el modo de guardia, por perfil.** La configuración de guardias pasa de ser una por empresa a poder ser **distinta para cada perfil**. Por ejemplo, Oficina puede no admitir una guardia mientras la persona está fichada, y Guía sí. Si un perfil no la tiene definida, hereda la de la empresa. Se construyó por fases, con el visto bueno en cada una.
- **Configuración con pestañas:** General, Guardias y Business Central. La de Business Central solo la ve el superadministrador.
- La configuración confirma con un **«✓ Guardado»** visible al cambiar una opción.
- El **balance de horas tiene una columna «Descanso»** para el descanso retribuido, que antes se sumaba sin verse.
- **Revisión de código a fondo** con un revisor independiente: diez hallazgos. Seis se corrigieron con su prueba. De los cuatro que cambiaban el comportamiento se aplicaron dos (una guardia telefónica nocturna ya no se mezcla con la jornada del día siguiente, y una jornada solo de guardia tiene un límite de 72 horas), y los otros dos quedan documentados como riesgos conocidos.
- **Pruebas automáticas en verde** (801 en el motor y 176 en la interfaz). La demo de guardias, con una empresa y personas inventadas, quedó actualizada y comprobada.

**Castlexperience arranca.** Su dirección pidió hoy habilitar el programa para ir dejando Bizneo, empezando por oficina. Se le envió un correo, con Frank en copia, con el acceso a la demo para que vean cómo funciona y lo que necesitamos de ellos. Las altas de las personas las haremos nosotros con su lista.

### CaptuFact — Todo el feedback leído entero, y cuatro mejoras desplegadas

**Los correos del 15 al 17, leídos enteros** y contrastados otra vez con el programa. Así quedó la definición completa de la siguiente petición de Frank (devolver una factura de la Cola a Facturas con observaciones y aviso) y se fijó el orden de trabajo.

**Desplegado hoy:**
- **Base imponible y cuota de IVA en la tabla de facturas** y en el Excel exportado, como pidió Frank.
- **Duplicados con «la buena» marcada:** si alguna copia ya está en Business Central, manda esa (lo contabilizado no se toca, como pidió Paco). Si ninguna lo está, manda la primera que llegó (la regla de Frank). Con tres o más copias, todas las demás se pueden borrar, no solo la última.
- **Tesorería protegida también por detrás:** antes solo se escondía en pantalla. Ahora el servidor la reserva a dirección y no cuenta facturas borradas.
- **SharePoint ya no pisa ficheros** cuando dos facturas sin número de BC se llamarían igual.

Con **pruebas automáticas en verde** (1.503 en el motor y 299 en la interfaz). Correo único a Frank y Paco con lo desplegado y lo siguiente.

### Hotel — Una conexión antigua cerrada y dos fallos del channel manager

- **Una conexión de junio devolvía las últimas reservas sin pedir clave** en la versión de desarrollo. Se ha retirado, con una prueba que comprueba que ya no responde. El paso al servidor queda para mañana.
- **Las reservas que llegaban del channel manager (Beds24) no se guardaban nunca**, porque las fechas llegaban como texto. Además, la última noche se tomaba como día de salida. Los dos fallos están corregidos.
- **El historial de cada reserva** registra ahora también los movimientos del canal, los cobros, la factura y el check-in online, sin guardar datos personales del huésped.
- **Base para saber cómo acaba cada reserva** (se alojó, canceló o no vino), que alimenta el asistente de consulta de dirección que se enseña mañana.

Con **pruebas automáticas en verde** (de 195 a 248) y dos revisiones de código a fondo.

## Estado actual

ProgramaFichar: en producción y sin caídas; el fin de semana, analizado. Las guardias por perfil están listas en la demo y Castlexperience, avisada para arrancar por oficina. CaptuFact: en producción, con base e IVA en la tabla, la regla de duplicados y Tesorería protegida. Hotel: conexión antigua retirada y channel manager corregido, en desarrollo.

## Pendiente

- ProgramaFichar: activar Castlexperience en producción cuando nos confirmen su contacto de administración; analizar los días 14 y 15 y cerrar la vigilancia de 15 días.
- CaptuFact: devolver de la Cola a Facturas con observaciones y aviso (lo siguiente); el cambio de nombre por NIF en las 2 facturas del histórico; códigos de empresa en Ajustes.
- Hotel: desplegar en el servidor de pruebas para cerrar también allí la conexión antigua.
