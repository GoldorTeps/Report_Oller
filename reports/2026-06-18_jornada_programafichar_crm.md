---
title: Jornada 18 de junio — ProgramaFichar Nivel 6 + arranque del CRM de Oller del Mas
date: 2026-06-18
project: ProgramaFichar, CRM
type: sesion
---

# Sesión de trabajo — 18 de junio de 2026

## Qué se hizo

### ProgramaFichar — Nivel 6: revisión de calidad y seguridad

**Correcciones de la revisión de código**
- Cambio de PIN: revocación de las sesiones activas del empleado antes de confirmar el cambio, para invalidar accesos anteriores
- Cambio de contraseña del portal del empleado: añadido límite de intentos (rate limiting) y revocación de sesiones activas
- Refactor del generador de PIN único, eliminando la duplicación de lógica entre el alta de empleado y el reseteo de PIN
- Pantalla de login del administrador: eliminado el acceso de empleado obsoleto y sustituido por un enlace directo al portal del empleado (`¿Eres empleado? Accede al portal`)
- Cobertura de tests actualizada: eliminados los tests del flujo obsoleto y añadidos tests para el enlace al portal y para el rechazo correcto (409) del alta de un empleado ya configurado
- Commit desplegado y verificado en producción

**Revisión de seguridad (metodología OWASP, 10 vectores)**
Auditoría completa del sistema. 9 hallazgos detectados, 7 corregidos en esta jornada:

- *Alta* — Bloqueo por intentos fallidos en el login del empleado, igualando el comportamiento del login de administrador (bloqueo temporal tras varios intentos erróneos)
- *Alta* — Endurecimiento de la cabecera de proxy de confianza, eliminando una vía de evasión del límite de intentos
- *Media* — Puertos internos del backend y de la base de datos restringidos a acceso local únicamente (ya no expuestos al exterior)
- *Media* — Política de seguridad de contenido (CSP) añadida en el servidor web para blindar el frontend
- *Media* — El endpoint de estado del servicio deja de exponer detalles internos en caso de error
- *Baja* — Nombres de fichero descargados sanitizados según estándar (RFC 5987), eliminando una vía de inyección por nombre de archivo
- Test de bloqueo por intentos fallidos añadido; commit desplegado y verificado en producción

**Dos hallazgos de riesgo medio documentados a la espera de decisión**, por requerir cambios de mayor alcance antes de trabajar con datos reales:
- Visibilidad del IBAN completo del empleado hacia supervisores (requiere ajuste de la ficha de empleado en backend y frontend)
- Separación de la clave de cifrado de credenciales de integración respecto a la clave general del sistema (requiere nueva variable de entorno y migración)

### CRM a medida para Grupo Oller del Mas — Arranque del proyecto

Sesión de definición estratégica y arquitectura. Proyecto nuevo que arranca hoy; no se escribió código todavía.

**Contexto del cliente**
- Grupo Oller del Mas: bodega con múltiples líneas de negocio (cabañas, enoturismo, restaurante, tienda física y online, eventos, actividades). El grupo agrupa **14 empresas**, algunas con sus departamentos ya mapeados.
- Tras la reunión con una plataforma comercial del mercado, la decisión es construir un **CRM propio a medida desde cero**, con las necesidades recogidas del cliente como referencia funcional.

**Documentación del cliente analizada**
- Propuesta de CRM y base de datos unificada, con objetivos, funcionalidades deseadas y ejemplos de automatización
- Seguimiento de necesidades del grupo (14 empresas y sus departamentos)

**Decisiones de arquitectura**
- Multi-empresa desde el primer día: son 14 entidades, no es un añadido posterior
- El CRM como sistema maestro de clientes, construido a medida; los sistemas de gestión del grupo podrán sincronizarse después
- Sin dependencias externas bloqueantes: el proyecto puede arrancar de inmediato
- Stack: FastAPI + PostgreSQL + React/Vite + Docker. Email vía Brevo. WhatsApp vía Meta Cloud API

**Modelo de datos propuesto — Fase 1**
- Empresas (las 14 entidades del grupo)
- Ficha única de contacto compartida entre empresas
- Historial de interacciones cruzado por empresa y fuente
- Reglas de puntuación de leads configurables
- Segmentos dinámicos sobre filtros y puntuación
- Motor de automatizaciones (disparador → acción)
- Campañas de email y WhatsApp

**Hoja de ruta por fases**
1. Fundación: ficha única, puntuación de leads, segmentación y dashboard básico
2. Automatizaciones: motor de disparadores, campañas de email y WhatsApp, venta cruzada
3. Inteligencia: recomendación de siguiente mejor compra, evolucionando hacia modelos predictivos cuando exista volumen de datos

**Valor frente a las plataformas de mercado**
- Visión 360º real y ficha única entre las 14 empresas del grupo, sin coste de licencia por empresa
- Integración nativa con los sistemas propios del cliente (gestor de reservas, tienda online)
- Automatizaciones de WhatsApp con Meta Cloud API directa (tasa de apertura muy superior a la del email)
- Puntuación y automatizaciones ajustadas exactamente a las reglas del negocio del cliente

---

## Estado actual

ProgramaFichar en Nivel 6 (revisión de calidad y seguridad) en curso: revisión de código y revisión de seguridad completadas, con todas las correcciones desplegadas y verificadas en producción, que se mantiene estable. Quedan pendientes los pasos finales de la revisión previa a la entrega. El CRM a medida para Grupo Oller del Mas queda definido a nivel de arquitectura, stack y hoja de ruta; el desarrollo arranca en la próxima jornada.

## Pendiente

**ProgramaFichar**
- Completar los pasos finales de la revisión previa a la entrega (revisión externa, dictamen de arquitectura, dictamen crítico e informe de entrega al cliente)
- Obtener el visto bueno del responsable antes de la entrega
- Decidir sobre los dos hallazgos de seguridad de riesgo medio pendientes (visibilidad del IBAN y separación de la clave de cifrado de credenciales) antes de operar con datos reales

**CRM de Oller del Mas**
- Montar la estructura del proyecto: carpetas, Docker Compose y modelos de base de datos
- Implementar el modelo de datos núcleo (empresas, contactos, interacciones, reglas de puntuación y segmentos)
- Backend con endpoints CRUD de contactos y empresas
- Importación inicial de datos (CSV/Excel o manual)
- Motor de puntuación de leads con reglas configurables
