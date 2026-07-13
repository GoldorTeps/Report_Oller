---
title: Jornada 10 de julio — Preparación del despliegue en Azure (Marbori) y definición del clon de Document Capture
date: 2026-07-10
project: ProgramaFichar, GestorFacturas
type: sesion
---

# Sesión de trabajo — 10 de julio de 2026

## Qué se hizo

### ProgramaFichar — Plan de migración a Azure del cliente (Marbori)

De cara a llevar las aplicaciones al entorno Azure propio del cliente, se dejó preparado todo lo que se puede adelantar sin necesidad de acceder aún a su suscripción.

- **Guion de migración pensado "para toda la flota"**: en lugar de pedir accesos aplicación por aplicación, se define **una única sesión de alta con la cuenta de administrador del cliente** que deja al desarrollador con permiso para desplegar, él solo y de forma repetible, **todas** las aplicaciones futuras (ProgramaFichar, el Gestor de Facturas, el Hotel…) sobre la misma suscripción. Se pide una vez, sirve para todas.
- **Estructura de recursos ordenada**: una plataforma compartida y un grupo de recursos por aplicación (cada una con su propia base de datos, almacenamiento y credenciales aisladas).
- **Arranque limpio de una instalación nueva, resuelto y verificado**: se detectó y corrigió un problema que impedía instalar la aplicación desde cero en un entorno nuevo, y se probó el procedimiento completo de principio a fin (con el esquema real de producción) hasta dejarlo funcionando. Cubierto con pruebas automáticas.

### GestorFacturas — Preparación del despliegue en Azure

- **Almacenamiento de documentos preparado para Azure**: la aplicación puede guardar los PDF tanto en el servidor local como en el almacenamiento de Azure (Blob) del cliente, de forma transparente y sin tocar lo que hay hoy en producción. Cubierto con pruebas automáticas.
- **Infraestructura descrita como código**: esqueleto de la infraestructura Azure (base de datos, almacenamiento, contenedores y bóveda de secretos) lista para desplegar de forma controlada y reproducible, con los secretos siempre fuera del código.

### GestorFacturas — Definición del sustituto de la solución de pago (Document Capture)

A partir de la formación real de la solución externa (Continia) sobre el Business Central del cliente, se destiló el **pliego de lo que GestorFacturas debe hacer para sustituirla** por completo:

- Reconocimiento de facturas con **varias líneas y varias bases de IVA**, **dimensiones contables**, y un **maestro de conceptos y puntos de suministro (CUPS)** que el cliente puede cargar por archivo.
- El **caso estrella**: facturas de suministros (luz/agua) con cientos de líneas por ubicación, justo donde la solución de pago se atasca.
- Un **plan de trabajo por fases** cerrado, revisado críticamente antes de arrancar.

## Estado actual

Toda la preparación del despliegue en Azure (guion de migración, arranque limpio verificado, almacenamiento y esqueleto de infraestructura) está lista en local, sin tocar producción. La definición del sustituto de la solución de pago queda cerrada y lista para empezar a construirse.

## Pendiente

- **El único bloqueo de la migración**: la sesión de alta de accesos con el cliente (su administrador de Azure). Con eso hecho, el despliegue es mecánico siguiendo el guion.
- Construir el sustituto de Document Capture según el plan por fases (líneas y bases múltiples, dimensiones, maestro de suministros, caso estrella).
- ProgramaFichar: corregir el fallo del PIN (producción).
