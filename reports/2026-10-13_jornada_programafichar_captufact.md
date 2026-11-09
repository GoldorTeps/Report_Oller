---
title: Jornada 13 de octubre — ProgramaFichar: pausas desde el móvil y portal pensado para el teléfono · CaptuFact: los desplegables de dimensiones, arreglados en el día
date: 2026-10-13
project: ProgramaFichar, CaptuFact
type: sesion
---

# Sesión de trabajo — 13 de octubre de 2026

## Qué se hizo

### ProgramaFichar — Fichaje remoto con pausas y un portal del trabajador que se usa bien en el móvil

**El fichaje remoto, explicado y comprobado**
- Marc preguntó qué enlace enviar a quien ficha fuera de las instalaciones y si hacía falta instalar algo. Respuesta: no hay app que instalar; se entra al portal del trabajador, con la casilla de «fichaje móvil» activada en su ficha y el permiso de ubicación aceptado la primera vez.
- Se comprobó en producción que Marc ya lo había puesto en marcha por su cuenta: seis personas con la casilla activada y las primeras pruebas de fichaje remoto hechas esa misma mañana.

**Un error nuestro, detectado por Marc y corregido en la tarde**
- En la respuesta a Marc dijimos que el portal tenía los mismos botones que la tablet. **No era cierto**: solo tenía entrada y salida. Marc lo vio en nueve minutos y preguntó por la pausa.
- Esa misma tarde quedó construido y **desplegado en producción**: el portal ofrece ahora **Entrada, Salida, Iniciar pausa y Fin de pausa**, y el botón cambia según el momento de la jornada (trabajando, en pausa o en comida). La comida se sigue empezando solo en la tablet de la cantina, como pidió Marc; si se empezó allí, el móvil ofrece «Salir de comer».
- Se cubrió también el caso de quien olvidó fichar la salida el día anterior: el portal le ofrece empezar la jornada de nuevo en vez de dejarle sin botón.
- A partir de este fallo, cada afirmación sobre lo que hace la aplicación se comprueba en el programa antes de escribirla en un correo.

**Portal del trabajador pensado primero para el móvil**
- La fila de 13 pestañas obligaba a desplazarse de lado en el teléfono. En el móvil hay ahora una **barra inferior fija** con lo más usado (Fichar, Mis fichajes, Mis ausencias, Mensajes) y un botón «Más» con el resto. En el ordenador, las pestañas se reparten en varias filas.
- Las tablas de ausencias, incidencias e historial de horas se ven como **listas legibles** en el móvil, y las cifras del saldo de vacaciones se ordenan para pantalla estrecha.
- Se revisó primero en una copia local con datos de prueba y, con el visto bueno, se **desplegó en producción**. Las dos entregas del día tienen vuelta atrás preparada.
- **Pruebas automáticas en verde** en las dos entregas.

### CaptuFact — Los desplegables de dimensiones vacíos, resueltos en el día

**Qué vio Paco**
- Al mediodía Paco avisó de que no salían los desplegables de las dimensiones: Tipología y Unidad de gestión aparecían vacías y Empresa y Objetos de coste como «no está en el catálogo».

**Qué pasaba**
- Poco antes se habían asignado **varias empresas** a dos usuarios. Desde un cambio del 5 de octubre, el servidor pedía elegir empresa también al **consultar** el catálogo, y la pantalla de facturas lo pedía sin indicar empresa; el servidor lo rechazaba y la pantalla se quedaba en blanco sin avisar.
- **No se perdió ningún dato** y no tenía relación con Business Central.

**Qué se arregló**
- Para consultar el catálogo, quien tiene varias empresas recibe ahora **los valores de todas sus empresas**, y sigue sin ver los de las empresas que no le corresponden. Para modificar, se sigue exigiendo indicar la empresa.
- Si el catálogo no se puede cargar, la pantalla **lo dice con un aviso** en lugar de quedarse en blanco.
- **Revisión de código a fondo**, **revisión crítica** y **revisor independiente**: visto bueno con mejoras apuntadas para más adelante. **Pruebas automáticas en verde**, incluidas las que comprueban el aislamiento entre empresas en la base de datos.
- **Desplegado en producción** a primera hora de la tarde y avisado Paco.

**Visto de paso**
- Esa mañana Business Central había rechazado varios intentos de volcado de facturas de proveedores europeos por la configuración de IVA de la compañía, lo mismo que ya pasó con Heretat. Queda para contárselo a Paco en el correo de respuesta.

## Estado actual

ProgramaFichar: el portal del trabajador permite fichar pausas desde el móvil y se usa cómodamente en el teléfono; las dos mejoras están en producción.

CaptuFact: los desplegables de dimensiones vuelven a cargar para los usuarios con varias empresas; corrección en producción.

## Pendiente

- ProgramaFichar: avisar a Marc de que la pausa ya está en el portal y vigilar los primeros fichajes de pausa remotos. Revisar en el móvil el calendario de «Mi horario».
- CaptuFact: confirmación de Paco y respuesta al correo que anunció, incluido lo de la configuración de IVA de los proveedores europeos.
