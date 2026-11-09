---
title: Jornada 14 de julio — CaptuFact: nuevo nombre y primera conexión real con el Business Central de pruebas del grupo
date: 2026-07-14
project: CaptuFact
type: sesion
---

# Sesión de trabajo — 14 de julio de 2026

## Qué se hizo

### CaptuFact — El programa de facturas ya habla con el Business Central del grupo (entorno de pruebas)

Con los accesos a Business Central conseguidos en la reunión con Suitech de ese mismo día, se hizo la primera conexión real entre el programa de facturas y el BC del Grupo Oller del Mas.

**Nuevo nombre: CaptuFact**
- El programa que hasta ahora se conocía como "Gestión de Facturas" pasa a llamarse **CaptuFact** en todo lo que ve el usuario: pantalla de acceso, cabecera, avisos y correos que envía. Es un cambio solo de nombre; el funcionamiento no cambia.

**Primera conexión con Business Central, siempre en el entorno de pruebas**
- Se comprobó que la llave de acceso funciona y se configuró el programa para trabajar **únicamente contra el entorno de pruebas de BC** (la configuración inicial apuntaba a producción y se corrigió antes de hacer nada).
- Lectura de comprobación, sin modificar nada: el entorno de pruebas contiene **4 empresas**, entre ellas MARBORI, y **537 proveedores reales** con su CIF. Es una copia de producción, así que las pruebas se hacen con datos reales sin tocar lo que usa el grupo.
- Se detectó que la cuenta contable que el programa traía por defecto **no existe en el plan de cuentas de MARBORI** (que usa cuentas de 8 dígitos). Queda por fijar una cuenta real.

**Prueba de fuego: un borrador de control**
- Con autorización expresa se creó **un único borrador de factura de compra** en MARBORI (12,34 €, sin registrar). Se comprobó así que toda la cadena de envío a BC funciona en vivo.
- Al intentar borrarlo desde el programa, BC lo impidió: está instalado **Continia Document Capture** y la aplicación no tiene el permiso necesario para borrar. Crear sí funciona. Queda por aclarar con Suitech si es solo un permiso que falta.

**Garantías**
- Las claves de acceso a BC se guardan fuera del código, con acceso restringido, y no se muestran en ningún registro.
- Producción no se tocó.

## Estado actual

CaptuFact ya **escribe en el Business Central de pruebas del grupo** de punta a punta. Antes de volcar facturas de verdad faltan el permiso de borrado, la cuenta contable por defecto y confirmar a qué empresa van las facturas.

## Pendiente

- Borrar a mano en BC el borrador de control (la aplicación aún no tiene permiso para hacerlo).
- Aclarar con Suitech el permiso que bloquea el borrado (Continia).
- Fijar una cuenta contable real de MARBORI como cuenta por defecto.
- Confirmar la empresa de destino de las facturas del buzón.
- Siguiente fase: volcado completo en vivo (correo → lectura → factura → BC) contra el entorno de pruebas.
