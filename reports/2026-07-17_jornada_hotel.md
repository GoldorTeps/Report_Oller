---
title: Jornada 17 de julio — Hotel: la reserva de pistas y servicios ya calcula disponibilidad y precios, sin dobles reservas
date: 2026-07-17
project: Hotel
type: sesion
---

# Sesión de trabajo — 17 de julio de 2026

## Qué se hizo

### Hotel — Reserva de pistas y servicios: núcleo, disponibilidad y precios

Segunda jornada del programa de reservas. Se pasó de las bases a un motor que ya sabe **qué huecos hay libres y cuánto cuestan**.

**El núcleo de reservas, sin dobles reservas**
- Una pista, una cabina o una salida de golf **no puede reservarse dos veces para la misma hora**, ni siquiera si dos personas lo intentan en el mismo instante. Probado con reservas realmente simultáneas: siempre entra una y la otra recibe "ese hueco ya no está".
- Un masaje con la terapeuta ocupada **se rechaza aunque la cabina esté libre**.
- En golf, la reserva ocupa la hora de salida, no el campo entero durante horas.
- Los bloqueos (mantenimiento, cierre de una pista) funcionan igual que una reserva: no se puede reservar encima.

**Disponibilidad**
- **Horario propio para cada recurso**: cada terapeuta tiene su jornada y cada pista la suya. Los festivos y cierres puntuales se marcan como excepciones de horario.
- Si un recurso no tiene horario, **está cerrado**: nada se pone a la venta sin que alguien lo decida.
- Los **cambios de hora** de marzo y octubre están cubiertos: ni huecos duplicados ni huecos que desaparecen.
- En golf, con salidas de 8:00 a 20:00, la última salida es a las 19:52, como corresponde.
- **Dos errores encontrados en la verificación y corregidos**: el spa ofrecía masajes antes de que empezara la jornada de la terapeuta, y los huecos de un servicio que necesita varios recursos se solapaban entre sí. El segundo no lo detectaron las pruebas automáticas, sino la prueba del programa funcionando de verdad.

**Precios**
- Tarifas por sociedad y servicio, con posibilidad de **precio distinto por pista** (por ejemplo, la pista cubierta más cara).
- **Precio por reserva** (pádel) o **por persona** (golf: cada jugador paga su green fee).
- El **IVA siempre cuadra**: base más cuota igual al total, al céntimo.
- El precio queda **congelado en la reserva**: si mañana cambia la tarifa, la reserva conserva lo que se cobró.
- Si un hueco no tiene tarifa, no se ofrece.
- **Tercer error corregido**: el programa proponía la pista más cara teniendo una más barata libre. Ahora propone **la más barata** por defecto y el cliente puede elegir otra.

**Diseño independiente**
- Se revisó el programa para que no dependa de ningún sistema de facturación concreto: cada sociedad cobra con su TPV y la facturación se conecta después.

Todo cubierto con **144 pruebas automáticas en verde** (15 al empezar el día).

## Estado actual

Reserva de pistas y servicios: núcleo de reservas, disponibilidad y precios construidos y probados. Falta el cobro, la facturación y el enlace con el CRM.

## Pendiente

- Cobro con el TPV de cada sociedad.
- Conexión con la facturación y con el CRM.
- Preguntas de negocio abiertas: si la vuelta de golf consume cupo de campo y quién prepara la cabina del spa entre servicios.
