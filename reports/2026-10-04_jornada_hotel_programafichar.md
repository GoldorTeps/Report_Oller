---
title: Jornada 4 de octubre — Hotel: revisión de seguridad y servidor de demo con conexión cifrada + ProgramaFichar: por qué no llegaba el correo de las 9
date: 2026-10-04
project: Hotel, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 4 de octubre de 2026

## Qué se hizo

### Hotel — Revisión de calidad y seguridad, y servidor de demo en condiciones

**La demo, recorrida de principio a fin**
- Se hizo el recorrido completo de la demo en el servidor, siguiendo solo el guion escrito. Las copias de seguridad automáticas del 2, 3 y 4 de octubre, comprobadas.

**Revisión de código a fondo y revisión de seguridad**
- **Hallazgo urgente, resuelto en el momento:** el usuario administrador de la demo conservaba la contraseña de fábrica de los datos de ejemplo. Se cambió por una aleatoria y la antigua ya no entra.
- Arreglos desplegados:
  - la simulación diaria de la demo ya no puede tocar reservas reales;
  - la disponibilidad se calcula por habitaciones distintas;
  - «hoy» es siempre el día de Madrid;
  - el administrador puede cambiar su contraseña desde Usuarios;
  - el panel no se bloquea con una respuesta vacía o muy larga;
  - los datos de ejemplo ya no pueden vaciar la base de datos por accidente;
  - una misma reserva enviada dos veces por el canal no se duplica;
  - copias de seguridad con permisos restringidos, siempre al menos siete guardadas, y reinicio automático del servicio.

**Servidor de demo con conexión cifrada**
- La demo se sirve ahora en una **dirección propia con conexión cifrada (HTTPS)** y certificado válido. El acceso antiguo sin cifrar queda cerrado y todo el tráfico pasa por el candado.
- El servicio corre en modo producción, con un procedimiento escrito de despliegue que hace copia antes de cada cambio y permite volver atrás.
- **De paso se cerró un hueco:** era posible falsear la dirección de origen y saltarse el freno de intentos de inicio de sesión. Ya no.
- Verificado en el servidor: la conexión cifrada responde, lo no cifrado redirige, el inicio de sesión funciona y los datos de la demo están intactos.

Pruebas automáticas en verde: 303.

### ProgramaFichar — El correo de las 9 que no llegaba, y la carga de correcciones

**Por qué Marc no recibió el resumen el 1 y el 2 de octubre**
- La aplicación envió el resumen todos los días a su hora, y el servicio de envío de correo lo aceptó.
- Consultado el registro de entregas: **los del 1 y 2 de octubre los rechazó el servidor de correo de Oller**, porque la dirección compartida del servicio de envío (Brevo) estaba en una lista de bloqueo (SpamCop). Los del 29 y 30 de septiembre y los del 3 y 4 de octubre sí se entregaron.
- La solución está del lado del correo de Oller: que su proveedor de correo deje pasar al remitente.

**Medición de las correcciones a mano en el panel**
- Del 22 de septiembre al 4 de octubre: unas 300 correcciones, de 20 a 25 minutos por día laborable. **El 82 % son pausas y comidas.** Las solicitudes por el portal todavía no se usan.
- Se registraron las peticiones de Marc del 1 y el 2 de octubre: validar en lote por empresa las jornadas incompletas, ver quién de cada empresa se queda a comer, y ver y editar las horas de contrato en la ficha. Para la primera se prepararon tres opciones, con la que se recomienda y su encaje legal.

Sin cambios en la aplicación del fichaje este día.

## Estado actual

Hotel: demo en un servidor con conexión cifrada y revisión de calidad y seguridad en curso, con los hallazgos importantes ya corregidos.
ProgramaFichar: en producción sin cambios; causa del correo perdido confirmada.

## Pendiente

- Hotel: completar la revisión de calidad y el visto bueno de un revisor independiente; ajustar los enlaces de los correos de check-in online; enseñar la nueva dirección a Frank.
- ProgramaFichar: contestar a Marc sobre los correos rechazados, las comidas y las horas de contrato; decidir cómo se valida en lote.
