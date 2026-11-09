---
title: Jornada 10 de septiembre — ProgramaFichar: turno de noche, correcciones del panel y turno partido, arreglados en dos despliegues
date: 2026-09-10
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 10 de septiembre de 2026

## Qué se hizo

### ProgramaFichar — Segundo día real: lo que destapó el uso, arreglado el mismo día

El segundo día con gente real sacó a la luz varios fallos nuestros de lógica. Ninguno tiró el sistema, pero todos afectaban al registro de jornada, así que se corrigieron el mismo día, en dos despliegues hechos fuera de horas de fichaje.

**Primer despliegue (media tarde)**
- **El turno de noche no podía fichar la salida.** Quien entraba por la tarde y salía pasada la medianoche recibía un «no hay jornada abierta» y se iba sin salida registrada. Ahora una salida cierra la jornada del día anterior si lleva menos de 16 horas abierta; pasado ese tiempo se trata como un olvido.
- **Marc no podía guardar correcciones desde el panel.** Al pulsar Guardar no pasaba nada: la hora se enviaba sin zona horaria y el sistema la rechazaba sin mostrar el error. **Nunca había funcionado.** Ahora guarda, y si algo falla lo dice en pantalla.
- **Turno partido:** el aviso de descanso insuficiente ya no salta a quien sale a mediodía y vuelve por la tarde. Sí sigue saltando, como debe, a quien sale de madrugada y vuelve pronto.
- **La plantilla de alta de empleados salía rellena con los datos de una antigua trabajadora.** Marc lo avisó. Se retiraron esos datos, la plantilla sale ahora solo con las cabeceras, y se añadió una comprobación automática que impide que vuelva a colarse un DNI, NIE o IBAN real en el programa. En la misma pasada se sustituyeron por datos inventados los datos reales que había en las pruebas internas.
- Marc recibió un correo antes del despliegue y otro al terminar, con lo que podía corregir ya.

**Revisión de la noche y segundo despliegue (23:15)**
- Al cerrar el día salió que **las correcciones ya grababan, pero algunas quedaban mal**: una salida puesta en el día equivocado dejaba una jornada con duración negativa, y en jornadas ya cerradas la corrección no recalculaba el cierre, dejando horas infladas. El programa no validaba las horas de las correcciones.
- Al verificarlo vimos además que **algo que habíamos dicho por la mañana era falso**: una jornada cerrada automáticamente no quedaba «a cero», sino con horas infladas que parecían verosímiles. Se corrigió en la documentación y se le dijo a Marc.
- A raíz de una pregunta sobre el turno partido apareció un fallo más de fondo: como cada entrada abre una jornada nueva, un día partido contaba como dos jornadas. Con eso **el límite de 9 horas diarias no se vigilaba en los días partidos**, se exigían pausas de más y alguna comparación con el turno planificado daba avisos de retraso falsos.
- **Arreglado:** las correcciones validan que la salida sea posterior a la entrada y razonable; una corrección sustituye a la marca anterior en vez de sumarse; y el control de cumplimiento **suma el día completo de cada persona**, sin tocar el registro de sus fichajes.
- El panel ayuda: propone la fecha correcta, avisa y bloquea si la hora es anterior a la entrada, y marca en rojo cualquier jornada con duración negativa.
- Se cuidó un detalle antes de desplegar: tal como estaba, la validación nueva habría **bloqueado a Marc** al corregir jornadas que ya tenían una salida. Se ajustó para que el panel indique qué marca sustituye.
- Desplegado sin nadie fichando y verificado: sistema arrancado limpio, sin errores, y la pantalla nueva sirviéndose.
- Con sus **pruebas automáticas, todas en verde** (627 en el motor y 142 en la interfaz).

**Comunicación**
- Un solo correo a Marc, programado para primera hora, con los arreglos y las jornadas que tiene que rehacer. Recoge que el programa está hecho para cumplir la ley por defecto: las pausas no las exige la ley, pero sin ellas no se pueden demostrar el tiempo efectivo ni los descansos, y nada se borra, toda corrección queda registrada.

**Datos del día:** 43 personas, ningún error de servidor.

## Estado actual

ProgramaFichar en uso real, con el turno de noche, las correcciones del panel y el turno partido arreglados y en producción. Varias jornadas corregidas por Marc antes del arreglo hay que rehacerlas.

## Pendiente

- Marc: rehacer las correcciones que quedaron mal y cerrar las jornadas sin salida de la noche.
- Comprobar en uso real que una salida pasada la medianoche cierra bien la jornada del día anterior.
- Comprobar en el control de cumplimiento de mañana que ya no salen avisos falsos de turno partido.
- Tablets de Moll de càrrega y Cobert de maquinària, sin instalar.
