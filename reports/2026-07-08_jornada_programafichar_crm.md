---
title: Jornada 8 de julio — ProgramaFichar: sprint BETA (fichaje móvil, cambio de kiosco, vehículos) + CRM en pruebas
date: 2026-07-08
project: ProgramaFichar, CRM
type: sesion
---

# Sesión de trabajo — 8 de julio de 2026

## Qué se hizo

### ProgramaFichar — Sprint BETA: las cuatro peticiones para arrancar con tablets

De cara a arrancar la fase de pruebas reales con tablets, Marc (tras hablar con Frank) trasladó cuatro peticiones. Se construyeron las cuatro, se revisaron y se probaron en vivo.

**1. Varias tablets a la vez + copia de seguridad semanal**
- El sistema ya soporta varias tablets en paralelo. Se **amplió la copia de seguridad** para que incluya también las fotos y los documentos firmados (antes solo se respaldaba la base de datos).

**2. Fichaje desde el móvil (teletrabajo y ruta)**
- El empleado puede fichar desde su propio portal, sin ir a una tablet. Se activa empleado por empleado.
- A petición de Marc, se incorporó **geolocalización con consentimiento del empleado y registro de evidencia**, conforme a la normativa de protección de datos.

**3. Empezar la jornada en una tablet y terminarla en otra**
- Resuelto y verificado: el fichaje sigue al empleado, no al dispositivo. Puede entrar en una tablet y salir en otra sin problema.

**4. Vehículos de empresa**
- El empleado que usa un vehículo hace una **foto con la cámara** al empezar (cuadro de kilómetros/hora) y al terminar (cuadro + exterior), y puede anotar los kilómetros a mano.
- RRHH consulta el historial con un visor de fotos. Las fotos se conservan **24 meses** y luego se borran automáticamente (se guarda el registro sin la imagen).

**Calidad y seguridad**
- En la revisión se detectó y corrigió un **fallo importante de aislamiento entre empresas** (un cliente podría haber visto fotos y datos de otro): se cerró y se añadió una prueba específica que lo garantiza.
- Todo el sprint quedó cubierto con **más de 400 pruebas automáticas (en verde)** y se probó en vivo, incluida la comprobación de que cada empresa solo ve lo suyo.

### CRM — Puesta en marcha en local para pruebas
- Se dejó el CRM (la versión 1 del día anterior) levantado y accesible para probarlo cómodamente en el navegador antes de enseñarlo. Acceso de administrador verificado y flujo completo funcionando.

## Estado actual

ProgramaFichar: el sprint BETA (fichaje móvil con geolocalización, cambio de kiosco y control de vehículos) está terminado, probado y validado, listo para desplegar. El despliegue a producción queda planificado para el día siguiente.

CRM: la versión 1 queda accesible en local para revisarla en el navegador.

## Pendiente

- Desplegar el sprint BETA de ProgramaFichar a producción.
- Confirmar la copia de seguridad automática en el servidor.
- Confirmar a Marc que las cuatro peticiones están entregadas.
