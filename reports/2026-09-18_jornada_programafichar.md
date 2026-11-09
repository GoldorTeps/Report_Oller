---
title: Jornada 18 de septiembre — ProgramaFichar: cinco días sin una caída, el Excel de la ficha y las guardias de Castlexperience especificadas
date: 2026-09-18
project: ProgramaFichar
type: sesion
---

# Sesión de trabajo — 18 de septiembre de 2026

## Qué se hizo

### ProgramaFichar — La vigilancia de la semana, al día

**Del lunes 14 al viernes 18, el sistema no se cayó ningún día.** Cero errores de servidor y cero reinicios por nuestra parte. Una vez Azure movió la web de servidor por mantenimiento propio, sin corte de servicio. Con el viernes, son **diez días seguidos del piloto sin una caída**.

- Se recuperaron todos los análisis diarios que se habían quedado sin hacer. Azure y la base de datos guardan lo necesario, así que no se perdió ningún día.
- **El viernes fue el día con más gente fichando del piloto: 53 personas.**
- Las pausas se miden solo con lo fichado en la tablet: lo que RR. HH. añade a mano después no cuenta. El 15 y el 16 no hubo ni una marca puesta desde el panel, así que es la primera cifra de uso real de la tablet sin correcciones por medio.
- **Lo que hizo RR. HH.:** Marc trasladó a dos personas de mantenimiento a otra sociedad tal como se le había indicado, cerró una jornada olvidada y puso al día el atraso de la semana.
- **Lo que sigue abierto:** la jornada del día 1 con casi 24 horas sigue sin corregir. Ahora está comprobado con datos, no supuesto.
- Hubo dos intentos de entrar al panel con un correo que no es de ningún usuario. No pasó nada.

**Un parte por día para el cliente.** Se prepararon los cinco partes diarios (del 14 al 18) y un correo que los presenta. Cada parte recoge la salud del sistema, la actividad, las tablets y lo que RR. HH. tiene que revisar. **Se enviarán el lunes.**

**Una corrección de nuestros propios documentos.** La hoja de continuidad decía que la aplicación ya tenía comprobaciones automáticas de vida en producción. Están programadas, pero **aún no desplegadas**. Corregido en la hoja.

**Qué hacer si el sistema se cae.** Se dejó por escrito el estado real de la resiliencia. Hoy no hay alertas ni nadie que las reciba, y la copia de seguridad no se ha ensayado. Queda la cadena de fallo paso a paso, lo que podemos resolver nosotros y lo que hay que pedir a la infraestructura del grupo, empezando por los permisos de Azure que gestiona Suitech.

### Peticiones nuevas

- **Foto en la ficha del empleado** (Frank, vía Marc).
- **Los horarios de sala** como fuente de información (Marc).
- **Que el sistema ponga las horas de contrato cuando falta la salida** (Frank). Así no se puede hacer: el registro de jornada tiene que recoger las horas realmente trabajadas, y una salida inventada a partir del contrato es justo lo que busca una inspección. Se propone llegar a la misma cifra con firma: la jornada queda marcada como incompleta y RR. HH. la cierra con un clic, con la hora del cuadrante ya propuesta y registrada como corrección con autor y motivo.

**El Excel con la ficha completa de la plantilla** (la petición que Marc necesita para cargar los datos de todos) quedó **construido**: un botón «Ficha completa» en el panel, con las columnas de la plantilla de alta y registro de quién lo descarga. Sin desplegar: quedaba por arreglar una prueba automática antes de darlo por bueno.

### Guardias de Castlexperience — De la petición a la especificación

Castlexperience había pedido en agosto que las horas de guardia cuenten como un porcentaje de horas efectivas según el perfil de cada persona. Hoy se recuperó la petición y se cerró la especificación con la dirección de Castlexperience:

- **perfiles** (Oficina, Operaciones, Guía y Camareros sin guardia) configurables desde el panel, con un interruptor de «hace guardias»;
- **tipos de guardia con su propio valor** (por ejemplo, telefónica y presencial), editables desde el panel sin tocar la base de datos;
- todo suma como horas de trabajo efectivas, con un acuerdo de empresa firmado como base;
- fichaje desde tablet y móvil (el móvil solo para guías y operaciones);
- si salta una alarma de descansos, informe a los administradores.

Queda escrito el diseño de la base de datos y el plan de construcción, con las doce piezas del programa que calculan horas revisadas una a una. **Hoy no se programó nada:** solo el plan.

## Estado actual

ProgramaFichar: en producción, diez días seguidos sin una caída y los análisis diarios al día. El Excel de la ficha está construido y pendiente de su última prueba, y las guardias de Castlexperience, especificadas y con su plan de construcción.

## Pendiente

- Enviar el lunes el correo con los cinco partes a Marc y Frank.
- Terminar, fusionar y desplegar el Excel de la ficha, y avisar a Marc.
- Abrir el archivo de horarios de sala y los correos de la mutua.
- Desplegar las comprobaciones automáticas de vida con una ventana de mantenimiento.
- Diseñar juntas tres piezas: la petición de Frank, la creación de jornadas desde cero y el tope al cierre automático. Las tres responden a qué hace el sistema cuando falta un fichaje.
- Guardias: fecha de arranque y alta de las personas de Castlexperience; alcance y precio con Frank antes de construir.
