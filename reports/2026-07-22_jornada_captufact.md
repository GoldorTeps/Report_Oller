---
title: Jornada 22 de julio — CaptuFact: accesos desbloqueados con Frank + informe sobre quién emite la factura, el programa o Business Central
date: 2026-07-22
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 22 de julio de 2026

## Qué se hizo

### Informe para Frank: ¿factura el programa o factura Business Central?

A partir de la conversación con Frank sobre cómo usa hoy el grupo Business Central (licencias para administración y contabilidad; la operativa de sala imprime el tique desde su propio programa), se redactó un **informe de tres páginas** para decidir quién emite cada factura.

- Razonado **por línea de negocio**, no caso a caso:
  - Venta en tiempo real (hotel, restaurante, tienda, pistas): **emite el programa** de cada punto de venta.
  - Alquileres, eventos y venta a empresas: **emite Business Central**.
  - Todo acaba en **Business Central para la contabilidad**.
- Eje del informe: la obligación **VeriFactu** recae en quien emite la factura. Como el grupo no declara por SII, VeriFactu le aplica, y el programa que emita facturas tiene que cumplirlo.
- Se señaló con claridad que el registro VeriFactu actual de los programas del hotel y del restaurante (en pruebas) **todavía no está completo** y debe cerrarse antes de facturar en real.
- El futuro programa de alquileres gestionará contratos y recibos, pero **la factura la emitirá BC**.
- El informe se reescribió dos veces para ajustarlo al enfoque correcto y se entregó en PDF.

### CaptuFact — Los dos accesos que faltaban, desbloqueados con Frank

En una sesión remota con Frank quedaron resueltos los dos accesos que tenían parado el avance.

- **Acceso a MARBORI en el Business Central de pruebas**: hasta ahora solo se podía entrar en la empresa de demostración. Ya hay acceso a todas las empresas del entorno de pruebas.
- **Permiso de lectura del correo para la aplicación**: lo concedió Frank como administrador del grupo (Suitech no podía). **Verificado en vivo**. Es el permiso que permitirá seguir leyendo el buzón de facturas cuando termine la migración a Microsoft.
- **Aviso de seguridad:** el permiso, tal como está, permitiría leer cualquier buzón del grupo. Hoy no se usa (no hay nada conectado y el buzón aún no ha migrado), pero **debe limitarse a los buzones de facturas antes de encenderlo**. La instrucción para hacerlo está preparada.
- Se comprobó que no hacía falta registrar una aplicación nueva: bastaba con el consentimiento.

**Alta de proveedores en el BC de pruebas**
- Se preparó el maestro de proveedores en el formato de importación de Business Central (plantilla de configuración).
- El intento de darlos de alta directamente desde el programa lo bloqueó **Continia**, que intercepta las altas de proveedor y para la que la aplicación no tiene permiso. No se creó nada ni se duplicó nada. La vía será la importación desde la propia pantalla de BC.

## Estado actual

Los accesos a MARBORI y al correo están concedidos y verificados; falta limitar el permiso de correo a los buzones de facturas. El informe sobre quién emite la factura está entregado a Frank.

## Pendiente

- Limitar el permiso de lectura del correo a los buzones de facturas (requiere al administrador de correo del grupo).
- Importar el maestro de proveedores en MARBORI (entorno de pruebas) y comprobarlo.
- Confirmar el buzón de proveedores de MARBORI.
- Cruzar el informe con el que Frank preparará sobre cómo aprovechar más Business Central.
- Confirmar con la asesoría del grupo el alcance de VeriFactu para los puntos de venta.
