---
title: Jornada 3 de agosto — ProgramaFichar: primeros fichajes reales y feedback del grupo convertido en plan · CaptuFact: acceso para revisar con los ojos del dueño
date: 2026-08-03
project: ProgramaFichar, CaptuFact
type: sesion
---

# Sesión de trabajo — 3 de agosto de 2026

## Qué se hizo

### ProgramaFichar — Primeros fichajes reales desde el kiosco y el feedback del grupo, ordenado

**Lo que dicen los registros del servidor**
- Por la mañana, la aplicación del kiosco enviada el 31 de julio todavía no se había instalado en ningún dispositivo. Lo único registrado era el recorrido completo del panel de administración que hizo Frank el sábado.
- Por la tarde cambió todo: **la aplicación ya estaba instalada en un móvil Android y registró seis fichajes reales**. Marc entró por primera vez en el panel y cambió su contraseña inicial.
- Se detectaron tres tropiezos en esas primeras pruebas, que se anotaron para resolver: algunos PIN rechazados (hay un bloqueo de seguridad tras varios intentos fallidos), un intento de fichar una acción sin jornada abierta, y **un fallo real en el desplegable de departamentos** que Frank y Marc vieron los dos.

**El feedback de Frank y de dirección, convertido en una lista de trabajo**
- Se recibieron las peticiones de Frank (especificación de tablet, bloqueo de pantalla, PIN más robusto, apuntarse a la cantina, préstamo de material, uniformes y equipos, gestor de contraseñas) y la de dirección sobre el **tiempo de guardia** para Castlexperience.
- Antes de estimar nada se revisó el código. Resultado: **buena parte de lo pedido ya está construido** (la cantina, la firma con evidencia legal, la entrega de uniformes y equipos con acuse de recibo y los avisos de vencimiento). Lo que falta de verdad es el concepto de perfil o categoría del trabajador, necesario para el tiempo de guardia.
- Sobre el gestor de contraseñas se dejó una **objeción por escrito**: generar las contraseñas a partir del correo o del nombre de usuario permitiría a cualquiera que conozca la regla deducir la contraseña de todos. La contrapropuesta es generación aleatoria con una bóveda cifrada, valorando antes soluciones ya existentes.
- Se preparó un **inventario de cumplimiento legal verificado en el código** (registro evento a evento exportable, correcciones que no borran el original, vigilancia diaria de límites de jornada y descanso, consentimiento de geolocalización, acceso del trabajador a sus fichajes). En la misma revisión se anotaron, con honestidad, los puntos que todavía hay que reforzar: la inmutabilidad de los fichajes a nivel de base de datos y el rastro de auditoría en todas las acciones de administración.
- Entregables: lista de peticiones con estado, esfuerzo y fases (también en hoja de cálculo para revisarla punto por punto) y borradores de respuesta a Frank y a dirección.

### CaptuFact — Una cuenta para ver la aplicación exactamente como la ve Frank

- Para poder decidir sobre los puntos de su feedback del 30 de julio hacía falta ver las pantallas tal y como las ve él. Se creó en producción una **cuenta propia con el mismo perfil de dueño**, sin tocar ningún usuario existente.
- Acceso verificado desde fuera, por la dirección pública. Sin cambios en el código de la aplicación.

## Estado actual

ProgramaFichar: la aplicación del kiosco ya ficha de verdad desde un móvil del cliente y el feedback está ordenado por fases. CaptuFact: en producción sin cambios, con acceso preparado para revisar el feedback de Frank.

## Pendiente

- ProgramaFichar: arreglar el fallo del desplegable de departamentos, probar el bloqueo de pantalla en una tablet real, enviar las respuestas a Frank y a dirección y acordar el alcance de las fases nuevas.
- CaptuFact: recorrer la aplicación como dueño y decidir con Frank cómo queda el circuito de aprobación (uno o dos pasos).
