---
title: Jornada 7 de agosto — CaptuFact: conectado al Business Central definitivo · ProgramaFichar: enviado el arranque de la prueba
date: 2026-08-07
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 7 de agosto de 2026

## Qué se hizo

### CaptuFact — Paso al Business Central definitivo, como pidió Frank

**El cambio de entorno**
- Frank propuso el 6 de agosto pasar del entorno de pruebas de BC al definitivo. Por la mañana la conexión se paró en la comprobación previa: la aplicación no estaba autorizada todavía dentro del entorno real de BC.
- **Un error propio retrasó la autorización:** se habilitó en BC una aplicación antigua, la de un guion de julio, en lugar de la que usa CaptuFact hoy. Se detectó, la antigua se volvió a desactivar y se dio de alta la correcta. El guion quedó corregido.
- Comprobación previa: el entorno real usa las mismas empresas que el de pruebas, así que la vinculación de empresas seguía siendo válida y no hubo que rehacerla.
- **Cambio hecho con copia de seguridad previa y vuelta atrás preparada.** Copia del maestro actualizada desde el BC real (549 proveedores, modos de pago y 21 grupos de IVA) y, por primera vez en producción, la línea de negocio cargada para las tres empresas. Las 9 facturas enviadas al entorno de pruebas se quedan como están.

**Lo que destapó la prueba: administración ya trabajaba en el BC real**
- Desde julio, administración ha introducido a mano **155 facturas de compra** en el BC real. Cruzadas con CaptuFact: 10 de las 245 pendientes ya estaban dentro, y el proceso manual tiene sus propios duplicados.
- Mientras se acuerda con Frank y Paco qué entra por CaptuFact y qué a mano, **la regla es comprobar contra BC antes de cada envío**.

**Dos facturas de prueba, una lección cada una**
- Primera factura de prueba enviada al BC real **con base, IVA al 21 % y PDF adjunto, todo correcto**.
- La segunda, la factura de ferretería con descuento por línea, llegó con el IVA mal: el lector había tomado la columna de descuento del 10 % como tipo de IVA. Se **borró el borrador del BC real** (estaba sin contabilizar; la factura ya la había introducido administración a mano, con el IVA bien) y se corrigió la causa.

**Dos protecciones nuevas, en producción esa misma tarde**
- **Aviso de duplicado contra el propio BC:** antes de crear el borrador, la aplicación pregunta a Business Central si ese número de factura ya existe para ese proveedor, incluidas las introducidas a mano. Si BC no responde, no se envía sin comprobar.
- **Coherencia del IVA entre líneas y total:** si no casan, no se envía (con opción de forzar, que queda registrada). Se corrigió además que la opción de forzar no llegaba al envío. La corrección del tipo de IVA en las facturas ya guardadas se aplicó en las dos donde estaba clara, y en 22 casos dudosos no se tocó nada.
- Dos facturas más enviadas al BC real y comprobadas. La lectura de buzones sigue funcionando con normalidad.

**Usuarios del cliente**
- Usuarios dados de alta y comprobados: Frank como dueño, Paco como administración (lo pedía desde el 30 de julio) y un operador por empresa (Marbori, Nova Finca y Castlexperience). Las contraseñas se entregan por un canal seguro, aparte.
- Correo a Frank redactado con el cambio de entorno, el reparto entre CaptuFact y la introducción manual, y los puntos que necesitan su decisión.

Pruebas automáticas en verde.

### ProgramaFichar — Enviado el arranque de la prueba a Marc

- **Correo de arranque enviado a Marc, con Frank en copia.** El asunto deja claro desde el principio que durante la prueba se sigue fichando con el sistema de siempre. Van adjuntos la aplicación de las tablets, la guía de montaje, los accesos de las siete tablets y los PIN de las tres personas que van a probar.
- Los PIN de prueba se renovaron y se comprobaron contra el kiosco sin dejar fichajes. El aviso automático por correo funcionó, otra prueba de que el correo de producción sale bien.
- Se reforzó la protección para que los documentos con accesos nunca se guarden en el repositorio de código.

## Estado actual

CaptuFact: en producción y **conectado al Business Central definitivo**, con aviso de duplicados contra BC y control del IVA antes de enviar. ProgramaFichar: la prueba de quince días ya no depende de nada de nuestro lado, a la espera de que Marc monte las tablets.

## Pendiente

- CaptuFact: enviar el correo a Frank y acordar el reparto con la introducción manual. Siete facturas de la cola esperan que se den de alta sus proveedores en BC. Siguen las decisiones de la serie de numeración de 2025, los proveedores sin términos de pago y el modo de pago "Tarjeta".
- ProgramaFichar: seguir la prueba con las tablets. Pendientes de terceros: mapeo de ubicaciones, NIF y forma jurídica de dos sociedades y perfiles de guardia. Más adelante: el cálculo semanal de Horas extra, la segunda capa de aislamiento entre empresas y el alta de Castlexperience.
