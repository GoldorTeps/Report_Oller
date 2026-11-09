---
title: Jornada 4 de noviembre — ProgramaFichar: nóminas desde PDF corregidas y demo de guardias + Hotel: datos del parte en el mostrador + Restaurante: revisión frente al sector
date: 2026-11-04
project: ProgramaFichar, Hotel, Restaurante
type: sesion
---

# Sesión de trabajo — 4 de noviembre de 2026

## Qué se hizo

### ProgramaFichar — Nóminas desde PDF: el fallo era del programa, y se corrigió para el reparto

Marc subió el PDF de nóminas (46 páginas) y el programa dijo en todas que **no traía DNI**. Marc insistió en que sí lo traía, y **tenía razón**: el fallo era nuestro.

- **Causa encontrada y reproducida:** el lector de PDF no veía el texto que esa nómina guarda en un formato interno distinto, y no avisaba del error. Nuestras pruebas usaban PDF generados por nosotros, que no tenían ese formato.
- **Con el arreglo, el PDF de Marc se lee entero: 46 de 46 DNI y nombres.** Su copia no trae el periodo (quizá retocada); ahora el programa **avisa** si una nómina no trae el mes, para ponerlo a mano antes de enviar.
- Dos rondas de **revisión de código a fondo** (10 puntos cada una). Se optó por lo más seguro: una página dudosa **se rechaza** y se avisa, en lugar de intentar adivinarla.
- Se sustituyeron por nombres inventados unos nombres reales que habían quedado en las pruebas.
- **Pruebas automáticas en verde**, y comprobado que las nuevas fallan si se deshace el arreglo.
- **Publicado en producción esa noche**, verificado tras el despliegue. **Salió sin la revisión del tercero**, por decisión propia, para que el reparto del día 5 pudiera hacerse; esa revisión queda pendiente a posteriori.

**Demo de guardias para Castlexperience y BLE**, actualizada tras el visto bueno a la vista previa: comprobado el acceso, las dos tablets y el balance de horas de noviembre. Se avisó a Castlexperience. Hubo cortes breves de red en el servidor de la demo por la tarde, sin causa confirmada.

### Hotel — Business Central, analizado; y lo que pide el parte, también en el mostrador

**Lo que pide Frank frente a lo que permite Business Central**
- Se releyeron enteros los correos de Frank y Paco desde julio. Frank pide que **cada movimiento llegue a Business Central al momento**, en todas las empresas y departamentos, y que la factura se haga al check-out recogiendo esos albaranes.
- Se comparó punto por punto con lo que ofrece Business Central, **leyendo** el entorno de pruebas del grupo: algunas piezas (juntar albaranes, series) necesitarán **una pequeña extensión o una decisión de administración sobre las series**. **No se escribió nada en Business Central.**
- La integración queda **aparcada para priorizar el programa del hotel**; antes de escribir en el entorno de pruebas se avisará a Suitech.

**Datos del parte de viajeros en el mostrador**
- Recepción recoge ahora en el mostrador lo que la normativa del registro de viajeros exige y antes solo pedía el formulario online: **segundo apellido** (no obligatorio), **sexo tal como figura en el documento** (sin valor por defecto), **número de soporte** del DNI/NIE, **parentesco de los menores** y **firma** (en pantalla o en papel).
- El **formulario online vuelca todos sus datos** en la ficha (antes solo copiaba documento, teléfono y correo).
- Ninguno de estos datos personales se usa fuera de la ficha y del parte.
- **Prueba de uso simulada** con recepción: corregido que la firma online se pudiera perder y que no se avisara si algo no se guardaba o no se enviaba. **Publicado en la demo**, con sus pruebas en verde.
- El parte **sigue sin cumplir con Mossos** hasta tener su manual y un fichero de ejemplo.

### Restaurante — Estudio del sector y revisión honesta del programa

- **Estudio a fondo de los TPV de hostelería** (mercado, España, integración con hotel, normativa de VeriFactu y tiques, IVA del restaurante, oficio de sala y cocina). Se comprobó una muestra de 15 datos en su fuente original: 14 confirmados.
- **Corrección importante:** el vino servido en mesa va al **10 % de IVA**, no al 21 %, como se había supuesto en el estudio previo.
- **Revisión del programa del restaurante frente a ese estudio: hoy no está listo para cobrar de verdad.** Salen 10 puntos que lo impiden, entre ellos: el **cargo a la cabaña no llega al hotel**, las **alergias no llegan a cocina**, un fallo de impresión no avisa, se pueden borrar líneas sin dejar rastro, el tique no lleva el IVA y el arqueo sale mal. Y 17 funciones básicas más.
- Borrador del plan para el TPV, con las preguntas que hay que resolver con Frank y administración (qué cubre hoy el TPV actual, qué pasa si Business Central no responde en pleno servicio, dónde corre el programa). **Sin código nuevo**: depende de decidir el camino del hotel.

## Estado actual

ProgramaFichar: nóminas desde PDF corregidas y en producción, listas para el reparto; demo de guardias actualizada.

Hotel: demo con los datos del parte en el mostrador; integración con Business Central analizada y aparcada.

Restaurante: primera versión, no apta todavía para cobrar; plan en borrador, pendiente de decisión.

## Pendiente

- ProgramaFichar: acompañar el reparto de nóminas del día 5; revisión del tercero sobre el arreglo; respuesta de Castlexperience y BLE a la demo.
- Hotel: activar la tasa en la cuenta del huésped (siguiente bloque); decisiones del cierre del día y de las devoluciones; manual de Mossos; ver FrontHotel en remoto; correos de Frank del 3-nov.
- Restaurante: decidir con Frank el alcance del TPV; consultas con administración sobre IVA, sociedades y propinas; ver un servicio real en sala y cocina.
