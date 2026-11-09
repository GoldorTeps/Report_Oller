---
title: Jornada 29 de septiembre — ProgramaFichar: Actualización 1 en producción y TANEGRAM dada de alta + CaptuFact: la app recuerda lo que decidió administración
date: 2026-09-29
project: ProgramaFichar, CaptuFact
type: sesion
---

# Sesión de trabajo — 29 de septiembre de 2026

## Qué se hizo

### ProgramaFichar — La Actualización 1, desplegada

- **Último bloque: un solo correo resumen a RR. HH. cada mañana a las 9:00.** Recoge las jornadas que se quedaron sin cerrar y marca como «Sin salida» las que llevan abiertas más de 16 horas. Se retira el aviso que recibía el propio trabajador, como se decidió. Las cuentas de prueba y de administración quedan fuera del resumen.
- **Revisión de código a fondo antes de desplegar:** salieron cuatro detalles y se arreglaron en el momento (la foto al volver a abrir la ficha, que un envío fallido no cuente como enviado, el saludo del correo y el total del día cuando el día aún no está cerrado).
- **Despliegue de madrugada con red de seguridad:** punto de restauración previo, comprobación de la base de datos antes de tocar nada, y verificación después: el sistema responde y la pantalla nueva es la que se sirve.

**El primer resumen de las 9:00 falló, y se arregló esa misma mañana**
- A las 9:00 el resumen se preparó bien, pero el servicio de envío de correo lo rechazó: uno de los arreglos de la noche dejaba vacío el nombre del destinatario. El fallo no quedó registrado como enviado.
- Se corrigió, con su prueba automática, se desplegó y el resumen se envió a mano a las 13:33.

**Altas y seguimiento**
- **TANEGRAM, S.L. dada de alta** en el fichaje, como pidió Marc: con sus centros «Restaurante» y «Oficinas» y la tablet del cubierto de maquinaria. Castlexperience y BLE quedan fuera de esta alta, por indicación de Marc. La tablet nueva de Marbori en Sant Cugat la crea él.
- **Informe de cierre de los 15 días de seguimiento** preparado para el cliente, y correo a Marc con todo lo nuevo, el fallo del resumen de hoy y el estado de las solicitudes pendientes.

Pruebas automáticas en verde: más de 800 en el motor.

### CaptuFact — La app aprende de lo que ya decidió administración

- **Memoria contable:** cuando llega una factura de un contrato, póliza, matrícula o suministro que ya se contabilizó antes, la aplicación **propone** la cuenta, la forma de pago y las dimensiones que puso administración la vez anterior. Solo propone cuando está segura. Comprobado contra el historial real: en cuentas, 53 aciertos y ningún fallo; en forma de pago, 100 aciertos y 2 fallos; en dimensiones, 40 aciertos y 1 fallo.
- **«Reescanear» con las reglas de hoy:** al reescanear una factura se le aplican el lector de los recibos de agua, el «No sujeto» y las propuestas de la memoria. Lo que alguien editó a mano no se toca.
- **Descuento restado dos veces:** en una factura de mobiliario, el descuento que el pie resume se metía otra vez como línea negativa. Corregido, y «Reescanear» lo deja bien.
- **Mediciones aparte de la aplicación:** las mediciones de calidad pesadas corren ahora en una tarea independiente en Azure y en solo lectura, para que no compitan con la aplicación que usa administración.
- **Fallo nuestro:** un cambio de la madrugada hizo que «Reescanear» diera error durante unos diez minutos en producción. Se corrigió enseguida.
- Se dejó programado para la mañana siguiente un correo a Frank y Paco con las mejoras sacadas del historial de facturas.

Pruebas automáticas en verde: 1.797 en el motor y 357 en la interfaz.

## Estado actual

ProgramaFichar: Actualización 1 en producción, con el resumen diario de las 9:00 funcionando tras el arreglo y TANEGRAM fichando.
CaptuFact: en producción con la memoria contable y el «Reescanear» nuevo.

## Pendiente

- ProgramaFichar: comprobar que el resumen del 30 sale solo, una vez y solo a Marc; revisar la validación de solicitudes con horas imposibles; siguientes peticiones (pausa desde el portal y aprobar en un clic).
- CaptuFact: reescanear las pendientes y volver a medir; reglas para dos proveedores frecuentes que aún no se identifican solos (entre ellos Telefónica).
