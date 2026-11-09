---
title: Jornada 31 de agosto — CaptuFact: encontrada la causa de las facturas vacías y el sistema ya no las deja pasar + Castlexperience: manual de traspaso enviado
date: 2026-08-31
project: CaptuFact, Castlexperience
type: sesion
---

# Sesión de trabajo — 31 de agosto de 2026

## Qué se hizo

### CaptuFact — Respuesta a Frank a la vuelta de vacaciones

- Antes de escribir se releyeron **los hilos reales de correo** con Frank y con Paco, no las notas propias. Así se vio que Frank ya había contestado lo que íbamos a preguntarle (la cuenta de correo había que pedirla a marketing) y que la petición de fondo eran **sus 15 notas del 17 de agosto**.
- **Correo a Frank, dentro de su hilo:** sus 15 notas una a una, en su orden. **13 cerradas** y tres que necesitan una decisión suya: si el aviso de proveedor debe bloquear o solo avisar, el permiso para desatascar una factura con un código que su Business Central no reconoce, y si se da de alta la Línea de Negocio en BC.
- **Correo de bienvenida a Frank y Paco:** dónde está el sistema tras el traslado a Azure, qué verán cambiado y qué hace falta de ellos.
- **Petición a marketing** del buzón propio de avisos de CaptuFact, con la lista de lo que *no* hace falta tocar, para que la tarea le lleve dos minutos.
- Se repasó en pantalla, punto por punto, todo lo que se le había dicho a Frank: **todo correcto**.

### CaptuFact — Las facturas que entraban vacías: causa, arreglo y recuperación

Paco avisó de que varias facturas aparecían **sin datos**, «como si no pudiese leer los ficheros».

**La causa, confirmada en los registros del servidor:** desde la noche del **21 de agosto**, la cuenta del servicio de lectura automática de facturas **se había quedado sin saldo**. Los PDF estaban bien (se comprobaron los casi 5.000 guardados), pero ninguna factura se pudo leer en diez días: **67 facturas entraron vacías** en producción. Encaja exactamente con lo que Paco veía en pantalla.

**Por qué nadie lo vio — y es un fallo nuestro:** ante cualquier problema del lector, el sistema guardaba la factura en blanco y seguía como si nada. Una caída del servicio era indistinguible de una factura ilegible.

**Lo que se construyó y se desplegó el mismo día:**
- **El sistema ahora se para en vez de guardar facturas vacías.** Si el servicio de lectura no responde, la factura no se crea, se avisa del problema y el correo se queda esperando: **entra solo en cuanto el servicio vuelve**, sin perder ninguno.
- **Nueva pantalla Ajustes → Inteligencia Artificial**, para que el grupo configure **su propio servicio de lectura** (Azure OpenAI recomendado, u otros), con una banda de estado y un botón para probar la conexión.
- **La clave del servicio se guarda en la caja fuerte de Azure**, nunca en la base de datos ni en pantalla. Y el permiso de la aplicación se limitó a **esa única clave**: no puede tocar las contraseñas de la base de datos ni las de Business Central.
- Al preparar el despliegue se evitaron dos trampas que habrían afectado a producción (una habría apagado el volcado a BC sin avisar). **Volcado a Business Central encendido y verificado** tras desplegar.

**Informe de costes para Frank y Paco**, medido sobre 25 facturas reales: leer una factura cuesta **unas seis centésimas de céntimo**, alrededor de **0,09 $ al mes** con el volumen actual, frente a unos 55 € al mes de CaptuFact en Azure. La lectura automática es el **0,2 %** del coste. Conclusión honesta: pasar a Azure OpenAI no se decide por ahorro, sino por **propiedad, residencia del dato en la UE y no depender de terceros**. Se comprobó en la propia suscripción del grupo qué modelo y qué modalidad mantienen el texto de las facturas **dentro de la UE**.

**Recuperación de las facturas vacías — a medias:** la primera pasada recuperó **7**. Al lanzarla sobre todo el lote salieron dos fallos que solo aparecen con volumen real (un PDF con siete facturas dentro cortaba la pasada entera, y la herramienta lo guardaba todo de golpe al final y se perdía si la conexión caía). **Los dos quedaron corregidos esa noche**: ahora un documento difícil no para al resto y lo recuperado se va guardando por tandas. La pasada completa queda para el día siguiente.

**Revisado antes de aplicar nada:** se preparó la lista de facturas que hay que mirar a mano (importes imposibles, dos facturas en un mismo PDF…). Más de la mitad son **recibos de agua**, que no cuadran porque el sistema no los está tratando como recibos de suministro.

**Protección de datos:** se descubrió que una carpeta de documentación privada no estaba excluida del repositorio como se creía. Se corrigió **antes** de guardar en ella nada con datos del grupo.

Todo con sus **pruebas automáticas en verde** (más de 1.200 en el motor y más de 200 en la interfaz).

### Castlexperience — Manual de traspaso del bot de correo, enviado

Castlexperience tiene un bot que ayuda a responder correos genéricos y la persona que lo mantenía deja de hacerlo.
- **Respuesta enviada** con un **manual en español**, contrastado contra el fichero real del bot, dividido en tres bloques: lo que **solo puede hacer la empresa** (abrir las cuentas a su nombre, la forma de pago, los accesos de su correo), lo que **puede hacer cualquiera sin programar**, y dónde David se sienta al lado.
- El principio que lo ordena: **nada debe quedar a nombre de una persona**, que es justo el problema que ha traído hasta aquí.
- Se señalaron con claridad dos puntos delicados para que la empresa decida: correos de clientes reales dentro del fichero heredado y una política de reembolsos que el bot aplica por su cuenta.
- Comprobado que el correo de la empresa **sigue en Gmail**, así que la ruta del manual es la buena.

## Estado actual

CaptuFact: en producción en Azure, con la causa de las facturas vacías corregida de raíz, pantalla propia para el servicio de lectura y volcado a BC encendido. La recuperación de las facturas vacías queda a medias (7 hechas).

Castlexperience: manual de traspaso entregado; a la espera de su respuesta.

## Pendiente

- CaptuFact: lanzar la pasada completa de recuperación y revisar a mano la lista antes de que nadie las marque para BC; que el grupo configure su propio servicio de lectura; los cinco puntos de Paco (las dimensiones obligatorias de BC son lo de más calado); encender el aviso por correo cuando exista el buzón propio.
- Castlexperience: esperar la regla del filtro de correo, la fecha prevista del cambio de proveedor de correo y los accesos.
