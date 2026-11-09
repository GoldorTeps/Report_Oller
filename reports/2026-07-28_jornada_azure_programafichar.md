---
title: Jornada 28 de julio — Azure: la infraestructura del grupo, montada, y ProgramaFichar funcionando en ella en pruebas, con recuperación de contraseñas
date: 2026-07-28
project: Azure, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 28 de julio de 2026

## Qué se hizo

### Azure — De cero a una infraestructura compartida para las aplicaciones del grupo

El espacio de Azure del grupo estaba vacío. Hoy se montó la **base común sobre la que van a correr el fichaje y CaptuFact**, con una sola descripción de toda la infraestructura que permite reconstruirla entera si hace falta.

- **Piezas compartidas:** registro de actividad, entorno de ejecución de las aplicaciones, almacén de versiones de las aplicaciones y base de datos con copias automáticas (recuperación a cualquier punto de los últimos 14 días).
- **Por aplicación:** su propia identidad, su caja fuerte de contraseñas, su almacenamiento de documentos (con historial de versiones y papelera de 30 días) y permisos mínimos: cada pieza solo puede tocar lo que necesita.
- **Las contraseñas viven solo en la caja fuerte de Azure**, nunca en el código. Las de pruebas son nuevas, distintas de las del servidor actual.
- Antes de desplegar se simuló el resultado: exactamente lo previsto y ninguna restricción inesperada del lado de Suitech.
- Al terminar se cerró el acceso temporal que se había abierto para la instalación.
- Manual de operación escrito, con la lista de comprobaciones fechada.

### ProgramaFichar — En marcha en Azure, en un entorno de pruebas

Se decidió empezar por una sola aplicación y en pruebas, con el servidor actual siguiendo como producción.

- El fichaje quedó **funcionando en Azure** y verificado de principio a fin: empresas y empleados de prueba, fichaje de entrada y salida desde el kiosco con PIN, subida de documentos al almacenamiento de Azure y aislamiento entre empresas (una no ve nada de la otra).
- Salieron **cuatro fallos que solo aparecen en Azure** (permisos de la base de datos, un fichero que no viajaba con la aplicación, una pieza que faltaba para subir documentos y el enrutado de la conexión). Primero se parchearon para seguir avanzando y, esa misma tarde, se corrigieron en el propio código con sus pruebas, de modo que la aplicación sale limpia sin parches.

**Recuperación de contraseñas: un riesgo que se vio venir**
Se revisó qué pasaría si Frank o un administrador perdieran la contraseña, y la situación era peor de lo previsto: ningún usuario de gestión podía cambiar su contraseña ni con la sesión abierta, el administrador principal solo se podía recuperar por consola, y quien quedaba bloqueado tras cinco intentos veía «contraseña incorrecta» sin saber que estaba bloqueado. Se construyó el kit completo:
- **Cambiar la contraseña** desde dentro, y **cambio obligatorio** en el primer acceso con una contraseña temporal.
- **Restablecer o desbloquear** la cuenta de alguien por su superior: la temporal se genera en el servidor y se enseña una sola vez. Cada nivel solo puede actuar sobre los que tiene por debajo.
- **«¿Olvidaste tu contraseña?»** con un email con botón y código, válido una sola vez durante 45 minutos. La respuesta es la misma exista o no la cuenta, para no dar pistas, y tiene freno de intentos.
- El aviso de **cuenta bloqueada** ya se distingue de una contraseña incorrecta.
- El empleado puede cambiar la contraseña de su portal desde la pantalla.
- Pruebas automáticas en verde (428 en el motor y 68 en la interfaz) y todo verificado en el entorno de pruebas de Azure.

**Comprobaciones con la producción actual**
- Se verificó que **producción no se había tocado**: el servidor actual sigue igual, sin reinicios y respondiendo.
- Se comprobó que la instalación actual **solo contiene datos de demostración**, sin datos de las empresas del grupo, así que el paso a Azure no obliga a migrar datos.
- El email de recuperación ya se intenta enviar, pero el proveedor de correo lo rechaza porque solo admite envíos desde direcciones autorizadas y la de Azure aún no lo está.
- El código de las tres piezas (fichaje, CaptuFact e infraestructura) quedó guardado también en el servidor, no solo en un disco.

## Estado actual

Azure: infraestructura compartida montada, documentada y lista para recibir CaptuFact. ProgramaFichar: funcionando en pruebas en Azure, con el kit de recuperación de contraseñas; el servidor actual sigue como producción, intacto.

## Pendiente

- Autorizar el envío desde Azure en el proveedor de correo y volver a probar el email de recuperación.
- Revisar visualmente en pruebas el panel de administradores, el cambio obligatorio y el aviso de bloqueo.
- Decidir cuándo pasa el kit de contraseñas a producción, o si la instalación de Azure pasa directamente a ser la definitiva.
- Llevar CaptuFact a Azure.
- Fleco técnico: la dirección de salida de Azure no es fija; fijarla requiere que Suitech active un servicio en la suscripción.
