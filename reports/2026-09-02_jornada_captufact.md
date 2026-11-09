---
title: Jornada 2 de septiembre — CaptuFact: aviso a Frank en cuanto hay facturas para aprobar, y respuesta completa a Paco
date: 2026-09-02
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 2 de septiembre de 2026

## Qué se hizo

### CaptuFact — Tres despliegues en producción

- **Los arreglos que pidió Paco ya están en producción:** el contador correcto de la Cola, el botón para **sacar una factura de la Cola** y el botón **«Traer de Business Central»** para las dimensiones. Verificado en lo que sirve producción, no solo en el código.
- El aviso automático del despliegue programado dijo «fallo» cuando producción estaba bien: el error era del propio aviso, no de la aplicación. Corregido el criterio para la próxima vez.
- **Retirada en producción del aviso de inicios de sesión a un canal externo.** Se desplegó en el único orden que no interrumpe los accesos y se comprobó en vivo: el inicio de sesión funciona y nada de ese aviso queda en la aplicación.

### CaptuFact — El aviso que Frank pidió de verdad

En su nota del 17 de agosto, Frank pidió que, cuando alguien enviara facturas para aprobar, le llegara un correo diciendo «tienes facturas para aprobar». Lo que se había construido era un resumen diario y un aviso **solo por encima de un importe** que, además, nacía sin configurar: **de lo que él pidió, no avisaba nunca**. Era un fallo nuestro de interpretación.

**Ahora hay tres avisos, cada uno con su sentido:**
- **Cola nueva:** en cuanto una persona marca facturas para aprobar, llega un correo. **Agrupado**: un repaso de veinte facturas manda **un solo** correo, no veinte. La espera de agrupación se puede ajustar desde la configuración.
- **Resumen de las 9:00:** lo que sigue sin aprobar.
- **Aviso por importe:** para lo que es especialmente grande.

**Con garantías:** si un correo falla, esas facturas entran en el siguiente; y lo que ya estaba en la Cola no dispara un correo de golpe con todo el atasco histórico.

Se comprobó que **Frank está entre los destinatarios desde el 24 de agosto**, y que el interruptor de avisos apaga los tres, no solo el resumen. Se renombró en pantalla para que no haya dudas.

**El botón «Enviar prueba» llevaba roto desde el traslado a Azure** (decía que el correo no estaba configurado cuando el sistema envía sin problemas). Corregido: manda la prueba a quien lo pulsa.

### CaptuFact — Respuesta a Paco, enviada

Antes de escribir se leyeron sus dos correos completos. La respuesta, punto por punto:
- Lo que ya puede ver en pantalla (contador, sacar de la Cola, botón de dimensiones).
- **Vencimientos, con el dato real:** se consultó el Business Central de producción y **solo cuatro fichas de proveedor** (tres en MARBORI y una en Golf) no tienen condiciones de pago. La nota de julio que hablaba de muchas más estaba desfasada. El arreglo pasa a ser «rellenar estas cuatro fichas».
- **Su idea de releer un PDF a petición:** se le explicó por qué ya no le hace falta para lo que la motivó: con el arreglo del 31, si el servicio de lectura falla la factura ni se crea y entra sola cuando vuelve.
- La petición de que retiren los dos documentos que no son facturas, ahora que el botón existe.

Todo con sus **pruebas automáticas en verde** (1.277 en el motor y 258 en la interfaz).

## Estado actual

CaptuFact en producción con los arreglos de Paco y el aviso de facturas pendientes desplegados, y la respuesta a Paco enviada. Ningún correo pendiente de enviar.

## Pendiente

- Probar con Frank que el aviso de Cola nueva le llega.
- Esperar la respuesta de Paco: de dónde sale cada dimensión en cada factura y las cuatro fichas de proveedor.
- Recibos de agua: tratarlos como recibos de suministro para que cuadren.
- Ordenar las cuentas de administración de CaptuFact (dejar una sola identidad corporativa con permisos de dueño).
