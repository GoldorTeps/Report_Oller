---
title: Jornada 17 de octubre — Hotel: estudio de cómo convivir con el sistema actual y demo abierta a dirección y recepción
date: 2026-10-17
project: Hotel
type: sesion
---

# Sesión de trabajo — 17 de octubre de 2026

## Qué se hizo

### Hotel — Estudio previo para trabajar en paralelo con FrontHotel

Se hizo una revisión en profundidad del programa del hotel y de lo que haría falta para usarlo de verdad junto al sistema actual, sin riesgo para la operación.

**Dónde está el programa hoy**
- El núcleo del hotel (reservas, recepción, caja, limpieza, cierre del día) está completo y con sus pruebas automáticas. Faltan piezas: el cobro con tarjeta está a medias, la conexión con el channel manager solo recibe altas, la conexión con Business Central no está activa, los permisos por rol son todavía básicos y no hay alertas ni vigilancia del servidor.
- Restaurante, tienda, mensajería interna y solicitudes de clientes **todavía no existen**.

**Cómo ponerlo en marcha sin riesgo**
- Una **fase en sombra**, con FrontHotel como sistema de referencia y el programa nuevo en paralelo, y después una fase invertida; un **corte con criterios escritos**, una conciliación diaria entre los dos sistemas, una vuelta atrás ensayada y un importador de los datos de FrontHotel.
- Un **endurecimiento previo** antes de manejar reservas reales: alertas, copias de seguridad verificadas, permisos por rol y pruebas de pantalla.
- Un **módulo común** para hotel, restaurante y tienda: mensajería interna con acuse de lectura y solicitudes de clientes con su seguimiento, todo registrado por trabajador.
- Restaurante y tienda **se integran con su caja actual**, no la sustituyen.

**Mercado y ley**
- Comparativa con Mews, Cloudbeds, Octorate, Beds24, Little Hotelier, Noray e ICG.
- Hallazgo importante: **en Cataluña el parte de viajeros va a los Mossos**, no al sistema estatal al que apuntaba el programa. Revisadas también VeriFactu y la tasa turística catalana.

**Conclusión del estudio**
- El esfuerzo diseñado es mayor que el tiempo disponible para hacerlo todo a la vez; el estudio propone **tres opciones de alcance y orden** para que se decida cuál seguir. Las partes que no tocan reservas reales (mensajería y solicitudes) se pueden usar antes sin necesidad de paralelo.
- El documento pasó una revisión crítica, que señaló el punto débil principal: **todavía no han opinado sobre este diseño recepción, restaurante, tienda ni limpieza**.

### Hotel — Demo abierta a dirección y recepción

- **Cuentas propias** para Laia (dirección, con acceso completo) y para recepción y noche. Las contraseñas y PIN de demostración que había hasta ahora **quedan anuladas**. Copia de seguridad previa y comprobación desde internet de que cada perfil entra y ve solo lo que le corresponde.
- **Guía de primer día en catalán** (en PDF, dos páginas): cómo entrar, el mostrador con PIN y bloqueo automático, qué datos son de prueba y qué hacer si algo falla. Sin contraseñas en la guía: los accesos van por un canal aparte.
- Correo con la demo y la guía preparado para salir el lunes a primera hora.

## Estado actual

Hotel: demo en marcha con cuentas propias para dirección y recepción, y estudio previo escrito con tres opciones para decidir.

## Pendiente

- Enviar la demo y la guía el lunes; hacer llegar los accesos a Laia y a recepción por un canal aparte.
- Decidir entre las tres opciones del estudio y preparar una versión resumida para Frank y Víctor.
- Confirmar con el hotel qué channel manager usa, conseguir una muestra de datos de FrontHotel y confirmar el envío del parte de viajeros a los Mossos.
