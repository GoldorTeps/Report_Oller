---
title: Jornada 7 de septiembre — CaptuFact: la dimensión EMPRESA se pone sola, «Completar lo que falta» y vencimientos según los términos de BC
date: 2026-09-07
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 7 de septiembre de 2026

## Qué se hizo

### CaptuFact — Menos tecleo en cada factura y la lista de Paco, punto por punto

**Comprobación de los avisos a Frank**
- Se verificó que el **resumen diario de facturas pendientes de aprobar** ha salido cada mañana a las 9:00 desde el jueves, sin ningún error de envío, a Frank y a administración.
- Dos observaciones de rebote: la bandeja de aprobación lleva varios días sin moverse, y el resumen sale también sábado y domingo (se puede quitar si Frank no lo quiere en fin de semana).

**Repaso de lo pedido por Paco y por Frank**
- Se cruzaron los últimos correos de Paco y las 15 notas de Frank con lo que hay de verdad en la aplicación. **De Frank no quedó nada sin aplicar por olvido:** 13 notas cerradas y las abiertas esperan una decisión suya.
- Se redactó el correo a Paco, con Frank en copia, con lo hecho, el orden de trabajo y las cinco decisiones que se les piden.

**La dimensión EMPRESA se rellena sola**
- Varias sociedades del grupo comparten compañía en Business Central, y dentro de BC la dimensión EMPRESA es lo único que las separa. Ahora administración **elige una vez el código de EMPRESA de cada sociedad** (Ajustes → Empresas) y la aplicación lo pone en cada factura que llega, también en las que ya estaban esperando.
- **Rellena, nunca pisa:** si alguien ya había puesto un valor, se respeta.
- Si una línea o el destinatario de la factura dicen otra EMPRESA distinta, la factura queda en **rojo**, no entra en la bandeja de aprobación y no sale hacia BC, ni siquiera forzándola.

**«Completar lo que falta» en vez de «volver a leer»**
- Paco pidió un botón para volver a leer el PDF. Releerlo igual daría lo mismo; lo útil es lo contrario: la aplicación ya sabe qué datos faltan en cada factura, así que ahora, sobre las facturas seleccionadas, **pide solo esos datos y rellena solo los huecos**. Lo que una persona ha tocado a mano no se toca.
- En las primeras tandas reales rellenó poco, y no había forma de saber por qué. Se hizo visible: el historial de cada factura dice qué se pidió, qué se encontró y qué no. Con ese rastro se vio la causa: el lector confundía al comprador con el proveedor. Se corrigió diciéndole quién es el comprador.
- Arreglado de paso un fallo de agosto: **pinchar en la casilla de una factura no la seleccionaba** (solo funcionaba pinchando en el borde). Ya se pueden seleccionar varias normalmente.

**Vencimientos según los términos de pago de BC**
- La aplicación trae de BC los **términos de pago de cada proveedor** y calcula el vencimiento con ellos, en lugar de suponer 30 días.
- Si el documento trae una fecha de vencimiento distinta de la esperada, se respeta la del documento y aparece un **aviso ámbar** para que alguien lo mire.

**Importador del Excel de Paco**
- Nueva pestaña **«Dimensiones por factura»** en Ajustes: se sube el Excel (NIF del proveedor + número de factura + Unidad de Gestión y Tipología) y la aplicación casa cada fila con su factura y le pone las dimensiones. Reconoce sola qué columna es cada dimensión comparando con el catálogo real de BC, y devuelve un resumen de cuántas casan y cuántas no.

**Puesta en producción**
- Se desplegó varias veces en el día, cada vez verificado después (sistema respondiendo, sin errores). El último bloque (vencimientos e importador) quedó listo para desplegar a primera hora del día siguiente.
- Todo con sus **pruebas automáticas en verde** (más de 1.400 en el motor y más de 270 en la interfaz).

## Estado actual

CaptuFact en producción con la EMPRESA automática y «Completar lo que falta». Vencimientos por términos de BC e importador del Excel, construidos y probados, pendientes de desplegar.

## Pendiente

- Desplegar vencimientos e importador y probar el Excel de Paco en la pestaña nueva.
- Administración: poner el código de EMPRESA a cada sociedad; confirmar qué código corresponde a las que no se deducen del nombre.
- Revisar y enviar el correo a Paco con Frank en copia.
- Decisiones de Frank y Paco: quién puede sacar facturas de la bandeja, cómo tratar los duplicados y la alarma bloqueante.
