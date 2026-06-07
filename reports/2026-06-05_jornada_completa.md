---
title: Jornada completa — ZeroCog BC expansión + spec fixes / Hotel Ollers Users fix + análisis TESA / Reunión Salvador recepción
date: 2026-06-05
project: Victor (multi-proyecto)
type: sesion
---

# Sesión de trabajo — 5 de junio de 2026

## Qué se hizo

### ZeroCog BC — Expansión masiva de entidades (385 → 699 eventos)

Situación de partida: solo se extraían 4 tipos de entidad de Business Central (salesInvoice, purchaseInvoice, salesOrder, vendor). El corpus tenía 385 eventos.

Se ampliaron a 15 tipos con todas las nuevas entidades disponibles en la API BC v2.0:

| Entidad BC | Tipo ZeroCog | Resultado CRONUS |
|-----------|-------------|-----------------|
| `customers` | customer | 5 clientes |
| `salesInvoiceLines` | salesInvoiceLine | 195 líneas |
| `purchaseInvoiceLines` | purchaseInvoiceLine | 119 líneas |
| `salesQuotes` | salesQuote | 18 presupuestos |
| `purchaseOrders` | purchaseOrder | 14 pedidos compra |
| `salesCreditMemos` | salesCreditMemo | 0 (CRONUS no tiene) |
| `purchaseCreditMemos` | purchaseCreditMemo | 10 abonos compra |
| `items` | item | 80 artículos |
| `employees` | employee | 7 empleados |
| `contacts` | contact | 24 contactos |

Archivos actualizados en local y servidor (`/opt/zerocog-bc/`):
- **`zerocog_mapper.py`**: 4 nuevos mappers (`map_sales_invoice_line`, `map_purchase_invoice_line`, `map_sales_credit_memo`, `map_aged_ar`). MAPPERS dict a 15 tipos.
- **`bc_bootstrap.py`**: ENTITY_MAP refactorizado en entidades estándar + líneas via `$expand` + AR aging. Resuelto: las líneas de factura requieren `$expand` sobre el documento padre — la API BC no permite browsing directo sin ID.
- **`zerocog_bc_app.py`**: `_load_corpus` a 13 secciones SQL. Endpoint `/records` con queries para los 13 tipos. `summary` con conteo dinámico.

Corpus final: **699 eventos** en DB (+81% respecto a los 385 anteriores). Deploy con `--network host` para resolver problema de red Docker en el servidor.

### ZeroCog BC — Corrección spec v4DEF (3 gaps)

Sesión de continuación para alinear la implementación con la especificación.

**1. Pesos W1/W2 (crítico — violaba invariante w2≥w1)**
- Antes: W1=0.35, W2=0.30 (invertidos — el motor degeneraba a RAG puro)
- Ahora: W1=0.30, W2=0.35 (spec §4.1)

**2. `format_for_llm` — type_labels completos**
- Antes: solo 4 tipos. Ahora: los 15 tipos BC completos.

**3. Decay de confianza para `no_resuelto` (spec §3.4)**
- `T_DECAY_DAYS = 182` (MAX_AGE_DAYS // 2)
- `quality()` aplica `base *= 0.5` si `es == "no_resuelto"` y `age_days > T_DECAY_DAYS`
- Verificado: `quality("no_resuelto", age_days=0)` = 0.20 / `quality("no_resuelto", age_days=200)` = 0.10

**Fix de despliegue — `zerocog_logs.py`**

El contenedor crasheaba con `psycopg2.errors.UndefinedColumn: column "event_id" does not exist`. Causa: `ALTER TABLE ADD COLUMN` y `CREATE INDEX` estaban en la misma transacción — PostgreSQL no veía la columna hasta el commit. Fix: dividir `ensure_schema()` en dos transacciones.

Desplegado y verificado en producción: W1/W2 correctos, decay activo, 551 eventos activos en CRONUS ES.

### Hotel Ollers de Mar — Fix página de Usuarios

La página de Usuarios quedaba pillada cargando indefinidamente. Causa: `fetch` con `VITE_API_URL` (`http://localhost:8001`) se resuelve en el navegador del cliente, no en el servidor.

Fix: reemplazado todo `fetch` + headers manuales por `import api from '../../lib/api'` (axios, URLs relativas). Rsync al servidor + rebuild frontend.

Commit: `5b9f994` — *"Fix Users page stuck loading: replace fetch with axios api instance"*

**Aclaración del flujo PIN / email:**
- Login con email/password = solo importa para la primera sesión del día
- Desde el primer bloqueo: el PIN emite un JWT nuevo para el usuario con ese PIN → la sesión cambia al recepcionista que desbloquea
- Anna (PIN 1234), Pau (PIN 5678), admin sin PIN (nunca se bloquea)

### Hotel Ollers de Mar — Análisis datos servidor cliente (DATOS_OLLERs)

Volcado del servidor Windows de Marbori SL / Oller del Mas analizado para extraer información útil para el PMS.

**TESA Smartair — hallazgo clave:**
- Modelo confirmado: **TESA Smartair Platform v5.61**, GlassFish 4
- 5 WSDLs disponibles en el volcado: `DoorsWebService`, `GlobalElegibilityInfo`, `GlobalServiceManagement`, `RemoteServerService`, `ToolsWebService`
- Endpoint SOAP: `http://[host]:8080/TesaSmartairPlatform/DoorsWebService`
- Operaciones principales: `doorOpen`, `doorClose`, `doorBlock`, `doorUnblock`, `doorPassage`, `doorGetAll`, `doorDiagnostic`
- `GlobalServiceManagement.wsdl` incluye soporte NFC/móvil (GlobalPlatform TSM) — llaves por móvil posibles
- Cliente SOAP Python ya se puede escribir con el WSDL en mano; solo falta host y credenciales del cliente

**Datos de reservas ICG FrontHotel:**
- 982 reservas exportadas manualmente desde ICG
- Fuentes: Directa mail/tel 55% · Web propia 23% · OTA/SiteMinder 19% · Xec Regal 3%
- Staff que introduce reservas: Recepció (458), Laia Puig (139), SUPERVISOR (3)
- Canal manager: SiteMinder; tarifa: solo RACK

**Conclusión:** No hay base de datos real de ningún programa del hotel ni del restaurante. `Data.fdb` (BD Firebird de ICG) está vacío (0 bytes). Para datos completos habría que pedir el `Data.fdb` real en `C:\ProgramData\ICG\` del servidor. Para REDSYS: usar API REST directa, no el TpvPC Windows que hay en el volcado.

### Reunión con Salvador — Recepción Hotel Ollers de Mar (16:00)

Reunión presencial con Salvador, del equipo de recepción del hotel. Revisión del estado del PMS y recopilación de feedback del usuario final.

---

## Estado actual

**ZeroCog BC** (`bc.zerocog.org`): 699 eventos en corpus, motor alineado con spec v4DEF (W1=0.30, W2=0.35, decay §3.4 activo, 15 type_labels completos). Desplegado y verificado.

**Hotel Ollers de Mar** (`46.225.69.8`): página de Usuarios operativa. Alembic en migración 0004. Demo: Anna PIN 1234, Pau PIN 5678, admin sin PIN.

---

## Pendiente

**ZeroCog BC:**
- Añadir `https://frank.zerocog.org/auth/callback` al App Registration de Azure
- Regenerar BC_CLIENT_SECRET y OPENAI_API_KEY (expuestos en sesiones anteriores)
- Endpoint `/records` del servidor: sigue con solo 4 queries originales — añadir las 9 nuevas
- `agedAccountsReceivable`: CRONUS no soporta la API v2.0, probar con cliente real en Postman
- Reunión con Frank/Laia para acceso a BC real del cliente (bloqueante para MVP)

**Hotel Ollers de Mar:**
- Confirmar API key Brevo con el cliente
- Confirmar modelo exacto cerraduras TESA + credenciales de operador (host + usuario/contraseña)
- Integración Redsys/CaixaBank (pendiente credenciales del cliente)
- Confirmar hardware cajón de efectivo (ESC/POS)
- Decisión: PMS como SaaS o instalación única
- Solicitar al cliente `Data.fdb` real de ICG si se quieren datos históricos completos
