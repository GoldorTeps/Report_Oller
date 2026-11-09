---
title: Jornada 14 de septiembre — ProgramaFichar, CaptuFact y Hotel: peticiones al día, nombre del proveedor por NIF y el cierre nocturno que nunca funcionó
date: 2026-09-14
project: ProgramaFichar, CaptuFact, Hotel
type: sesion
---

# Sesión de trabajo — 14 de septiembre de 2026

## Qué se hizo

### ProgramaFichar — El mejor día del piloto, y las peticiones de Marc puestas en orden

**El domingo 13, el mejor día de la vigilancia.** Cero errores de servidor, cero reinicios y, por primera vez en cinco días, **ninguna jornada abierta al cierre**. El turno de noche lleva tres días seguidos sin problemas y se da por verificado.

**Lo que hizo RR. HH. el lunes por la mañana.** Marc grabó en menos de una hora casi cincuenta correcciones del fin de semana. Se tuvo en cuenta para medir bien: desde hoy, la mejora de las pausas se mide solo con las marcas hechas en la tablet, no con las corregidas después.

**Dos correcciones que antes no hacían efecto, comprobadas en producción.** Marc las rehízo y las jornadas quedaron bien. Las dos partes del arreglo del 12 funcionan con datos reales.

**Una jornada que se nos quedó atrás.** Apareció una jornada del día 1 con casi 24 horas. Se le había comunicado a Marc el 11, pero nunca comprobamos después si se había corregido. La causa técnica es el cierre automático de jornadas olvidadas, que no tiene tope; queda anotado para corregirlo con cuidado, porque cambia el comportamiento en producción.

**Cinco peticiones de Marc que no se habían atendido.** Al revisar todos sus correos, aparecieron cinco peticiones que no estaban registradas en ningún sitio. La más urgente llevaba cuatro días sin respuesta: Marc no podía anular una marca que él mismo había creado. Las cinco:
- anular una marca puesta a mano;
- crear una jornada desde cero cuando alguien no ha fichado nada;
- el Excel con la ficha completa de la plantilla, para la gestoría;
- automatizar las bajas médicas a partir del correo de la mutua;
- ordenar los listados por nombre, no por apellido.

Se le contestó reconociendo el retraso y explicándole cómo dejar bien esa jornada. Las cinco peticiones quedan registradas y en orden, sin plazos.

**Protección de los datos reales.** La herramienta que carga datos de demostración podía vaciar la base de datos a la que apuntara, sin comprobar nada. Ahora tiene tres cerrojos independientes, y se ha probado contra el peor caso: apuntando a producción y con la confirmación puesta, aborta. De paso se corrigieron tres fallos que impedían arrancar una copia de pruebas, cada uno con su prueba automática.

### CaptuFact — Todas las peticiones repasadas, el nombre del proveedor por NIF y el enlace en Business Central

**Las peticiones de Frank y Paco, una a una.** Se releyeron todos los correos desde finales de junio y se contrastó cada petición con lo que hace el programa de verdad: 16 cerradas del todo, 4 hechas pero sin comunicar, 6 construidas pero sin activar y 10 abiertas. A partir de hoy, una petición solo cuenta como cerrada cuando está **construida, activada, comunicada y confirmada** por quien la pidió.

**El PDF ya no engorda Business Central.** Paco había pedido que el PDF viva en SharePoint y en BC quede solo un enlace. Estaba construido y probado desde el 18 de agosto, pero **no se había activado en producción**. Activado hoy.

**El nombre del proveedor sale de su NIF**, como pidió Frank. Cuando el NIF de la factura coincide con una sola ficha de Business Central, CaptuFact pone el nombre que figura en BC, aunque no se parezca al que lee de la factura. Si no se parecen, lo marca en gris para que se vea. Se mantienen las protecciones: sin NIF no actúa, con el NIF en varias fichas tampoco. Además, el rastro de que el programa ha cambiado el nombre ya no se pierde al recalcular. En el histórico solo afecta a 2 facturas.

**Correo a Frank y Paco** con lo hecho hoy y lo que queda anotado.

### Hotel — El panel de Dirección y la Auditoría nocturna, arreglados

Al retomar el programa del hotel tras tres meses, las pestañas de Dirección y Auditoría nocturna se quedaban en blanco y el botón «atrás» del navegador parecía no funcionar.

- **La causa:** un cambio interno de junio en la forma de pedir las reservas, que dos pantallas no habían seguido. Corregido en todas las pantallas afectadas.
- **Ninguna pantalla vuelve a dejar la aplicación en blanco:** si una falla, el menú sigue funcionando y solo cae esa pantalla.
- **El cierre nocturno nunca había funcionado.** Lo descubrieron las pruebas nuevas: cualquier intento de cerrar el día daba error. Nadie había llegado a pulsar el botón. Se corrigieron cuatro fallos: el que impedía cerrar, las salidas que siempre contaban 0, las reservas del channel manager que sumaban 0 € y la ocupación, que contaba reservas en vez de habitaciones. El cierre del día 13 se contrastó con la base de datos y cuadra al dígito.
- **Dirección, corregido:** el reparto por canales ya no suma canceladas ni no-shows, y la fecha sale en el idioma de la pantalla.
- **Datos de demostración al día:** se movieron a fechas actuales para que la demo tenga huéspedes en casa, llegadas y salidas de hoy.

Todo en el entorno de desarrollo, con **pruebas automáticas en verde** (de 173 a 195). El servidor no se tocó.

## Estado actual

ProgramaFichar: piloto estable, día 6 de 15 de vigilancia, con las cinco peticiones de Marc registradas y contestadas. CaptuFact: en producción con el nombre por NIF y el enlace en BC activados. Hotel: Dirección, panel principal y cierre nocturno funcionando en desarrollo.

## Pendiente

- ProgramaFichar: anular marcas puestas a mano y crear jornadas desde cero (las dos primeras de Marc); comprobar si quedan jornadas con duraciones imposibles; poner tope al cierre automático; las alertas, que dependen de que Suitech habilite dos permisos en Azure.
- CaptuFact: aplicar el cambio de nombre a las 2 facturas del histórico; devolver una factura de la Cola a Facturas con observaciones (pedida dos veces); decidir el filtro de contratos.
- Hotel: comprobación visual en el navegador; decidir cómo entran los servicios y su IVA en el cierre del día; las preguntas abiertas desde junio sobre la conexión con Business Central, la propina y los dominios con conexión cifrada.
