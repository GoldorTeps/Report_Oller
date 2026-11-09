---
title: Jornada 7 de octubre — CaptuFact: bloqueados y fichas de proveedor en producción, y el catálogo completo de Golf y Heretat
date: 2026-10-07
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 7 de octubre de 2026

## Qué se hizo

### CaptuFact — Tres despliegues en el día

**1. Lo de finanzas y Frank, en producción (mediodía)**
- Antes de subir se corrigieron todos los puntos que dejó la revisión de la víspera:
  - un valor bloqueado en Business Central se para en «Preparar» **en cualquier dimensión**, no solo en las obligatorias;
  - con dos fichas del mismo CIF, la comprobación ya no elige una al azar ni bloquea una factura correcta;
  - el posible duplicado se busca **dentro de la misma empresa**;
  - el PDF se abre con la sesión del usuario, sin dejar ningún enlace reutilizable.
- **Lo que se arregla en Business Central llega solo a CaptuFact:** los datos del ERP se refrescan cada hora y se aplican a las facturas que aún no se han volcado.
- «Aplicar a las N líneas» vuelve a llevar las dimensiones, como pidió contabilidad.
- El importador de dimensiones dice en grande lo que no guarda y se puede probar antes.
- **Revisor independiente:** «desplegable», con sus puntos corregidos. Más de 2.200 pruebas automáticas en el motor y 490 en la interfaz, en verde.

**2. Un fallo nuestro, corregido en una hora**
- La primera actualización automática renombró 10 facturas de Golf con el nombre de otra empresa del grupo, porque llevaban el CIF de la empresa compradora leído como si fuera el del proveedor.
- En una hora se devolvieron a su nombre, se les quitó el CIF dudoso y quedaron marcadas «sin CIF», de forma que no pueden volcarse hasta que alguien lo revise. **Ninguna llegó a Business Central con el nombre equivocado.**

**3. El catálogo completo de Golf y Heretat (noche)**
- Paco veía listas cortas de valores y la Tipología no se guardaba. La causa: en esas dos compañías, Business Central solo devolvía los valores dados de alta hace poco. El conector nuevo los ve todos.
- **«Traer de Business Central» completa ahora el catálogo** con los valores válidos y sin bloquear, sin borrar nada de lo que había: Golf +140 valores y Heretat +384.
- Se aclaró que el valor que se creía bloqueado no lo estaba: no salía en Golf por la lista corta.

**El Excel de dimensiones de Golf**
- Se importó con 794 filas: 509 aplicadas y ninguna sin aplicar. Golf queda con 513 de 593 facturas con sus dos dimensiones.
- En 14 facturas el Excel pisaba un valor que finanzas había puesto a mano el 5 y el 6 de octubre: **se devolvieron a lo que puso finanzas** y se señalaron en el correo.

**Correo a Paco y Frank**
- Un único correo con los ocho puntos: lo que llega solo desde Business Central, el catálogo y el Excel (con la lista de las 14), los bloqueados, los duplicados, «Aplicar a las N líneas», las 11 facturas sin CIF, los abonos (para más adelante) y lo de Frank (PDF, banda roja, aviso ámbar y un proveedor al que le falta el grupo contable en Business Central).
- Con datos reales: quedan 17 proveedores con la ficha incompleta en Business Central (13 en Marbori, 3 en Heretat, 1 en Golf).

## Estado actual

CaptuFact en producción con la comprobación de bloqueados y fichas de proveedor, el refresco horario desde Business Central y el catálogo completo de Golf y Heretat. Correo a Paco y Frank programado.

## Pendiente

- **Abonos:** contabilidad pidió que CaptuFact los detecte; un abono de ejemplo se leyó como la factura que corrige y en positivo. Estudiarlo y proponer.
- Comprobar a mano en la web el PDF de la Cola, los duplicados y «Aplicar a las N líneas».
- Revisar aparte las facturas de Castlexperience que llevan su propio CIF.
- Preguntar a finanzas si quieren la lista de los 17 proveedores incompletos.
