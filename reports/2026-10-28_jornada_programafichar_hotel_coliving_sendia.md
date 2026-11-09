---
title: Jornada 28 de octubre — ProgramaFichar: añadir un día sin fichajes y Fichajes por nombre · Hotel: permisos por rol en la demo · Coliving Sendia: arranca la base de datos
date: 2026-10-28
project: ProgramaFichar, Hotel, Coliving Sendia
type: sesion
---

# Sesión de trabajo — 28 de octubre de 2026

## Qué se hizo

### ProgramaFichar — Lo que pidió Marc, en producción el mismo día

A primera hora, Marc contó un caso: una persona trabajó el viernes 23 sin fichar la entrada. Las pausas y la salida se rechazaron porque no había jornada abierta, así que ese día no aparecía en Fichajes y no había nada que corregir. También pidió ver Fichajes en orden alfabético.

**Añadir un día sin fichajes**
- Nuevo botón **«Añadir día sin fichajes»**, solo para administración. Se ponen la entrada, la salida y el motivo, y queda una jornada cerrada. Las pausas se añaden después con «Corregir», como siempre.
- **Protegido contra errores:** la salida tiene que ser posterior a la entrada, no se admiten jornadas de más de 16 horas ni días futuros, el día tiene que caer dentro del periodo de alta de la persona y no se puede solapar con otra jornada. Hay una casilla para el turno de noche.
- La fila queda **marcada en ámbar** para que se vea que la puso gestión, y el trabajador recibe el mismo aviso por correo que con cualquier corrección. Todo queda en la auditoría.

**Fichajes en orden alfabético**
- Selector **Orden: Hora / Nombre**, que la aplicación recuerda.

**Con garantías**
- Revisión de código a fondo: ocho hallazgos, siete aplicados. Uno de ellos: una jornada vieja sin cerrar podía tapar todos los días siguientes de esa persona.
- 1.294 pruebas en el motor y 455 en la interfaz, en verde. Circuito completo probado dos veces en una copia aparte.
- **Desplegado a las 14:55**, verificado y sin incidencias.

### Hotel — Las pantallas por rol, en la demo

**Cada rol ve solo lo suyo**
- Limpieza entra directamente en **Habitaciones**: sin buscador de reservas, sin nombres de huéspedes y con la ocupación, las entradas y salidas del día y las notas.
- Recepción trabaja igual que antes. Dirección tiene además **Integraciones**, donde se crean las claves de las otras aplicaciones (la clave se enseña una sola vez).
- En Usuarios ya se puede dar de alta a una persona de limpieza.
- Revisión visual de los tres roles, en móvil y en ordenador, sin errores.

**Orden en el código:** el programa se presenta en castellano, catalán e inglés. El código interno había empezado a mezclar catalán y se pasó todo a un único criterio que entienda cualquier programador. Una comprobación automática impide que vuelva a pasar, y en su primera pasada ya cazó un fallo.

**Desplegado en la demo, y tres fallos que encontró David al probarlo en su iPhone:**
1. **El estado de limpieza no se guardaba.** Causa: la base de datos de la demo tenía dos tablas con una forma antigua, anterior a las migraciones de junio. Por la misma razón, la pantalla de Facturas también fallaba. Se corrigió con una migración probada sobre una copia de los datos, y se añadió una **herramienta que compara la base de datos con lo que espera el programa** después de cada despliegue. Las pruebas no lo veían porque crean las tablas de cero. Es un fallo nuestro y queda vigilado.
2. **Contraseñas a ciegas:** ahora hay un ojo para ver lo escrito en el inicio de sesión, el alta de usuarios, el PIN y los ajustes.
3. **El móvil ampliaba la pantalla** al tocar un campo y no volvía sola. Corregido sin bloquear el zoom.

467 pruebas en el motor y 83 en la interfaz, en verde.

### Coliving Sendia — Diseño firmado y base de datos

- Arranca la aplicación propia para gestionar el alquiler de habitaciones de Sendia, **desde la solicitud en la web hasta el último cobro del contrato**. Cubre todos los módulos del programa que usan hoy y mejora lo que falla. Se empieza con supuestos razonables, mientras se espera que Frank confirme la especificación.
- **Diseño firmado por David** con doce mejoras, entre ellas:
  - una plaza no se puede alquilar dos veces (lo impide la propia base de datos);
  - cobro automático con reintentos y panel de morosidad;
  - facturas numeradas sin huecos;
  - DNI cifrado con registro de quién lo consulta;
  - historial que no se puede reescribir.
- Pasarela de pago para tarjeta y SEPA: Stripe, la única que cubre las dos sin reservas según la comparativa de pasarelas que pasó el cliente.
- **Base de datos construida:** 53 tablas. Las migraciones suben, bajan y vuelven a subir, y la aplicación trabaja con un usuario sin privilegios. 57 pruebas automáticas en verde. Una de ellas cazó una regla mal escrita (una factura emitida sin número pasaba) y se corrigió.
- Quedan tres preguntas para Frank y Paco que bloquean la parte de facturación: quién factura la renta en los pisos de gestión, qué IVA lleva cada concepto y cómo son las series.

## Estado actual

ProgramaFichar en producción con el día sin fichajes y el orden por nombre. El hotel tiene los permisos por rol desplegados en la demo, a falta de la prueba de David en el móvil. Coliving Sendia tiene el diseño firmado y la base de datos lista.

## Pendiente

- ProgramaFichar: contestar a Marc con las novedades. Sigue en marcha la vigilancia de las nóminas.
- Hotel: prueba en el móvil como limpieza, prueba de cargo del restaurante, revisión de código y seguridad del bloque. La tabla de Usuarios aún no se adapta bien al móvil.
- Coliving Sendia: respuestas de Frank y Paco sobre facturación; siguiente fase, el motor.
