# MarketPlus

Plataforma e-commerce de productos tecnológicos (Angular + Node.js/Express + MySQL). Operamos desde **Huancayo** con envíos a todo el Perú.

## Características principales

- Registro e inicio de sesión con JWT (`username` único, login por email o username).
- Catálogo con filtros, búsqueda, detalle de producto e imágenes con fallback.
- Carrito con control de stock, selector `[-] [cantidad] [+]`, toasts y totales en tiempo real.
- Checkout con tipo de entrega, comprobante fiscal y validación de pago.
- Favoritos, direcciones, pedidos y panel administrador.

## Stack tecnológico

- **Frontend:** Angular 21, TypeScript 5.9, RxJS
- **Backend:** Node.js, Express, JWT, bcrypt
- **Base de datos:** MySQL 8.0

## Estructura

```text
MarketPlus/
  backend/
  database/
  frontend/
```

## Requisitos previos

- Node.js 24+ (requerido por el frontend; ver `frontend/package.json`)
- npm 9+
- MySQL 8.0+

## Base de datos

```sql
CREATE DATABASE IF NOT EXISTS marketplus_db;
USE marketplus_db;
SOURCE database/marketplus.sql;
SOURCE database/seed.sql;
SOURCE database/views.sql;
SOURCE database/procedures.sql;
```

Si ya tienes la BD creada, aplica migraciones:

```sql
SOURCE database/actualizar-usuarios-username.sql;
SOURCE database/actualizar-checkout.sql;
SOURCE database/actualizar-direcciones-delete.sql;
```

El backend también aplica migraciones automáticas al iniciar (username, checkout, tipo de entrega).

Documentación BD: [database/DIAGRAMA-ER.md](database/DIAGRAMA-ER.md) · [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)

## Configuración backend

```bash
cd backend
npm install
```

Crear `.env` desde `.env.example`:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=marketplus_db
JWT_SECRET=tu_secreto
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:2626
```

## Configuración frontend

```bash
cd frontend
npm install
```

## Ejecución

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm start
```

- Frontend: http://localhost:2626
- API: http://localhost:3001/api

## Usuarios de prueba (seed)

| Rol     | Email / Username        | Contraseña |
|---------|-------------------------|------------|
| Admin   | admin@marketplus.pe     | 12345678   |
| Cliente | carlos.rodriguez@gmail.com / carlos.rp | 12345678 |

## Flujos validados

### Registro

- `username`: obligatorio, 4–20 caracteres, único.
- Nombres/apellidos: solo letras, mínimo 2 caracteres.
- Email: formato válido, único.
- DNI (opcional): 8 dígitos si se completa.
- Teléfono (opcional): 9 dígitos si se completa.
- Contraseña: mínimo 8 caracteres + confirmación.

### Login

- Ingreso con **email** o **username** (no DNI ni teléfono).

### Carrito

- Cantidad mínima 1, máximo según stock.
- Botones `[-]` y `[+]`, totales actualizados.
- Toasts al agregar/actualizar; confirmación al eliminar.

### Checkout (pago simulado)

1. **Entrega** (`direcciones.tipo`):
   - **Domicilio:** destinatario, dirección, departamento, provincia, distrito, teléfono (9 dígitos).
   - **Recojo en tienda:** nombre y DNI de quien recoge, teléfono; mensaje *Recojo disponible en tienda MarketPlus*.
   - En checkout: **Seleccionar**, **Editar** y **Eliminar** direcciones guardadas.

2. **Comprobante de pago** (sección separada de la entrega):
   - **Boleta:** nombre completo + DNI (8 dígitos).
   - **Factura:** RUC (11 dígitos), razón social, dirección fiscal.

3. **Método de pago** (simulación, sin cobro real):
   - **Yape:** teléfono 9 dígitos + código de operación (mín. 6).
   - **Tarjeta Visa:** 16 dígitos (formato visual 4+4+4+4), titular, MM/AA, CVV 3 dígitos.
   - **Contra entrega:** solo si la entrega es domicilio.

4. Confirmación: loading *Procesando compra...*, pedido `PED-XXXXXX`, carrito vacío, modal de éxito con enlace a **Mis pedidos**.

Ver también: [database/DIAGRAMA-ER.md](database/DIAGRAMA-ER.md) (diagrama ER) y [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) — **18 tablas** en `marketplus_db` (sin tablas nuevas; columnas de checkout en `direcciones` y `pedidos`).

## Validaciones principales

| Campo              | Regla                                      |
|--------------------|--------------------------------------------|
| DNI                | Solo números, 8 dígitos                    |
| Teléfono           | Solo números, 9 dígitos                    |
| RUC                | Solo números, 11 dígitos                   |
| Tarjeta            | 16 dígitos                                 |
| Nombres/apellidos  | Solo letras y espacios                     |
| Username           | 4–20 chars, letras/números/`.` `_` `-`     |

Frontend y backend validan por igual; el backend nunca confía solo en el cliente.

## Endpoints principales

- `POST /api/auth/register` — Registro
- `POST /api/auth/login` — Login (email o username)
- `GET /api/products` — Catálogo
- `GET /api/cart` — Carrito (auth)
- `POST /api/addresses` — Crear entrega (auth)
- `POST /api/orders` — Crear pedido (auth)
- `GET /api/admin/dashboard` — Panel admin

## Cómo probar

1. Importar BD y ejecutar backend + frontend.
2. **Registro:** crear cuenta con username único; verificar mensajes por campo.
3. **Carrito:** agregar producto, cambiar cantidad, probar límite de stock.
4. **Checkout:**
   - Crear entrega domicilio y otra de recojo en tienda.
   - Probar boleta (DNI) y factura (RUC).
   - Probar tarjeta, Yape y contra entrega (solo domicilio).
5. Confirmar pedido y revisar en **Mis pedidos**.

## Estado del proyecto

En desarrollo activo — flujo principal funcional: registro, login, catálogo, carrito, checkout y admin.
