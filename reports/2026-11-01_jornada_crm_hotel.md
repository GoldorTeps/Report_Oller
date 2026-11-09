---
title: Jornada 1 de noviembre — Hotel: revisión a fondo y segunda tanda para que recepción pueda trabajar un día real · CRM: reevaluación honesta y 15 fallos corregidos
date: 2026-11-01
project: CRM, Hotel
type: sesion
---

# Sesión de trabajo — 1 de noviembre de 2026

## Qué se hizo

### Hotel — Revisión a fondo, factura con Business Central y segunda tanda

**Revisión de la primera tanda**
- Revisión de código a fondo, revisión de seguridad, un revisor independiente y una pasada en la demo en el papel de recepción.
- **Corregido y desplegado en la demo**, cada cosa con su prueba:
  - un cobro con tarjeta que se podía apuntar dos veces;
  - un importe escrito como «1.234,50» que se cobraba como 1,23 €;
  - cargos y anticipos ya no admiten importes negativos y quedan registrados;
  - una factura no se puede emitir dos veces;
  - el borrador de factura sale marcado como borrador;
  - nombres con caracteres de otros alfabetos en el PDF;
  - salida anticipada y estancias con noches negativas;
  - el buscador encuentra por nombre completo.
- **Acceso:** el límite de intentos del PIN contaba también las entradas correctas. Con todo el hotel saliendo por una sola conexión, eso podía bloquear a recepción. Corregido: ahora bloquea al undécimo intento fallido. Además, los listados solo envían los datos del huésped que necesitan.
- Ficha de huéspedes adaptada al móvil, y los datos de relleno de la demo ya no enseñan texto técnico a recepción.
- 578 pruebas en el motor y 164 en la interfaz, en verde.
- **Dictamen del control de calidad: todavía no está lista para producción.** Quedan decisiones de David (qué pasa con el dinero de una reserva cancelada, cómo se muestra lo pagado y el saldo) y una lista de mejoras sin decisión pendiente.
- Un error propio: se dio por bueno un campo de importe que la pasada en la demo demostró que fallaba.

**La factura del hotel, con Business Central**
- Frank contestó con el criterio de facturación sobre lo que había explicado Paco: la factura se hace al momento desde el programa, pero se emite en Business Central; recepción no tiene acceso a Business Central; los albaranes van en Business Central; administración factura el resto en uno o dos días; y las facturas entre empresas, en principio, son automáticas.
- **Plan escrito, pendiente de la firma de David:** «Fer la factura» pasa a ser un **documento provisional** (la factura definitiva la emite Business Central), los cargos del restaurante siguen los casos que describió Paco, y antes de elegir cómo enviar los albaranes se hace una prueba técnica, avisando a Suitech.
- Se prepararon dos correos: uno para Frank y Paco, y un recordatorio para Laia.

**Prueba de la aplicación entera por rol, y comparación con el mercado**
- Tres revisores que no habían escrito el código usaron la demo como recepción, dirección y limpieza. Además, se comparó el programa con otros programas de hotel a partir de fuentes públicas.
- **Conclusión, dicha sin rodeos: hoy recepción no podría trabajar un día real.** Lo más grave era culpa nuestra: la primera tanda quitó cambiar fechas arrastrando en el planning y no lo puso en la ficha.

**Segunda tanda, construida y desplegada en la demo**
- **El precio sale de las tarifas del día** que pone dirección, y recepción puede ajustarlo. Hasta ahora, lo que se ponía en Tarifas no llegaba a recepción.
- **Cambiar estancia** desde la ficha, viendo el antes y el después.
- **Cancelar con motivo y No presentado**, a la vista. Cancelar no toca el dinero: devolverlo es otro paso.
- Adultos y niños, y la nacionalidad elegida de una lista.
- **Check-in solo desde el día de llegada y con cabaña asignada.** El check-out pregunta si la salida es anticipada, y los dos se pueden deshacer el mismo día.
- **Concepto libre** con precio e IVA.
- **Caja:** cobros por método y por persona, efectivo contado y nota para el siguiente turno. Antes de cerrar el día se ven los pendientes; el aviso no bloquea.
- Dos pasadas en el papel de recepción sobre la demo, con todo lo que encontraron corregido.

### CRM — Reevaluación honesta y los 15 fallos de la revisión, corregidos

**Reevaluación**
- Se midió lo que puede hacer hoy un comercial con el CRM, y **la respuesta es poco**: es una agenda para dar de alta y consultar contactos. La ficha es de solo lectura, y no hay notas, tareas, cuentas, oportunidades, correo ni informes.
- La causa es nuestra: el diseño de junio salió de la propuesta y de la arquitectura, no del día a día de un comercial.
- Se escribió una comparación punto por punto con HubSpot y un **guion de 20 preguntas para una hora con el equipo comercial**, y después con Paco, antes de construir nada.
- Decisión de David: primero lo que pide el grupo.

**Los 15 fallos de la última revisión de código, corregidos**
- Cada uno con su prueba, que se vio fallar antes de corregirlo. Entre ellos: correos con letras de otros alfabetos que, al normalizarlos dos veces, daban otra dirección; teléfonos ilegibles, que ahora se descartan sin perder la actividad; y la importación, que ya no bloquea el servidor.
- Los correos antiguos se pasan a minúsculas una sola vez, con una migración.
- 463 pruebas en el motor y 71 en la interfaz, en verde. **Sin desplegar.**

## Estado actual

Hotel: dos tandas del feedback de recepción desplegadas en la demo. El control de calidad aún no da el visto bueno para producción, y el criterio de facturación con Business Central está escrito a falta de firma. CRM: reevaluado frente a lo que necesita un comercial y con la conexión al hotel corregida, sin desplegar.

## Pendiente

- Hotel: decisiones de David sobre devoluciones y saldo; firma del plan de facturación con Business Central; enviar los correos a Frank, Paco y Laia; preguntar a Laia cómo tarifa por personas y régimen; usuarios de limpieza y administración para probar esos roles de verdad.
- CRM: la hora con el equipo comercial; después, diseñar el módulo comercial.
