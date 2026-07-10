---
title: Jornada 9 de julio — ProgramaFichar: sprint BETA en producción + GestorFacturas: acceso multi-empresa
date: 2026-07-09
project: ProgramaFichar, GestorFacturas
type: sesion
---

# Sesión de trabajo — 9 de julio de 2026

## Qué se hizo

### ProgramaFichar — El sprint BETA, desplegado en producción

Las cuatro peticiones de Marc (fichaje móvil con geolocalización, cambio de kiosco y control de vehículos) pasaron de estar listas a estar **vivas en producción**.

- **Despliegue con red de seguridad:** antes de tocar nada se hizo una **copia de seguridad completa** del servidor (base de datos + fotos y documentos). El despliegue se realizó de forma automática y controlada.
- **Verificado tras el despliegue, todo correcto:** el sistema responde, las nuevas funciones (geolocalización, vehículos, permisos por empleado) están operativas en producción, y el portal público carga sin problemas.
- **Copia de seguridad automática, por fin activa:** se descubrió que la copia semanal que se daba por hecha **nunca había estado programada**. Se instaló de verdad: se ejecuta sola **cada domingo de madrugada** y cubre base de datos + fotos y documentos (con 30 días de retención). Es la "copia semanal" que Marc pidió.
- Se avisó a Marc de que las cuatro peticiones están entregadas y en marcha.

### GestorFacturas — Acceso multi-empresa: cada empresa ve solo lo suyo, con aprobación antes de volcar

De una pregunta al mirar la aplicación ("¿esto sirve para varias empresas a la vez?") salió una funcionalidad completa de **acceso multi-empresa**, construida y verificada en el día.

**El planteamiento**
- El Grupo Oller del Mas tiene **varias empresas** que comparten un mismo Business Central. La aplicación de facturas ahora **aísla por empresa**: cada persona ve y trabaja solo con las facturas de la empresa que le corresponde.
- **Perfiles definidos:** el dueño (Frank) da el visto bueno final; una administración central que ve todas las empresas; y un responsable por empresa que **solo ve la suya**.
- **Circuito de aprobación para volcar a Business Central:** el responsable marca una factura como "lista"; el dueño o la administración la aprueban desde una **bandeja de volcado**, y solo entonces se envía. La aplicación nunca contabiliza sola.

**Cómo se hizo, con garantías**
- El aislamiento entre empresas está reforzado **a nivel de base de datos**, no solo en la pantalla: aunque alguien intentara acceder a una factura de otra empresa, el sistema lo impide. Verificado con pruebas específicas de "no fuga" (una empresa no ve absolutamente nada de otra).
- La interfaz se adaptó a cada perfil: columnas de empresa, marca de "listo", la bandeja de volcado para quien aprueba, y la gestión de usuarios y empresas.
- Todo cubierto con sus **pruebas automáticas (más de 120, en verde)** y verificado probando los cinco perfiles reales en el navegador.
- **Producción no se tocó:** todo el desarrollo se hizo en una línea de trabajo separada; lo que el cliente usa hoy queda intacto.

## Estado actual

ProgramaFichar: el sprint BETA está **vivo en producción**, verificado de principio a fin, con copia de seguridad automática semanal activa y Marc avisado.

GestorFacturas: el acceso multi-empresa (aislamiento por empresa + circuito de aprobación) está construido, probado y funcionando por perfil, sin tocar producción. Listo para desplegar cuando se conecte con Business Central.

## Pendiente

- ProgramaFichar: vigilar la fase BETA con el uso real de tablets, móvil y vehículos; confirmar el primer disparo de la copia de seguridad el domingo 13. De fondo, a la espera de decisión del cliente: resolver el fallo del PIN, la firma de contratos y las nuevas funciones propuestas (autoalta del empleado, plantillas de contrato).
- GestorFacturas: desplegar el acceso multi-empresa con los cinco perfiles — depende de que el partner técnico del cliente (Suitech) habilite la conexión con Business Central.
