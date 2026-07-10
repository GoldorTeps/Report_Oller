---
title: Jornada 7 de julio — CRM: de esqueleto a herramienta de clientes usable, con acceso por roles
date: 2026-07-07
project: CRM
type: sesion
---

# Sesión de trabajo — 7 de julio de 2026

## Qué se hizo

### CRM — Un sistema de gestión de clientes completo, de principio a fin

En una sola jornada el CRM pasó de ser un armazón a una **herramienta de gestión de clientes usable de punta a punta**, lista para que el cliente empiece a cargar sus datos.

**Empresas y contactos, sin duplicados**
- Alta y edición de empresas y contactos con **deduplicación automática**: si un contacto ya existe (mismo email o teléfono), se reconoce y se fusiona en una sola ficha en vez de crear un duplicado.
- **Ficha 360º** de cada contacto: sus empresas vinculadas y todo el histórico de actividad de un vistazo.
- **Importación desde CSV y Excel**, reconociendo las cabeceras en español y rellenando los huecos al fusionar. El cliente puede volcar sus listas actuales sin teclearlas a mano.

**Segmentación inteligente de la cartera**
- Un motor de **segmentos** con constructor visual de reglas: grupos de clientes por características de su ficha y por su actividad reciente — por ejemplo, "clientes que no compran desde hace 12 meses" —, con vista de miembros y previsualización en vivo mientras se define la regla.

**Interfaz cuidada y acceso con usuario y contraseña**
- Pantallas de Contactos, Ficha, Importación y Segmentos con tabla ordenable por columnas, selección múltiple, exportar a CSV, buscador global y avatares — con acabado comparable a herramientas comerciales del mercado.
- **Acceso real con usuario y contraseña** y **tres perfiles**: administrador, comercial y responsable de empresa.
- **Cada responsable solo ve los contactos de su línea de negocio**; el resto le queda invisible, sin fugas entre empresas. Verificado: el administrador ve toda la cartera; un responsable de una bodega solo ve la suya.

**El cliente gestiona su propia estructura (autoservicio)**
- Sección de Administración (solo para el administrador) donde el cliente da de alta él mismo **sus empresas y su equipo**: crear/editar usuarios, asignar rol y empresa, resetear contraseñas. Sus datos los mete él; no se inventan.

Todo lo anterior quedó cubierto con sus **pruebas automáticas (todas en verde)** y verificado funcionando en el navegador.

## Estado actual

CRM versión 1 completo, probado y verificado en navegador. Listo para que el cliente entre como administrador, cargue sus empresas y su equipo reales, y empiece a trabajar su cartera de contactos.

## Pendiente

- Acompañar al cliente a cargar sus datos reales (empresas y equipo).
- Endurecer la aplicación antes de producción (clave de seguridad definitiva, cambio de la contraseña inicial del administrador, política de contraseñas).
- Fase final: revisión de seguridad y despliegue en servidor propio.
