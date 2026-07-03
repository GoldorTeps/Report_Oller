---
title: Jornada 30 de junio — CRM de Oller del Mas (Fase 0) + accesos Azure/BC para Gestor Facturas
date: 2026-06-30
project: CRM, Gestor Mail Facturas
type: sesion
---

# Sesión de trabajo — 30 de junio de 2026

## Qué se hizo

### CRM a medida para Grupo Oller del Mas — Definición cerrada y Fase 0

**Definición y arquitectura del CRM**
- Cerrada la definición funcional del CRM a medida para Grupo Oller del Mas. Corte de la primera versión: ficha única de contacto, importación de datos, segmentación y dashboard 360º.
- Modelo de datos con dos niveles: el cliente (Grupo Oller del Mas, un solo tenant en Business Central — sociedad MARBORI) y las 14 sociedades del Grupo. El contacto es único y global para todo el Grupo, con relación cruzada a cada sociedad mediante tabla puente. Esto permite la ficha 360º real: ver a un mismo contacto a través de todas las líneas de negocio del Grupo, no aislado en cada empresa.
- Distinción de diseño clave: una capa de **actividad** (registro histórico, append-only, de todo lo que ocurre con el cliente) separada de una capa de **decisiones comerciales**. La primera versión construye la capa de actividad; las acciones comerciales y automatizaciones quedan para una fase posterior.
- Fuentes de datos previstas: mixtas. El TPV de restaurante y tienda irá contra Business Central de forma nativa; reservas mediante PMS propio y motor de reservas (en paralelo, para permitir ajuste); tienda online y gestor de reservas probablemente vía CSV al inicio. El modelo de datos es agnóstico a la fuente, de modo que ninguna de estas decisiones bloquea el arranque.

**Fase 0 — Base de datos y cimientos (completada y verificada)**
- Backend construido sobre FastAPI + SQLAlchemy 2.0 async + asyncpg + Alembic + Docker.
- 8 modelos de datos: tenants, sociedades, contactos, relación contacto-sociedad, actividad, eventos, plantillas y segmentos.
- Migración inicial escrita a mano con garantías de integridad: registro de actividad de solo-inserción (trigger append-only), índices únicos parciales para deduplicación por email/teléfono, y validaciones estrictas de tipo en los datos.
- Catálogo de 6 plantillas de dominio específicas de enoturismo (carrito, post-cata, reactivación, post-compra, cruce de líneas, bienvenida). Seed idempotente: deja cargados el tenant MARBORI y las 6 plantillas.
- 14 tests automáticos en verde. Migración aplicada y verificada contra PostgreSQL real: `alembic upgrade head` limpio sobre base vacía y reversible.
- Artefactos entregados: documento de definición del CRM, backend completo, `docker-compose.yml`, `.env.example` y `.gitignore`.

---

### Gestor Mail Facturas — Consolidación de accesos Azure / Business Central

**Punto único de accesos para conectar las apps del cliente**
- Creado un fichero local de accesos (fuera del repositorio) que centraliza las credenciales de Azure y los datos de conexión a Business Central necesarios para conectar las aplicaciones del cliente.
- Datos reales consolidados de la sesión anterior:
  - Tenant ID completo: `2a8b5165-44cc-4e59-98fd-a2b2b67f1453`
  - Dos App Registrations OAuth ya activadas en Business Central por el partner (client_id públicos): API BC (`b011461b-…`) y API BC Admin (`a96b6260-…`)
  - Entorno Production + sandbox `PRA_100626`, Business Central 28.1, sociedad MARBORI S.L., endpoints OData y de token.
- Los secretos y credenciales se mantienen en el fichero local de accesos, fuera del repositorio, para evitar cualquier filtración a control de versiones.

**Datos que aún faltan por conseguir del cliente / partner**
- Subscription ID de Azure
- Resource Group
- Company ID (GUID) de la sociedad en Business Central
- Client Secret de OAuth (`BC_CLIENT_SECRET`) — lo introduce David directamente en el fichero local

---

## Estado actual

CRM de Grupo Oller del Mas: definición cerrada y Fase 0 (base de datos y cimientos) superada y verificada — 8 modelos, migración inicial con integridad garantizada, catálogo de 6 plantillas de enoturismo y 14 tests en verde contra PostgreSQL real. Entorno levantable con `docker compose up -d --build`. Gestor Mail Facturas: accesos Azure/Business Central consolidados en un fichero local con los datos reales de conexión; a la espera de cuatro datos (subscription, resource group, company_id y client secret) para el push end-to-end contra el sandbox `PRA_100626`.

## Pendiente

- **CRM — Nivel siguiente (el motor):** endpoints CRUD de sociedades y contactos, importación CSV con deduplicación, ingesta de la capa de actividad y evaluación dinámica de segmentos. Cada endpoint con su test (caso correcto + error).
- **CRM:** confirmar con el cliente el software real de la tienda online y si Business Central / PMS exponen webhook o export — define si la señal de datos es automática o manual en la primera versión.
- **CRM:** cargar las 14 sociedades reales del Grupo con su línea de negocio a partir del Excel de seguimiento del cliente.
- **Gestor Facturas:** completar los cuatro datos pendientes (subscription ID, resource group, company ID y client secret) e introducir el client secret en el fichero local de accesos.
- **Gestor Facturas:** push contra el sandbox `PRA_100626` con el client secret para validar el flujo end-to-end contra Business Central.
