---
title: Jornada 24 de agosto — CaptuFact: 11 de las 15 notas de Frank, en producción en el día
date: 2026-08-24
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 24 de agosto de 2026

## Qué se hizo

### CaptuFact — Las notas de Frank, resueltas y desplegadas

Frank había dejado 15 notas sobre el uso de CaptuFact (17 de agosto). Por la mañana se enviaron las respuestas a Frank y a administración, y durante el día se resolvieron, probaron y desplegaron **11 de las 15** en tres despliegues controlados, cada uno con copia de seguridad previa y comprobación posterior.

**Lo que Frank y administración ven desde hoy**
- **Beneficiario fuera de la tabla de facturas** (se mantiene en la ficha, que es donde decide a qué empresa va la factura).
- **Línea de Negocio sin repeticiones:** cada valor salía tres veces porque se mostraban las listas de todas las empresas juntas. Ahora la ficha enseña solo la lista de la empresa de la factura.
- **Modo de pago que se puede vaciar** en la ficha.
- **Vencimiento a 30 días propuesto:** si la factura no trae vencimiento, se propone fecha de factura + 30 días, marcado como «propuesto» y sin bloquear. Se rellenaron así las **108 facturas históricas** que no tenían vencimiento, con constancia en el historial de cada una.
- **«Marcar gestionada sin BC»:** para facturas aprobadas que se resuelven por otra vía; salen de la bandeja de trabajo y quedan marcadas con quién y por qué. Solo dueño y administración.
- **Resumen diario de «tienes facturas para aprobar»**, configurable desde Ajustes → Notificaciones: hora del envío, importe a partir del cual se avisa al momento, y una casilla «Aprobar» por usuario para decidir quién lo recibe (Frank y administración).
- **Pestaña «Posibles duplicados»:** agrupa las facturas que coinciden en **CIF y número**, con la fecha en que entró cada una, y permite borrar solo la última introducida (nunca una ya en BC). Al estrenarla muestra unos 19 grupos reales; en 7 de ellos alguna ya está en BC y conviene revisarlos. El aviso antiguo, que avisaba sin tener CIF y número, desaparece.
- **Cola de volcado desplegable:** cada factura de la cola se abre en el sitio para ver líneas, historial y PDF sin salir de la cola.

**Un fallo nuestro que salió a la luz**
- Al revisar las notificaciones se descubrió que **el aviso de vencimientos no había llegado a enviarse nunca**: un error interno se silenciaba sin dejar rastro. Corregido, con prueba que lo vigila, y ahora cualquier error queda registrado. Antes de desplegarlo se marcaron como ya avisadas las 108 facturas históricas, para no soltar una ráfaga de correos de golpe.

**La factura que no entraba en BC (nota #14), explicada**
- Tras tres consultas a Business Central y a la base de datos, el diagnóstico es claro: **el catálogo de «Línea de Negocio» que tiene CaptuFact no corresponde a las dimensiones reales del BC de MARBORI**, que son otras cuatro (Empresa, Objetos de coste, Tipología de ingresos y Unidad de gestión). Ninguna factura había llegado a BC con dimensiones; esta era la primera que lo intentaba y BC la rechazaba. Es la única factura atascada por este motivo.
- **Desbloqueo inmediato:** quitar la línea de negocio de sus dos líneas y volver a volcar.
- **Arreglo de fondo:** decidir con Frank y Paco qué dimensiones reales quieren informar desde CaptuFact y cargar ese catálogo desde BC.

Todo cubierto con **pruebas automáticas, todas en verde**, en el motor y en la interfaz, y las pruebas de cada cambio pasadas también **dentro del servidor de producción** tras desplegar.

## Estado actual

CaptuFact en producción con 11 de las 15 notas de Frank resueltas. El resumen diario y el aviso de vencimientos están desplegados pero **no envían todavía**: falta configurar una cuenta de correo de salida.

## Pendiente

- Conseguir una cuenta de correo desde la que CaptuFact pueda enviar sus avisos.
- Sesión con Frank y Paco sobre las dimensiones de Business Central.
- Notas que quedan: facturas con varias en un mismo PDF, pedidos, y un punto contradictorio por aclarar con Frank.
