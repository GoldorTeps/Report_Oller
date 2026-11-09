---
title: Jornada 2 de noviembre — CRM: trabajo comercial del día a día publicado + Hotel: tercera tanda de correcciones de recepción en la demo
date: 2026-11-02
project: CRM, Hotel
type: sesion
---

# Sesión de trabajo — 2 de noviembre de 2026

## Qué se hizo

### CRM — De agenda de contactos a herramienta comercial del día a día

A partir de lo que necesita el equipo comercial, el CRM ganó en una jornada el trabajo diario de un comercial, y esa misma noche se publicó en el servidor.

**Identidad de los contactos, sin mezclar personas**
- La **búsqueda no distingue acentos** (también letras de otras lenguas europeas).
- Un **teléfono repetido propone** que dos fichas son la misma persona, **pero no las funde solo**. Un buzón compartido (tipo info@) no sirve para identificar a nadie.
- Nueva **cola de posibles duplicados** para revisarlos con calma.
- Un responsable **solo ve lo de su empresa**, y la ficha compartida entre empresas no se vacía ni se cambia desde una sola de ellas.

**Trabajo comercial**
- **Seguimientos** y una pantalla **«Hoy»** con lo que toca hacer en el día, en lista y detalle.
- **Cuentas** (empresas cliente y agencias), **apuntes** en la ficha, **plantillas de correo** y calendario.
- **Aviso diario por correo** a las 8:00 de lunes a viernes con los pendientes de cada uno, con su enlace de baja. Queda **apagado** hasta que se dé el visto bueno.
- **Embudo de oportunidades** sencillo: etapas editables, importe en euros y sumas por etapa; un responsable solo ve las de su empresa.

**Newsletter, preparada pero apagada**
- Audiencias que excluyen a quien pidió no recibir correos, **lista de supresión** que no se pierde aunque se borre o cambie el email, vista previa, preparación de la campaña en Brevo y vuelta automática de bajas y rebotes.
- **Sigue apagada:** antes de encenderla hay que probarla en una cuenta real de Brevo.

**Control de calidad**
- Tres rondas de **revisión de código a fondo** y **revisión crítica**; tras cada ronda se corrigió lo encontrado (importación de Excel aislada y con topes, bajas que ya no se pierden, varias importaciones a la vez).
- **Prueba de uso en navegador real** simulando a un comercial. Es una simulación: no sustituye a que lo pruebe el usuario de verdad.
- **Rendimiento medido:** importar 50.000 filas pasó de casi 10 minutos a menos de 5.
- **Pruebas automáticas en verde** en el motor y en la interfaz.

**Publicado (versión 0.6.0, pasada la medianoche)**
- Copia de seguridad completa antes de tocar nada, y comprobado tras el despliegue: las fichas existentes intactas, todo respondiendo.
- Se cambiaron las contraseñas de administración y se creó la cuenta del comercial.
- **Copias de seguridad automáticas programadas:** al revisar se vio que no estaban activas y que la última copia era del 26 de octubre. Ahora se hacen solas.

### Hotel — Tercera tanda: lo que pidió recepción, construido y en la demo

Llegaron las respuestas de Salva y Paco, con tres Excel y dos fotos. Se leyeron enteras y se construyó todo lo que ya no esperaba ninguna decisión.

**Nuevo en la demo**
- **Check-in solo con el titular**, dejando los datos de los acompañantes como pendientes y visibles en la pantalla del día.
- El **parte de viajeros sale una sola vez y con todos los ocupantes**.
- **Tasa turística a 0,99 €** por persona y noche (de momento calculada; aún no se carga en la cuenta del huésped).
- **Hojas de limpieza, desayunos y reservas en Excel**, la de limpieza tal cual la pidió el hotel.
- **Asignar cabaña desde la ficha** de la reserva, botón **«Tornar»** para devoluciones y **desayuno en la cabaña** marcado por día.
- Los **errores mecánicos** que detectó recepción en la presentación del 29 de octubre (nombre del grupo, planning, origen y localizador de la reserva, dirección del ocupante, pago fraccionado, número de anticipo con justificante, facturas en el menú de recepción) ya están corregidos y publicados.

**Control de calidad**
- **Revisión de código a fondo**, **revisión de seguridad** y **revisor independiente**: se corrigieron, entre otros, el tope de las devoluciones, importes poco legibles, las hojas de días futuros y el buscador. La revisión independiente **todavía no da el visto bueno** final.
- **Pruebas automáticas en verde** y el cambio de base de datos probado sobre una copia de los datos de la demo.

**Repaso honesto frente a lo pedido**
- De los **32 puntos de recepción**: **13 hechos, 4 a medias y 15 sin hacer**. Lo que falta para funcionar de verdad son dos cosas: el **envío del parte a los Mossos** (falta un fichero de ejemplo) y **facturar a través de Business Central**.
- Paco confirmó que el hotel facturará siempre desde **Business Central, en tiempo real**, y que el resto de líneas se agrupan al final del día. Las series de facturación quedan pendientes de administración.

**Correos enviados:** la demo a recepción, las consultas de facturación a Frank y Paco, y la primera consulta a **NeoBookings** (el gestor de canales) para conectar las reservas.

## Estado actual

CRM 0.6.0 publicado en el servidor con seguimientos, «Hoy», cuentas y embudo; aviso diario y newsletter apagados; sin datos reales todavía.

Hotel: demo actualizada con la tercera tanda; 13 de 32 puntos de recepción resueltos, pendiente de Mossos y Business Central.

## Pendiente

- CRM: que el comercial lo use; probar Brevo en una cuenta real antes de encender newsletter y aviso; crear las empresas reales.
- Hotel: fichero de ejemplo del parte de Mossos; series de facturación de administración; pasos del cierre del día; respuesta de NeoBookings; credenciales de limpieza y dirección para probar esos roles.
