---
title: Jornada 1 de octubre — CaptuFact: las facturas de Golf y Heretat, dentro + Hotel: copias de seguridad reparadas
date: 2026-10-01
project: CaptuFact, Hotel
type: sesion
---

# Sesión de trabajo — 1 de octubre de 2026

## Qué se hizo

### CaptuFact — Golf y Heretat entran en la aplicación

Paco envió todas las facturas de julio a septiembre: **595 de Golf**, con su Excel de dimensiones, y **307 de Heretat**, cuyas dimensiones se pondrán a mano. Tras hablarlo por teléfono, se decidió **subirlas a CaptuFact y seguir el proceso normal**: preparar, cola, aprobación de Frank y volcado. Nada se envía a Business Central sin pasar por ahí.

**Lo construido para la carga**
- **Subida de lotes grandes:** reanudable, de tres en tres, con progreso y resumen final. El nombre del fichero original queda en la ficha y se puede buscar.
- Golf y Heretat dadas de alta como empresas, cada una enlazada con su Business Central, sus proveedores y sus dimensiones.
- El importador de dimensiones reconoce el formato del Excel de Golf.
- **Resultado: 595 de 595 en Golf y 307 de 307 en Heretat.**

**El fallo del día: la empresa compradora se quedaba como proveedor**
- Golf y Heretat existen también como proveedores en Business Central con su propio nombre, y eso hacía que en sus facturas la compradora pasara por proveedora. Corregido, con pruebas que fallaban antes del arreglo.
- Repaso de las facturas afectadas: en Golf, de 135 con su propio nombre como proveedor quedan 33; en Heretat, de 69 quedan 3.
- **Error nuestro:** al limpiar el CIF de 120 facturas de Golf se usó un método que lo dejaba protegido frente al completado automático. Se borraron y se volvieron a subir bien.

**Lector fijo para las facturas entre empresas del grupo**
- 53 de las 902 facturas son entre empresas del grupo y usan dos plantillas fijas que la lectura automática leía mal (26 números y 9 proveedores equivocados). Un lector propio para esas plantillas las lee bien y **solo se usa si cuadra al céntimo**: las 53 coinciden ahora.

**Dimensiones de Golf**
- Excel importado: 136 facturas quedan con las dos dimensiones completas. **31 de los 45 códigos del Excel no existen en el Business Central de Golf**, así que esas facturas no pueden completarse todavía.
- **Se corrigió una indicación nuestra del correo del 8 de septiembre:** la plantilla de Paco del 3 de septiembre eran las facturas de julio de Golf, no de Marbori.
- Correo a Paco preparado esa noche y enviado a primera hora del día siguiente, con la lista de códigos que faltan y la pregunta de si se copian del Business Central de Marbori al de Golf. Con su sí, quedarían 495 de las 510 facturas del Excel con las dos dimensiones.
- Buzón de proveedores de Oller del Mas: Frank lo pidió hoy; nunca llegó a conectarse a CaptuFact. Pendiente de su contraseña, que gestiona quien administra el dominio.

Pruebas automáticas en verde: 1.940 en el motor.

### Hotel — Las copias de seguridad de la demo, reparadas

- La simulación diaria de la demo lleva ocho noches seguidas sin un error.
- **Fallo encontrado:** las copias de seguridad automáticas del servidor de la demo **estaban vacías desde junio**, por un fallo de configuración en la clave de la base de datos. La prueba que debía vigilarlo solo comprobaba la configuración, no el resultado, y pasaba en verde; se retiró.
- Antes de tocar nada se hizo una copia manual completa.
- **Arreglado:** la copia se hace correctamente y, si falla o sale vacía, no deja un fichero engañoso y lo registra como error. Primera copia automática buena ese mismo día, comprobada; desde entonces, una cada 24 horas. Cubierto con pruebas automáticas.

## Estado actual

CaptuFact: Golf y Heretat dentro de la aplicación, en revisión (144 de Golf y 80 de Heretat con algo por completar), a la espera de las dimensiones de Golf en su Business Central.
Hotel: demo funcionando, con copias de seguridad automáticas reales.

## Pendiente

- CaptuFact: respuesta de Paco sobre los códigos de dimensión de Golf y reimportar el Excel; revisión manual de las facturas que no cuadran; configurar el SharePoint propio de Golf y Heretat; aviso al subir un lote sin empresa elegida.
- Hotel: proteger los ficheros de copia con permisos restringidos; aviso cuando una copia falle; conexión cifrada (HTTPS) antes de enseñarlo a más gente.
