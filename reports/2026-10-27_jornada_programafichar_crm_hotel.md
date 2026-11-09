---
title: Jornada 27 de octubre — ProgramaFichar: ninguna nómina llega a quien no toca · Hotel: cada rol ve solo lo suyo · CRM: puerta para recibir datos del hotel
date: 2026-10-27
project: ProgramaFichar, CRM, Hotel
type: sesion
---

# Sesión de trabajo — 27 de octubre de 2026

## Qué se hizo

### ProgramaFichar — Reparto de nóminas blindado, en producción

Lo más importante del reparto de nóminas es que **ninguna llegue a otra persona**. Se revisó el circuito entero y se rehízo para que eso no pueda pasar por un despiste.

**Lo que había:** subir el PDF era entregarlo directamente, sin vista previa ni forma de retirar. Si no encontraba el DNI, casaba por nombre.

**Lo que hay ahora**
- **Dos pasos: Comprobar y Enviar.** RR. HH. sube el PDF entero, como siempre. La aplicación lo corta por páginas y enseña una tabla con a quién va cada nómina y, si alguna no cuadra, el motivo en claro. **Nada se envía hasta pulsar «Enviar».**
- **Casado solo por DNI**, con el apellido como comprobación. Si falta el DNI, no se reconoce, el nombre no cuadra o la nómina ya se entregó, esa página se queda fuera.
- Si entre Comprobar y Enviar cambia el PDF o alguna ficha, la aplicación obliga a comprobar de nuevo.
- **Retirar una nómina** desde gestión, solo administración, con confirmación.
- Cada entrega y cada retirada quedan en la auditoría.

**Con garantías**
- Probado con el PDF real de mayo página por página: 43 de 43 con DNI y cada página casada con su persona.
- Circuito completo probado en una copia aparte: un trabajador ve su nómina y otro no ve nada.
- Revisión de código a fondo: diez hallazgos, todos aplicados. 1.258 pruebas automáticas en verde. En las pruebas no queda ningún DNI real.
- **Desplegado a las 18:41**, verificado y sin incidencias.

**Preparación para el primer envío real**
- Consulta en producción: **ninguna nómina se ha entregado todavía por el portal**. Hay cinco fichas sin DNI y una con un documento que no es DNI ni NIE. Hay que corregirlas antes de enviar.
- **Protocolo de pruebas obligatorio para RR. HH.** antes del primer envío: empezar por su propia nómina y, después, el mes entero de golpe. Se dejó programado el correo a Marc con el protocolo en Word, explicando lo grave que sería un error y por qué esas pruebas no se pueden saltar.

### Hotel — Vigilancia en marcha y cada rol ve solo lo suyo

**La vigilancia, comprobada en el servidor**
- **El cierre automático de las 05:00 funcionó** por primera vez solo.
- La copia nocturna se hizo y se verificó (877 reservas), pero no dejó constancia en el registro de copias por un fallo nuestro que las pruebas no detectaron. **Corregido**, con una prueba que reproduce el fallo, y verificado en el servidor.
- **Avisos al móvil, instalados:** el programa avisa a David cada cinco minutos si algo falla.

**Correos con el hotel**
- A Frank, con Laia en copia, para pedir lo que faltaba (gestor de canales, parte de viajeros y exportación de FrontHotel). Además, una guía por si hay que sacar los datos de FrontHotel en remoto.
- A la gestoría, con Frank en copia: quién emite las facturas del hotel, VeriFactu, el cobro en recepción por cuenta de otras empresas y quién factura el consumo del restaurante y la tienda.
- **Respondió Paco el mismo día:** Business Central factura siempre con la serie del hotel de Golf, y VeriFactu lo cumple Business Central. Golf lleva hotel, cabañas, restaurante, gimnasio y deportes. Heretat lleva vino y tienda, y lo refactura a Golf. Todo va en la factura del hotel. Se recogió en el estudio y se le contestó con tres preguntas concretas.

**Cada persona ve solo lo que le toca**
- Se midió que hoy el programa solo distingue «entrado» y «administrador»: **cualquier usuario podía ver y tocar reservas, huéspedes y facturas.**
- Decisiones de David: limpieza solo ve las cabañas y su estado; recepción sigue igual salvo exportar huéspedes; dirección lo administra todo.
- Construido el motor: permisos por capacidad en **todas** las pantallas del servidor, con una prueba que falla si alguna se queda sin candado. Limpieza tiene su propia vista de las cabañas, sin nombres de huéspedes. La conexión con el restaurante usa una clave propia que se puede revocar.
- 463 pruebas automáticas en verde, y la migración probada sobre una copia de los datos de la demo.

### CRM — Puerta para que el hotel, el restaurante y la tienda envíen sus clientes

Quien consume en el hotel, el restaurante o la tienda tiene que aparecer en el CRM. Hasta hoy el CRM solo aceptaba datos de una persona que entrara con su usuario.

- **Clave de servicio por empresa:** cada aplicación (hotel, restaurante, tienda) tiene la suya, y la clave solo envía datos de su empresa. Se enseña una sola vez, no se guarda en claro y se puede revocar en cualquier momento.
- **Recepción de actividad:** el hotel envía estancias o consumos, y el CRM crea o completa la ficha del cliente sin duplicarla. Si un envío se repite, no se apunta dos veces.
- **Consentimiento:** sin permiso de marketing, no se crea ficha.
- **Datos protegidos:** el documento de identidad no viaja y cualquier dato que no esté en la lista permitida se rechaza.
- Nueva pantalla **Integraciones**, solo para administración.
- **Probado de punta a punta en local por David:** crear la clave, enviar actividad, verla en la ficha del cliente, revocar y comprobar que deja de funcionar. Un usuario comercial no ve la pantalla. Por el camino se ensayó el cambio de una clave perdida.
- 244 pruebas en el motor y 66 en la interfaz, en verde. **No está desplegado:** falta la revisión de seguridad.

## Estado actual

Nóminas blindadas en producción, a la espera de la prueba de RR. HH. En el hotel, la vigilancia funciona sola y los permisos por rol están construidos en el servidor. El CRM ya puede recibir clientes del hotel, todavía en local.

## Pendiente

- ProgramaFichar: prueba de RR. HH. con su propia nómina y corregir las fichas sin DNI. Vigilancia de 48 horas.
- Hotel: pantallas por rol y despliegue en la demo. Esperar respuesta de Frank, Laia y la gestoría.
- CRM: revisión de código y de seguridad de la conexión antes de desplegarla.
