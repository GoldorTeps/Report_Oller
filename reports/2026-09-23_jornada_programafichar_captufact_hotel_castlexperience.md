---
title: Jornada 23 de septiembre — ProgramaFichar, CaptuFact, Hotel y Castlexperience: la ficha en el panel, devolver facturas de la Cola, el programa del hotel en manos de Frank y la audiovisita
date: 2026-09-23
project: ProgramaFichar, CaptuFact, Hotel, Castlexperience
type: sesion
---

# Sesión de trabajo — 23 de septiembre de 2026

## Qué se hizo

### ProgramaFichar — El Excel de la ficha en producción, y la respuesta a RR. HH. sobre las correcciones

**La ficha completa de la plantilla, desplegada.** Marc ya tiene en el panel el botón «Ficha completa», que descarga en Excel los datos de todas las personas. Al volver a subirlo relleno, no se duplica a nadie: se reconoce a cada persona por su NIF. Se comprobó la descarga en producción después de desplegar.

**La propuesta de Marc, contestada.** Marc pedía que fuera el propio trabajador quien revise su jornada en el portal y solicite el cambio, en vez de cargarlo todo a RR. HH. La respuesta:
- **El trabajador revisa y solicita, y RR. HH. aprueba con rastro:** se puede, y es lo más defendible ante una inspección.
- **RR. HH. cierra con un clic y la hora ya propuesta:** también se puede. La marca solo nace cuando alguien la confirma, y nunca en lote.
- **Poner la pausa automáticamente o rellenar la jornada con las horas de contrato:** no, porque el registro tiene que recoger lo realmente trabajado.

**Antes de escribir, se comprobó todo.** Se releyeron todos los correos con RR. HH. desde agosto y se consultó producción en modo solo lectura. Para que alguien entre al portal hace falta su correo, y hoy lo tienen 16 de 84 personas. En el correo se corrigió además un error nuestro del día anterior: el aviso de las 9 de la mañana le llega a la persona, no a RR. HH.

**Empieza la construcción de las solicitudes desde el portal**, por fases y en una línea de trabajo separada de producción: hoy, la estructura para guardar las solicitudes y una sola pieza común para aplicar cualquier corrección. Pruebas automáticas en verde (709). Sin desplegar.

### CaptuFact — Devolver una factura de la Cola a Facturas, con observación y aviso

La petición de Frank del 13 de septiembre, **construida, desplegada y comprobada en producción**:

- Desde la Cola de volcado, dirección puede **devolver una factura a Facturas con una observación** obligatoria.
- **Le llega un aviso por correo a quien la preparó** y a los responsables de esa empresa. Si no hay nadie a quien avisar, se dice; no se finge.
- En Facturas, la factura devuelta sale **en rojo, con la observación**, un contador rojo y un filtro «Devueltas». Al volver a tramitarla, la marca se limpia y queda en el historial.

**Seis mejoras pequeñas en el mismo despliegue:**
- Una factura que ya está en Business Central **no se puede borrar** desde CaptuFact: se devuelve desde Gestionadas.
- La cabecera de la ficha **guarda al salir del campo**, como se le prometió a Frank el 8 de septiembre.
- **Solo se guarda un IBAN si es válido** (se comprueban su forma y su dígito de control). Antes se colaban números de contrato.
- Al devolver desde Gestionadas se puede dar un **motivo**, y el programa distingue «probablemente ya está contabilizada» de «Business Central no responde».
- En Ajustes → Notificaciones, un **aviso visible si nadie va a recibir** los avisos de aprobación.
- Orden interno de documentos.

Con **pruebas automáticas en verde** (1.555 en el motor y 333 en la interfaz). Las seis comprobaciones a mano en producción salieron bien. Correo a Frank y Paco explicando cómo se usa, con la pregunta de si llegó el aviso de prueba.

### Hotel — El programa del hotel, en el servidor de pruebas y en manos de Frank

- **Desplegado en el servidor de pruebas del hotel** el trabajo pendiente desde junio, con una copia de seguridad previa comprobada. **Queda cerrada la conexión antigua** que podía devolver reservas sin clave: ahora responde que no existe.
- **Nuevo acceso de dirección con un asistente de consulta** sobre las reservas: llegadas, salidas, disponibilidad y experiencia con cada canal. Es solo de lectura y enseña de dónde sale cada cifra. Un usuario de recepción no lo ve.
- **Revisión de seguridad aplicada:** el PIN de mostrador nunca abre el panel de dirección, hay límites de peticiones y los nombres de huéspedes se limpian antes de pasarlos al asistente.
- **El asistente habla como un hotel.** Fuera la jerga técnica: una sola respuesta, con un desplegable para ver de dónde sale cada cifra, y una lectura de director después del dato. Una pregunta de ejemplo que no era de hotel se cambió por «¿Qué canal se me cae más?».
- **Datos de demostración que se mantienen solos:** dos años de reservas simuladas y el mostrador de hoy (huéspedes en casa, llegadas y salidas), que se renueva cada noche para que la demo no caduque.
- Interfaz: pestaña lateral para abrir y cerrar el asistente, y botón para ver u ocultar la contraseña en el login.
- **Frank recibió la dirección y los dos accesos** (recepción y dirección) para probarlo y marcar por dónde seguir.

Con **pruebas automáticas en verde** (279).

### Castlexperience — Una audiovisita guiada de la Sagrada Familia, en marca blanca

Castlexperience planteó una web para sus clientes de la Sagrada Familia. Se ha enfocado como una **audiovisita guiada en marca blanca**: el visitante escanea un QR en el autobús y hace la visita con su móvil, también sin conexión.

- **Investigación previa:** el nivel de marca de Castlexperience y de Barcelona Local Experiences, referencias de visitas digitales y de diseño, y las normas de visita.
- **Dos hallazgos que cambian el planteamiento:** los audios mencionados son la audioguía oficial del templo, que no se puede copiar, así que hace falta una versión propia. Y a partir de diez personas la visita es de grupo y necesita guía oficial.
- **Guion propio en borrador:** doce paradas, cada dato con su fuente.
- **Primera versión construida:** la visita por capítulos con reproductor de audio, funcionamiento sin conexión, las secciones de experiencias con descuento y restaurantes recomendados, y un panel para que el operador cargue su contenido. Con **pruebas automáticas en verde** (92 en el motor y 33 en la interfaz).
- Respuesta a Castlexperience redactada, con lo montado y lo que necesitamos de ellos.

## Estado actual

ProgramaFichar: en producción con el Excel de la ficha; las solicitudes desde el portal, en construcción. CaptuFact: en producción con «Devolver a Facturas» y seis mejoras. Hotel: demo en el servidor de pruebas, con datos simulados y dos accesos, en manos de Frank. Castlexperience: primera versión de la audiovisita, en local.

## Pendiente

- ProgramaFichar: siguientes fases de las solicitudes (jornadas «sin salida» en vez de cerradas solas, aprobar con un clic, un único aviso diario a RR. HH.); analizar los días 14 y 15.
- CaptuFact: confirmar que llegó el aviso de prueba; el cambio de nombre por NIF en el histórico; códigos de empresa en Ajustes.
- Hotel: recoger las prioridades de Frank; conexión cifrada (HTTPS) antes de que entre más gente; arreglar la copia de seguridad automática del servidor de pruebas, que hoy solo funciona a mano.
- Castlexperience: enviar la respuesta; revisión del guion; contenidos, fotos y locución profesional; prueba en móvil real.
