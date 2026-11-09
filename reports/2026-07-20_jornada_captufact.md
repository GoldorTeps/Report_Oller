---
title: Jornada 20 de julio — CaptuFact: primera factura real de punta a punta en el BC de pruebas y tres fallos corregidos
date: 2026-07-20
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 20 de julio de 2026

## Qué se hizo

### CaptuFact — El circuito completo con facturas reales, y lo que destapó

Se pasaron facturas reales por todo el circuito contra el Business Central de pruebas. Eso destapó tres fallos que las pruebas automáticas no veían; los tres quedaron corregidos en el día.

**Tres fallos reales, corregidos**
- **Facturas sin datos analíticos:** según el número de líneas, el envío a BC fallaba o, peor, salía con valores incorrectos sin avisar. Corregido y cubierto con pruebas para distintos números de líneas.
- **El PDF no se adjuntaba en BC:** el programa usaba una dirección equivocada para subir el adjunto. Corregido y verificado contra BC: el PDF de la factura queda adjunto al borrador.
- **La subida manual de facturas perdía los datos fiscales** (base, cuota, tipo de IVA y CIF del proveedor), que sí se guardaban cuando la factura llegaba por correo. Corregido, con pruebas que fallaban antes del arreglo.

**Circuito completo verificado**
- Tres facturas reales leídas sin ningún campo vacío, con todas sus líneas e IVA.
- El proveedor se identificó correctamente entre los 537 de MARBORI.
- Se creó el borrador en BC con sus 7 líneas.
- **Sin duplicados:** al volver a enviar la misma factura, el programa reconoce que ya está y no crea otra.
- Una factura de un proveedor que **no está dado de alta** en el maestro de BC se quedó sin enviar. Es lo correcto: el programa no adivina. Hay que darlo de alta o descartarlo.

**Hallazgo que bloquea el volcado real: el IVA**
- La cuenta contable elegida provisionalmente el 15 de julio **aplica IVA 0 %**: la factura entró en BC por su base, sin IVA. Se eligió por el nombre sin revisar su grupo de IVA. Confirmar la cuenta con Frank o su contable pasa a ser **imprescindible** antes de volcar nada real.

**Producción**
- Se comprobó que la **entrada automática de facturas en producción llevaba parada desde el 16 de junio**: la contraseña de aplicación del buzón de Gmail había caducado. No se tocó ese día porque el grupo está migrando el correo a Microsoft.
- **Copia de seguridad de producción** hecha y verificada.
- Se dejó constancia de que la versión de producción es la de primeros de junio: no tiene aún el acceso multiempresa ni el resto de mejoras. Actualizarla requiere su propia sesión, con revisión previa.

**Preparado para el cambio de correo**
- Microsoft 365 no admite la forma de conexión que el programa usa hoy con el buzón. Cuando termine la migración, la lectura por ese camino dejará de funcionar del todo. Era un cambio anunciado desde hace años y debió preverse cuando se montó la entrada por correo.
- Primer paso hecho: ahora **cada buzón puede usar su propio sistema de conexión**, de modo que un buzón en Gmail y otro en Microsoft pueden convivir. Un buzón mal configurado da un error claro en vez de fallar de forma confusa.
- Se preparó el correo a Suitech pidiendo el permiso de lectura del buzón de facturas, **limitado solo a ese buzón** (sin ese límite, el permiso daría acceso a todos los buzones del grupo). Se corrigió antes de enviarlo una frase que daba por hecho algo que todavía no estaba construido.

**Recuento corregido**
- Revisando BC se encontró **un borrador de prueba más** de los anotados el 15 de julio. El recuento de ese día se dio por bueno sin comprobarlo en BC. Queda corregido y registrado, junto con dos borradores anteriores que no deben borrarse.

Todo cubierto con **pruebas automáticas en verde** (208).

## Estado actual

CaptuFact funciona de punta a punta con facturas reales contra el BC de pruebas, sin duplicados. El volcado real queda bloqueado por la cuenta contable (IVA) y por el permiso de lectura del correo.

## Pendiente

- Frank o su contable: cuenta contable de gasto y su grupo de IVA.
- Alta (o descarte) en el maestro de BC del proveedor que falta.
- Enviar a Suitech la petición del permiso de lectura del buzón, limitado al buzón de facturas.
- Preguntar a Frank la dirección del buzón tras la migración y si se mantiene un buzón por sociedad.
- Borrar a mano en BC los borradores de prueba.
- Que el reintento de un adjunto fallido no deje adjuntos vacíos.
