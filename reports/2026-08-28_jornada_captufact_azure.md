---
title: Jornada 28 de agosto — CaptuFact y Azure: el servidor provisional, vaciado de datos; revisión de seguridad y aviso de inicio de sesión
date: 2026-08-28
project: CaptuFact, Azure
type: sesion
---

# Sesión de trabajo — 28 de agosto de 2026

## Qué se hizo

### Azure — Revisión de seguridad de la instalación del grupo

Se revisó, contra la configuración real de Azure (trabajo empezado el jueves 27 por la tarde), cómo está protegida la instalación de CaptuFact y el fichaje:
- **Base de datos** cerrada a internet (solo acceden los servicios de Azure), con copias de seguridad de 35 días.
- **Almacenamiento de los PDFs** solo por conexión cifrada y sin acceso público.
- **Almacén de claves** con control de acceso por roles y protección frente a borrados accidentales.
- **El programa** solo es accesible desde fuera por su web con conexión cifrada (HTTPS); el motor interno no se expone.
- Quedan anotadas mejoras: copia en una segunda región y alta disponibilidad (hoy no las hay), una protección extra del almacén de claves (es irreversible, así que se decide con calma) y renovar una credencial de conexión con Business Central.

También se retiraron las contraseñas de alta de usuarios que figuraban en un documento de trabajo interno (nunca estuvo en el repositorio de código).

### CaptuFact — Ningún dato de CaptuFact queda en el servidor provisional

Con CaptuFact ya en Azure, se vació del servidor provisional **toda la información de CaptuFact**, dejando solo la redirección a la dirección nueva:
- **Antes de borrar:** copia completa de la base de datos, **cifrada** y comprobada (se descifró y coincidía exactamente con el original), guardada fuera del servidor. Los PDFs no hacía falta copiarlos: los 373 ya estaban verificados en Azure.
- **Después:** se eliminaron los contenedores, los volúmenes de datos, las copias de seguridad antiguas y los ficheros de configuración, con borrado seguro de las copias de base de datos. La revisión final encontró cuatro restos más con un nombre antiguo, que también se eliminaron.
- **Comprobado al cerrar:** la redirección funciona conservando la ruta, CaptuFact en Azure respondiendo con normalidad durante toda la operación, y el resto de aplicaciones del servidor provisional intactas y en marcha. Se liberó cerca de 1,8 GB.

**Página de aviso de mudanza.** Quien entre por la dirección antigua ve ahora una página sobria que explica que CaptuFact se ha trasladado y le lleva a la nueva; cualquier otra ruta sigue redirigiendo directamente. La página no muestra nombres de empresa ni cifras (es pública), no carga nada de fuera, funciona en modo claro y oscuro, en móvil y sin JavaScript.

**Auditoría del servidor provisional.** Se hizo inventario de lo que queda en él: de CaptuFact, nada. Salen tareas de endurecimiento para las demás instalaciones.

**Aviso de inicio de sesión (construido, sin activar).** El administrador técnico podrá recibir un aviso por Telegram cada vez que alguien entra en CaptuFact o falla al entrar. Diseñado para que **nunca retrase ni impida un inicio de sesión** aunque Telegram no responda, y un intento fallido no deja rastro en la base de datos (para no permitir adivinar qué correos existen). Viene **apagado por defecto**. Además, la clave del bot ya no se muestra completa en Ajustes. Con sus pruebas automáticas, todas en verde.

## Estado actual

CaptuFact en producción en Azure, sin cambios. El servidor provisional ya no guarda ningún dato de CaptuFact: solo la página de mudanza y la redirección. El aviso de inicio de sesión está listo pero sin desplegar.

## Pendiente

- Desplegar y configurar el aviso de inicio de sesión.
- Renovar la credencial de conexión con Business Central.
- Retirar también del servidor provisional los datos del fichaje (ya está en Azure) y completar el endurecimiento de ese servidor.
- Encender el resumen diario y enviar a Frank y Paco el correo con la dirección nueva.
