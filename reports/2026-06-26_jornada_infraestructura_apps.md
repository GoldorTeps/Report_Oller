---
title: Jornada 26 de junio — Infraestructura: aplicaciones del cliente operativas + usuarios
date: 2026-06-26
project: Victor (multi-proyecto)
type: sesion
---

# Sesión de trabajo — 26 de junio de 2026

## Qué se hizo

Jornada de infraestructura y puesta en marcha: dejar todas las aplicaciones del cliente levantadas, con interfaz accesible y usuarios de acceso, sobre Docker. Punto de partida: solo Gestor Mail Facturas y la web de reports estaban en marcha. Se levantaron las restantes resolviendo los bloqueos reales que impedían el arranque.

### Puesta en marcha de las aplicaciones (Docker)

- **Ficheros de configuración `.env` que faltaban** → creados a partir de los `.env.example` correspondientes en Hotel, Boutique POS y MICE.
- **Choque de puertos entre aplicaciones** → se reasignaron puertos a las dos que colisionaban (ProgramaFichar y MICE) mediante ficheros de override de Docker Compose específicos para el entorno local, sin tocar la configuración de producto:
  - ProgramaFichar → frontend **5180** / backend **8006** / base de datos 5438
  - MICE → frontend **5181** / backend **8007** / base de datos 5439
- **Boutique POS — arranque bloqueado por la configuración de CORS** → el valor de `CORS_ORIGINS` hacía fallar el arranque del backend; se corrigió pasándolo a formato de lista JSON en el `.env`. Además se recreó el contenedor (un reinicio simple no recarga el `.env`).
- **Bases de datos sin esquema** (ProgramaFichar, Hotel, MICE) → se montó el esquema y se cargaron los datos de demostración (`seed`) de cada aplicación para dejarlas operativas en local.
- **Volúmenes de datos antiguos** → ProgramaFichar arrastraba una base de datos inexistente de un volumen previo (se recreó) y Hotel tenía el volumen con otra contraseña (se alineó la credencial de acceso a la base de datos).

### Verificación real de servicio

No se dio por buena la simple presencia del contenedor: se comprobó respuesta HTTP 200 en todas las aplicaciones y se verificó el login de demostración en ProgramaFichar, Hotel y MICE.

### Usuarios de acceso creados

En las aplicaciones que no traían usuario de demostración se crearon credenciales de administrador con el sistema de cifrado real de cada app y se verificó el login:

- **Restaurant POS** → `admin@restaurant.com` (rol administrador) · puerto 5175
- **Boutique POS** → `admin@boutique.com` (rol administrador) · puerto 5176
- **Gestor Mail Facturas** → `admin@facturas.com` (rol administrador) · puerto 5173

### Revisión funcional de la Boutique POS

Se recorrió la aplicación para dejar documentado qué ve cada perfil:

- La pantalla principal (`/`) es el **TPV**, lo que usan las dependientas: rejilla de productos con precio y stock, buscador, lector de código de barras, carrito, cobro y ticket.
- El administrador trabaja en catálogo, stock y caja (fondo inicial, total de ventas, cierre e historial).
- **Separación por rol a medias:** el backend protege correctamente las operaciones sensibles (devuelve 403 a quien no es administrador, sin riesgo para los datos), pero el frontend no oculta el acceso de administrador a las dependientas. Detectado como mejora pendiente.
- **Navegación de administración incompleta:** no hay menú que enlace las tres pantallas de administración entre sí; algunas solo se alcanzan por URL directa. Detectado como mejora pendiente.
- **Lector de código de barras:** es un lector USB que actúa como teclado (sin driver). Para dejarlo operativo hace falta configurar el sufijo Enter y el layout de teclado del lector, y cargar el código EAN de cada producto en el catálogo (sin él, el escaneo no encuentra el artículo).

## Estado actual

Todas las aplicaciones del cliente con interfaz están levantadas y con acceso funcional verificado (respuesta HTTP 200 y login comprobado). Los cambios realizados son exclusivamente de entorno local (ficheros `.env`, overrides de puertos, corrección de CORS, esquemas y datos de demostración, alineación de credencial de base de datos) y no alteran el código de producto. ProgramaFichar sigue siendo el proyecto prioritario, con el bug del PIN pendiente de la sesión anterior.

## Pendiente

- **Bug del PIN en ProgramaFichar** — prioridad real, arrastrado de la sesión anterior.
- Actualizar el documento de accesos con los puertos del modo "todas las aplicaciones a la vez" (ProgramaFichar 5180/8006, MICE 5181/8007) y las tres credenciales de administrador nuevas (Restaurant POS, Boutique POS, Gestor Mail Facturas).
- Boutique POS: ocultar el acceso de administración a los perfiles que no son administrador y añadir un menú de navegación entre las tres pantallas de administración.
- Boutique POS: valorar capturar el código EAN escaneando directamente en el alta de producto.
- Nota de arquitectura (entorno local): en ProgramaFichar y MICE el esquema de base de datos en desarrollo se construye directamente desde los modelos; el esquema de producción lo genera el pipeline de despliegue.
