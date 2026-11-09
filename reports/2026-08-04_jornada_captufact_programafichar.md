---
title: Jornada 4 de agosto — CaptuFact: la lista de Frank, la bandeja de trabajo y el estado real de Business Central, en producción · ProgramaFichar: arreglos para el arranque
date: 2026-08-04
project: CaptuFact, ProgramaFichar
type: sesion
---

# Sesión de trabajo — 4 de agosto de 2026

## Qué se hizo

### CaptuFact — Del feedback de Frank a producción en un día

**El feedback, ordenado y la primera tanda resuelta**
- Los 16 puntos del feedback de Frank se agruparon: fallos reales, mejoras rápidas, decisiones de producto y funciones nuevas.
- **Fallo corregido:** el contador de "Esperan aprobación" del panel principal se quedaba en 5 aunque hubiera 42 facturas esperando.
- Botón **"Limpiar filtros"**, tabla con la cabecera fija y el desplazamiento lateral a la vista, y fuera de pantalla las columnas que no se usaban (categoría y contabilizada).
- El **ciclo de pago sale de la tabla** (marcar pagada, rechazar): la contabilidad se lleva en Business Central. El botón de aprobar y enviar a BC se queda. "Necesita revisión" desaparece del menú y Tesorería queda solo para el perfil de dueño. Queda pendiente confirmarlo con Frank.
- La fila en rojo pasa a significar **"falta un dato"**, no "vencida", y al abrir la factura se remarca el campo exacto que impide enviarla.

**Las facturas que "no cuadraban" ya se pueden arreglar**
- Había facturas clavadas en revisión por "las líneas no cuadran" sin ninguna forma de corregirlas desde la pantalla. Ahora las líneas **se pueden editar, añadir y borrar**, y la factura se recalcula al momento.
- En la mayoría el problema no era la factura sino la lectura: líneas fantasma como "IVA" o "Neto a pagar" leídas como conceptos. Se mejoró el lector con cuatro facturas reales que confundían emisor y receptor, descuentos y subtotales. El cuadre se mide ahora contra la base imponible, y el CIF propio del grupo no puede colarse como proveedor tampoco en la subida manual. **De 14 facturas con descuadre quedaron 7**, que sí tienen algo que revisar.

**La bandeja de trabajo y el estado real de BC**
- Petición de Frank: al preparar una factura para BC, **desaparece de Facturas**. En Facturas quedan solo las que, por un motivo u otro, no se han podido enviar.
- **Gestionadas pasa a ser el historial de lo que está en Business Central**, con el estado que dice el propio BC: en trámite, contabilizada o anulada. Si un borrador se anula en BC, la factura vuelve sola a la bandeja. Una caída de red o de BC nunca vacía el historial.
- **Cuando un envío falla, se guarda el motivo en lenguaje claro.** Así se diagnosticaron cuatro envíos que llevaban parados desde julio sin explicación: falta la empresa destinataria, un proveedor sin ficha en BC y una serie de numeración de BC que no admite fechas de diciembre de 2025 (configuración del ERP, a revisar con Suitech).
- **Proveedores pasa a ser un espejo de solo lectura del maestro de BC** (605 proveedores visibles para el administrativo). Ya no se pueden crear proveedores por fuera de BC.
- **Aprobación por lotes** en la cola de volcado, una a una por orden y sin que un fallo detenga el resto. Probado contra el entorno de pruebas de BC: 6 de 7 enviadas.
- Manual de configuración dentro de la propia aplicación (Configuración → Ayuda).

**Un fallo propio, detectado y corregido antes de subir**
- Al cerrar el día se vio que el panel decía "0 por aprobar" y la cola de volcado mostraba 5. Lo habíamos provocado nosotros esa misma tarde: la cola mostraba también facturas ya aprobadas cuyo envío había fallado, que además salían en Facturas. Criterio fijado: **una factura ya aprobada no está pendiente de aprobar**. Corregido con sus pruebas antes del despliegue.

**Desplegado en producción esa noche**
- Copia de seguridad completa antes de tocar nada, actualización controlada y **las 239 facturas intactas**. Comprobado después que las tres pantallas cuadran (219 en Facturas, 12 en la cola, 8 en Gestionadas) y que ninguna factura sale en dos sitios.
- Pruebas automáticas en verde en motor e interfaz (la interfaz no tenía ninguna; se montaron desde cero).

### ProgramaFichar — Arreglos para el arranque y desplegados

- **Corregido el fallo del desplegable de departamentos** que Frank y Marc vieron el día anterior.
- **PIN más robusto:** se mantiene en 5 dígitos (una fecha DDMMAA tiene seis, así que se queda fuera por diseño) y se prohíben las combinaciones fáciles: números repetidos, series y doble cero inicial. Fuera también la sugerencia de usar una fecha como PIN.
- El aviso de PIN bloqueado ahora explica que **se desbloquea solo en 15 minutos**.
- **Revisión de los PIN ya repartidos sin revelar ninguno:** ninguno incumple las nuevas reglas, no hay que repartir nada de nuevo.
- Las empresas de prueba se desactivaron y quedaron marcadas como "no usar"; las reales, intactas.
- Desplegado con nadie usando la aplicación, comprobado después en lo publicado y sin errores. Pruebas automáticas en verde.
- **Revisión de seguridad:** se detectó que la segunda capa de aislamiento entre empresas en la base de datos no está activa. Los filtros de la aplicación sí funcionan y no hay fuga conocida; se activará después del arranque, con ventana propia.
- Lista de peticiones ampliada con lo que faltaba del correo de Frank: responsables por área, cuadrante de horarios, coste de nómina y cuadro de incidencias. Sobre este último se dejó por escrito una contrapropuesta que cumple la protección de datos (umbrales objetivos, sin etiquetas ni datos de salud).
- Se comprobó en el código que **la vista de cuadrante de toda la plantilla no existe todavía**: hay parte de la base hecha, pero ninguna pantalla.

## Estado actual

CaptuFact: en producción con la bandeja de trabajo, el estado real de BC y Proveedores en solo lectura. Seis facturas muestran "No llegó a BC" con su motivo, que depende de datos y configuración del ERP. ProgramaFichar: arreglos del arranque desplegados, a la espera de las tablets.

## Pendiente

- CaptuFact: avisar a Frank de los cambios de pantalla, decidir con él el circuito de aprobación, y con Suitech la serie de numeración de 2025. Siguientes puntos de su lista: empresa clicable, autocompletado de proveedores, adaptación a pantallas, distinguir contratos de facturas, modo de pago y línea de negocio.
- ProgramaFichar: probar el bloqueo de pantalla en una tablet real, conseguir la clave de Brevo para que salgan los correos de recuperación de contraseña y enviar las respuestas a Frank y a dirección.
