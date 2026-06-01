# MarketPlus Database Schema

## Overview
`marketplus_db` is a MySQL 8.0 relational schema for e-commerce operations: authentication, catalog, cart, checkout, orders, payments, reviews, favorites, notifications, and admin reporting.

**Total tables: 18** — the checkout update did **not** add new tables; it extended existing ones (`direcciones`, `pedidos`, `usuarios`). See the ER diagram: [database/DIAGRAMA-ER.md](database/DIAGRAMA-ER.md).

## Full Table List
1. `roles`
2. `usuarios`
3. `categorias`
4. `marcas`
5. `proveedores`
6. `productos`
7. `inventario`
8. `direcciones`
9. `carrito`
10. `detalle_carrito`
11. `pedidos`
12. `detalle_pedido`
13. `pagos`
14. `cupones`
15. `valoraciones`
16. `favoritos`
17. `historial_pedidos`
18. `notificaciones`

## Structural Elements (PK, FK, indexes, constraints)
1. `roles.id` PK  
2. `roles.nombre` UNIQUE  
3. `usuarios.id` PK  
4. `usuarios.role_id` FK -> `roles.id`  
5. `usuarios.username` UNIQUE + `idx_username`  
6. `usuarios.email` UNIQUE + `idx_email`  
7. `usuarios.dni` UNIQUE (`uk_usuarios_dni`)  
8. `usuarios.telefono` UNIQUE (`uk_usuarios_telefono`)  
9. `usuarios.estado` indexed (`idx_estado`)  
10. `categorias.id` PK  
11. `categorias.padre_id` self FK -> `categorias.id`  
12. `categorias.slug` UNIQUE + indexed  
13. `marcas.nombre` UNIQUE  
14. `marcas.slug` UNIQUE + indexed  
15. `proveedores.ruc` UNIQUE  
16. `productos.id` PK  
17. `productos.categoria_id` FK -> `categorias.id`  
18. `productos.marca_id` FK -> `marcas.id`  
19. `productos.proveedor_id` FK -> `proveedores.id`  
20. `productos.slug` UNIQUE + indexed  
21. `productos.sku` UNIQUE  
22. `inventario.producto_id` FK -> `productos.id`  
23. `inventario.uk_producto` UNIQUE (`producto_id`)  
24. `direcciones.usuario_id` FK -> `usuarios.id` + index  
25. `direcciones.tipo` ENUM(`domicilio`, `recojo_tienda`)  
26. `carrito.usuario_id` FK -> `usuarios.id`  
27. `carrito.uk_usuario` UNIQUE (`usuario_id`)  
28. `detalle_carrito.carrito_id` FK -> `carrito.id`  
29. `detalle_carrito.producto_id` FK -> `productos.id`  
30. `detalle_carrito.uk_carrito_producto` UNIQUE (`carrito_id`, `producto_id`)  
31. `pedidos.numero_pedido` UNIQUE + `idx_numero`  
32. `pedidos.usuario_id` FK -> `usuarios.id`  
33. `pedidos.direccion_envio_id` FK -> `direcciones.id`  
34. `detalle_pedido.pedido_id` FK -> `pedidos.id`  
35. `detalle_pedido.producto_id` FK -> `productos.id`  
36. `pagos.pedido_id` FK -> `pedidos.id`  
37. `pagos.usuario_id` FK -> `usuarios.id`  
38. `pagos.referencia_pago` indexed  
39. `cupones.codigo` UNIQUE + `idx_codigo`  
40. `cupones.estado` indexed  
41. `valoraciones.usuario_id` FK -> `usuarios.id`  
42. `valoraciones.producto_id` FK -> `productos.id`  
43. `valoraciones.pedido_id` FK -> `pedidos.id`  
44. `valoraciones.uk_usuario_producto` UNIQUE (`usuario_id`, `producto_id`)  
45. `favoritos.usuario_id` FK -> `usuarios.id`  
46. `favoritos.producto_id` FK -> `productos.id`  
47. `favoritos.uk_usuario_producto` UNIQUE (`usuario_id`, `producto_id`)  
48. `historial_pedidos.pedido_id` FK -> `pedidos.id`  
49. `historial_pedidos.realizado_por` FK -> `usuarios.id`  
50. `notificaciones.usuario_id` FK -> `usuarios.id`  
51. `notificaciones.idx_usuario_leido` composite index (`usuario_id`, `leido`)  
52. `notificaciones.idx_tipo` index (`tipo`)  

## Core Relationship Map
- `roles` 1:N `usuarios`
- `usuarios` 1:N `direcciones`
- `usuarios` 1:1 `carrito`
- `carrito` 1:N `detalle_carrito`
- `productos` 1:N `detalle_carrito`
- `direcciones` 1:N `pedidos` (envío / recojo)
- `usuarios` 1:N `pedidos`
- `pedidos` 1:N `detalle_pedido`
- `productos` 1:N `detalle_pedido`
- `pedidos` 1:N `pagos`
- `usuarios` 1:N `valoraciones`
- `productos` 1:N `valoraciones`
- `usuarios` N:M `productos` via `favoritos`
- `pedidos` 1:N `historial_pedidos`
- `usuarios` 1:N `notificaciones`

## Normalization
- **1NF:** atomic columns; no repeating groups in transactional tables.
- **2NF:** non-key fields in detail tables depend on full key context (`detalle_carrito`, `detalle_pedido`).
- **3NF:** descriptive entities split to avoid transitive dependencies (`categorias`, `marcas`, `proveedores`, `roles`).

Notes:
- Fields like `productos.ventas`, `productos.visitas`, and monetary totals in `pedidos` are controlled denormalizations for reporting/performance.

## Import Steps
```sql
CREATE DATABASE IF NOT EXISTS marketplus_db;
USE marketplus_db;
SOURCE database/marketplus.sql;
SOURCE database/seed.sql;
SOURCE database/views.sql;
SOURCE database/procedures.sql;
```

## Checkout-related columns

### `direcciones`
| Column | Type | Notes |
|--------|------|-------|
| `tipo` | ENUM(`domicilio`, `recojo_tienda`) | Replaces legacy envio/facturacion/ambas |
| `dni_contacto` | VARCHAR(8) | Required for store pickup |

### `pedidos`
| Column | Type | Notes |
|--------|------|-------|
| `numero_pedido` | VARCHAR(50) UK | Format `PED-000001` |
| `metodo_pago` | VARCHAR(50) | `yape`, `tarjeta_credito`, `contra_entrega` |
| `tipo_comprobante` | ENUM | `boleta`, `factura` |
| `comprobante_dni` | VARCHAR(8) | Boleta |
| `comprobante_nombre` | VARCHAR(200) | Boleta — full name |
| `comprobante_ruc` | VARCHAR(11) | Factura |
| `comprobante_razon_social` | VARCHAR(255) | Factura |
| `comprobante_direccion_fiscal` | VARCHAR(255) | Factura |
| `datos_pago` | JSON | Simulated payment payload |
| `estado_pago` | ENUM | `pendiente`, `simulado_completado`, `completado`, `fallido` |
| `es_pago_simulado` | BOOLEAN | Default TRUE |

## Useful SQL Queries
```sql
-- Top 10 products by sales
SELECT id, nombre, ventas FROM productos ORDER BY ventas DESC LIMIT 10;

-- Active users by role
SELECT r.nombre AS rol, COUNT(*) AS total
FROM usuarios u
JOIN roles r ON r.id = u.role_id
WHERE u.estado = 'activo'
GROUP BY r.nombre;

-- Order totals by status
SELECT estado, COUNT(*) AS pedidos, SUM(total) AS monto
FROM pedidos
GROUP BY estado;

-- Low stock inventory
SELECT p.nombre, i.stock, i.stock_minimo
FROM inventario i
JOIN productos p ON p.id = i.producto_id
WHERE i.stock <= i.stock_minimo
ORDER BY i.stock ASC;

-- User order history
SELECT p.numero_pedido, p.estado, p.total, p.creado_en
FROM pedidos p
WHERE p.usuario_id = 2
ORDER BY p.creado_en DESC;
```
