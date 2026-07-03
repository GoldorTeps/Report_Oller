---
title: Jornada 3 de julio — ProgramaFichar (firma electrónica propia + receptor de altas) + Gestor Facturas (Fase 3 contable + acceso BC)
date: 2026-07-03
project: ProgramaFichar, Gestor Mail Facturas
type: sesion
---

# Sesión de trabajo — 3 de julio de 2026

## Qué se hizo

### ProgramaFichar — Receptor universal de alta masiva de empleados

**Objetivo:** dejar de dar de alta a los empleados uno a uno. Se construyó un receptor
universal que importa una plantilla estándar y crea o actualiza las fichas en una sola pasada.

- **Importación por archivo estándar (CSV / Excel).** Se acepta la plantilla en ambos formatos,
  con encabezados en español o inglés y todas las columnas de la ficha del empleado (NIF, IBAN,
  Seguridad Social, dirección, centro, departamento, etc.). Botón para descargar la plantilla
  desde la propia pantalla.
- **Validación real del DNI/NIE.** Cada documento se normaliza y se verifica con el dígito de
  control oficial. Un identificador mal escrito se rechaza con un mensaje claro, no entra corrupto.
- **Crea o actualiza por NIF (sin duplicados).** Si el empleado ya existe, se actualiza su ficha;
  si no, se crea. Restricción de unicidad por empresa a nivel de base de datos para garantizar
  que nunca haya dos fichas del mismo documento.
- **Import robusto fila a fila.** Una fila con un error (tipo de contrato inválido, horas fuera de
  rango, número de empleado repetido…) ya no tumba todo el lote: se aísla, se informa del error de
  esa fila concreta y el resto de altas se procesan igual. La respuesta detalla cuántos se crearon,
  cuántos se actualizaron y qué filas fallaron y por qué.
- **Compatibilidad con archivos reales.** Soporta CSV en formato español (separador `;` y
  codificación Windows) y límites de tamaño para evitar cargas abusivas.
- Verificado con los datos reales de una gestoría (10 empleados): entran todos de una sola pasada.

### ProgramaFichar — Firma electrónica simple (SES) propia, en producción

Se construyó y desplegó una firma electrónica propia, sin depender de proveedores externos ni
de coste por firma, para los documentos internos que el empleado firma desde su portal.

- **El empleado firma desde su portal** con un botón "Firmar" y una pantalla de consentimiento.
- **Página de evidencia sellada al documento.** Al firmar se incorpora al PDF una página con:
  nombre del firmante, dirección IP real, fecha y hora, huella digital (hash SHA-256) del
  documento y el texto de consentimiento conforme al reglamento eIDAS y la Ley 6/2020.
- **Garantías técnicas:** protección contra doble firma (el mismo documento no se puede firmar dos
  veces por una condición de carrera) e IP registrada de forma no falsificable.
- Las descargas (tanto del empleado como del administrador) sirven el PDF ya sellado; el
  administrador puede recuperar el original sin sellar si lo necesita.

### ProgramaFichar — Import universal de nóminas por PDF

- El reparto de nóminas por PDF casa cada nómina con su empleado por el DNI/NIE, de modo que cada
  trabajador recibe la suya en su portal automáticamente. Verificado con datos reales de gestoría.

Todo lo anterior (receptor de altas, firma SES y reparto de nóminas) quedó cubierto con sus
pruebas automáticas y **desplegado a producción** en esta misma jornada.

### Gestor Facturas — Fase 3: cuenta contable (G/L) por empresa

- Cada empresa mapeada puede fijar su **cuenta de gasto contable (G/L)**, que se usa en la línea de
  la factura al enviarla a Business Central.
- Si una empresa no tiene cuenta asignada, el sistema **cae automáticamente a una cuenta global por
  defecto** configurable. Nunca inventa cuentas.
- Incluye el campo en la pantalla de mapeo de empresas y sus pruebas automáticas (empresa con
  cuenta propia, empresa sin cuenta con fallback, persistencia del dato). Suite en verde.

### Gestor Facturas — Habilitación del acceso a Business Central

Trabajo de preparación para conectar la aplicación de facturas con Business Central en un entorno
de pruebas seguro.

- Se identificó con precisión qué credencial falta para la conexión (el acceso OAuth de
  servicio-a-servicio) y se confirmó que la cuenta actual **no tiene permiso para generarla**: el
  registro de la aplicación en Azure es propiedad del **partner técnico del cliente (Suitech)**, que
  fue quien montó originalmente la integración.
- En consecuencia, se **preparó la solicitud formal** dirigida al cliente, redactada para que este
  la traslade a su partner técnico, pidiendo de una sola vez todo lo necesario para dejar la
  conexión operativa: acceso a las credenciales OAuth, permisos de la aplicación en Business Central
  y registro en el entorno de pruebas (sandbox). Petición acotada al entorno de pruebas; Producción
  no se toca.
- Se definió el **plan de prueba blindado**: primero conexión de solo lectura, luego un único envío
  de prueba al sandbox para inspeccionarlo y borrarlo, y solo después Producción de forma
  deliberada. La aplicación únicamente crea borradores de factura; nunca contabiliza.

## Estado actual

ProgramaFichar: receptor de alta masiva de empleados, firma electrónica simple propia y reparto de
nóminas por PDF, los tres con pruebas automáticas y **desplegados en producción**. La firma interna
queda cubierta de extremo a extremo desde el portal del empleado.

Gestor Facturas: Fase 3 (cuenta contable por empresa con fallback global) construida, verificada y
lista. La conexión con Business Central queda a la espera de que el partner técnico del cliente
habilite el acceso OAuth al entorno de pruebas; la solicitud está redactada y lista para enviar.

## Pendiente

- Recibir del partner técnico del cliente el acceso OAuth a Business Central (credenciales +
  permisos + registro en el sandbox de pruebas) para poder conectar la aplicación de facturas.
- Una vez habilitado el acceso: ejecutar la prueba blindada en el entorno de pruebas (lectura de
  empresas, proveedores y cuentas contables reales, y un envío de borrador de control) antes de
  pasar a Producción.
- Leer las cuentas contables (G/L) reales desde Business Central para completar la configuración de
  la Fase 3.
- ProgramaFichar — decisiones pendientes del cliente: gestión del DNI (guardar copia o solo
  verificar el número), firma del contrato (firma propia frente a proveedor externo homologado) y
  si se habilita el alta remota en autoservicio para el empleado.
