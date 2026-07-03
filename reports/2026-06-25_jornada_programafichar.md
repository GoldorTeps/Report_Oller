---
title: Jornada 25 de junio — ProgramaFichar: solicitudes de cambio del cliente
date: 2026-06-25
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 25 de junio de 2026

## Qué se hizo

### Registro de solicitudes de cambio (`Solicitudes_Cambio.xlsx`)

Se creó una plantilla compartida para canalizar el feedback de las aplicaciones entregadas: un único punto de entrada donde cualquiera puede registrar qué cambio pide, con trazabilidad de quién lo solicita.

- Estructura final, deliberadamente mínima: **Qué cambio pides · Para qué · Prioridad · Quién lo pide (opcional) · Fecha**.
- Columna **Prioridad** con desplegable Alta / Media / Baja.
- Columna **OK jefe** con desplegable, para la validación final del responsable.
- La plantilla está pensada para importarse a Google Sheets. El control de acceso (que solo el responsable pueda tocar Prioridad y OK jefe) se resuelve con la protección de rangos nativa de Sheets, restringida a su cuenta Google. Se dejaron documentados los pasos para aplicarla tras la importación.

### Cruce de feedback recibido contra el código (`Solicitudes_Cambio_PRUEBA.xlsx`)

Como prueba real de la plantilla, se recopiló todo el feedback recibido sobre ProgramaFichar y se contrastó, una por una, con el estado actual del código.

- **Fuentes de feedback revisadas:**
  - Correo de RRHH (`rrhh@ollerdelmas.com`, 11/06): 14 propuestas de mejora.
  - Correo de Frank Margenat (CEO, 24/06): 5 puntos.
  - Correo de Marc Arnau (RRHH, 22/06): 2 puntos, más el aviso de un fallo del PIN.
  - Se descartó a propósito el correo "Dudas Oller del Mas" del CEO (20/06) por pertenecer a otro proyecto, no a ProgramaFichar.
- Resultado: **22 solicitudes catalogadas (CR-01 … CR-22)**, cada una con su estado en código, la evidencia (archivos donde está resuelta) y qué falta cuando aplica.
- **Recuento final: 12 implementadas · 7 parciales · 2 no implementadas · 1 por investigar.**

### Hallazgos del cruce

- **Dos peticiones de Marc ya están hechas:** el reparto de horas extra entre nómina y bolsa de saldo (CR-20) y la carga de nóminas con extracción automática (CR-21) ya existen en el producto. Procede confirmárselo.
- **Fallo del PIN (CR-22):** reportado por Marc, aún sin resolver. Es el único punto realmente urgente. Falta la reproducción exacta y el mensaje de error.
- **Lo nuevo de mayor calado viene del CEO:** el autoalta del empleado (subida de DNI, foto y tarjeta de la Seguridad Social — CR-16) y las plantillas de contrato (CR-17). Ambas no implementadas.
- Panel de incidencias, amonestaciones y expediente visual (CR-15, CR-18, CR-19): parcialmente cubiertos.
- Patrón común en los parciales de RRHH: falta la **exportación nativa a Excel/PDF** de informes (CR-06, CR-10); el backend aún no genera esos ficheros.

## Estado actual

Producción estable, sin cambios en el código del producto: el trabajo de la jornada es de gestión de feedback posterior a la entrega. Quedan dos documentos preparados: la plantilla limpia de solicitudes de cambio, lista para subir a Google Sheets, y el documento de prueba con las 22 solicitudes ya verificadas contra el código.

## Pendiente

- **Fallo del PIN (CR-22):** pedir a Marc la captura o el mensaje exacto, más empresa y dispositivo, reproducir y corregir. Es lo único urgente.
- **Responder a Marc:** confirmarle que el reparto de horas extra y la carga de nóminas ya están disponibles.
- **Valorar las dos features del CEO:** autoalta del empleado y plantillas de contrato (las dos grandes, no implementadas).
- **Exportación nativa Excel/PDF** (CR-06, CR-10): palanca común de los parciales de RRHH.
- Aplicar en Google Sheets la protección por login de las columnas Prioridad y OK jefe.
