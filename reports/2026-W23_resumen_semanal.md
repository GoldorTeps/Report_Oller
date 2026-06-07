---
title: Resumen semanal — Semana del 1 al 5 de junio de 2026
date: 2026-06-05
project: Victor (multi-proyecto)
type: semanal
---

# Semana del 1 al 5 de junio — 2026

## Proyectos trabajados

| Proyecto | Sesiones | Destacado |
|----------|----------|-----------|
| Hotel Ollers de Mar (PMS) | Lun · Mar · Mié · Jue · Vie | PMS construido desde cero · Cassandra review 10 bugs · análisis datos servidor TESA |
| ZeroCog BC | Lun · Jue · Vie | Corpus 227 → 699 eventos · spec v4DEF alineada · arquitectura hub |
| ProgramaFichar | Mar · Mié | MVP completo desde cero · refactor de calidad · mejoras kiosk |
| Gestor Mail Facturas | Lun · Mié | Integración ZeroCog activa · 4 features feedback Víctor |
| MICE / Gestión Comercial | Jue | Kanban pipeline con drag & drop |

---

## Logros de la semana

### Hotel Ollers de Mar — PMS completo construido en una semana

El proyecto arrancó el lunes 1 con 0 líneas de código y cerró el viernes con un sistema de gestión hotelera completo en producción:

- **Stack**: FastAPI + PostgreSQL + React/Vite + Docker, desplegado en Hetzner `46.225.69.8:5174`
- **Módulos construidos**: rack/planning, reservas, huéspedes, habitaciones, tarifas por temporada, folio de cargos, depósitos, cobro con calculadora de denominaciones, campañas CRM (Email/SMS/WhatsApp via Brevo), check-in online, booking web pública, i18n ES/CA/EN completo, gestión de usuarios admin, foto de documento, audit log, SES/IEET (registro policial RD 933/2021), night audit
- **Cassandra review** (miércoles 4): 10 bugs encontrados con 3 agentes en paralelo, todos corregidos — incluyendo 3 de seguridad crítica (token type validation, API key hardcodeada, borrado de anticipos sin rol admin) y SES que nunca se disparaba en check-in (obligación legal, multas hasta €30.000)
- **Integración ZeroCog**: 52 reservas hoteleras indexadas y embebidas en el hub como tercera fuente
- **Análisis datos servidor cliente** (viernes 5): WSDL completo de TESA Smartair Platform v5.61 descubierto — se puede escribir el cliente SOAP desde Python ya. 982 reservas ICG reales exportadas como referencia de modelo de datos

### ZeroCog BC — Corpus ×3 y motor alineado con spec v4DEF

- **Entidades BC**: de 4 tipos a 15 tipos completos — corpus de 227 a 699 eventos (+208%)
- **Motor corregido**: pesos W1/W2 invertidos (W1=0.30, W2=0.35), decay de confianza para `no_resuelto` (spec §3.4), 15 type_labels completos en `format_for_llm`
- **Arquitectura hub**: refactor de BC-céntrico a hub dinámico con `source_registry.py` — añadir fuente nueva = añadir un bloque, sin tocar la app
- **Embeddings cosine reales**: `embed_cache.py` + OpenAI batch, pre-filtro `sim > 0.15`, 556 eventos embebidos — motor activando eventos en lugar de comportarse como RAG puro
- **Fix pool agotado** (lunes): conexiones psycopg2 no devueltas al pool por uso incorrecto de context manager — resuelta raíz del fallo de bc.zerocog.org
- **Fix PostgreSQL transacciones** (viernes): índices en misma transacción que `ALTER TABLE` → columna invisible hasta commit — dividida `ensure_schema()` en dos transacciones

### ProgramaFichar — MVP SaaS completo desde cero

- **Stack**: FastAPI + SQLAlchemy async + Alembic + PostgreSQL con Row-Level Security / React + Vite + TypeScript + shadcn/ui
- **Funcionalidades**: kiosk tablet por PIN (verificación HMAC real), panel admin con tiempo real, ausencias, bolsa de horas, Gantt de equipo, horarios por plantilla con historial, portal del empleado, exportación CSV/PDF, audit log inmutable
- **Refactor de calidad**: eliminados N+1 en 6 endpoints (201→2 queries), unificadas 4+8 funciones duplicadas, 10 tipos TypeScript compartidos, constantes centralizadas — build TypeScript limpio, Python sin errores
- **Normativa**: diseño alineado con RDL 8/2019 (fichaje inmutable, retención 4 años, acceso del trabajador, RGPD)
- **Demo**: 2 empresas, 25 empleados, 103 jornadas históricas en producción (`46.225.69.8:8002/5175`)

### Gestor Mail Facturas — Integración ZeroCog + feedback Víctor

- ZeroCog activo como segunda fuente del hub: `GET /zerocog/sync` → 109 facturas → `victor_spend: €347.881` visible en bc.zerocog.org
- 4 features de feedback: eliminar facturas, columna beneficiario editable, toggle contabilizado, modo de pago
- Filas coloreadas por beneficiario con paleta determinista de 10 colores

### MICE / Gestión Comercial — Pipeline kanban

- 6 columnas kanban (Recibida → Cotizada → Enviada → Negociación → Ganada → Perdida) con drag & drop (`@dnd-kit`)
- Cada columna con contador y total de valor estimado; tarjetas con alertas rojo/ámbar por tiempo sin contacto o evento inminente
- Seed demo con 2 marcas, 8 clientes, 20 peticiones en todos los estados del pipeline

### Reuniones

- **Frank + Laia** (jueves 4, 16:00–17:45): seguimiento ZeroCog BC (pendiente acceso BC producción) y Hotel Ollers (Brevo, TESA, decisión servidor)
- **Salvador** — Recepción Hotel Ollers de Mar (viernes 5, 16:00): revisión PMS y recogida de feedback del usuario final de recepción

---

## Pendiente para la próxima semana

**Hotel Ollers de Mar:**
- Confirmar API key Brevo con el cliente (bloqueante para campañas reales)
- Confirmar host + credenciales TESA Smartair para activar integración de cerraduras
- Integración Redsys/CaixaBank (pendiente credenciales del cliente)
- Confirmar hardware cajón de efectivo (ESC/POS)
- Decidir: PMS como SaaS o instalación única para Oller del Mas

**ZeroCog BC:**
- Añadir `https://frank.zerocog.org/auth/callback` al App Registration de Azure
- Regenerar BC_CLIENT_SECRET y OPENAI_API_KEY (expuestos en sesiones anteriores)
- Endpoint `/records` del servidor: expandir de 4 a 15 queries
- Reunión con Frank para acceso a BC real del cliente (bloqueante para `DEMO_MODE=false`)

**ProgramaFichar:**
- Sistema de mensajes empleado↔empresa (feature principal pendiente)
- Migración: `ALTER TABLE audit_log ALTER COLUMN company_id SET NOT NULL`

**MICE:**
- Fase 2: panel de presupuestos (quotes + quote_lines, margen en vivo)
- Ficha de petición con detalle, timeline y presupuestos asociados
