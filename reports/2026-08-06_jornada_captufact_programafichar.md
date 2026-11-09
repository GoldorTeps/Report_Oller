---
title: Jornada 6 de agosto — CaptuFact: el IVA llega bien a Business Central, aviso de duplicados y pestaña de Incidencias · ProgramaFichar: arranca la prueba de quince días
date: 2026-08-06
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 6 de agosto de 2026

## Qué se hizo

### CaptuFact — Tres despliegues a producción y el histórico corregido

**Las correcciones llegan también a lo ya guardado**
- Al revisar un caso concreto se vio que los arreglos del día anterior solo se aplicaban a las facturas nuevas: las ya guardadas seguían diciendo "Marbori" como proveedor. Se preparó una pasada de corrección segura: por defecto solo simula, nunca toca facturas ya enviadas a BC y guarda el valor anterior para poder deshacerlo.
- **Desplegado en producción** (copia de seguridad antes, las 250 facturas intactas).

**Las facturas que no cuadraban**
- Caso de partida: una factura de ferretería con un descuento del 10 % por línea, perfectamente correcta en papel, que la aplicación no dejaba enviar. El lector recalculaba la línea en lugar de copiar el importe. Corregido.
- No era un caso aislado: **46 de 250 facturas estaban bloqueadas por descuadre**. Se analizaron una a una y se corrigieron las causas (marca que no se recalculaba al corregir la base, importes con IVA en la línea, líneas duplicadas, descuentos por línea). Las retenciones de IRPF y las franquicias de seguro se respetan: no son un error de lectura.
- **Resultado en producción: de 46 bloqueadas a 20**, que pueden tener descuadres reales y piden revisión.

**La empresa destinataria, arreglada de raíz**
- Al revisar la pantalla apareció un proveedor escrito en el campo de la empresa del grupo que recibe la factura. Tirando de ahí: **solo 44 de 250 facturas podían asignarse a una empresa de BC**, porque Castlexperience no estaba vinculada a su empresa en BC. Corregido: **214 de 250** ya se asignan bien.
- El campo de empresa destinataria deja de ser texto libre y pasa a ser **un selector con las empresas del grupo**.

**El IVA llegaba a Business Central a cero**
- El fallo más grave del día: las facturas se enviaban con IVA 0 porque el código de IVA no era el que BC espera. Se arregló y, en lugar de escribir los códigos a mano, la aplicación mantiene ahora **una copia del catálogo de IVA configurado en BC**.

**La misma factura dos veces**
- Business Central no detecta números de factura repetidos. Ahora la aplicación **avisa al entrar y bloquea al enviar** (con opción de forzar), y distingue un duplicado de verdad de un número mal leído. Los avisos se señalan sobre el campo concreto, para corregir rápido.

**Gestionadas completa, pestaña de Incidencias y errores legibles**
- Las facturas ya gestionadas se despliegan con toda su información.
- **Nueva pestaña de Incidencias:** borrar una factura ya no la destruye; queda marcada con motivo y nota, y se puede recuperar. Con esto se corrige además que una factura borrada pudiera volver a entrar sola en la siguiente lectura del buzón.
- Los errores de BC ya no se ven como un bloque técnico, sino como un mensaje claro de qué hay que cambiar en BC.
- **El PDF del taller con siete facturas dentro** queda detectado y avisado; de momento no se parte automáticamente (decisión: avisar ahora, partir después).
- Los nombres de proveedor mal leídos se corrigen con el CIF del maestro de BC, solo cuando los dos nombres coinciden en algo: 7 corregidos y 2 señalados para revisar a mano.

**Preparado el paso al Business Central definitivo**
- Frank pidió pasar del entorno de pruebas de BC al real. Antes de hacerlo se detectó que el cambio habría vaciado Gestionadas al primer clic, porque las facturas enviadas al entorno de pruebas no existen en el real. Corregido: cada factura recuerda a qué entorno se envió. Guion del cambio escrito paso a paso.
- Las 15 facturas anteriores a 2026 esperan una decisión de Frank: enviarlas con fecha de hoy cambiaría el periodo de declaración del IVA.

**Fallos propios del día, cazados a tiempo**
- Una pasada de corrección falló al guardar y no escribió nada; otra contaba como "sin explicación" facturas que sí cuadraban; y una herramienta de relectura borraba marcas de descuadre de 4 facturas, que seguían retenidas por otro motivo y no llegaron a BC. Las tres corregidas y las facturas marcadas de nuevo.
- Un cambio para Incidencias habría hecho fallar **todos** los envíos a BC; lo detectó una prueba automática que ya existía, antes de llegar a producción.

Pruebas automáticas en verde. Producción actualizada al cierre del día.

### ProgramaFichar — Arranca el periodo de prueba de quince días

- Acordado con Frank: **un mínimo de quince días de prueba con personas reales antes de dar el producto por entregado**, con el registro de siempre en paralelo.
- **Cuadrante de horarios en producción**, comprobado en lo publicado.
- **Correos encendidos:** autorizado el servidor en Brevo y verificado el remitente nuevo de RR. HH. Probado con un envío real de recuperación de contraseña. Si Marc pierde el acceso al panel, **puede recuperarlo él solo**.
- **Siete accesos nuevos para las siete tablets**, uno por ubicación (la cantina, en modo restaurante), probados contra la aplicación. Los dos accesos de la primera instalación quedan revocados.
- **Guía de montaje para Marc:** instalar la aplicación, configurar el acceso y anclar la pantalla, con comprobaciones que puede hacer él mismo.
- **Botón para ver la contraseña** mientras se escribe, en los 14 campos que la piden, incluido el del acceso de las tablets.
- **Tiempo de guardia para Castlexperience:** antes de que la prueba llene la base de datos, se preparó para registrar guardias sin cambiar nada de lo que fichan hoy las empresas del grupo. Una batería de pruebas fija que los cálculos de horas del grupo dan exactamente lo mismo. La equivalencia de horas por perfil espera la respuesta de dirección.
- Alta de Frank como empleado de prueba, comprobada sin dejar un fichaje real. Se verificó que Marc ya estaba dado de alta, evitando una ficha doble.
- **Fallo corregido en el importador de plantilla:** cargar un fichero solo con correos borraba el apellido de cada persona. Corregido y probado en producción sin alterar ningún dato. Se anotó como mejora que el cliente pueda **cargar su propia plantilla con el formato de la gestoría**, sin depender del programador.
- Correo de arranque para Marc, con Frank en copia, preparado.

## Estado actual

CaptuFact: en producción con el IVA correcto, aviso de duplicados, Incidencias y la empresa destinataria resuelta en 214 de 250 facturas; todavía apunta al entorno de pruebas de BC. ProgramaFichar: listo para la prueba de quince días, con cuadrante, correos y accesos de tablets en producción.

## Pendiente

- CaptuFact: pasar al Business Central definitivo, las 20 facturas que siguen descuadradas, y las decisiones de Frank (serie de numeración de 2025 y proveedores sin términos de pago en BC).
- ProgramaFichar: enviar el correo de arranque a Marc y montar las tablets. Pendiente de terceros: mapeo de ubicaciones, NIF y forma jurídica de dos sociedades, plantilla de uniformes, y los perfiles de guardia de dirección.
