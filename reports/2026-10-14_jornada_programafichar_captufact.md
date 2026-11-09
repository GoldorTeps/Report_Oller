---
title: Jornada 14 de octubre — ProgramaFichar: la comida o pausa sin cerrar ya se corrige · CaptuFact: siete incidencias de Paco atendidas en dos entregas
date: 2026-10-14
project: ProgramaFichar, CaptuFact
type: sesion
---

# Sesión de trabajo — 14 de octubre de 2026

## Qué se hizo

### ProgramaFichar — La comida o la pausa que se queda sin cerrar

**El problema que planteó Marc**
- Un trabajador fichó «Entrar a comer» y no «Salir de comer»: el día le contaba solo las horas hasta la comida y él no podía corregirlo desde su portal. Marc propuso cerrar la comida sola.
- Medido en producción: desde el 9 de septiembre había **19 jornadas** con una comida o una pausa sin cerrar, casi todas empezadas en la tablet de la cantina o del celler.

**Lo que se construyó y se desplegó**
- **Recursos humanos lo ve en el correo de las 9**, con un aviso nuevo de «comida sin cerrar» o «pausa sin cerrar».
- **Regularizar propone el fin que falta** con la duración de la pausa del horario o de la empresa, y RR. HH. lo aplica en un clic.
- **El trabajador puede pedirlo desde su portal**: la opción «No registré la salida de la comida» o «el fin de la pausa» aparece solo en los días que lo necesitan, y RR. HH. lo aprueba como cualquier otra solicitud.
- Se protegieron los casos delicados: quien sale a media jornada justo después de comer no sale como error; en un turno partido, la salida no se propone hasta que la comida está cerrada; y lo que se muestra antes de aprobar coincide siempre con lo que se aplicará.

**Revisado antes de salir**
- **Revisor independiente** sin contexto previo: encontró dos fallos y varias dudas, corregidos antes de la prueba en navegador.
- **Revisión de seguridad**: nada grave. **Revisión de código a fondo**: dos casos de turno partido mal calculados, corregidos.
- Probado de principio a fin en una copia local con casos de prueba, y con el visto bueno, **desplegado en producción**. **Pruebas automáticas en verde**.

**Otras respuestas a Marc**
- Los cambios de reglas (turno partido, etc.) **se aplican también al pasado**, porque las horas se calculan en el momento; las revisiones y avisos miran los últimos 14 días.
- El correo de respuesta salió cuando la mejora ya estaba en producción, para poder decir «ya está».

### CaptuFact — Siete incidencias de Paco, atendidas en dos entregas

**Por la mañana: cuatro correos de Paco**
- **Proveedores de la compañía correcta:** desde que Paco tiene varias empresas, el desplegable de proveedores le mostraba los de otra compañía. Ahora cada factura ofrece solo los proveedores de **su** compañía de Business Central, y el aviso de «proveedor no dado de alta» **dice en qué compañía se ha buscado**.
- **El PDF que no se archivaba:** Golf y Heretat no tienen todavía su carpeta de SharePoint configurada en CaptuFact, y el archivado se saltaba **sin avisar**. Ahora, si una factura se vuelca sin carpeta, se avisa en pantalla al aprobar.
- **Facturas en la empresa equivocada:** quien solo ve sus empresas puede ahora mandar una factura que no es suya a **«Sin clasificar»**, donde la recoge quien ve todo el grupo, en vez de tener que borrarla.
- **CIF de cada empresa** editable desde Ajustes, con comprobación de la letra de control.
- **Revisión de código a fondo**: encontró un fallo serio (en un caso concreto, un usuario podía recibir datos de facturas de empresas que no ve); corregido y fijado con una prueba. **Revisión crítica** y **revisor independiente**: aptos con condiciones, todas aplicadas. **Desplegado en producción** a mediodía.

**Por la tarde: tres correos más y el dato de MASTER**
- Paco indicó que todos los proveedores están en la compañía MASTER de Business Central. Se midió con consultas de solo lectura: **Golf y Heretat eran copias del 3 de septiembre sin sincronizar**, con 428 proveedores que solo estaban en MASTER y 123 fichas con el NIF vacío. Business Central contabiliza con la ficha de cada compañía, así que esto solo se resuelve activando la sincronización desde MASTER. Se le explicó a Paco por teléfono.
- **Proveedores intracomunitarios:** CaptuFact los reconoce y ofrece los códigos de inversión del sujeto pasivo de la compañía (por ejemplo, ISP SERVICIOS 21 %), con aviso en pantalla.
- **Rechazos de Business Central más claros:** cuando BC rechaza una factura por la configuración de IVA, el mensaje dice ahora **qué cuenta, qué línea y qué compañía**.
- **La pantalla de proveedores ya no se queda colgada** al recargar: la actualización desde Business Central va por detrás y la pantalla avisa mientras tanto.
- Tres revisiones con varias rondas hasta el visto bueno; **pruebas automáticas en verde**. **Desplegado en producción** por la tarde. Durante el despliegue una versión apuntó unos minutos a una imagen que no existía; se volvió a desplegar la correcta y el proceso de despliegue ahora lo comprueba antes de tocar nada.
- Comprobado en producción: cuatro de las cinco empresas ya tienen su CIF cargado; 450 facturas de Golf están en Business Central sin el PDF archivado en SharePoint, pendientes de que se configure su carpeta.
- Correo a Paco con los siete puntos, con los pasos en pantalla de la configuración de Business Central y las preguntas que necesitan su decisión.

## Estado actual

ProgramaFichar: la comida o pausa sin cerrar se detecta, se propone y se corrige; en producción, en vigilancia.

CaptuFact: las mejoras de los siete correos están en producción; queda configuración de Business Central y de SharePoint fuera del código.

## Pendiente

- ProgramaFichar: vigilar los dos primeros días de uso; los kioscos de Sant Cugat y Barcelona-Sarrià cuando lleguen las tablets.
- CaptuFact: respuesta de Paco sobre MASTER y sobre el ajuste de céntimos de IVA; configurar la carpeta de SharePoint de Golf y Heretat y archivar las 450 facturas; el CIF de Drogueda.
