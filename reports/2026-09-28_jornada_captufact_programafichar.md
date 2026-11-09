---
title: Jornada 28 de septiembre — CaptuFact: canon del agua, seguros y facturas de Castle apartadas + ProgramaFichar: la Actualización 1 toma forma
date: 2026-09-28
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 28 de septiembre de 2026

## Qué se hizo

### CaptuFact — Los compromisos del correo con administración, en producción

Se cerraron los puntos que habían salido del correo con Paco y Frank del 24 de septiembre.

**El IVA de los recibos de agua y de seguros, como lo pide Business Central**
- **Canon del agua y tasa de residuos como «No sujeto»:** en los recibos de agua, esas líneas se marcan solas como no sujetas a IVA, en lugar de exentas. En la ficha de la factura hay un selector «Automático / Exento / No sujeto» para corregirlo a mano si hace falta.
- **Protección añadida:** si se elige un código de IVA que el Business Central de esa empresa no tiene, la factura se para antes de enviarse. Sin esa barrera, BC le habría aplicado el 21 % por defecto de la cuenta.
- **Seguros enteros exentos:** los recibos de la correduría de seguros se preparan solos con todas las líneas exentas y el impuesto sobre primas como línea aparte, que es como los quiere administración. La regla se aplica lo primero, para que la comprobación previa a BC no los pare antes de tiempo. Medido en producción: **5 de los 6 recibos de la correduría pasan limpios**; el sexto es un duplicado.
- **Céntimos de diferencia de IVA:** se dejan para la extensión de Business Central que está en preparación, porque la conexión estándar de BC no permite escribir esa diferencia.

**El CIF de la empresa compradora ya no se cuela como el del proveedor**
- Unas 20 facturas antiguas, de antes de la protección de agosto, llevaban como CIF del proveedor el de la propia empresa del grupo que compraba. Ahora, tanto la comprobación previa como el envío a BC paran ese caso. Las facturas entre empresas del grupo siguen pasando, porque existen.
- **Las facturas de Castlexperience salen de la lista de Marbori:** 184 facturas de Castlexperience aparecían como pendientes de volcar al Business Central de Marbori, donde no les corresponde. Se movieron a Gestionadas con el motivo «tendrá su propio Business Central». **No se borró nada** y cada una se puede recuperar con «Devolver a Facturas». Las pendientes reales de Marbori bajan de **290 a 106**.
- Se creó una comprobación que revisa **todas** las facturas que aún no están en BC con las reglas actuales, para que cada cambio se mida sobre el conjunto entero y no sobre un solo caso.

### CaptuFact — Un lector propio para los recibos de agua y una medición honesta de la calidad

A raíz de una factura de agua que la lectura automática había leído mal (IVA equivocado, dos líneas perdidas y la empresa compradora puesta como proveedor), se cambió de enfoque: en vez de corregir factura a factura, medir y sacar reglas fijas.

- **Lector fijo para los recibos de SOREA y Aigües de Barcelona:** lee el recibo línea a línea, sin depender de la lectura automática, y **solo se usa si el resultado cuadra al céntimo** con el total. Si no cuadra, se sigue como antes. Sobre los recibos reales, cuadran todos los probados.
- **Arreglado de paso un fallo de la mañana:** la regla de «No sujeto» solo miraba las líneas al 0 %, y 92 líneas de canon y tasas en 29 facturas venían sin tipo; habrían llegado a BC con el IVA por defecto de la cuenta. Ahora se tratan bien, y el alcantarillado, que el recibo marca como no sujeto, también entra.
- **Medición de la calidad de lectura** sobre las 346 facturas de Marbori y Nova Finca, contrastada con lo que hay en Business Central y con el historial de correcciones de las personas:
  - **76,6 %** están listas hoy (incluidas las que alguien arregló a mano);
  - **35,8 %** salieron bien de fábrica, sin que nadie corrigiera la lectura;
  - **9 %** salieron sin teclear nada, tampoco cuentas ni dimensiones.
- El historial de correcciones dice qué se toca más y en qué proveedores, y de ahí salen las siguientes reglas. La medición se hizo **en solo lectura**, sin desplegar nada nuevo para ello.

Todo con sus **pruebas automáticas en verde**.

### ProgramaFichar — La Actualización 1, construida

- **Comprobación de los avisos de «más de 9 horas»:** no hay ninguna jornada marcada por error. El aviso del 12 de septiembre era correcto y no hay que rectificarlo.
- **Mensajes claros al fichar:** el kiosco y el portal dicen ahora «Todavía no has fichado la entrada de hoy» o «Ya tienes la jornada empezada», en lugar de un «Error de conexión» engañoso.
- **Horas extra por semana de lunes a domingo**, también cuando se consultan de madrugada.
- **El panel de RR. HH. lista a las personas por «Nombre Apellidos»**, como pidió Marc. El kiosco de las tablets se deja como estaba, a propósito, y queda vigilado por una prueba.
- **El turno partido cuenta como un solo día** en el balance mensual, en el registro legal (con el total del día al final) y en el envío a Business Central.
- **Foto del trabajador en su ficha:** la sube RR. HH., se guarda en un almacenamiento privado, tiene un límite de tamaño y se borra al anonimizar a la persona. La política de privacidad lo recoge.
- Marc pidió por la tarde dar de alta tres empresas nuevas en el fichaje; se le contestó el mismo día.

Producción no se tocó durante el día: todo quedó listo para desplegar por la noche.

## Estado actual

CaptuFact: en producción con el canon, los seguros y la protección del CIF; las facturas de Castlexperience apartadas, de forma reversible; 106 pendientes reales en Marbori.
ProgramaFichar: Actualización 1 construida y probada, a falta del último bloque y del despliegue.

## Pendiente

- CaptuFact: revisar en Business Central un borrador con «No sujeto» y uno de la correduría; arreglar a mano los recibos de seguros sin número y el duplicado; desplegar el lector de agua; seguir con las 106 pendientes de Marbori.
- ProgramaFichar: terminar el correo resumen de la mañana para RR. HH., revisión de código a fondo y despliegue.
