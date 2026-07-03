---
title: Jornada 22 de junio — Gestor Facturas (multicuenta + corrección de clave) + infraestructura Azure Marbori
date: 2026-06-22
project: Gestor Mail Facturas, Marbori (Azure)
type: sesion
---

# Sesión de trabajo — 22 de junio de 2026

## Qué se hizo

### Gestor Mail Facturas — Multicuenta de email

A petición del cliente (hasta 4 usuarios y varias empresas), se ha añadido la gestión de múltiples cuentas de correo desde la propia aplicación:

- Cada cuenta IMAP queda asociada a una empresa (etiqueta y beneficiario), de modo que las facturas capturadas heredan automáticamente la empresa de origen.
- La sincronización recorre todas las cuentas activas: el fallo de una cuenta no detiene al resto, y solo se marca error si fallan todas.
- Nuevas operaciones de alta, edición, borrado y prueba de conexión de cuentas de correo desde el panel. En edición, dejar la contraseña en blanco mantiene la existente.
- El reintento de un correo no leído se hace siempre contra su cuenta de origen.
- Interfaz de ajustes de correo reescrita como gestor de N cuentas (alta, edición, borrado y botón de prueba).

### Gestor Mail Facturas — Cubo de facturas (carga manual)

También a petición del cliente, se ha habilitado la carga manual de facturas sueltas:

- Ventana de carga por arrastrar y soltar, admite varios PDF a la vez, con estado individual por archivo.
- Botón "Cubo de facturas" en la tabla de facturas.
- Los documentos cargados a mano pasan por el mismo circuito de clasificación que los recibidos por correo.

### Gestor Mail Facturas — Diagnóstico de tres facturas "no clasificadas"

El cliente reportó tres facturas que el sistema no había sido capaz de clasificar (Inèdit 8.543,88 €, y dos de Culligan por 115,36 € y 137,04 €):

- Los tres documentos son PDF digitales de texto limpio, perfectamente legibles.
- La causa no eran las facturas: la clave de acceso al servicio de extracción que estaba cargada en el entorno local era una clave antigua y ya no válida (error de autenticación), lo que dejaba todos los campos vacíos y enviaba la factura a revisión.
- Sustituida la clave por la nueva en el entorno local, las tres facturas se clasifican correctamente, sin campos faltantes. Diagnóstico cerrado.
- Detalle menor identificado para afinar otro día: en las facturas de Culligan, el sistema toma el CIF del cliente en lugar del CIF del proveedor. No bloquea la clasificación.

### Gestor Mail Facturas — Calidad y estado del entorno

- 12 de 12 pruebas automáticas en verde (5 de la integración con Business Central + 7 nuevas sobre resolución de cuentas y construcción de facturas).
- Migración de base de datos aplicada, arranque limpio, rutas protegidas (acceso denegado sin autenticación) e interfaz sirviendo correctamente.
- Se dejó también consolidado (probado y confirmado) el trabajo previo de integración con Business Central vía OAuth2 y los campos de factura manual.

### Marbori (Grupo Oller del Mas) — Infraestructura Azure

Revisados los hilos de correo del cliente relativos a la infraestructura y elaborada la respuesta técnica que el cliente necesita para no sobrecontratar:

- **Hilos revisados:** propuestas y logística de reuniones sobre el servidor Azure (con varios proveedores en juego), la solicitud de alta de usuarios en el Gestor de Facturas, y las dudas planteadas por Frank sobre el modelo de trabajo (un único tenant MARBORI multi-empresa, facturación desde Business Central, TPV nativo en BC, cargos entre empresas).
- **Recomendación de infraestructura:** plataforma gestionada (PaaS) dentro de la suscripción Azure propia del cliente —el mismo tenant que ya trae Business Central—, sin servidor gestionado adicional ni proveedor intermediario que se quede la infraestructura. Coste de consumo estimado ~150-300 €/mes, con arquitectura elástica que crece sin necesidad de recontratar.
- **Copia de seguridad 3-2-1:** Business Central respaldado por Microsoft, bases de datos y ficheros por Azure, y una copia externa como secundaria. Cubre la preocupación del cliente por el backup sin sobrecoste.
- **Verificación legal (con fuentes oficiales):**
  - VeriFactu: aplazado por el RDL 15/2025 (2 dic), exigible el 1 ene 2027 (Sociedades) y 1 jul 2027 (resto). Obliga a quien emite factura (Business Central), no a la captura de facturas recibidas.
  - Digitalización certificada (Orden EHA/962/2007): aplica a facturas en papel; los PDF nativos no la requieren. La conservación (autenticidad e integridad) deriva del RD 1619/2012.
  - Registro horario digital: RD en tramitación, sin publicar a junio de 2026; exigirá cifrado, y la residencia en la UE viene del RGPD.
- **Competencia identificada:** Suitech / Continia Document Capture, módulo homologado sobre Business Central que ofrece captura de facturas similar; su argumento comercial es el certificado AEAT.

### Marbori — Entregables de infraestructura

Creados en `/home/david/Portfolio/Victor/Propuesta_Marbori_Azure/`:

- **Email de opinión sobre infraestructura** (`.md` y `.docx`) — mensaje breve para Frank y Paco.
- **Informe de infraestructura y cumplimiento** (`.md` y `.docx`) — 8 apartados y 2 anexos, con citas a BOE/AEAT, en formato profesional.

Ambos documentos han pasado por dos rondas de revisión crítica independiente. Correcciones aplicadas: declaración de transparencia sobre el conflicto de interés, encuadre neutro del apartado de competencia, precisión sobre el papel de Microsoft como encargado del tratamiento (art. 28 + DPA), respaldo del criterio de que Business Central es quien emite, conservación fiscal y pista de auditoría, titularidad del cliente sobre sus datos con acceso revocable y portabilidad, y aclaración del coste total. Tras la segunda revisión, el paquete queda en estado listo para enviar.

## Estado actual

Gestor Mail Facturas en entorno local con las dos funciones nuevas operativas (multicuenta de correo y cubo de carga manual), 12/12 pruebas en verde, migración aplicada y clasificación funcionando con la clave correcta. El entorno de producción no se ha tocado por decisión expresa; sigue con la clave antigua, por lo que las nuevas capturas allí no se clasifican hasta actualizarla. Las facturas que quedaron en revisión no se reintentan solas: requieren reprocesado manual tras corregir la clave.

Marbori: paquete de infraestructura Azure (email + informe) terminado y revisado, a la espera del visto bueno antes de enviarlo a Frank y Paco.

## Pendiente

- **Producción del Gestor:** actualizar la clave de acceso al servicio de extracción en el servidor, reiniciar el backend y reprocesar las facturas que quedaron en revisión. No hacer sin autorización.
- **Despliegue a producción** de las dos funciones nuevas (multicuenta + cubo de facturas).
- **Ajuste del extractor** para tomar el CIF del proveedor y no el del cliente en las facturas de Culligan, con su prueba.
- **Prueba real de la multicuenta** con la segunda cuenta de correo cuando el cliente la facilite.
- **Push a Business Central** (envío de facturas de compra por empresa): a la espera de credenciales reales del entorno BC y de aclarar la infraestructura antes de construirlo.
- **Envío del paquete Marbori** (email + informe) a Frank y Paco tras el visto bueno.
- **Alta multiusuario en el Gestor** para los usuarios de Marbori (incluida nueva incorporación prevista para el 01/07).
- **Infraestructura Azure/BC:** confirmar suscripción, acceso al entorno BC real y ubicación de producción del Gestor.
