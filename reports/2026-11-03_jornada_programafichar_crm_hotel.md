---
title: Jornada 3 de noviembre — CRM: cada empresa ve lo suyo, en producción + Hotel: caja con arqueo ciego y disponibilidad real + ProgramaFichar: informe de uso
date: 2026-11-03
project: ProgramaFichar, CRM, Hotel
type: sesion
---

# Sesión de trabajo — 3 de noviembre de 2026

## Qué se hizo

### ProgramaFichar — Informe de uso de la semana

- **Informe de uso del 27 de octubre al 3 de noviembre**, con una consulta nueva de solo lectura que no muestra datos personales (con sus pruebas automáticas en verde).
- Los informes automáticos de las noches del 1 y el 2 de noviembre **fallaron porque caducó el acceso a Azure**; se renovó y se recuperaron a mano.
- **Nóminas:** la prueba de reparto por el portal prevista para el domingo 2 **no llegó a hacerse** (no se subió ningún documento). Se escribió a Marc.
- Otros hallazgos: un día sin fichajes pendiente de registrar a mano para una persona; un fichaje hecho sin conexión que se reenvió cinco veces (la jornada quedó bien; el correo de las 9 debería agruparlos); y el domingo 1 la comprobación interna de disponibilidad estuvo en rojo unos 20 minutos, **sin ningún error de cara a los usuarios**.
- **Vacaciones de 2027:** valorada la petición de RR. HH. Casi todo es sencillo (responsable en la ficha, aviso y vista mensual); lo delicado es aprobar desde el propio correo, por seguridad. Se espera la respuesta de Marc a tres preguntas antes de diseñarlo.
- No se tocó producción.

### CRM — Respuesta del equipo comercial: cada empresa ve lo suyo, y sus propias etapas

El responsable comercial de Castlexperience contestó a la versión de ayer: «creo que nos irá perfecto», con dos dudas: **no mezclar su base de datos con la del grupo** y **poder editar sus etapas**. Las dos quedaron resueltas y publicadas el mismo día.

**El principio:** ser multiempresa no significa que todos vean a todos. Cada uno ve lo suyo, y se abre por permiso.
- **Administración:** lo ve todo y decide. **Responsable de empresa:** su empresa, la modifica y la controla. **Comercial:** sus clientes asignados.
- Un responsable **solo ve su empresa**, sus segmentos y su actividad; de un contacto compartido con otra empresa no ve los datos de la otra.
- Un usuario nuevo ya **no nace con ningún rol** por defecto.

**Etapas del embudo por empresa**, editables por su responsable, sin afectar a nadie más.

**Importar sin perder nada**
- Antes de guardar, una **vista previa** enseña a dónde va cada columna del Excel y se puede cambiar. Lo que no tiene sitio propio se guarda como dato de esa empresa.
- Si una persona del Excel **ya existe en otra empresa**, queda en **«Pendientes de vincular»** hasta que administración lo apruebe.
- Si en el Excel alguien pidió no recibir correos, **se respeta en todo el grupo**.

**Control de calidad**
- **Revisión crítica del diseño** antes de programar y **revisión de código a fondo** del importador, con sus bloqueos corregidos; 50 fallos introducidos a propósito para comprobar las pruebas, **todos detectados**. Queda una última lectura de los arreglos finales.
- **Prueba de uso simulada** como responsable con un Excel inventado: la primera versión perdía columnas y bajas; corregido, ya sin bloqueos. La prueba buena será con su Excel real.
- Cambios de base de datos probados sobre una copia de producción: menos de un segundo, sin perder nada.

**Publicado: versión 0.7.1 en producción.** Creada la empresa Castlexperience y su responsable asignado, comprobado con su propia cuenta. También se corrigió un salto molesto del formulario de usuarios. Se le contestó por correo explicando lo que hace y lo que aún no.

### Hotel — Roles de dirección y limpieza, y lo básico que tiene cualquier programa hotelero

**Roles separados**
- Cuentas de **dirección** y **limpieza** en la demo; recepción pasa a administradora normal. Por precaución se **renovaron dos claves** que habían quedado parcialmente a la vista en una prueba.
- **Pruebas de uso simuladas** con el rol de dirección y de limpieza; corregido y publicado lo que salió (sesión al día al abrir, pantallas en blanco, salir del bloqueo con PIN, caja de días pasados).

**Sin esperar decisiones**
- La **tasa turística se apunta al llegar** el huésped, probada de punta a punta hasta el cierre y el informe.
- **ADR y RevPAR** solo con el alojamiento y bien rotulados; se corrigieron los datos de la demo, que inflaban los precios de los niños.
- Motivo legible cuando falla el envío del parte, y aviso si falta la clave de SES.Hospedajes.

**Estudio del sector y lo básico que faltaba**
- Estudio de cómo trabajan los programas hoteleros del mercado y la normativa, contrastado **con nuestro código**. Salieron 15 puntos; el primer bloque, construido y publicado:
  - **Disponibilidad real por tipo de cabaña y noche**, sin poder sobrevender.
  - **Bloqueo de cabaña con fechas** (por avería, por ejemplo).
  - **Caja con fondo y arqueo ciego**: quien cierra cuenta sin ver lo que debería haber.
  - Hora prevista de llegada, foto diaria del estado y correos al huésped apagados por defecto.
- Un **revisor independiente** encontró tres fallos (entre ellos, un arqueo que no era del todo ciego); corregidos. **Pruebas automáticas en verde.**
- El correo con la demo para recepción, que había rebotado por una dirección mal escrita, se reenvió. NeoBookings abrió consulta, aún sin respuesta de fondo.

## Estado actual

ProgramaFichar: en producción y sin incidencias para los usuarios; la prueba de nóminas sigue sin hacer.

CRM: versión 0.7.1 en producción con empresas separadas y etapas propias; sin datos reales hasta que el equipo comercial importe su Excel.

Hotel: demo con roles de dirección y limpieza, caja con arqueo ciego y disponibilidad real. La revisión independiente aún no da el visto bueno final.

## Pendiente

- ProgramaFichar: fecha para el reparto de nóminas; respuesta de Marc sobre vacaciones 2027; registrar el día sin fichajes pendiente.
- CRM: la prueba con el Excel real del equipo comercial; newsletter del responsable; que cada comercial vea solo sus clientes; última revisión de los arreglos.
- Hotel: contestar los correos de Frank del 3-nov sobre Business Central; decidir quién hace el cierre del día; preguntar al hotel por el fondo de caja y las condiciones de cancelación; manual del parte de Mossos.
