---
title: Jornada 5 de agosto — CaptuFact: los seis puntos de Frank cerrados y tres fallos de lectura corregidos · ProgramaFichar: visor del cuadrante y correo listo para encenderse
date: 2026-08-05
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 5 de agosto de 2026

## Qué se hizo

### CaptuFact — La lista de Frank, cerrada en local

**Antes de programar, preguntar a Business Central**
- Se consultó qué datos expone de verdad el BC del grupo: los modos de pago de cada proveedor (541 de 605 fichas los tienen), la dimensión "Línea de negocio" con sus valores y los pedidos de compra. Una primera medición daba el 100 % de los datos rellenos y era falsa (BC rellena los huecos con valores vacíos); se corrigió antes de construir nada encima.

**Los seis puntos pendientes**
- **Empresa clicable** desde las vistas de dueño y administración, para filtrar por empresa con un clic.
- **Adaptación a distintos tamaños de pantalla:** las columnas se recogen por orden, y solo cae una columna cuyo dato ya aparece al abrir la factura.
- **Contratos separados de facturas:** un PDF que parece un contrato va a "Sin emparejar" con su motivo y se puede recuperar. De momento solo avisa, para medir antes de aplicarlo.
- **Copia local del maestro de proveedores de BC:** la pantalla pasa de tardar 3 segundos a responder al instante, y sigue funcionando si BC no contesta.
- **Autocompletado del proveedor y modo de pago con los códigos reales de BC.** Al hacerlo apareció que **"borrar el modo de pago" no había funcionado nunca**; corregido.
- **Línea de negocio desde el catálogo de BC.** Se corrigió además que las facturas sin líneas salían a BC sin ninguna dimensión.

**Tres fallos de lectura, dos reportados por Frank y uno encontrado al buscarlos**
- **El nombre de la empresa del grupo como proveedor:** había 33 facturas así en producción. Se corrige teniendo en cuenta que algunas empresas del grupo sí se facturan entre ellas, y sin confundir empresas de nombre parecido que son otras.
- **Dos adjuntos con el mismo nombre en un correo:** el segundo se perdía sin avisar. Corregido sin cambiar nada de lo ya guardado.
- **Varias facturas en un solo PDF:** detector construido y probado con 158 PDFs reales, sin un solo falso positivo. Pendiente de conectarlo a la entrada de facturas.
- **El CIF viaja con el nombre:** si el nombre del proveedor es correcto pero falta el CIF, se recupera del maestro de BC. Así, facturas que decían "Marbori" pasan a resolver al emisor real con su CIF. En el camino se bloqueó que la propia compradora pudiera aparecer como proveedora por una ficha de BC con el CIF del grupo.

**Duplicados en el maestro de BC**
- Se encontraron **siete proveedores con ficha doble** en BC (mismo CIF con dos fichas, o mismo nombre con una ficha sin CIF). Hay 8 facturas suyas esperando y ninguna ha salido aún a BC: si se unifican antes, no queda nada partido.
- Se redactó un correo para Frank con todo lo que necesita su lado: el modo de pago "Tarjeta" que no existe en BC, la ficha con el CIF del grupo, los duplicados, dos datos de empresa que faltan, si los pedidos del 3 de agosto son de prueba, la decisión sobre el circuito de aprobación y dos avisos (un fallo nuestro en la exportación a Excel, que no respeta todos los filtros, y las seis facturas paradas por configuración del ERP).

Todo con pruebas automáticas en verde. Este trabajo quedó en local, listo para desplegar.

### ProgramaFichar — Visor del cuadrante de horarios y el correo, casi listo

**El visor del cuadrante**
- Al revisar el código apareció que la parte difícil ya estaba hecha, así que se construyó **una vista de solo lectura del horario de toda la plantilla**: vista **Semana** con las horas escritas en cada turno (el cuadrante clásico de hostelería) y vista **Mes** de conjunto.
- La primera versión no daba la talla y se rehízo el mismo día: mismo diseño que el resto de pantallas, el mismo color de turno que ve el trabajador en su portal, turnos que cruzan la medianoche bien calculados, y semanas que cruzan de un mes a otro sin perder días.
- Solo lo ve el responsable de cada empresa, y cada empresa ve solo lo suyo (comprobado en vivo).
- La versión con arrastrar y soltar turnos (tipo motor de reservas) se anotó con su coste y **no se construye por ahora**: sin comprobar choques con los límites legales, un editor así facilitaría montar un cuadrante ilegal.
- Se detectó en la pantalla de Horas extra que **la semana se calcula de domingo a sábado en lugar de lunes a domingo**. No se tocó la víspera del arranque, porque cambiaría las cifras que ve el cliente; queda anotado para corregir con aviso.

**El correo de la aplicación**
- Llegó la clave de Brevo y se configuró en el servidor de forma segura. Al probarla apareció que la cuenta de Brevo **solo admite envíos desde direcciones autorizadas**, algo que no se sabía. Se escribió al equipo de marketing del grupo, que gestiona Brevo, para autorizar la salida del servidor y verificar un remitente nuevo y propio para RR. HH.

**Limpieza de la instalación de junio**
- La primera instalación de pruebas, de junio, seguía encendida y publicada en internet. Contenía solo las empresas y empleados ficticios de la demo, ningún dato del grupo. Se hizo copia de seguridad, se **cerró el acceso público** y se paró, y se desactivó el despliegue automático que podía reactivarla sin querer. Comprobado después que no responde.

## Estado actual

CaptuFact: la lista de Frank cerrada y los fallos de lectura corregidos en local, pendiente de desplegar. ProgramaFichar: el cuadrante funciona en local; el correo está configurado y a la espera de que se autorice el servidor en Brevo.

## Pendiente

- CaptuFact: desplegar en producción, aplicar las correcciones al histórico y enviar el correo a Frank.
- ProgramaFichar: confirmación de Brevo para encender los correos, desplegar el cuadrante, probar el bloqueo de pantalla y preguntar a Marc si han llegado las tablets.
