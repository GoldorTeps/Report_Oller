---
title: Jornada 9 de octubre — ProgramaFichar: ausencias en el balance, viernes de oficina y festivo trabajado · CaptuFact: leer sabiendo quién es el proveedor
date: 2026-10-09
project: ProgramaFichar, CaptuFact
type: sesion
---

# Sesión de trabajo — 9 de octubre de 2026

## Qué se hizo

### ProgramaFichar — El correo «Tema varios» de Marc, resuelto y en producción el mismo día

Marc pidió tres cosas por la mañana. Las decisiones de negocio se tomaron a mediodía y las tres se construyeron, se probaron y se desplegaron juntas.

**1. Las ausencias cuentan en el balance**
- Una baja, una visita médica o unas vacaciones **suman al balance, no a lo trabajado**: «Trabajado» sigue siendo lo fichado, y el balance pasa a ser trabajado + ausencia justificada − contratado. Lo justificado de un día nunca pasa de lo que faltaba ese día.
- La tabla lleva una leyenda que lo explica. El día anterior se le había dicho a Marc lo contrario; el correo lo aclara y le avisa de que cambian las cifras.

**2. Un horario distinto el viernes**
- La oficina trabaja en partido de lunes a jueves y 6 horas seguidas el viernes. Ahora **un horario puede tener un día de la semana con sus propias horas**, y el panel, la ficha y la tabla lo enseñan.
- El aviso de **«Más de 6 h sin pausa»** respeta el horario del día: con una jornada prevista de 6 horas o menos no salta hasta 15 minutos después de lo previsto. Regularizar propone el viernes la salida de las 14:00.

**3. Trabajar en festivo abona un día de vacaciones**
- Cualquier jornada con horas en un festivo del calendario suma **un día más de vacaciones**. Se apunta solo cada noche y RR. HH. puede anularlo con una nota. Se ve en la ficha, en los saldos de ausencias y en el portal del trabajador.
- De paso: unas vacaciones de solo unas horas ya no gastan un día entero.

**Con garantías**
- Las dos migraciones de base de datos se probaron en una copia desechable (suben, bajan y vuelven a subir; las reglas rechazan lo que deben; cada empresa ve solo lo suyo). Punto de recuperación guardado antes.
- Pruebas automáticas en verde: más de 1.000 en el motor y 258 en la interfaz.
- Desplegado a mediodía y verificado en producción. Correo a Marc enviado, con Frank en copia, con el cambio de cifras, cómo poner el viernes de oficina y cómo funciona el abono de festivos.

### CaptuFact — Leer sabiendo quién es el proveedor (construido, sin desplegar)

Paco, tras usar la aplicación, resumió el problema en dos frases: «lee mal» y «corrijo lo mismo cada vez». Pidió poder seleccionar varias facturas, decir de qué proveedor son y que se vuelvan a leer sabiéndolo.

**Construido**
- **Reconocer al proveedor antes de leer:** el lector busca en el documento el CIF impreso y lo compara con los proveedores de Business Central. Solo lo da por seguro si hay uno; si encuentra otro distinto, avisa en ámbar y no fuerza nada.
- **«Son de un proveedor…»:** se seleccionan varias facturas, se elige el proveedor de Business Central y se vuelven a leer enteras, con vista previa factura a factura. Lo que una persona ya tocó a mano no se pisa, y las aprobadas, en Cola o ya en Business Central se saltan diciendo por qué.
- **Notas por proveedor:** finanzas puede apuntar cómo son las facturas de cada proveedor (cortas y acotadas), y el lector las tiene en cuenta.
- **Se encontró y se corrigió** que «Reescanear» registraba como corrección de una persona lo que en realidad había escrito el lector automático.

**El histórico de facturas**
- Frank dio acceso a cinco sitios de SharePoint. Inventario de solo lectura: **30.906 PDF**, organizados por flujo de trabajo y no por proveedor, de los que un 10 % aproximado son escaneados. Business Central solo tiene facturas de Marbori de 2026 para contrastar.
- Se decidió que la referencia buena serán las facturas de 2026 ya validadas por finanzas, y que el histórico servirá para aprender el formato de cada proveedor, siempre con revisión de una persona.

**Con garantías**
- **Revisión de código a fondo**, **revisión de seguridad** y **revisor independiente**: sus condiciones quedaron aplicadas.
- Más de 2.400 pruebas automáticas en el motor y 557 en la interfaz, en verde.
- **Producción no se tocó:** queda guardado a la espera de la decisión de desplegar.

## Estado actual

ProgramaFichar: balance con ausencias, horario por día y abono de festivos en producción. CaptuFact: producción estable; la relectura por proveedor y el inventario del histórico, listos y sin desplegar.

## Pendiente

- ProgramaFichar: comprobar la primera noche del abono de festivos (el 12 de octubre es el primer festivo); ver si Marc configura el viernes de oficina; vigilar que las jornadas cortas sin pausa dejan de avisar antes de 6 h 15.
- CaptuFact: desplegar la relectura por proveedor cuando se decida; correo a Frank y Paco con cinco preguntas sobre el mapa de proveedores; empezar a cargar el histórico por tandas.
