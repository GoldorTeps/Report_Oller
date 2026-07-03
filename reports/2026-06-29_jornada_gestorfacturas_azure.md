---
title: Jornada 29 de junio — Gestor Facturas (integración push a BC) + solicitud de accesos Azure al cliente
date: 2026-06-29
project: Gestor Mail Facturas
type: sesion
---

# Sesión de trabajo — 29 de junio de 2026

## Qué se hizo

### Gestor Mail Facturas — Integración de envío de facturas a Business Central

Se completó y consolidó el módulo que envía las facturas procesadas a Business Central como borrador (draft), listo para su validación manual dentro de BC. Todo el código nuevo pasó revisión antes de integrarse:

- **Emparejamiento de proveedores** — empareja cada proveedor con un vendor ya existente en Business Central: primero por CIF/VAT y, como respaldo, por nombre normalizado. Nunca crea vendors nuevos; si no hay coincidencia, la factura queda marcada para revisión manual. Control de calidad sobre el CIF.
- **Construcción del borrador** — genera la factura de compra contra la API de Business Central (purchaseInvoices v2.0), siempre como borrador. Incluye el número de factura del proveedor para evitar duplicados.
- **Orquestación del envío** — resuelve la empresa a partir del beneficiario, empareja el vendor, construye el borrador y lo envía. El proceso es idempotente: una misma factura no se envía dos veces.
- **Persistencia** — nueva migración de base de datos (0026) que añade a cada factura el identificador en BC y la fecha de envío. Estos dos campos se exponen ya en el detalle de la factura.
- **Interfaz** — botón "enviar a Business Central" con modal de confirmación e icono que indica cuándo una factura ya está en BC.

**Corrección en el parser de facturas** — el parser ahora distingue con claridad el emisor de la factura del cliente, lo que refuerza la precisión del emparejamiento de proveedores y evita confusiones detectadas en facturas reales.

**Verificaciones**
- 34/34 tests en verde, incluidos los cinco módulos nuevos de la integración con Business Central.
- Migración 0026 aplicada y confirmada como cabeza de la base de datos.
- Entorno de trabajo íntegro (backend, base de datos y frontend operativos).

El trabajo quedó consolidado en dos commits sobre la rama principal (código de la integración + migración + tests, y documentación de la propuesta de integración con BC).

### Solicitud de accesos Azure al cliente

El cliente respondió a la propuesta de infraestructura preguntando qué accesos debía habilitar (cuenta de Microsoft 365 y acceso al tenant). Se redactó una respuesta profesional siguiendo el **principio de privilegio mínimo**:

- Cuenta nominal de Microsoft 365 / Entra con **MFA (doble factor)** activado.
- Rol de Colaborador **acotado a un único grupo de recursos dedicado**, no a toda la suscripción.
- Provisión del **client_secret de la aplicación OAuth** (vía partner o mediante acceso al registro de la aplicación), con permiso de escritura sobre el módulo de compras.
- Acceso a Business Central, ya disponible.

La solicitud quedó marcada como enviada al cliente.

## Estado actual

El módulo de envío de facturas a Business Central está implementado, probado (34/34 tests) y consolidado en la rama principal. La conexión real con Business Central del cliente ya está establecida: entorno de producción accesible, versión 28.1, con el maestro de proveedores cargado (CIF/NIF). El único elemento que falta para poder ejecutar envíos reales es el `client_secret` de la aplicación OAuth, que reside en Azure y ha sido solicitado hoy al cliente. La cuenta contable por defecto del envío es aún un valor provisional pendiente de confirmar con el responsable de Business Central.

## Pendiente

- Recibir del cliente el `client_secret` de la aplicación OAuth: es el único bloqueo para ejecutar envíos reales a Business Central.
- Confirmar con el responsable de Business Central la cuenta contable por defecto que usará el borrador de factura (hoy es un valor provisional).
- Probar el envío de extremo a extremo con credenciales reales: validar la resolución de empresa por beneficiario y el emparejamiento de proveedores contra el maestro real de BC.
- Desplegar a producción la integración de envío a BC junto con las mejoras pendientes de despliegue.
- Confirmar la concesión de los accesos Azure solicitados (cuenta M365 con MFA y grupo de recursos dedicado).
