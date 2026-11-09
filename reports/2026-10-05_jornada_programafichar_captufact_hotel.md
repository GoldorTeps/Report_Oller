---
title: Jornada 5 de octubre — ProgramaFichar: Regularizar y pausa configurable en producción · CaptuFact: las 18 incidencias de finanzas · Hotel: revisión de seguridad cerrada
date: 2026-10-05
project: ProgramaFichar, CaptuFact, Hotel
type: sesion
---

# Sesión de trabajo — 5 de octubre de 2026

## Qué se hizo

### ProgramaFichar — Dos actualizaciones en producción en el mismo día

**Actualización 1.2 (mañana): el programa propone y RR. HH. aplica en lote**
- **Pantalla nueva «Regularizar»:** reúne las jornadas de las dos últimas semanas que se quedaron sin salida o con más de 6 horas sin pausa, y propone la corrección. La salida se toma del cuadrante, si no del horario y si no del contrato; la pausa, a mitad de jornada.
- Al aplicar, cada corrección queda registrada como corrección de RR. HH., con su motivo y aviso a la persona, que puede disputarla. Cada empresa ve solo lo suyo.
- **Horas de contrato desde la ficha:** pestaña «Horario» → «Cambiar». Con la misma fecha se corrige el contrato; con una fecha posterior se cierra el anterior y se abre uno nuevo.
- **Informe de comidas:** Informes → Comidas, un fichero por empresa y persona.

**Actualización 1.3 (tarde): comida en las tablets y pausa configurable**
- La opción «Comida (cuenta como menú)» aparece en las tablets, debajo de «Entrar a comer».
- **La pausa mínima se configura** por empresa (Configuración → Pausas), entre 15 y 120 minutos, como marca el Estatuto de los Trabajadores. Regularizar usa primero la pausa del horario y, si no hay, la de la empresa, y dice de dónde la ha sacado. Solo el administrador puede cambiarla; el supervisor la ve; el cambio queda en la auditoría.
- El informe de comidas cuenta como mucho un menú por persona y día, con una nota si se pulsó más de una vez.

**Con garantías**
- **Revisión de código a fondo** y **revisión de seguridad** sin hallazgos importantes. Pruebas automáticas en verde: más de 900 en el motor y más de 200 en la interfaz.
- Desplegado y comprobado en producción: el sistema responde, los ajustes están protegidos y los textos nuevos están en la web. **Se probó en producción con el perfil de Marc: todo correcto.** Hay un procedimiento de vuelta atrás escrito.
- Se preparó el correo a Marc (con Frank en copia) que explica las cuatro novedades y le pide que su proveedor de correo deje pasar los avisos de RR. HH., que habían rebotado el 1 y el 2 de octubre.

### CaptuFact — Las 18 incidencias de finanzas, resueltas y desplegadas por la noche

El equipo de finanzas envió 18 incidencias con capturas, urgentes por el cierre del IVA del tercer trimestre. Se atendieron todas en una sola entrega.

**Lo que puede hacer ahora finanzas**
- **Cada usuario ve las empresas que se le asignen** (sin lista = todas). Pedir una empresa ajena da error, en lugar de cambiarla en silencio como antes.
- **Un solo campo «Empresa»** con las 13 sociedades del grupo. Al cambiarlo se actualizan también el beneficiario y la dimensión EMPRESA en cabecera y líneas.
- **Cambiar en lote:** fecha de registro, forma de pago, empresa, cuenta, dimensión o retención a muchas facturas a la vez, con vista previa antes de escribir y aviso grande de lo que se salta. Lo aprobado no se toca.
- «Volver a tramitar» también para quien prepara, cuando ha fallado el volcado.
- Una línea nueva copia los datos de la primera; tocar una línea recalcula los avisos; el vencimiento tecleado ya no se pisa; vaciar una fecha o un número ya no da error.
- La tecla Tab ya no se para en los botones de validar, y el foco vuelve al campo tras el aviso de campo crítico.
- **Facturas con varias bases de IVA:** el cuadro de IVA se lee entero, y el número de factura ya no se confunde con el código de cliente.
- **La empresa sale del propio documento:** si una factura se sube a la empresa equivocada, la subida se para y pregunta en grande a cuál subirla. Filtro por empresa en la barra.
- Preparado el soporte de la **retención de IRPF por línea** y las cuentas de asignación, que necesita instalar una actualización del conector en Business Central.

**Lo que se encontró y se arregló**
- Algunas facturas de un proveedor aparecían con el CIF de otra empresa del grupo: ahora ningún CIF del grupo cuenta como el del proveedor, salvo factura entre empresas del grupo. Siete facturas vivas de ese proveedor quedan para corregir a mano.
- En la prueba en seco antes de aplicar salieron dos fallos más (un proveedor perdía su número de factura; una regla movía facturas de Nova Finca a Marbori) y se corrigieron antes de tocar nada.

**Con garantías**
- Tres revisiones antes de desplegar: **revisión de código a fondo**, **revisión de seguridad** y un **revisor independiente**. Sus puntos se corrigieron antes de subir.
- Más de 2.100 pruebas automáticas en el motor y 460 en la interfaz, en verde.
- Despliegue por la noche con un corte corto y **punto de recuperación de la base de datos** guardado justo antes.
- Aplicado en producción: solo la corrección de dos números de factura. **La reasignación de empresas (29 facturas) no se aplicó:** primero la revisa finanzas.

### Hotel — La revisión de seguridad, cerrada y desplegada en el servidor de demostración

- La **revisión de seguridad** con tres revisores pidió cinco arreglos antes de dar el visto bueno, y se hicieron todos:
  - el asistente del programa trabaja con el localizador de la reserva y **no envía nombres de huéspedes a servicios externos** (queda apagado por defecto);
  - la consulta de disponibilidad entiende el nombre del tipo de alojamiento, no solo el código, y ya no responde «no hay sitio» por error;
  - **restaurar una copia de seguridad** sobre una base de datos con datos no funcionaba: se rehízo el procedimiento con copia previa, en una sola operación y con recuento al final; probado con base llena, vacía y con un volcado roto;
  - el procedimiento de instalación ya no puede pisar la conexión cifrada si se relanza;
  - los datos de demostración ya no crean un administrador con contraseña conocida, y el programa no arranca con la clave de desarrollo.
- Además: cabeceras de seguridad en la web y limpieza de código sin uso.
- Más de 300 pruebas automáticas en verde. **Control de calidad en siete aspectos superado.**
- Desplegado en el servidor de demostración con conexión cifrada y comprobado de punta a punta. El cierre automático del día funcionó en su primera noche.

## Estado actual

ProgramaFichar: actualizaciones 1.2 y 1.3 en producción, probadas con el perfil de RR. HH. CaptuFact: las 18 incidencias de finanzas en producción, en vigilancia; la reasignación de empresas, a la espera de finanzas. Hotel: demo con la revisión de seguridad cerrada.

## Pendiente

- ProgramaFichar: confirmar el correo a Marc y ver si usa Regularizar. Por decidir: la pausa de 30 minutos de los menores. En cola: anular una marca, crear una jornada desde cero, bajas de la mutua y horarios de sala.
- CaptuFact: vigilancia de 48 horas; pasar a finanzas la lista de reasignación; instalar la actualización del conector en Business Central; pedir a contabilidad una factura real con varias bases de IVA; una factura de varios tipos de IVA que se lee con el proveedor equivocado, con arreglo propuesto.
- Hotel: cambiar la contraseña de recepción del servidor de demostración; vigilancia de 24 horas de los registros; pequeñas mejoras del despliegue.
