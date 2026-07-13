---
title: Jornada 13 de julio — CRM: control de calidad y seguridad superado, listo para desplegar con conexión cifrada (HTTPS)
date: 2026-07-13
project: CRM
type: sesion
---

# Sesión de trabajo — 13 de julio de 2026

## Qué se hizo

### CRM — De "usable" a "listo para producción", con el control de calidad y seguridad pasado

El CRM ya era una herramienta de gestión de clientes completa. Hoy ha pasado el **control de calidad y seguridad** de principio a fin y ha quedado **preparado para desplegarse en el servidor con conexión cifrada**.

**Blindaje de acceso y datos**
- El **inicio de sesión queda protegido contra intentos masivos**: si alguien prueba contraseñas a lo bruto, el sistema lo frena automáticamente.
- Se cerró de raíz que un responsable pudiera **modificar datos de clientes que no le corresponden** (solo ve y toca su línea de negocio; el resto le queda invisible).
- La **importación de listas tiene límites** (tamaño y número de filas) para que un archivo enorme no pueda tumbar la aplicación.
- La contraseña interna del sistema y las credenciales dejaron de viajar dentro de la aplicación: se cargan aparte, de forma segura.

**Triple revisión independiente antes de dar el visto bueno**
- **Revisión de código a fondo** y **revisión de seguridad** (estándar OWASP): sin fallos de fondo.
- Un **revisor independiente** repasó el trabajo desde cero y **encontró tres puntos débiles**, que se **corrigieron en el momento** (entre ellos, un hueco por el que se podía saltar el freno de intentos de login).
- **Dictamen final favorable**: la aplicación está sólida y lista.

**Conexión cifrada (HTTPS)**
- El CRM se sirve ahora tras un **candado de seguridad (HTTPS)**: todo lo que viaja entre el navegador del cliente y el sistema va **cifrado**. Verificado de punta a punta, incluida la protección contra suplantación de identidad en la conexión.

Todo lo anterior quedó cubierto con sus **pruebas automáticas (todas en verde)**: 113 en el motor y 26 en la interfaz.

## Estado actual

CRM versión 1 **endurecido y listo para desplegar** en el servidor propio, con conexión cifrada. Ha superado las cuatro revisiones de calidad y seguridad. Falta únicamente **apretar el botón del despliegue** y cargar los datos reales del cliente.

## Pendiente

- **Desplegar en el servidor** y publicar el acceso con conexión cifrada.
- Acompañar al cliente a **cargar sus datos reales** (empresas y equipo) — hasta entonces funciona con datos de demostración.
- Cambio de la contraseña inicial del administrador en el primer acceso.
