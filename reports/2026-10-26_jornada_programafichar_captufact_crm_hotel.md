---
title: Jornada 26 de octubre — CaptuFact: menos tecleo y lectura que reconoce al proveedor, en producción · Hotel: avisos y copias verificadas · CRM publicado con HTTPS
date: 2026-10-26
project: ProgramaFichar, CaptuFact, CRM, Hotel
type: sesion
---

# Sesión de trabajo — 26 de octubre de 2026

## Qué se hizo

### CaptuFact — Dos mejoras en producción para teclear menos

Se eligió la mejora que más trabajo manual quitaba a administración, a partir de la medida de cómo se usa la aplicación: tres de cada cuatro facturas se tocaban seis veces o más antes de quedar listas.

**Teclear menos: las propuestas vuelven a salir cuando se corrige la factura**
- Hasta hoy, la aplicación solo proponía dimensiones, forma de pago y cuenta (lo que aprende de Business Central) **cuando entraba la factura**. Si el CIF o el proveedor llegaban mal y una persona los corregía, la propuesta ya no volvía a salir. Y eso pasa en una de cada dos facturas.
- Ahora, al corregir el CIF o el proveedor, o al mover una factura a otra empresa, **la aplicación vuelve a proponer** con el dato bueno. Lo que ya estaba confirmado por una persona no se toca, y nunca se cambia nada en facturas aprobadas o ya volcadas.
- **Cada empresa aprende de lo suyo:** el historial de Golf ya no se mezcla con el de Marbori aunque el proveedor sea el mismo.
- Cada propuesta deja rastro en el historial de la factura («propuesto desde BC · tras corregir CIF», etc.), para poder medir cuánto se ahorra de verdad.
- Antes de cambiar nada se midió sobre las facturas ya validadas, una por una y solo con lo que se sabía en su momento.

**Leer sabiendo el proveedor**
- Entró en producción la función, construida a principios de octubre y pendiente de desplegar, que **vuelve a leer una factura cuando se le indica de qué proveedor es**. Sobre 486 facturas de Marbori y Nova Finca, en las ya volcadas el proveedor reconocido coincide con el de Business Central en el 97 % de los casos.
- **Medida de la calidad de lectura:** de 1.411 facturas de 2026 de 379 proveedores, la mitad (49,3 %) se leyó sin que nadie tuviera que corregir nada. El campo que más se corrige es el proveedor. 31 proveedores concentran casi la mitad de las facturas y la mayoría de las correcciones: son los primeros a los que se enseñará a leer mejor.
- Salieron también dos datos mal cargados en las fichas de proveedores, que quedan anotados para corregir.

**Con garantías**
- Revisión de código a fondo y control de calidad con condiciones, todas aplicadas antes de subir. Una de ellas: el despliegue ya no puede arrancar si la base de datos no está al día.
- Más de 2.700 pruebas automáticas en verde.
- Desplegado en dos tiempos (18:38 y 20:52), sin reinicios, con las tres empresas sincronizadas con Business Central. Si hiciera falta, se puede volver a la versión anterior en un paso.

**Lo que se vio al revisar:** la aplicación lee el buzón cada 15 minutos sin errores, pero **desde el 23 de octubre no ha llegado ninguna factura nueva**. Queda por comprobar en el buzón si es que no se han enviado o si ha cambiado el circuito. Se preparó un correo para Frank y Paco con las mejoras y los puntos abiertos. David lo comentará con Frank directamente.

### Hotel — El programa avisa cuando algo falla, y las copias se comprueban solas

**Sesión de arquitectura (sin código):** cómo abrir el programa del hotel a tres cosas que vienen: la comunicación entre el personal (limpieza, desperfectos, avisos de recepción), la caja del restaurante con la tienda dentro, y el CRM. Decisiones de David:
- La caja del restaurante es la aplicación que ya existe, y la tienda va dentro de ella.
- **El restaurante no puede hacer reservas del hotel.** El hotel le cuenta quién ocupa cada cabaña, y lo único que vuelve del restaurante es el cargo de la consumición.
- **Cada empresa factura lo suyo.**
- Cada aplicación tiene sus propios usuarios, con hueco para relacionarlos.

Se dejó todo escrito en el estudio de puesta en marcha, que David firmó por la tarde. Las preguntas fiscales que salen de aquí van a la gestoría.

**Vigilancia, construida y desplegada en la demo:**
- **Comprobación de salud a fondo:** el programa revisa base de datos, configuración y copias, y no arranca si falta algo crítico.
- **Tareas automáticas:** cierre del día a las 05:00, recordatorios a las 20:00 y limpieza de registros antiguos.
- **Avisos al móvil de David** cada cinco minutos si algo deja de responder, sin enviar nunca datos de huéspedes.
- **Copias de seguridad verificadas:** cada copia nocturna se restaura en una base aparte y se cuentan las reservas, para saber que la copia sirve de verdad. Además, se baja una copia cada día al ordenador de David.
- **La aplicación ya no entra en la base de datos con permisos de administrador**, y la conexión con el restaurante queda cerrada desde fuera.
- **Pantalla «Estado»** para dirección: semáforo de cada pieza, último cierre, última copia verificada.
- Revisión de código: ocho hallazgos, los ocho corregidos. 403 pruebas automáticas en verde, y la batería tarda menos de la mitad que antes.

Ese mismo día se vio en la demo que alguien del hotel la estaba usando.

### CRM — Publicado en el servidor con conexión cifrada

- El CRM quedó **publicado en el servidor con HTTPS**: el inicio de sesión sigue protegido contra intentos masivos, las páginas técnicas están cerradas al público y la copia de seguridad diaria está preparada.
- Se enviaron los accesos al equipo comercial. 136 pruebas en el motor y 26 en la interfaz, en verde.

### ProgramaFichar — Revisión tras los cambios del día 22

- Se cerró la vigilancia de 48 horas del despliegue del 22 (horario de viña y turno partido): **cero errores de servidor en cuatro días**, el correo diario de las 9 salió cada día y ninguna jornada imposible.
- Se escribió un informe con lo raro: alguna jornada de segundos tras pulsar un botón equivocado, y botones que la tablet guiada debería esconder. Todo apunta a que **las tablets no se han recargado desde el día 22**.
- Se arregló la herramienta que saca los partes de producción, con sus pruebas. Producción no se tocó.

## Estado actual

CaptuFact en producción con las dos mejoras, pero sin facturas nuevas en el buzón desde el 23. El hotel tiene en la demo vigilancia, avisos y copias verificadas. El CRM está publicado con HTTPS, sin datos reales. ProgramaFichar, estable.

## Pendiente

- CaptuFact: comprobar el buzón de proveedores; revisar lo volcado desde el despliegue; empezar a «enseñar a leer» a los 31 proveedores que más se corrigen.
- Hotel: conectar los avisos al móvil y comprobar al día siguiente la primera copia verificada y el primer cierre automático.
- ProgramaFichar: proponer a Marc que recarguen las tablets y corrijan las jornadas de segundos.
- CRM: programar la copia diaria en el servidor y empezar a cargar datos reales.
