---
title: Jornada 19 de octubre — CaptuFact: 367 de las 380 facturas aprobadas, dentro de Business Central · ProgramaFichar: acceso al portal arreglado · Hotel: nuevo aspecto en la demo
date: 2026-10-19
project: CaptuFact, ProgramaFichar, Hotel
type: sesion
---

# Sesión de trabajo — 19 de octubre de 2026

## Qué se hizo

### CaptuFact — Las facturas aprobadas por Frank, dentro de Business Central

Jornada larga, de las 11:20 a medianoche, trabajando con Paco sobre la configuración de Business Central para sacar las facturas que Frank había aprobado.

**La configuración de Business Central, puesta a punto con Paco**
- A primera hora se comprobó que la configuración pedida la semana anterior aún no estaba hecha: ninguna factura de Golf ni de Heretat podía entrar.
- Se habilitó la forma de pago con tarjeta en Golf.
- Se comprobó que **Suitech había completado el maestro de proveedores**: de 1.308 fichas, ninguna quedaba incompleta (el viernes eran 221).
- Con Paco se aclaró cómo combinar los grupos de IVA del proveedor y del producto. Se le prepararon dos opciones por escrito, eligió una y se crearon las filas de configuración necesarias en Golf y en Heretat. Se añadió también la combinación de proveedores de la UE que facturan con IVA español.
- Se enlazó el archivo de documentos de cada empresa, para que **cada factura llegue a Business Central con su PDF adjunto**. Comprobado en pantalla sobre las primeras facturas volcadas.

**El volcado, por tandas y comprobado**
- Las facturas se enviaron en tandas pequeñas y controladas, empezando por las que no daban ningún problema.
- Antes de volcar se corrigieron algunos datos: copias de facturas ya registradas, números de factura recortados y un NIF de proveedor equivocado.
- Dos facturas con un descuadre de céntimos en el IVA se enviaron según el criterio que Paco fijó el 15 de octubre: manda lo que dice CaptuFact y se avisa para ajustar en Business Central.
- **Resultado: 367 de las 380 facturas aprobadas, dentro de Business Central** (73 de Golf y 294 de Heretat).

**Comprobación posterior, factura a factura**
- Se releyeron las 367 en Business Central. Once salían con un total distinto: se revisaron una a una y quedó la lista concreta de retoques que hay que hacer en Business Central.
- Se detectó un hueco propio: la comprobación previa al volcado no miraba una combinación de IVA, y una factura fue rechazada por Business Central. Quedó apuntado para cerrarlo en el programa.

**Las facturas del día siguiente, revisadas antes**
- Se comprobó por adelantado que las facturas preparadas para aprobar el martes entrarían de verdad: **65 listas**. Tres se devolvieron a administración con la instrucción exacta de qué corregir.
- Correo a Frank y Paco, programado para las 7:00 del martes, con lo volcado, lo cambiado en Business Central y lo que queda.

Se construyeron cuatro herramientas nuevas de comprobación, de solo lectura y con sus pruebas automáticas. **El programa en producción no se tocó.**

### ProgramaFichar — Informe de uso y arreglo del acceso al portal del empleado

**Informe de uso del 15 al 19 de octubre**
- **Ningún error de servidor en cinco días**, sin jornadas imposibles ni jornadas abiertas de días anteriores, y el correo diario de las 9 saliendo cada día.
- Esa mañana Marc puso al día todas las solicitudes pendientes (32 aceptadas): **no quedaba ninguna por resolver**.
- **Hallazgo principal:** en esos cinco días, 13 trabajadores intentaron entrar 34 veces sin conseguirlo. La mayoría acababa entrando, pero no todos.

**El arreglo, desplegado esa misma tarde**
- **Se equivocaban de puerta:** escribían su correo en la pantalla de gestión (la de RR. HH.) en vez de en el portal del empleado. Ahora la pantalla lo detecta, avisa de que ese correo entra por el portal y lleva allí con un botón, con el correo ya escrito.
- **El correo distinguía mayúsculas:** si la ficha tenía el correo con mayúscula y la persona lo escribía en minúscula, no entraba. Ahora da igual cómo se escriba, también en el acceso de gestión y en «¿Olvidaste tu contraseña?».
- **Los mensajes de error nunca se veían:** ante un fallo de acceso la pantalla se recargaba y el mensaje desaparecía. Se destapó en la prueba de la mañana. Ahora el mensaje se queda en pantalla, y si la cuenta está bloqueada lo dice.
- **Los fallos del portal ahora quedan registrados** con su motivo, para poder ayudar a quien no entra. Por protección de datos, sin el correo en claro.
- De paso, se corrigió el montaje de la web para que se construya siempre con las mismas versiones con las que pasan las pruebas.
- **Control de calidad:** revisor independiente, revisión de seguridad y revisión de código a fondo, sin fallos graves. Las mejoras que propusieron se aplicaron con su prueba.
- Comprobado en producción tras el despliegue. Pruebas automáticas en verde: más de 1.130 en el motor y 372 en la interfaz.
- Las tablets nuevas de Sarrià y Sant Cugat ya se conectaron por la tarde, aún sin fichajes.
- Quedó redactado el correo a Marc con lo arreglado y lo que necesita de su lado.

### Hotel — El nuevo diseño, primero en maqueta y después en la demo

- **Maqueta navegable** del nuevo diseño con las cuatro pantallas (Recepción, Tableta, Dirección y Limpieza), tres temas de color en claro y oscuro, y en **catalán, castellano e inglés**. A petición de David, el aspecto se elige dentro de Configuración.
- Los nombres de las pantallas pasan a ser los estándar del sector en los tres idiomas: llegadas y salidas, fuera de servicio, no asignada, prepago, folio.
- **Primera tanda del nuevo diseño, ya en la demo**, con copia de seguridad antes de desplegar:
  - Los tres temas, en claro y oscuro, en todas las pantallas.
  - Menú nuevo, que se adapta al ordenador, a la tablet y al móvil.
  - **Búsqueda rápida** por huésped, localizador, habitación o teléfono.
  - La pantalla **Hoy**, con llegadas, salidas y huéspedes en casa, que sustituye a las pantallas anteriores.
  - Configuración para todos; los ajustes del hotel, solo para dirección.
  - Cada perfil entra directamente en su pantalla: recepción y dirección en Hoy, limpieza en Habitaciones.
- Comprobado en la demo entrando como recepción: sin errores y sin desbordes en el móvil. 52 pruebas automáticas en verde.
- El correo con la demo para Frank, Laia y recepción salió esa mañana.

## Estado actual

CaptuFact: 367 de las 380 facturas aprobadas están en Business Central, y las del martes, comprobadas de antemano. ProgramaFichar: el acceso al portal, arreglado y en producción, en vigilancia de 24 horas. Hotel: la primera tanda del nuevo diseño, en la demo.

## Pendiente

- CaptuFact: las 9 facturas de las 380 que aún no han entrado y los 13 retoques en Business Central; retirar en Golf una fila de configuración que sobró; cerrar en el programa los huecos detectados hoy en la comprobación previa al volcado.
- ProgramaFichar: vigilar que las personas que no entraban ya lo consiguen; enviar el correo a Marc; que el programa guarde los correos en minúsculas e impida fichas con el correo repetido.
- Hotel: siguientes tandas del diseño (canal de la reserva sin traducir, pantalla de Reservas en el móvil, botón de reserva repetido en el Planning, tema común para toda la casa).
