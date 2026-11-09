---
title: Jornada 23 de agosto — CaptuFact: el número de BC en el nombre del PDF, en producción
date: 2026-08-23
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 23 de agosto de 2026

## Qué se hizo

### CaptuFact — Despliegue del nombre de PDF con número de BC

- **Comprobación previa:** antes de desplegar se verificó qué versión había realmente en producción, en lugar de fiarse de las notas. Resultó ser una anterior a la que se creía: una mejora de SharePoint (preparar **una carpeta de SharePoint por empresa**) nunca había llegado a desplegarse. Se decidió subir las dos juntas.
- **Despliegue con red de seguridad:** copia de seguridad completa de la base de datos y de la configuración antes de tocar nada, plan de vuelta atrás escrito, y despliegue fuera del horario de lectura del correo.
- **Verificado después:** aplicación respondiendo, pruebas automáticas del cambio en verde **dentro del servidor de producción**, el mismo número de facturas antes y después (369), y el primer ciclo de lectura del correo completo y sin errores.
- La carpeta por empresa queda **preparada pero sin activar**: mientras no se configure, el archivado sigue yendo a la ubicación de siempre.
- Se dejó lista, en formato Word, la respuesta para administración y Frank sobre dónde se guardan los PDFs, ya coherente con lo que hay en producción.

## Estado actual

CaptuFact en producción con la nueva nomenclatura de PDF. Ninguna factura se volcó a BC durante la intervención.

## Pendiente

- Comprobar en SharePoint el nombre con la primera factura real volcada.
- Rellenar la carpeta de SharePoint de cada empresa cuando se decida activarlo.
- Responder a las 15 notas de Frank sobre CaptuFact.
