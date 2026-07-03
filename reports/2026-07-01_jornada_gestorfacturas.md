---
title: Jornada 1 de julio — Gestor Facturas: especificaciones de Frank y encaje frente a la propuesta de la competencia
date: 2026-07-01
project: Gestor Mail Facturas, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 1 de julio de 2026

## Qué se hizo

### Gestor Facturas — encaje frente a la propuesta de la competencia

El cliente (Marbori / Heretat Oller del Mas) recibió una propuesta externa de Suitech basada en **Continia Document Capture**: 5.000 € de setup, 395 €/mes de licencia y 10 €/mes de Azure, con certificación AEAT.

Se analizó función por función frente a **Gestor Facturas**, la solución ya desarrollada, con esta conclusión:

- La necesidad real de Frank es **eliminar el tecleo manual de facturas**, no la digitalización certificada AEAT. La certificación no aplica al caso de uso actual.
- Gestor Facturas cubre el flujo completo que el cliente pide: entrada de facturas por varios canales, extracción de datos, validación y envío a Business Central para su aprobación final.
- Por tanto, Gestor Facturas puede **sustituir** la propuesta externa cubriendo lo que el cliente necesita, sin licencia recurrente.

### Gestor Facturas — especificaciones reales de Frank

Se leyó el hilo de correo "Digitalización facturas" con Frank (27, 29 y 30 de junio). Frank ha dado acceso a su SharePoint y ha confirmado punto por punto ("ES CORRECTO") los requisitos del sistema. Especificaciones definitivas:

1. **Entrada de facturas por la app**, tanto por correo como en carga manual; el **SharePoint** actúa como archivo documental.
2. Los datos de cada factura deben quedar también **en columnas de SharePoint**, en la biblioteca "FACTURAS PROVEEDORES" que Frank ha creado.
3. **La app NO crea proveedores** (marcado por Frank como "MUY IMPORTANTE"): únicamente hace *matching* contra los proveedores ya existentes en Business Central. — Este comportamiento ya está implementado en Gestor Facturas y queda validado por el cliente.
4. **Soporte multi-empresa para 13 sociedades**: el sistema debe estar pensado para gestionar varias empresas. Es un requisito duro del encargo.
5. El **PDF de la factura se archiva también dentro de Business Central** (trazabilidad), no solo los datos. Las aprobaciones las monta Frank directamente en Business Central.

Con estas specs, la brecha de trabajo pendiente en Gestor Facturas queda acotada a: multi-empresa real para las 13 sociedades, adjuntar el PDF en Business Central, integración con SharePoint (documento + columnas) y refuerzo del módulo de extracción de datos.

### ProgramaFichar — puntos rojos del cliente

Se revisaron los correos del cliente sobre ProgramaFichar y se registraron las incidencias y solicitudes recibidas:

- **Urgentes:** bug del PIN reportado por Marc (sigue dando error e impide fichar) y arranque efectivo en julio.
- **Solicitudes de Frank:** incidencias automáticas, onboarding del empleado, plantillas de contrato, amonestaciones e historial visual.
- **Solicitudes de Marc:** conversión de horas extra a saldo de descanso y envío de nóminas por archivo.

## Estado actual

Gestor Facturas se confirma como sustituto viable de la propuesta externa: cubre el flujo que Frank necesita (entrada multicanal, validación, envío a Business Central) sin licencia recurrente. Las especificaciones del cliente están cerradas y validadas por él mismo; el matching contra proveedores de Business Central ya funciona según lo pedido. Queda pendiente el desarrollo de multi-empresa (13 sociedades), la integración con SharePoint y el archivado del PDF en Business Central. En ProgramaFichar, las incidencias y solicitudes del cliente están registradas y priorizadas, con el bug del PIN y el arranque de julio como urgencias.

## Pendiente

- Formalizar la propuesta de Gestor Facturas para Frank como alternativa a Document Capture (sin licencia recurrente; certificación AEAT tratada como fase aparte si llegara a hacer falta).
- Desarrollar el soporte multi-empresa real para las 13 sociedades.
- Integrar SharePoint: archivado del PDF y volcado de datos a las columnas de la biblioteca "FACTURAS PROVEEDORES".
- Adjuntar el PDF de cada factura dentro de Business Central para trazabilidad.
- Reforzar el módulo de extracción de datos de las facturas.
- Probar el flujo completo de envío a Business Central en entorno sandbox antes de pasar a producción.
- **ProgramaFichar:** resolver el bug del PIN (producción, urgente) y asegurar el arranque de julio. Las 7 solicitudes de Frank y Marc quedan para la siguiente iteración.
