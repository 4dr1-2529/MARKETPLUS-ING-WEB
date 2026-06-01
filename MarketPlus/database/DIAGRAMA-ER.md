# MARKETPLUS — Diagrama entidad-relación

| Propiedad | Valor |
|-----------|--------|
| Base de datos | `marketplus_db` |
| Motor | MySQL 8.0 |
| **Total de tablas** | **18** (sin tablas nuevas tras el checkout) |
| Script principal | `database/marketplus.sql` |
| Esquema detallado | [`../DATABASE_SCHEMA.md`](../DATABASE_SCHEMA.md) |

> **Importante:** el checkout **no creó tablas nuevas**. Se modificaron columnas en tablas existentes (`direcciones`, `pedidos`, `usuarios`). Los datos de comprobante y pago simulado viven en `pedidos`; no existe tabla `comprobantes` separada.

---

## Diagrama Mermaid (relaciones y campos clave)

```mermaid
erDiagram
    roles ||--o{ usuarios : "1:N"
    usuarios ||--o{ direcciones : "1:N"
    usuarios ||--o| carrito : "1:1"
    carrito ||--o{ detalle_carrito : "1:N"
    productos ||--o{ detalle_carrito : "1:N"
    categorias ||--o{ productos : "1:N"
    marcas ||--o{ productos : "1:N"
    proveedores ||--o{ productos : "1:N"
    productos ||--|| inventario : "1:1"
    categorias ||--o{ categorias : "padre_hijo"
    usuarios ||--o{ pedidos : "1:N"
    direcciones ||--o{ pedidos : "1:N envio"
    pedidos ||--o{ detalle_pedido : "1:N"
    productos ||--o{ detalle_pedido : "1:N"
    pedidos ||--o{ pagos : "1:N"
    usuarios ||--o{ pagos : "1:N"
    pedidos ||--o{ historial_pedidos : "1:N"
    usuarios ||--o{ historial_pedidos : "0:N"
    usuarios ||--o{ valoraciones : "1:N"
    productos ||--o{ valoraciones : "1:N"
    pedidos ||--o{ valoraciones : "0:N"
    usuarios ||--o{ favoritos : "1:N"
    productos ||--o{ favoritos : "1:N"
    usuarios ||--o{ notificaciones : "1:N"

    roles {
        int id PK
        varchar nombre UK
        varchar descripcion
    }

    usuarios {
        int id PK
        int role_id FK
        varchar username UK
        varchar email UK
        varchar nombres
        varchar apellidos
        varchar dni UK
        varchar telefono UK
        enum estado
    }

    direcciones {
        int id PK
        int usuario_id FK
        enum tipo "domicilio|recojo_tienda"
        varchar destinatario
        varchar direccion_linea1
        varchar departamento
        varchar provincia
        varchar distrito
        varchar telefono
        varchar dni_contacto
        boolean es_principal
    }

    pedidos {
        int id PK
        int usuario_id FK
        int direccion_envio_id FK
        varchar numero_pedido UK "PED-000001"
        decimal subtotal
        decimal descuento
        decimal igv
        decimal costo_envio
        decimal total
        enum estado
        varchar metodo_pago
        enum tipo_comprobante "boleta|factura"
        varchar comprobante_dni
        varchar comprobante_nombre
        varchar comprobante_ruc
        varchar comprobante_razon_social
        varchar comprobante_direccion_fiscal
        json datos_pago
        enum estado_pago
        boolean es_pago_simulado
    }

    productos {
        int id PK
        int categoria_id FK
        int marca_id FK
        int proveedor_id FK
        varchar nombre
        varchar slug UK
        varchar sku UK
        decimal precio
    }

    carrito {
        int id PK
        int usuario_id FK UK
    }

    detalle_carrito {
        int id PK
        int carrito_id FK
        int producto_id FK
        int cantidad
        decimal precio_unitario
    }

    detalle_pedido {
        int id PK
        int pedido_id FK
        int producto_id FK
        int cantidad
        decimal precio_unitario
        decimal subtotal
    }

    pagos {
        int id PK
        int pedido_id FK
        int usuario_id FK
        decimal monto
        varchar metodo
        enum estado
    }
```

---

## Las 18 tablas

| # | Tabla | Descripción | PK | FK principales |
|---|--------|-------------|-----|----------------|
| 1 | `roles` | Roles (admin, cliente) | `id` | — |
| 2 | `usuarios` | Cuentas (`username` único) | `id` | `role_id` → `roles` |
| 3 | `categorias` | Categorías jerárquicas | `id` | `padre_id` → `categorias` |
| 4 | `marcas` | Marcas de productos | `id` | — |
| 5 | `proveedores` | Proveedores (`ruc` UK) | `id` | — |
| 6 | `productos` | Catálogo | `id` | `categoria_id`, `marca_id`, `proveedor_id` |
| 7 | `inventario` | Stock (1:1 con producto) | `id` | `producto_id` → `productos` |
| 8 | `direcciones` | Domicilio o recojo en tienda | `id` | `usuario_id` → `usuarios` |
| 9 | `carrito` | Un carrito por usuario | `id` | `usuario_id` → `usuarios` |
| 10 | `detalle_carrito` | Ítems del carrito | `id` | `carrito_id`, `producto_id` |
| 11 | `pedidos` | Órdenes + comprobante + pago simulado | `id` | `usuario_id`, `direccion_envio_id` |
| 12 | `detalle_pedido` | Líneas del pedido | `id` | `pedido_id`, `producto_id` |
| 13 | `pagos` | Registro de pagos | `id` | `pedido_id`, `usuario_id` |
| 14 | `cupones` | Cupones de descuento | `id` | — |
| 15 | `valoraciones` | Reseñas de productos | `id` | `usuario_id`, `producto_id`, `pedido_id` |
| 16 | `favoritos` | Lista de deseos | `id` | `usuario_id`, `producto_id` |
| 17 | `historial_pedidos` | Trazabilidad de estados | `id` | `pedido_id`, `realizado_por` |
| 18 | `notificaciones` | Avisos al usuario | `id` | `usuario_id` → `usuarios` |

---

## Cardinalidades

| Relación | Cardinalidad | Notas |
|----------|--------------|--------|
| `roles` → `usuarios` | 1:N | Cada usuario tiene un rol |
| `usuarios` → `direcciones` | 1:N | Varias entregas por usuario |
| `usuarios` → `carrito` | 1:1 | `uk_usuario` en `carrito` |
| `carrito` → `detalle_carrito` | 1:N | Ítems activos |
| `productos` → `detalle_carrito` | 1:N | Producto en carritos |
| `usuarios` → `pedidos` | 1:N | Historial de compras |
| `direcciones` → `pedidos` | 1:N | `direccion_envio_id` |
| `pedidos` → `detalle_pedido` | 1:N | Líneas de la orden |
| `pedidos` → `pagos` | 1:N | Puede haber varios registros |
| `pedidos` → `historial_pedidos` | 1:N | Cambios de estado |
| `usuarios` ↔ `productos` | N:M | Vía `favoritos` |
| `usuarios` ↔ `productos` | N:M | Vía `valoraciones` |
| `categorias` → `categorias` | 1:N | Auto-referencia `padre_id` |
| `productos` → `inventario` | 1:1 | `uk_producto` |

---

## Normalización

| FN | Cumplimiento |
|----|----------------|
| **1FN** | Valores atómicos; sin grupos repetitivos en filas de detalle. |
| **2FN** | Atributos en `detalle_carrito` y `detalle_pedido` dependen de la clave compuesta del detalle. |
| **3FN** | Entidades descriptivas separadas (`roles`, `marcas`, `categorias`, `proveedores`). |

Denormalización controlada: `productos.ventas`, totales en `pedidos`.

---

## Importar la base de datos

```sql
CREATE DATABASE IF NOT EXISTS marketplus_db;
USE marketplus_db;
SOURCE database/marketplus.sql;
SOURCE database/seed.sql;
SOURCE database/views.sql;
SOURCE database/procedures.sql;
```

Migración en BD existente:

```sql
SOURCE database/actualizar-usuarios-username.sql;
SOURCE database/actualizar-checkout.sql;
```

---

*Última revisión alineada con `database/marketplus.sql` y flujo de checkout MarketPlus.*
