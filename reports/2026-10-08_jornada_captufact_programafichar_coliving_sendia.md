---
title: Jornada 8 de octubre — CaptuFact: cuadre del buzón, botón de acceso y abonos · ProgramaFichar: turno partido y ausencias por horas · Coliving Sendia: reconocimiento de la aplicación actual
date: 2026-10-08
project: CaptuFact, ProgramaFichar, Coliving Sendia
type: sesion
---

# Sesión de trabajo — 8 de octubre de 2026

## Qué se hizo

### CaptuFact — Lo que pidió Frank por la mañana, en producción por la tarde

**El cuadre del buzón**
- Frank quería saber si todo lo que llega al buzón de proveedores entra en CaptuFact. Hay una pestaña nueva, **«Buzón»**, con cuatro cifras: recibidos con PDF, procesados, con PDF no procesados y sin PDF. Cada cifra abre la lista ya filtrada, y desde cada correo se ve el correo y su factura.
- **Se encontró y se corrigió un hueco importante:** CaptuFact solo leía los correos sin abrir. Si alguien abría uno en Outlook antes de la pasada, **no entraba nunca**. Desde hoy entra igual, esté abierto o no.
- Primera cuenta real, 30 días del buzón de Marbori: 90 correos, 88 ya estaban dentro, 1 sin PDF y **1 que no había entrado nunca**. Sale como «Anterior al cuadre», con los botones «Procesar» y «Resuelto a mano».
- Se cerró además un fallo por el que la lista «Sin factura» enseñaba a cualquier usuario los correos de todos los buzones: ahora cada uno ve solo los suyos.

**PDF que no se pueden leer**
- El resumen diario de las 9:00 lleva una sección **«No se han podido leer»** (escaneados sin texto, PDF dañados o correos que no se pudieron descargar), con fecha, remitente, asunto, buzón y motivo. Cada uno se avisa una sola vez.

**Botón «ACCEDER A CAPTUFACT»** en todos los correos que manda la aplicación. Se comprobó en producción que la dirección de acceso estaba vacía y se configuró.

**Abonos, primera fase**
- CaptuFact **distingue un abono de una factura**: lee el número del abono y el de la factura que corrige, lo marca con una etiqueta roja «Abono» y lo muestra con signo menos. Resta en Tesorería, en los totales y en el Excel (dos columnas nuevas, «Tipo» y «Factura que corrige»).
- Si el documento no lo deja claro, no lo marca solo: pone un aviso con el botón «Es un abono».
- **De momento los abonos no se mandan a Business Central**, a propósito, para que ninguno entre como factura y sume gasto. Se registran a mano y se marcan «Metido a mano en MBC». Se comprobó en solo lectura que Business Central permite crearlos; para hacerlo se enviaron a contabilidad cuatro preguntas sobre cómo los registran.

**Con garantías**
- **Revisión de código a fondo**, **revisión de seguridad** y **revisor independiente**, antes y después de escribir el código. En los abonos, la revisión paró el despliegue por un punto que podía colgar el lector con cierto texto; se corrigió y se verificó antes de subir.
- Más de 2.300 pruebas automáticas en el motor y más de 500 en la interfaz, en verde.
- Desplegado por la tarde; la primera pasada automática dio exactamente la misma cuenta que la consulta previa.
- Un único correo a Frank, Paco y contabilidad con las cuatro novedades y las preguntas de abonos, redactado ese día y enviado a la mañana siguiente.

### ProgramaFichar — Los cinco correos de Marc

**La foto de la ficha, por fin**
- Seguía fallando incluso con una foto pequeña. Había dos fallos, uno debajo del otro: el panel enviaba la foto vacía (también al importar empleados) y, una vez guardada, el navegador no dejaba mostrarla. Arreglados los dos, con pruebas que fallaban antes del arreglo. **Comprobado en producción con una foto real: «ok, sale bien».** En el correo a Marc se le pidió disculpas: el día 6 se le había dicho que estaba arreglado.

**Regularizar con turno partido**
- En una persona con mañana y tarde, Regularizar proponía una salida a las 22:56. Ahora descuenta lo ya trabajado ese día y propone las 17:21. Si la otra jornada ya cubre el contrato, lo dice y pide poner la salida desde Fichajes.

**Horario con dos franjas**
- Un horario puede tener una segunda franja (turno partido, como el de viña). Regularizar pone a cada jornada la salida de su franja y el calendario suma las dos. Un turno que cruza la medianoche ya no da horas negativas.

**Ausencia por horas con justificante**
- Una ausencia puede ser solo de unas horas, por ejemplo una visita médica, con justificante en foto o PDF. La persona lo sube desde el portal y RR. HH. desde el panel; solo lo ven ellos.
- No gasta vacaciones y cuenta como «Ausencia justificada» en el balance. **Esto cambia cifras que Marc ya veía** (las vacaciones y bajas de día completo dejan de salir como «sin justificar»), y se le avisó en el correo.

**Con garantías**
- Las dos migraciones de base de datos se probaron antes en una copia desechable (suben, bajan y vuelven a subir). Punto de recuperación guardado antes del despliegue.
- Pruebas automáticas en verde: 970 en el motor y 246 en la interfaz.
- Correo a Marc con todo, enviado. El calendario de horarios de sala y cocina se está viendo con Frank.

### Coliving Sendia — Qué hace hoy la aplicación de los pisos

- Para definir el alcance antes de proponer nada, se estudió la aplicación actual: la web pública (catálogo bilingüe, buscador, ficha y solicitud de reserva) y el panel de administración (alquileres, estudiantes, pisos, documentación, contenidos y sistema).
- **El circuito de cobro:** la solicitud se convierte en alquiler, se genera el pago inicial (transferencia o tarjeta) y, al pagarlo, se crean los pagos de cada mes. En el panel hay **decenas de pagos vencidos sin cobrar**, algunos desde junio: el cobro recurrente no funciona solo para muchos alquileres. Encaja con la petición de automatizar los cobros.
- La aplicación funciona sobre una versión de PHP sin soporte desde 2020.
- **Un incidente nuestro, contado tal cual:** el recorrido automático del panel pulsó enlaces que en esta aplicación ejecutan acciones. Se crearon 2 alquileres en estado «En creación» a partir de dos solicitudes de 2018 (sin generar pago ni correo), y dos documentos de identidad se marcaron como verificados y se volvieron a desmarcar. Todo consta en el registro de actividad de la aplicación. No se guardó ninguna copia de esos documentos.
- Medidas: el recorrido automático no se vuelve a usar contra el panel, y la herramienta ahora solo visita lo que está expresamente permitido. Se preparó un correo al proveedor actual de la aplicación, con copia a Frank, que explica lo ocurrido y pide un acceso propio de solo lectura.

## Estado actual

CaptuFact: cuadre del buzón, aviso de ilegibles, botón de acceso y abonos (sin volcado) en producción. ProgramaFichar: foto, turno partido y ausencias por horas en producción. Coliving Sendia: reconocimiento hecho; acceso a la espera del proveedor actual.

## Pendiente

- CaptuFact: respuestas de contabilidad para volcar abonos a Business Central; el abono de ejemplo que entró antes del cambio sigue como factura; procesar el correo que no había entrado nunca. Antes del 20 de octubre: que Tesorería no cuente lo ya pagado en Business Central y la vista de cierre de trimestre.
- ProgramaFichar: que Marc regularice el caso de turno partido y configure el horario de viña con dos franjas; preparar el calendario de sala con supervisor de área para hablarlo con Frank.
- Coliving Sendia: confirmación del proveedor actual y acceso al código; describir qué hace la aplicación y por qué se acumulan los pagos vencidos.
