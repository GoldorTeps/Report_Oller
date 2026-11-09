---
title: Jornada 25 de agosto — CaptuFact: tipo de línea Cuenta, Activo fijo o Cuenta de asignación, probado en el BC real
date: 2026-08-25
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 25 de agosto de 2026

## Qué se hizo

### CaptuFact — Petición de Paco: elegir el tipo de cada línea de compra

Paco pidió poder indicar, como en Business Central, si cada línea de una factura va a una **Cuenta** (lo de siempre), a un **Activo fijo** (que se amortiza) o a una **Cuenta de asignación** (reparto entre cuentas), «incluso de forma múltiple y combinada».

**Lo que se puede hacer desde hoy**
- En la ficha de cada factura, cada línea tiene **«Tipo» y «Nº»**: la cuenta se escribe a mano; el activo fijo se elige de un desplegable con **los 164 activos de MARBORI**, que se mantiene al día solo desde BC; la cuenta de asignación se elige de una lista propia.
- Ajustes → Maestra → **«Cuentas de asignación»**: cargadas las dos de MARBORI (Renaixement 126 y 128) para Castle, Marbori y Nova Finca.
- Una línea de activo o de asignación sin número **no se vuelca**: el programa avisa con claridad en lugar de dejar que BC la rechace.
- Se pueden combinar tipos distintos en la misma factura.

**Probado contra el Business Central real, no solo en pruebas**
- **Prueba a mano en BC:** la primera línea de activo fijo fue rechazada por BC. La causa estaba en la configuración de BC: a la cuenta de adquisición de edificaciones le faltaban dos campos (tipo de registro y grupo contable). Se completaron (**Compra** y **SERVICIOS**, un cambio reversible) y la factura de prueba con activo fijo y cuenta de asignación validó sin errores.
- **Prueba automática desde el servidor contra BC:** facturas de prueba creadas y borradas al momento, ninguna registrada. Salió una regla de BC que no estaba documentada: **las líneas de cuenta de asignación no deben llevar IVA**, porque BC lo pone al repartir. El programa ya lo hace así. Con eso, **las tres clases de línea en la misma factura entran bien**.
- Cubierto con **pruebas automáticas, todas en verde**, incluidas las de aislamiento entre empresas contra la base de datos real.

**Desplegado en producción por la tarde**, con copia de seguridad y vuelta atrás preparada: 369 facturas antes y después, todas las líneas existentes quedan como «Cuenta», pruebas del cambio en verde dentro del servidor de producción y primer ciclo de lectura del correo sin errores.

**Correo enviado a Paco (con copia a Frank)** contando lo hecho, el cambio en la cuenta de edificaciones, que las cuentas de adquisición de otros grupos de activos podrían necesitar el mismo ajuste, y pidiendo una cuenta de correo para los avisos de CaptuFact.

## Estado actual

CaptuFact en producción con el tipo de línea por línea. El resumen diario y los avisos de vencimiento siguen esperando cuenta de correo de salida.

## Pendiente

- Si Paco imputa a un activo de otro grupo y BC lo rechaza, aplicar el mismo ajuste en esa cuenta de adquisición.
- Cuenta de correo de salida para los avisos.
- Sesión de dimensiones con Frank y Paco; facturas con varias en un mismo PDF.
