---
title: Jornada 31 de octubre — Hotel: primera tanda del feedback de recepción, en la demo · CRM: conexión con el hotel revisada a fondo
date: 2026-10-31
project: CRM, Hotel
type: sesion
---

# Sesión de trabajo — 31 de octubre de 2026

## Qué se hizo

### Hotel — Primera tanda del feedback de Laia, construida y desplegada en la demo

Mientras llegan las respuestas de Laia, se separó lo que se puede hacer ya de lo que depende de ella o de Business Central, y se atacó lo primero.

**Fallos corregidos**
- **La factura sumaba el IVA encima del precio:** una estancia de 450 € salía a 495 €. El folio, el cierre y la web trabajan con precio final, así que **la factura pasa a IVA incluido**, como decidió David.
- **El PDF de la factura nunca había funcionado.** Salió al probar y está corregido.
- El folio ya no cuenta dos veces los cargos del restaurante, y se cuadró con la factura sobre una copia de los datos de la demo.
- El cobro se valida contra el saldo del folio, que es lo que ve recepción.
- Al desactivar a una persona se borra su PIN, para que no pueda volver a entrar con el antiguo si se la reactiva.

**Lo que puede hacer ahora recepción**
- **Cobrar con botones rápidos** (maqueta elegida por David): efectivo, tarjeta o pagos parciales, con el cambio calculado. Por ejemplo, con 60 € y 50 + 20 entregados, el cambio sale 10 €.
- **Anticipos numerados** con su justificante. Los siete que ya había quedaron numerados.
- Al dar de alta una reserva, **origen y localizador del cliente**.
- En el planning, arrastrar una reserva solo la cambia de cabaña, y la bandeja de «sin asignar» está siempre a mano.
- Dirección del huésped, observaciones editables y cargos del restaurante rotulados (solo dirección puede quitarlos).
- **Botón «Fer la factura»** en la ficha, que prepara el borrador y su PDF.
- Facturas en el menú de recepción.

**Segunda pasada (formato y textos):** importes con coma y fechas en formato español en pantallas y PDF; régimen y documento en palabras; «cabana» en todo el catalán; el estado de limpieza de la ficha sale ya del mismo sitio que el planning; y en el móvil la ficha ya no se desplaza.

**Con garantías**
- Antes de cambiar nada, la migración se probó sobre una copia de los datos de la demo.
- **Un revisor que no había escrito el código** hizo el recorrido completo como recepcionista en la demo. Encontró tres fallos (el cambio en el pago parcial, el historial poco claro y el canal sin traducir), que se corrigieron. Él mismo confirmó después la segunda pasada.
- 525 pruebas en el motor y 129 en la interfaz, en verde. Revisión visual en móvil y ordenador.
- **Desplegado en la demo.**

### CRM — La conexión con el hotel, revisada a fondo

La puerta por la que el hotel, el restaurante y la tienda enviarán clientes al CRM pasó por tres revisiones.

**Decisiones de David**
- La conexión saldrá junto con la siguiente versión del CRM, no sola.
- Una ficha que ya existía recibe la actividad, pero **la vinculación con la empresa la hace una persona**, no la máquina.
- **El correo electrónico se guarda siempre en minúsculas** y no puede repetirse, para que la misma persona no acabe con dos fichas.

**Revisión de código a fondo:** 24 hallazgos; corregidos los 14 principales y 5 menores, cada uno con su prueba. Entre ellos:
- un envío erróneo ya no devuelve los datos personales que llevaba;
- un teléfono ya no puede acabar escrito en los registros técnicos;
- un envío repetido no pisa los datos de otro;
- los textos en catalán con acentos y punto volado entran bien.

**Revisión de seguridad** (revisor independiente): sin fallos graves ni medios. Cuatro avisos, corregidos con sus pruebas.

**Control de calidad:** no dio el visto bueno a la primera. Se aplicó una tanda de mejoras (código más claro, registro de cada envío, aviso si una clave nueva cambia de origen, filtros en nombres y teléfonos) y queda pendiente la segunda pasada. Una revisión de código más dejó otros 15 fallos, que quedan para el día siguiente.

**Probado en local:** envíos mezclados, repetidos, demasiado grandes, y el correo en mayúsculas cae en la misma ficha. Ningún dato de huésped en los registros. 367 pruebas en el motor y 71 en la interfaz, en verde. **No está desplegado.**

**El CRM frente al mercado:** se estudió cómo resuelven lo mismo los CRM del mercado, generalistas y de hostelería. Salieron tres puntos que conviene resolver **antes de la primera campaña**:
- que coincidir solo en el teléfono no funda a dos personas distintas;
- que el consentimiento se guarde por empresa del grupo y por canal;
- que exista una lista de bajas, para que quien se dio de baja no vuelva a entrar por la conexión.

## Estado actual

Hotel: primera tanda del feedback desplegada en la demo y revisada por un tercero en el papel de recepción. CRM: conexión con el hotel corregida tras tres revisiones, a falta de la segunda pasada de calidad y sin desplegar.

## Pendiente

- Hotel: David repite en la demo los pasos de mover una reserva, cobrar en dos métodos y hacer la factura; revisión de código y seguridad de la tanda; avisar a Laia de lo que cambia.
- CRM: segunda pasada del control de calidad; prueba de la conexión desde el lado del hotel; decidir cómo resolver los tres puntos del mercado.
