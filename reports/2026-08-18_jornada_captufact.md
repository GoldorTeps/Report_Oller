---
title: Jornada 18 de agosto — CaptuFact: resuelto el bucle de reinicios que paró la entrada de facturas
date: 2026-08-18
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 18 de agosto de 2026

## Qué se hizo

### CaptuFact — Un lote de facturas escaneadas dejó el programa reiniciándose; diagnosticado y corregido en el día

**Qué pasó.** La madrugada del 18 llegó al buzón de proveedores un lote de unos **21 correos con facturas escaneadas**, más de lo habitual. Leer escaneados exige mucha memoria, y el servidor provisional no daba para el lote entero: el programa se quedaba sin memoria y el sistema lo reiniciaba, **16 veces a lo largo del día**. Como el lote se guardaba de golpe al final, cada reinicio perdía el trabajo hecho y volvía a empezar. **Ese día no entró ninguna factura nueva.** La pantalla seguía accesible, pero la lectura del correo no avanzaba.

**El diagnóstico**, sobre los registros del servidor y el código, sin tocar nada hasta tenerlo claro: se reconstruyó el bucle paso a paso y se comprobó que el lote era legítimo (reenvío en bloque de escaneadas de proveedores conocidos, no correo basura).

**El arreglo, en dos capas:**
- **Inmediato:** se amplió la memoria disponible del servidor. El lote terminó de procesarse solo en el siguiente ciclo: **30 correos leídos y 75 facturas creadas**. La carga del servidor volvió a la normalidad en minutos.
- **De fondo, para que no se repita:** ahora **cada correo se guarda en cuanto se procesa**, y la memoria de cada PDF se libera al terminar con él. Si el programa se interrumpe a mitad de un lote, lo ya leído se conserva y el siguiente arranque continúa donde se quedó.
- Cubierto con **pruebas automáticas nuevas** (entre ellas, «se corta a mitad de lote y no se pierde lo anterior»), toda la batería en verde, y **las pruebas del arreglo pasadas también dentro del servidor de producción** tras desplegarlo.

**Orden en el servidor.** Aprovechando la intervención, y con copia de seguridad previa de la base de datos, se reorganizó la instalación para que CaptuFact tenga **su propio nombre, carpeta y datos** en el servidor, separado de otras instalaciones antiguas. Comprobado después: aplicación respondiendo y las 341 facturas en su sitio, conectada a Business Central producción como antes.

## Estado actual

CaptuFact vuelve a leer el correo con normalidad, con la entrada de facturas protegida frente a lotes grandes de escaneados.

## Pendiente

- Revisar por qué 23 de las 75 facturas del lote quedaron en revisión (probablemente por la calidad del escaneo).
- Unos treinta correos ya procesados se vuelven a descargar en cada ciclo y se descartan; no crean duplicados, pero conviene marcarlos como leídos.
- Borrar las copias antiguas del servidor pasada una semana.
