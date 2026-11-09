---
title: Jornada 29 de julio — CaptuFact: funcionando en Azure en pruebas, con los buzones reales y un volcado real a Business Central
date: 2026-07-29
project: CaptuFact, Azure
type: sesion
---

# Sesión de trabajo — 29 de julio de 2026

## Qué se hizo

### CaptuFact — Endurecido antes de subir a Azure

Antes de llevar la aplicación a Azure se reforzó por dentro:

- **La aplicación se niega a arrancar con contraseñas por defecto** o con una configuración insegura. Antes podía arrancar con valores de ejemplo sin que nadie se diera cuenta.
- **La clave interna de sincronización ya no viaja dentro de la web pública.** Antes iba incrustada en el código que descarga el navegador; ahora el botón de sincronizar funciona con la sesión del usuario.
- Se cerró el acceso público a una página de métricas técnicas que quedaba expuesta sin contraseña.
- **Fallo antiguo descubierto y corregido:** los avisos de vencimiento de facturas no se enviaban nunca por un error que quedaba oculto. Arreglado y con su prueba.
- Un interruptor que permite **impedir que un entorno vuelque a Business Central**, para que pruebas y producción nunca envíen la misma factura dos veces.
- Pruebas automáticas en verde (371).

### Azure — CaptuFact funcionando en el entorno de pruebas, de punta a punta

Sobre la infraestructura montada ayer se desplegó CaptuFact, con estas decisiones: lee los **buzones reales en paralelo** con el servidor actual desde el primer día, y se permite **un volcado real a Business Central** en su entorno de pruebas, con una factura de prueba que luego se borra.

- Dos diferencias de la base de datos de Azure obligaron a **adaptar una actualización de la base de datos**: ahora aplica el refuerzo de seguridad si puede, y si no puede y detecta un riesgo, se detiene en lugar de seguir.
- **Comprobado en Azure:**
  - El inicio de sesión queda registrado con la dirección real de quien entra.
  - Un PDF de prueba se guarda en el almacenamiento de Azure y la lectura automática extrae bien importes, IVA, fechas y NIF.
  - La aplicación se conecta desde Azure a los dos buzones reales de proveedores.
  - **Pruebas y producción no se pisan los correos:** la lectura no marca los correos como leídos y cada instalación evita duplicados por su cuenta, así que la lectura en paralelo es segura.
  - Cada empresa ve solo lo suyo, también en la base de datos de Azure.
  - **Volcado real a Business Central:** la factura de prueba llegó como borrador a MARBORI, S.L. con su PDF idéntico al original, y después se borró.
- Al terminar se **apagó el volcado a BC desde Azure**: mientras convivan los dos entornos, solo vuelca el servidor actual.
- Se cerró el acceso temporal abierto para la instalación y se completó el manual de operación.

## Estado actual

CaptuFact funcionando en pruebas en Azure, leyendo los buzones reales y verificado de punta a punta, con el volcado a BC apagado allí. El servidor actual sigue siendo producción.

## Pendiente

- Ver entrar en Azure un correo real con factura y comprobar que el ciclo siguiente no lo duplica.
- Revisión visual de la aplicación en Azure con la cuenta de Frank.
- Siguen abiertos: el IVA del borrador en BC (pregunta a Suitech), los borradores de prueba antiguos de BC y la tercera copia del código.
- Más adelante: copia de los documentos en otra región y el cambio definitivo de producción a Azure.
