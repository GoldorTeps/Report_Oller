---
title: Jornada 21 de octubre — ProgramaFichar: bajas con fecha, recontratación y justificante del portal arreglado
date: 2026-10-21
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 21 de octubre de 2026

## Qué se hizo

### ProgramaFichar — Las peticiones de Marc del día, construidas y en producción

Marc mandó dos correos por la mañana («Pequeños retoques» y «Tema ausencia y subir foto»). Las decisiones de David: fecha de baja, sí; Reactivar se queda y ofrece las dos opciones; arreglar el justificante; y todo junto, en un solo despliegue.

**Bajas con fecha y periodos de empleo**
- Al dar de baja a una persona, RR. HH. elige **la fecha de baja**. Hay una columna nueva «Fecha de baja» y la fecha se puede corregir desde la ficha.
- **Reactivar ofrece dos opciones:** vuelve la misma persona (sigue su periodo) o **contrato nuevo** (empieza un periodo nuevo).
- Cada ficha guarda sus **periodos de empleo**, y el historial muestra el periodo anterior. Para quien vuelve con contrato nuevo, las vacaciones, los abonos y la bolsa de horas se cuentan desde la alta vigente.
- Comprobado antes en producción, sin tocar nada: las 16 bajas que ya existían reciben su fecha sin ningún conflicto.

**El justificante del portal, arreglado**
- Un trabajador intentó adjuntar la foto de un justificante a una ausencia desde el portal y el programa dio error. Causa: al registrar quién hacía el cambio, el programa trataba al trabajador como si fuera un usuario de gestión. Corregido, con una prueba que reproduce el fallo.
- Detectado también: hoy no se puede añadir la foto a una ausencia ya pedida, ni desde el portal ni desde gestión. El trabajador tiene que volver a pedirla. Queda anotado.

**Control de calidad**
- En la prueba previa al despliegue se detectó un fallo que **habría impedido arrancar el programa en producción**. Se corrigió y se añadió una prueba para que no se repita.
- Revisor independiente y revisión de código a fondo: 12 correcciones aplicadas (contratos solapados, una baja repetida, vacaciones que cruzan la fecha de alta, entre otras).
- Pruebas automáticas en verde: más de 1.180 en el motor y 393 en la interfaz.

**Desplegado a las 19:17**, con la vuelta atrás preparada. Verificado en producción: las 16 bajas con su fecha y la web respondiendo. Queda por ver en producción la primera subida de un justificante desde el portal.

**Correo a Marc**, con lo hecho hoy y lo arreglado el lunes en el acceso al portal, con datos actualizados: Sant Cugat ya ficha y Sarrià todavía no. Programado para salir el jueves a primera hora.

## Estado actual

Bajas con fecha, contrato nuevo y justificante del portal, en producción. En vigilancia de 48 horas.

## Pendiente

- Vigilancia de 48 horas: ningún error al dar bajas, al reactivar ni al subir justificantes.
- Peticiones de Marc que van por separado, cada una con su diseño: nóminas masivas, firma de documentos y reinicio de saldos del 1 de enero de 2027.
- Permitir añadir el justificante a una ausencia ya pedida.
