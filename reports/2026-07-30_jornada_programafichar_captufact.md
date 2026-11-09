---
title: Jornada 30 de julio — ProgramaFichar: las empresas de Marc cargadas y kiosco para todo el grupo + CaptuFact: revisión de las observaciones de Frank y corrección en producción
date: 2026-07-30
project: ProgramaFichar, CaptuFact
type: sesion
---

# Sesión de trabajo — 30 de julio de 2026

## Qué se hizo

### ProgramaFichar — El encargo de Marc: tres empresas cargadas y kioscos compartidos por todo el grupo

Marc pidió arrancar el fichaje con tres de las seis empresas del grupo (Golf, Heretat y Restauració), dos kioscos físicos compartidos (Restaurante y Oficinas) y un código para cada trabajador. Todo se preparó en el entorno de Azure.

**Carga de las empresas y sus plantillas**
- Se cargaron las tres empresas con sus **78 trabajadores** a partir de los Excel de la gestoría, con una herramienta de conversión reutilizable para las otras tres empresas. Cero errores en la carga. Se detectó una errata en uno de los ficheros de la gestoría, que se corrigió y se anotó para avisar a Marc.
- Se generaron los **PIN de todos los trabajadores**, pendientes de entregar a Marc por un canal seguro.
- Se dio de alta también MARBORI, S.L. Las empresas a las que les falta el NIF no se cargan con un valor provisional, porque el NIF sale en los informes: se esperan los datos de Marc.

**Cuentas en tres niveles y un registro de actividad para Frank**
- Tres niveles: **Frank** puede hacerlo todo; **RR. HH. (Marc)** opera las seis empresas con un único acceso, pero no crea empresas ni usuarios de gestión; y queda previsto un administrador por empresa.
- **Registro de actividad:** Frank tiene una pestaña donde ve el trabajo que se hace por debajo (quién entra, en qué empresa trabaja, importaciones, cambios en fichas de empleados, kioscos…). En los cambios de ficha se registra qué campo cambió, nunca el dato.
- Antes, cuando Frank trabajaba dentro de una empresa, sus acciones quedaban registradas como si las hubiera hecho el sistema. Ahora queda identificado quién hizo cada cosa.
- Verificado con la cuenta de RR. HH.: ve las seis empresas y sus trabajadores, pero no puede crear empresas ni administradores ni ver el registro de Frank.

**Un fallo que hacía ver «0 empleados»**
- Al revisar con la cuenta de RR. HH., la lista de empleados salía vacía en todas las empresas, aunque otras pantallas mostraban la plantilla completa. La causa era una redirección interna que el navegador bloqueaba en silencio por seguridad. Costó tres intentos encontrarla: la clave era reproducir la petición exactamente como la hace el navegador.
- Se corrigió de raíz, se añadieron pruebas que lo vigilan en todas las listas y se evitó que una cuenta de grupo vea pantallas vacías sin explicación. Verificado: cada empresa muestra su plantilla.

**Kiosco para todo el grupo y kiosco de restaurante**
- **Cualquier trabajador del grupo ficha en el mismo aparato solo con su PIN**, y el fichaje se apunta en su empresa. Se comprobó que los PIN no se repiten entre empresas: los que se generaron para Marc siguen valiendo.
- **Kiosco de Restaurante** con los botones «Entrar a comer» y «Salir de comer», que cuentan como pausa en todos los cálculos y en los informes, y el panel muestra «Comiendo» en directo.
- De paso se corrigió un fallo que podía perder minutos al calcular una pausa mal cerrada.
- **Aplicación Android** para las tablets: el kiosco a pantalla completa, sin poder salir por error.
- Creados los dos kioscos de grupo (Restaurante y Oficinas) y retirados los provisionales por empresa.
- Pruebas automáticas en verde (511 en el motor y 92 en la interfaz) y todo verificado en Azure, incluido un ciclo completo con comida.

### CaptuFact — Las observaciones de Frank y una corrección en producción el mismo día

Frank envió 17 observaciones sobre la aplicación. La orden fue no tocar nada hasta entenderlas.

**Lo que dicen las observaciones**
- Más que una lista de fallos, la mayoría apuntan a una misma decisión de producto: Frank quiere que CaptuFact sea la entrada y revisión de facturas hacia Business Central, con **un solo paso** (el administrativo deja la factura bien y la sube a BC), y no un circuito de preparar y aprobar en dos escalones. Ocho de las diecisiete convergen ahí.
- Se clasificaron en: malentendidos, mejoras rápidas, la decisión de producto y funciones nuevas.

**Revisión en directo con las cuentas reales, y lo que salió**
- El error que Frank vio («¿Qué es CUPS?») era un **mensaje equivocado de la aplicación**: decía una cosa genérica cuando el motivo real era otro.
- Una factura aprobada que no llegó a BC solo avisaba con un mensaje que desaparecía enseguida, sin dejar rastro.
- **Producción vuelca al entorno de pruebas de Business Central, no al BC real.** Si se buscan las facturas en el BC real, no aparecen.
- En ese entorno de BC no existe una empresa para Castlexperience (sus proveedores están dentro de MARBORI, S.L.), y por eso sus facturas fallaban al volcar. Falta configurar esa correspondencia.
- La lectura automática toma a veces el CIF del comprador en lugar del del proveedor en algunas facturas, que hay que corregir.
- **Un fallo de base:** aunque se tecleara el CIF correcto, la factura seguía marcada como «necesita revisión» y no se podía enviar a BC con ningún perfil, tampoco el de Frank. Además, la pantalla de revisión ni siquiera mostraba el campo del CIF.

**La corrección, en producción el mismo día**
- Al corregir el CIF, la incidencia se resuelve y la factura puede seguir su camino.
- Los mensajes de error dicen ahora el motivo real, y el botón bloqueado explica por qué lo está.
- La pantalla de revisión muestra y deja editar el CIF del proveedor.
- Pruebas automáticas en verde (377). **Desplegado en producción** con copia de la configuración, renovación de una clave interna y la comprobación de arranque seguro activa. Verificado tras el despliegue.

## Estado actual

ProgramaFichar: en Azure, las tres empresas de Marc cargadas con sus trabajadores, cuentas en tres niveles, registro de actividad para Frank y kioscos de grupo listos para las tablets. CaptuFact: corrección del CIF en producción; las observaciones de Frank, analizadas, con la decisión de producto pendiente.

## Pendiente

- ProgramaFichar: revisión visual antes de entregar a Marc su acceso, los PIN y los kioscos; pedir a Marc los NIF que faltan y confirmar los datos de Heretat; preparar las tablets con la aplicación Android cuando lleguen; activar el email en Azure.
- CaptuFact: hacer la demostración completa desde la aplicación con las facturas desbloqueadas; configurar la empresa de BC para Castlexperience; escribir el análisis de las observaciones de Frank y **decidir con Frank y Víctor el modelo de un paso o dos**; corregir los CIF mal leídos; y el paso del entorno de pruebas de BC al BC real.
