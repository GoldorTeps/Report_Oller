---
title: Jornada 6 de julio — GestorFacturas: sonda de conexión segura a Business Central (solo lectura) + solicitud de acceso al partner
date: 2026-07-06
project: GestorFacturas
type: sesion
---

# Sesión de trabajo — 6 de julio de 2026

## Qué se hizo

### GestorFacturas — Sonda de conexión a Business Central, de solo lectura y con red de seguridad

Primer paso del plan de conexión blindado con Business Central: comprobar que la aplicación puede conectarse y leer, sin ningún riesgo de modificar nada.

- Se construyó una **herramienta de sonda** que prueba la conexión servicio-a-servicio con Business Central **en modo de solo lectura**: se autentica, comprueba el acceso y **lee las cuentas contables (G/L) reales** que hacen falta para la Fase 3, sin escribir ni contabilizar absolutamente nada.
- Cubierta con sus **pruebas automáticas** (comprobación de la conexión y de la lectura de cuentas), en verde.
- Es el arranque del plan de prueba acordado: primero conexión de solo lectura y, solo mucho después y de forma deliberada, cualquier envío.

### GestorFacturas — Solicitud formal de acceso al partner técnico del cliente (Suitech)

- Se preparó y afinó la **solicitud formal** dirigida al cliente para que la traslade a su partner técnico (Suitech), pidiendo de una sola vez todo lo necesario para dejar la conexión operativa: el acceso de servicio a Business Central, los permisos de la aplicación y el registro en el **entorno de pruebas (sandbox)**. Petición acotada al sandbox; Producción no se toca.

## Estado actual

GestorFacturas: la sonda de conexión de solo lectura a Business Central está construida y probada, lista para ejecutarse en cuanto el partner técnico del cliente habilite el acceso al entorno de pruebas. La solicitud de ese acceso queda redactada y lista para enviar.

## Pendiente

- Que el partner técnico del cliente (Suitech) habilite el acceso al sandbox de Business Central (credenciales de servicio + permisos + registro de la aplicación).
- Con el acceso disponible: ejecutar la sonda de solo lectura contra el entorno de pruebas real (empresas, proveedores y cuentas contables) como primer paso del plan blindado.
