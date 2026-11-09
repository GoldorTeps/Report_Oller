---
title: Jornada 22 de agosto — CaptuFact: el PDF archivado llevará el número de Business Central
date: 2026-08-22
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 22 de agosto de 2026

## Qué se hizo

### CaptuFact — El nombre del PDF con la referencia de BC (petición de Frank)

Frank pidió (hilo «Donde guardamos los archivos de las facturas», 18 de agosto) que el PDF de cada factura que CaptuFact archiva en SharePoint lleve la referencia de Business Central, para encontrarlo desde el número del registro.

- **El nombre nuevo:** `número de BC + proveedor + número de factura del proveedor`. El mismo nombre en SharePoint y en el adjunto dentro de BC.
- **Lo que hubo que resolver antes:** el programa no guardaba el número que devuelve BC al crear la factura, solo una referencia interna. Ahora lo guarda en el mismo momento en que BC confirma la factura, de modo que **si un archivado se reintenta, el nombre es exactamente el mismo** y no se sube el PDF dos veces.
- **Protección contra pisarse:** hasta ahora, dos facturas del mismo proveedor con el mismo número podían sobrescribirse en la carpeta. El número de BC hace único el nombre y **nunca se recorta**; si el nombre es demasiado largo se acorta el resto.
- **Las facturas ya volcadas conservan su nombre de siempre**: no se renombra nada hacia atrás.
- Cubierto con **pruebas automáticas** específicas (nombre con y sin número, acentos y caracteres raros, reintento que no duplica); batería completa en verde.

## Estado actual

Mejora construida y probada, todavía sin desplegar en producción.

## Pendiente

- Desplegar en producción y comprobar el nombre en SharePoint con la primera factura real.
- Enviar a administración y a Frank la respuesta sobre dónde y cómo se guardan los PDFs.
