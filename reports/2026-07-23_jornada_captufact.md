---
title: Jornada 23 de julio — CaptuFact: facturas reales del buzón de Castlexperience entran con la ficha completa del proveedor
date: 2026-07-23
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 23 de julio de 2026

## Qué se hizo

### CaptuFact — Facturas reales, maestro de proveedores desde el programa y control de calidad antes de BC

**El maestro de proveedores, descargable desde el programa**
- Cada empresa puede **descargar su maestro de proveedores** en un fichero listo para pegar en Business Central, con las columnas exactas que BC pide, sin duplicados y con la protección del CIF de la propia empresa (que nunca aparece como proveedor).
- El fichero indica cuántos proveedores tienen CIF, cuántos dirección, cuántos son extranjeros y cuántos hay que revisar.

**La aplicación, actualizada y en marcha en el entorno de trabajo**
- Actualizada a la última versión con todo lo de estos días (aprobación, remitente en el detalle, ficha completa del proveedor). Actualización de base de datos limpia.

**Prueba con el buzón real de Castlexperience**
- Antes de nada se comprobó que la prueba **no marca los correos como leídos**, de modo que producción, que revisa el mismo buzón cada 15 minutos, sigue viendo todas sus facturas. Y que releer un correo no vuelve a procesarlo.
- **Entraron 6 facturas reales** con la ficha completa del proveedor (dirección, teléfono, correo).
- En una de ellas el lector tomó el CIF del comprador; la **protección lo anuló** y la factura pasó a revisión en vez de crear un proveedor falso.

**Envío a BC: el control de calidad funcionando**
- Al aprobar una de esas facturas, la aprobación quedó guardada pero el envío a BC **se detuvo**: su proveedor no está en el maestro de MARBORI. El programa **no mete datos incorrectos en BC**.
- Esto confirma por qué hace falta cargar antes el maestro de proveedores en BC.
- El entorno de pruebas de BC quedó intacto (ningún borrador nuevo).

Los dos retoques que había pedido la persona de administración de Castlexperience (remitente en el detalle y marca para enviar a BC) ya estaban hechos.

Todo cubierto con **pruebas automáticas en verde** (244).

## Estado actual

CaptuFact lee facturas reales del buzón de Castlexperience con la ficha completa del proveedor y se niega a enviar a BC lo que no cuadra. Para que las facturas lleguen a BC falta cargar el maestro de proveedores en MARBORI (entorno de pruebas).

## Pendiente

- Cargar en el BC de pruebas el maestro completo de proveedores de Castlexperience.
- Decisión de Frank: a qué sociedad van las facturas de Castlexperience.
- Configurar la protección del CIF propio de Nova Finca y MARBORI.
- Limitar el permiso de lectura del correo antes de usarlo en producción.
- Dejar como leídas en Gmail las facturas usadas en la prueba.
- Después: actualizar la versión de producción y dejarla unos días en uso real contra el entorno de pruebas.
