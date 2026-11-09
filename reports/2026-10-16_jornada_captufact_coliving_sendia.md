---
title: Jornada 16 de octubre — CaptuFact: 358 facturas aprobadas que no llegaron a BC, causas y correcciones · Coliving Sendia: especificación para Frank
date: 2026-10-16
project: CaptuFact, Coliving Sendia
type: sesion
---

# Sesión de trabajo — 16 de octubre de 2026

## Qué se hizo

### CaptuFact — El volcado de la mañana: qué falló y qué se ha corregido

**Lo que vio Frank**
- A primera hora Frank aprobó **358 facturas y ninguna llegó a Business Central**. El volcado por lotes parecía bloquearse, los avisos se amontonaban en pantalla y Frank planteó si seguir con CaptuFact.

**Por qué pasó: dos causas a la vez**
- **La configuración de Business Central en Golf y Heretat:** faltaban combinaciones de grupos de IVA en la configuración de cada compañía, la forma de pago «TARJETA» no existía en Golf y las fichas de proveedor recargadas el día anterior en Heretat estaban incompletas. Business Central rechazaba las facturas por eso.
- **Un fallo nuestro de memoria:** un PDF escaneado del buzón de proveedores hacía que el servidor se quedara sin memoria al leerlo y se reiniciara cada pocos minutos, desde el 14 de octubre. Varios de esos reinicios coincidieron con las aprobaciones de Frank: de ahí la sensación de «se bloquea». Además, el correo de proveedores de Marbori llevaba dos días sin leerse. **Nadie lo vio porque no había ninguna alarma.**
- Y una tercera parte, también nuestra: la comprobación contra Business Central se hacía al preparar la factura, pero no al aprobarla.

**Lo que se corrigió esa misma tarde, en producción**
- **El servidor ya no se cae por un PDF:** la lectura de cada PDF va aislada y con límite de memoria y de tiempo. Si un PDF no se puede leer, se marca como ilegible y el servidor sigue funcionando. Un correo problemático se intenta tres veces como máximo.
- **Vigilancia automática de la salud del servidor**, con aviso inmediato al móvil si deja de responder o se reinicia.
- **La comprobación también al aprobar**, una a una y por lotes: si Business Central no la va a aceptar, la factura no se aprueba y se dice por qué.
- **La aplicación aprende de los rechazos:** cuando Business Central rechaza una combinación que no se puede consultar de antemano, las facturas con la misma combinación se paran con el motivo, en lugar de enviarse todas.
- **Regla acordada:** a Frank solo le llega lo que está comprobado para entrar. Si Business Central aun así rechaza una factura, **vuelve a quien la preparó** con el motivo, en lugar de quedarse en la bandeja de Frank.
- **Avisos en pantalla agrupados** y con «Cerrar todos».
- **Extensión de Business Central (versiones 1.3 y 1.4), solo de lectura**, instaladas en producción: permiten a CaptuFact leer la configuración de IVA de cada compañía, los grupos contables de las cuentas y la forma de pago de cada ficha, que la conexión estándar no da.
- Cada entrega pasó **revisión de código a fondo** y **revisión crítica**; **pruebas automáticas en verde**.

**Fallos nuestros, corregidos el mismo día**
- Una cifra que dimos sobre fichas de Marbori era errónea (salía de cruzar por NIF con fichas duplicadas); se midió de nuevo y se corrigió en una hora.
- Un cambio de la noche paraba también facturas de Marbori y Golf que sí podían entrar; se corrigió con otra entrega esa misma noche.

**Mirar antes de seguir construyendo**
- Se pararon los despliegues para revisar a fondo, sin código, y se escribieron tres documentos: un **mapa de lo que la aplicación ve venir y lo que no**, a partir de todas las incidencias reportadas; una **medición del uso real** (por ejemplo, tres de cada cuatro facturas se retocan seis veces o más y la mitad de ese trabajo son las dimensiones); y una **comparativa con las soluciones del mercado**, Continia entre ellas.
- **Informe de las 380 facturas pendientes** (las de Frank más 79 anteriores): por qué para cada una, qué hay que tocar, dónde (MASTER, la compañía o CaptuFact) y en qué orden. Se comprobó también que las fichas de proveedor de esas facturas están incompletas igualmente en MASTER.
- **Correo a Paco con Frank en copia**, con tres informes adjuntos (las 380 facturas, MASTER frente a Golf y Heretat, y las incidencias de septiembre y octubre) y el orden de las próximas mejoras. Rectifica además un punto del correo anterior: la carpeta de SharePoint de Golf y Heretat no estaba puesta, y se configurará **antes** de reenviar las facturas, para que entren con su enlace al PDF.

### Coliving Sendia — Especificación funcional de la versión 1, para Frank

- **Cambio de enfoque:** en lugar de adaptar la aplicación actual, se construirá una propia desde cero, usando la actual como referencia de lo que tiene que hacer y añadiendo las mejoras que pida Frank.
- Se escribió la **especificación funcional** para que Frank la lea y la marque: web pública, panel de control, solicitudes de reserva, alquileres y sus estados, cobros (fianza, cuota de socio, penalizaciones y tasas), inquilinos, entradas y salidas, traslados, incidencias, pisos y habitaciones, documentación, panel del inquilino y lo que no se puede saber sin el código.
- Incluye observaciones sobre la aplicación actual (cobros que dependen del inquilino, seguridad, falta de roles, documentos visibles, idiomas), **seis decisiones para Frank** y una tabla para marcar qué se queda, qué cambia, qué sobra y qué falta.
- Hecho a partir del recorrido por la aplicación actual, sin tocar producción y sin datos personales en el documento.

## Estado actual

CaptuFact: en producción, con el servidor estable y la comprobación al aprobar; las 380 facturas pendientes necesitan cambios en la configuración de Business Central antes de reenviarse.

Coliving Sendia: especificación funcional lista para que Frank la revise.

## Pendiente

- CaptuFact: configuración de Business Central en Golf y Heretat (Paco, o la hacemos nosotros y se le informa); carpeta de SharePoint de Golf y Heretat antes del reenvío; después, reenviar las 380 facturas sin que nadie tenga que volver a aprobarlas, y avisar a Frank.
- Coliving Sendia: que Frank revise la especificación y responda las seis decisiones; recordatorio al proveedor actual para el acceso al código, necesario para migrar los datos sin perder reglas.
