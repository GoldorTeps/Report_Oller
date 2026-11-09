---
title: Jornada 26 de agosto — CaptuFact y Azure: CaptuFact pasa a la infraestructura del grupo sin perder ni una factura
date: 2026-08-26
project: CaptuFact, Azure
type: sesion
---

# Sesión de trabajo — 26 de agosto de 2026

## Qué se hizo

### Azure — El traslado de CaptuFact a los servidores del grupo

Hasta hoy CaptuFact funcionaba en un servidor provisional. Se decidió **llevarlo a su sitio: la infraestructura de Azure del grupo**, donde ya corre el fichaje, y hacerlo hoy mismo en cuanto estuviera verificado.

**Preparación, sin tocar lo que estaba en uso**
- Se puso al día el entorno de Azure con la última versión del programa, **más memoria para el servidor** (la lección del 18 de agosto con los escaneados) y **copias de seguridad de la base de datos guardadas 35 días** en lugar de 14.
- Antes del traslado se aplicaron y ensayaron en Azure todas las actualizaciones de la base de datos pendientes desde julio.

**El corte**
- Se congeló el programa en el servidor provisional, se hizo una copia completa de la base de datos y de los PDFs, y se cargó todo en Azure.
- **Comprobado con recuento:** 373 facturas, sus líneas, los 9 usuarios, los 2 buzones, 549 proveedores y 164 activos fijos. De los PDFs se trasladaron exactamente los 373 que usan las facturas: **373 de 373, ninguno falta, ninguno vacío**.
- El **aislamiento por empresa** sigue activo en Azure: verificado que sin identificarse con un perfil no se ve ninguna factura.
- Pruebas de humo antes de encender el volcado: un PDF se abre desde el almacenamiento de Azure, el envío de correo funciona (correo de prueba recibido), la conexión con Business Central responde, y la lectura del buzón se ejecuta cada 15 minutos.
- **Volcado a Business Central encendido: CaptuFact está en producción en Azure.** Frank, Paco y los demás usuarios entran con sus contraseñas de siempre.

**Correo saliente, por fin.** Los avisos de CaptuFact (resumen de facturas por aprobar, vencimientos) no tenían desde dónde enviarse. Ahora salen por la **misma cuenta de notificaciones que ya usa RR. HH. para el fichaje**, sin claves copiadas en ficheros: el programa las toma del almacén seguro de Azure. Desde Ajustes se puede enviar un correo de prueba.

**La dirección antigua** redirige automáticamente a la nueva, conservando la ruta, para que los marcadores sigan funcionando.

**Una decisión pensando en el equipo:** con Frank y Paco de vacaciones, **el resumen diario se deja apagado** hasta el viernes 29, para que la primera notificación no les llegue en mitad de las vacaciones. Se enciende entonces junto con el correo que explica la dirección nueva.

**Un susto controlado.** En la última actualización del día, el paso que prepara la base de datos se quedó esperando 13 minutos: una conexión del propio programa había dejado una consulta abierta y bloqueaba el cambio. Se cerró esa conexión, se configuró el servidor de base de datos para que **corte solo cualquier consulta abandonada a los 10 minutos** (protege también al fichaje), y la actualización terminó bien. Queda por localizar en el código qué deja esa consulta abierta.

### CaptuFact — Lo que mejoró el mismo día (ya en Azure)

- **«Tipo para toda la factura» (Paco):** además de línea a línea, ahora se elige tipo y número una vez y se aplica a todas las líneas; luego se puede ajustar una suelta si hace falta.
- **Facturas de agua con alarma de más:** las de suministro con cánones o tasas sin IVA quedaban bloqueadas por «no cuadra» aunque estaban bien. Ahora el programa da por buena una factura si cuadra **por la base o por el total**. Al pasarlo por el histórico, **7 facturas salieron de revisión** y en 3 se corrigieron las líneas (sobre todo importes leídos con el IVA dentro). Las que siguen paradas son lecturas malas de verdad.
- **Las tres fechas en la ficha:** fecha de factura, **fecha de registro** (se propone al aprobar y viaja a BC como fecha contable) y fecha de recepción del correo.
- **Avisos de discrepancia** con la ficha del proveedor: si el **código postal** de la factura no coincide con el de BC, o si el **IBAN cambia** respecto a facturas anteriores del mismo proveedor (el patrón típico de fraude por cambio de cuenta). Son avisos, no bloquean. Se cargaron las direcciones de 547 de las 549 fichas de proveedor de BC.
- **Retenciones de IRPF:** cuando la lectura metía la retención como si fuera una línea, la factura no cuadraba. Ahora se reconoce, se quita de las líneas y se enseña aparte con su porcentaje.
- **Tabla de facturas:** en monitores grandes el número de factura se montaba sobre la columna de empresa; corregido.
- **Facturas con varias en un PDF (nota #8 de Frank):** se midió sobre los 368 PDFs de producción. Hay **un solo caso real, el que Frank envió para reportarlo**, y ningún proveedor que lo haga de forma habitual. Decisión: **no partir PDFs por ahora**; sí se arregló que el aviso de «PDF con varias facturas» desaparecía al editar la ficha. Ahora se queda.

Todo con **pruebas automáticas, todas en verde**, y desplegado en Azure en tres actualizaciones a lo largo de la tarde.

## Estado actual

**CaptuFact en producción en Azure desde el 26 de agosto**, con volcado a Business Central activo, correo saliente funcionando y el resumen diario en pausa hasta el viernes. El servidor provisional queda parado como respaldo, redirigiendo a la dirección nueva.

## Pendiente

- Viernes 29: encender el resumen diario y enviar a Frank y Paco el correo con la dirección nueva.
- Preguntas para Paco: qué grupo de IVA usar para tasas y cánones no sujetos (hasta decidirlo, en esas facturas el IVA de las tasas se pone a mano al volcar), y si las facturas entre empresas del grupo deben entrar por CaptuFact.
- Comprobar el IBAN contra BC requiere que BC publique la tabla de cuentas bancarias de proveedor (Suitech).
- Localizar la consulta que queda abierta; ajustar el detector de «varias facturas en un PDF», que da falsos positivos en suministros de muchas páginas; dominio propio.
