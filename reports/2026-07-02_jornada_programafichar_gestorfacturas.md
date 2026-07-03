---
title: Jornada 2 de julio — ProgramaFichar (incidencias, historial, amonestaciones, onboarding, horas extra) + Gestor Facturas (Document Capture / SharePoint)
date: 2026-07-02
project: ProgramaFichar, Gestor Mail Facturas
type: sesion
---

# Sesión de trabajo — 2 de julio de 2026

Jornada intensa en dos proyectos en paralelo. En ProgramaFichar se cerraron cinco nuevas funcionalidades del feedback del cliente y se desplegó todo el sprint a producción. En Gestor Facturas se avanzó el módulo de Document Capture (integración con Business Central y SharePoint).

## Qué se hizo

### ProgramaFichar

De las 9 solicitudes recogidas del cliente, la jornada dejó **8 cerradas** (queda solo la carga de nóminas por archivo), más el despliegue del sprint completo a producción.

#### 1. Incidencias automáticas

- Detección y registro automático de dos incidencias laborales: **fichaje tarde** (primer fichaje más de 30 min tras el turno planificado) y **no presentado** (turno planificado sin ninguna jornada ese día).
- Se unificó el cálculo en una única fuente de verdad compartida con el listado de discrepancias ya existente, evitando duplicar lógica. Se corrigió de paso un fallo latente que ocultaba los "no presentado".
- Nuevo filtro por tipo de incidencia en el panel de administración y nueva página **"Incidencias"** en el menú admin (filtro por tipo, marcar como revisada).
- Sin migración de base de datos. **Tests:** 6 nuevos, suite en 271 en verde.

#### 2. Historial visual del empleado

- Nueva vista de historial (timeline) que fusiona cinco fuentes en una línea temporal ordenada: cambios sobre el empleado, ausencias, contratos, incidencias graves y documentos.
- Dos accesos sobre el mismo motor: uno para RRHH/supervisor (historial de un empleado concreto) y otro para el propio empleado desde su portal, con aislamiento correcto entre empleados.
- Nueva pestaña **"Historial"** en el portal del empleado.
- **Tests:** 9 nuevos, suite en 280 en verde.

#### 3. Amonestaciones

- Nuevo modelo de amonestaciones (verbal / escrita / falta grave) con aislamiento por empresa a nivel de base de datos. Migración **017**.
- Al crear una amonestación se genera automáticamente un **PDF** (cabecera de empresa, datos del empleado, motivo, doble firma empresa/trabajador) que queda archivado como documento del empleado y aparece en su historial.
- Motor de generación **HTML→PDF reutilizable** (servirá también para los contratos). Como paso previo se corrigió un defecto de infraestructura: el generador de PDF estaba roto en la imagen del servidor por falta de librerías de sistema; ningún test lo detectaba. Se corrigió el entorno y se dejó verificado que produce PDF real.
- **UI:** página admin de amonestaciones (crear, listar, descargar) y pestaña "Amonestaciones" en el portal del empleado, con botón "Confirmar recepción".
- **Tests:** 10 nuevos (incluye control de acceso entre empleados y aparición en el historial), suite en 290 en verde.

#### 4. Onboarding — documentación del empleado

- El empleado puede subir su propia documentación de alta (DNI/NIE, fotografía, tarjeta de la Seguridad Social) desde su portal, en PDF o imagen (máx. 20 MB). RRHH la revisa desde la página de Documentos existente.
- Nueva tarjeta **"Completa tu perfil"** en el portal, con los tres documentos marcándose en verde a medida que se suben.
- **Tests:** 7 nuevos, suite en 297 en verde.

#### 5. Plantillas de contrato

- Generación de contratos autorrellenados en PDF a partir de plantilla, reutilizando el motor HTML→PDF de las amonestaciones. El contrato queda archivado como documento del empleado y aparece en su historial.
- Multi-empresa correcto y con validaciones completas. Decisión de alcance: la generación produce el PDF del contrato; la gestión del contrato estructurado del empleado se mantiene en el flujo de alta.
- **Tests:** 9, en verde.

#### 6. Horas extra con reparto (nómina / descanso)

- Al aprobar horas extra semanales, RRHH puede elegir **cuántas van a nómina y cuántas al saldo de bolsa de descanso** (con atajos "todo a nómina" / "todo a descanso" y control deslizante de reparto).
- Nueva **bolsa de horas** consultable por administración y por el propio empleado. Control del tope anual de horas extra (Art. 35 ET) sobre el total.
- Migración **018** con recálculo automático de los datos existentes.
- **Tests:** suite completa en 312 en verde. Build de frontend limpio.

#### 7. Commit y despliegue a producción

- Se consolidó todo el sprint en dos commits limpios (código y documentación) y se **desplegó a producción** de forma automática: reconstrucción de imágenes, recreación de contenedores y aplicación de las migraciones (017 amonestaciones + 018 horas extra) sobre la base de datos real, sin pérdida de datos de fichaje.
- **Verificación en vivo:** frontend y `/health` respondiendo (200); las nuevas rutas de contratos y amonestaciones sirviendo el código nuevo. Fichaje del cliente intacto.
- Se detectó una instancia antigua de backend residual en el servidor (no afecta al servicio en uso) que queda anotada para limpieza.

#### Carga de nóminas por archivo — decisión de diseño

- Última solicitud pendiente (Marc). Se decidió **no atar el sistema al formato de la gestoría actual**, sino construir un **importador universal por archivo estándar documentado** (al estilo del import de empleados por CSV ya existente), más profesional y sin dependencia de un tercero. Falta diseñar el formato estándar y el modelo de datos de nóminas. Se solicitará a la gestoría un archivo solo como referencia.

---

### Gestor Facturas — Document Capture

Objetivo: que la aplicación cubra el circuito completo de digitalización de facturas que pide el cliente, sustituyendo la herramienta de terceros. Todo el bloque quedó implementado y verificado en local; el despliegue real y la prueba contra el entorno de Business Central quedan a la espera de una credencial.

#### PDF adjunto dentro de Business Central

- Cada factura empujada a Business Central lleva ahora su **PDF adjunto** dentro del documento (requisito marcado como importante por el cliente), vía la API oficial de attachments. Migración **0027**; aviso visual en la interfaz según se haya adjuntado o no.

#### Multi-empresa (13 empresas)

- Sustitución del emparejamiento frágil por nombre por un **mapa configurable empresa↔beneficiario**, con endpoints de gestión y nueva pantalla de administración del mapa. Migraciones **0028** y **0029** (la factura persiste ahora a qué empresa de Business Central se envió, con filtro por empresa).

#### Proveedor de IA enchufable + coste por factura

- El proveedor de IA del parser pasa a ser un **adaptador intercambiable** ("bring your own AI": el Azure OpenAI del propio cliente, otro proveedor o local), con los datos en la UE. Se preparó además una **estimación de coste por factura**, que es lo que el cliente preguntó frente a la cuota fija mensual de la herramienta anterior.

#### Archivado en SharePoint (Microsoft Graph)

- Nuevo módulo que **sube el PDF de cada factura a la biblioteca de SharePoint** del cliente y deja el gancho para rellenar las columnas de la lista. Integrado en el flujo de envío como paso best-effort (nunca bloquea el envío) y con reintento del adjunto y del archivado. Migración **0030**; indicador "Archivada en SharePoint" en la tabla.
- El transporte está construido y probado (con simulación); el disparo real necesita las credenciales de Graph y el esquema de columnas de la biblioteca del cliente.

#### Credenciales como fuente única

- Se centralizaron las credenciales de Business Central y Azure en un único archivo de acceso (`accesos.env`), del que beben los proyectos, con prioridad sobre la base de datos.

#### Calidad y seguridad

- Revisión de seguridad exhaustiva sobre todo el bloque. En la sesión de mañana se detectaron y corrigieron **3 problemas críticos** (reintento de adjunto sin PDF, cabecera huérfana que duplicaba al reintentar, doble envío concurrente) todos con test. Por la tarde se corrigió un problema medio (el reintento re-resolvía la empresa por un mapa que podía haber cambiado; ahora usa la empresa ya registrada).
- **Suite completa: 83 tests en verde**, migraciones reversibles verificadas en PostgreSQL real, build de frontend limpio.
- Todo el trabajo quedó en la rama `feature/document-capture` (8 commits troceados por bloque), con escaneo de seguridad limpio (sin secretos en el repositorio). Sin publicar aún.

## Estado actual

ProgramaFichar: **8 de 9 solicitudes del cliente cerradas y el sprint completo desplegado a producción y verificado en vivo** (incidencias, historial, amonestaciones, onboarding, contratos, horas extra con reparto y motor de PDF). Suite en 312 tests en verde.

Gestor Facturas: módulo Document Capture completo en local (PDF en Business Central, multi-empresa, adaptador de IA, archivado en SharePoint), 83 tests en verde, en rama propia sin desplegar. El único bloqueo para probar contra el entorno real de Business Central es la credencial `BC_CLIENT_SECRET`, que sigue sin estar pegada (era un texto de ejemplo).

## Pendiente

- **Gestor Facturas — credencial de Business Central:** pegar el `BC_CLIENT_SECRET` real para desbloquear la prueba real en el entorno sandbox y la lectura (solo lectura) de las cuentas contables por empresa.
- **Gestor Facturas — SharePoint real:** obtener credenciales de Microsoft Graph y el esquema de columnas de la biblioteca del cliente para activar el archivado real.
- **Gestor Facturas — cuenta contable por empresa:** extender el mapa de empresas con cuenta contable propia (hoy todas usan una cuenta fija por defecto).
- **Gestor Facturas — despliegue real** (`docker compose up -d --build`) y decisión de publicación de la rama `feature/document-capture`.
- **ProgramaFichar — nóminas por archivo:** diseñar el importador universal (formato estándar + modelo de datos).
- **ProgramaFichar — limpieza** de la instancia de backend residual detectada en el servidor.
- **Decisiones pendientes del cliente:** tratamiento del DNI (guardar copia/imagen o solo el número — AEPD desaconseja la copia) y tipo de firma digital (firma simple propia vs. proveedor externo). Desbloquean el onboarding completo y la firma de contratos.
