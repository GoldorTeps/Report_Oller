---
title: Jornada 16 de julio — Hotel: arranca la reserva de pistas y servicios (pádel, golf y spa), con estudio de mercado y primeras bases
date: 2026-07-16
project: Hotel
type: sesion
---

# Sesión de trabajo — 16 de julio de 2026

## Qué se hizo

### Hotel — Reserva de pistas y servicios: del estudio de mercado a las primeras bases construidas

Arranca un programa nuevo dentro del hotel: la **reserva de pistas y servicios**. Empezó como un gestor de pistas de pádel y, a lo largo del día, quedó claro que es bastante más.

**Estudio de mercado**
- Se revisó qué ofrece el mercado, en España y fuera, para reservas deportivas y de servicios: Playtomic, CourtReserve, Resasports, ReservaDeportes, Bookitit, Golfmanager, entre otros.
- Conclusiones principales: la conexión de Playtomic con otros programas es **de solo lectura**, así que no permite integrarlo; casi ninguno se conecta con un programa de hotel; y casi ninguno publica precios.
- También se revisó cómo factura Business Central con la normativa VeriFactu, por si las reservas tuvieran que facturarse desde BC.

**El alcance, aclarado**
- No es solo pádel: son **pádel, golf, spa y otros servicios** por definir, con formas de reservar muy distintas (pista por franja horaria; salidas de golf cada pocos minutos; terapeuta y cabina a la vez en el spa).
- Los servicios los opera **otra sociedad del grupo**, que cobra directamente al cliente. Por eso el programa tiene que ser **multiempresa**: cada servicio cobra con el TPV de su sociedad.
- La contabilidad la lleva Business Central; el programa no tiene que resolver la facturación entre sociedades.
- Decisión: **se construye**.

**Diseño**
- Idea central: **una reserva ocupa uno o varios recursos durante un intervalo de tiempo**. Así encajan los tres casos sin forzar ninguno (por ejemplo, un masaje necesita a la vez terapeuta y cabina).
- Hallazgo de diseño: en golf lo que se agota no es el campo, sino **la hora de salida** (cada pocos minutos). Con ese enfoque, golf resulta el caso más sencillo.
- Protección contra **dobles reservas** asegurada por la propia base de datos, no solo por el programa.

**Construido y verificado (primeras fases)**
- Estructura base del programa: acceso con usuario, sociedades, recursos (pistas, cabinas, terapeutas, salidas de golf) y servicios.
- **Garantía de que cada sociedad cobra con su propio TPV**: la base de datos rechaza cualquier mezcla entre sociedades, aunque se intente saltando el programa.
- Las claves de cobro de cada sociedad **no se guardan en la base de datos**.
- Importes con precisión exacta y fechas con zona horaria, para no heredar los atajos de versiones anteriores.
- **15 pruebas automáticas en verde**.

**Revisión de los programas vecinos (anotado, sin tocar)**
- Se comprobó que el programa del hotel ya tiene el **cargo a la habitación** preparado para otros puntos de venta.
- Se detectó que, en la caja del restaurante (en pruebas), **el cargo a la cabaña no llegaba al programa del hotel**: la venta se marcaba como pagada sin anotarse en la cuenta del huésped. La caja de la tienda sí lo hace bien. Queda anotado para corregir.

## Estado actual

Reserva de pistas y servicios: alcance cerrado, diseño definido y primeras bases construidas con sus pruebas. Falta el núcleo de reservas.

## Pendiente

- Construir el núcleo de reservas con la protección contra dobles reservas, incluidas reservas simultáneas.
- Después: disponibilidad, precios, cobro, facturación y enlace con el CRM.
- Preguntas de negocio abiertas: si la vuelta de golf ocupa cupo de campo además de la salida, y qué tarifas reales existen.
- Corregir el cargo a la cabaña desde la caja del restaurante.
