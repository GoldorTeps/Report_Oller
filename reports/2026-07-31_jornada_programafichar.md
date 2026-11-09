---
title: Jornada 31 de julio — ProgramaFichar: todas las mejoras de la semana, en producción, y la aplicación de las tablets lista para instalar
date: 2026-07-31
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 31 de julio de 2026

## Qué se hizo

### ProgramaFichar — La aplicación de las tablets, lista para enviar

- La aplicación Android del kiosco sale **firmada y lista para instalar** en cada tablet, con sus instrucciones.
- Es **una sola aplicación para todas las tablets**: lo que distingue el kiosco de Restaurante del de Oficinas es el código de activación que se introduce al arrancarla, y es el sistema quien le dice qué tipo de kiosco es y de qué empresas.

### ProgramaFichar — Los kioscos, gestionados desde la pantalla

- Hasta hoy, crear un kiosco para varias empresas solo se podía hacer por detrás. Ahora hay una **pestaña Kioscos** en el panel de grupo, visible para Frank y para RR. HH.:
  - lista de kioscos con su tipo y sus empresas;
  - alta de un kiosco nuevo (normal o de restaurante, y qué empresas ficha);
  - el código de activación se enseña **una sola vez**, con botón de copiar;
  - retirada de un kiosco, con confirmación.
- Un administrador de una sola empresa no tiene acceso a esta pestaña.
- Pruebas automáticas en verde (95 en la interfaz).

### ProgramaFichar — Paso a producción

Se llevó a producción todo lo construido en la semana.

- **Revisión previa** del servidor sin tocar nada, para confirmar que el paso era limpio.
- **Red de seguridad:** copia completa de la base de datos de producción antes de empezar y vuelta atrás escrita por si hacía falta. No hizo falta.
- El despliegue actualizó la base de datos de producción con las cuatro actualizaciones pendientes **sin incidencias**.
- **Verificado tras el despliegue:** todo arriba y sin errores, un inicio de sesión incorrecto se rechaza como debe, el fallo de los «0 empleados» ya no aparece y el kiosco responde. Las tablets que ya estaban en marcha siguen funcionando con su activación anterior.
- **Producción y Azure tienen ya exactamente la misma versión.**

Lo que gana producción: la recuperación de contraseñas, el registro de actividad para Frank, las cuentas en tres niveles, el kiosco para todo el grupo y el de restaurante, la pestaña Kioscos y todas las correcciones de la semana. El kiosco de grupo aún no se usa: las tablets siguen con su activación anterior hasta pasarlas a la aplicación nueva.

## Estado actual

ProgramaFichar con todas las mejoras de la semana **en producción**, verificado y con copia previa. La aplicación de las tablets, firmada y lista para instalar.

## Pendiente

- Confirmar con Marc que las tablets fichan con normalidad tras el despliegue.
- Decidir contra qué instalación fichan las tablets nuevas (servidor actual o Azure) antes de pasarlas a la aplicación Android.
- Entregar a Marc su acceso, los PIN, la aplicación y los códigos de los kioscos.
- Siguen abiertos: los NIF de las empresas que faltan, el email de recuperación en Azure y la revisión de Frank del registro de actividad.
