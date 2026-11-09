---
title: Jornada 27 de julio — CaptuFact: una factura real, del correo a Business Central con su PDF, y dos fallos corregidos por el camino
date: 2026-07-27
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 27 de julio de 2026

## Qué se hizo

### CaptuFact — El ciclo completo de una factura, de punta a punta

Había dudas sobre si los PDF de las facturas llegaban bien a Business Central. Para salir de dudas se hizo el recorrido completo con una factura real del buzón de proveedores y con los perfiles reales: el responsable de administración la prepara, Frank la aprueba y la aplicación la vuelca.

- La factura llegó a Business Central como **borrador de compra en MARBORI, S.L.**, en el entorno de pruebas de BC, con su PDF adjunto.
- **Comprobación a fondo del PDF:** se descargó de vuelta desde Business Central y se comparó con el del correo. **Idéntico, bit a bit.**

**Las dudas estaban fundadas: salieron dos fallos reales, los dos corregidos el mismo día**
- **El volcado a Business Central estaba roto desde la noche anterior**, también en producción: un cambio del día antes (mostrar quién aprobó cada factura) impedía volcar ninguna factura. Las pruebas automáticas no lo detectaron porque se ejecutaban sobre otra base de datos que no reproduce ese caso. Se corrigió y se añadió una prueba que reproduce exactamente el comportamiento de la base de datos de producción, para que no vuelva a pasar.
- **El mismo PDF podía quedar repetido varias veces en la ficha de BC** si un reintento coincidía con un fallo intermedio. Ahora la aplicación pregunta antes a Business Central qué adjuntos tiene ya y no vuelve a subir el que ya está.
- Los dos arreglos se **desplegaron en el servidor** con copia de seguridad previa y se verificaron allí mismo, con las pruebas automáticas en verde (329).
- Al mediodía se hizo la **prueba de aceptación desde la propia aplicación**, con las cuentas reales: una factura de MARBORI preparada por administración y aprobada por Frank llegó a Business Central dos segundos después, con su PDF. **El camino que estaba roto funciona de punta a punta en producción.**

**Limpieza en Business Central**
- Se revisaron los borradores del entorno de pruebas de BC y se retiraron los adjuntos vacíos (0 bytes) y duplicados que habían dejado las pruebas anteriores. Un adjunto vacío es peor que uno repetido: quien lo abre cree que la factura lleva su PDF y no hay nada. Cada borrador queda con **exactamente un PDF**.
- Se dejó una herramienta que hace esta revisión: por defecto solo informa, y solo borra lo que es seguro que sobra.

**La pestaña «Datos adjuntos (0)» de BC — investigado y cerrado**
- En la ficha de BC el PDF aparece en «Archivos de documento entrante», que es donde debe estar para el circuito contable, y no en «Datos adjuntos». Se intentó escribir también en esa segunda pestaña, pero la conexión de Business Central no guarda el contenido y dejaría adjuntos vacíos. Se decidió no hacerlo: el PDF está donde corresponde contablemente.

**Protección del código y de los accesos**
- El código de CaptuFact ya **no vive en un único disco**: hay una copia completa en el servidor y se comprobó que se puede restaurar de verdad. Queda pendiente una tercera copia fuera de ese servidor.
- **Cada inicio de sesión queda registrado** (quién y cuándo) en el registro de actividad de la aplicación. Los intentos fallidos no se registran con el email, para no dar pistas sobre qué cuentas existen.
- Revisando los accesos del día se vio que **escáneres automáticos de internet** habían probado una vulnerabilidad conocida contra el servidor: **no obtuvieron nada**. Se puso en marcha un aviso automático cada vez que alguien inicia sesión o el servidor recibe sondeos de este tipo. Es un argumento más para el paso a Azure con conexión cifrada.
- Pruebas automáticas en verde (333), en local y en el servidor.

## Estado actual

CaptuFact en producción con el volcado a Business Central **reparado y verificado de punta a punta** con una factura real y su PDF. Business Central limpio de adjuntos vacíos o repetidos y el código con copia restaurable.

## Pendiente

- **El IVA del borrador:** Business Central muestra la base y no el total con IVA. Hay que decidir con Suitech si lo añade BC al validar o si la aplicación debe mandar el desglose. Es lo único que falta para dar el volcado por terminado.
- Decidir qué hacer con cuatro borradores de prueba antiguos que siguen en el entorno de pruebas de BC.
- Tercera copia del código fuera del servidor.
- Siguen en la lista: recuperación de contraseña por email y el paso a Azure.
