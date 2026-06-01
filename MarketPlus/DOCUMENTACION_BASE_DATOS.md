# Documentacion de Base de Datos - MarketPlus

## Descripcion General
La base de datos `marketplus_db` soporta una tienda online con modulos de autenticacion, catalogo, carrito, pedidos, pagos, valoraciones y administracion. El motor es MySQL 8.0 con tablas InnoDB, claves foraneas e indices para consultas frecuentes.

## Tablas Principales y Campos Clave
- `usuarios`: datos de cuenta y perfil (`id`, `role_id`, `email`, `password`, `estado`).
- `productos`: catalogo central (`id`, `categoria_id`, `marca_id`, `precio`, `sku`, `estado`).
- `inventario`: stock por producto (`producto_id`, `stock`, `stock_minimo`).
- `pedidos`: cabecera de compra (`id`, `usuario_id`, `numero_pedido`, `estado`, `total`).
- `detalle_pedido`: detalle de items (`pedido_id`, `producto_id`, `cantidad`, `precio_unitario`).
- `direcciones`: direcciones de envio/facturacion (`usuario_id`, `tipo`, `distrito`, `es_principal`).
- `pagos`: trazabilidad de pago (`pedido_id`, `metodo`, `estado`, `referencia_pago`).
- `carrito` y `detalle_carrito`: carrito activo por usuario.
- `cupones`, `favoritos`, `valoraciones`, `notificaciones`, `historial_pedidos`.

## Claves Primarias
Todas las tablas usan PK `id` autoincremental.

## Claves Foraneas Relevantes
- `usuarios.role_id -> roles.id`
- `productos.categoria_id -> categorias.id`
- `productos.marca_id -> marcas.id`
- `productos.proveedor_id -> proveedores.id`
- `inventario.producto_id -> productos.id`
- `direcciones.usuario_id -> usuarios.id`
- `carrito.usuario_id -> usuarios.id`
- `detalle_carrito.carrito_id -> carrito.id`
- `detalle_carrito.producto_id -> productos.id`
- `pedidos.usuario_id -> usuarios.id`
- `pedidos.direccion_envio_id -> direcciones.id`
- `detalle_pedido.pedido_id -> pedidos.id`
- `detalle_pedido.producto_id -> productos.id`
- `pagos.pedido_id -> pedidos.id`
- `pagos.usuario_id -> usuarios.id`
- `valoraciones.usuario_id -> usuarios.id`
- `valoraciones.producto_id -> productos.id`
- `valoraciones.pedido_id -> pedidos.id`
- `favoritos.usuario_id -> usuarios.id`
- `favoritos.producto_id -> productos.id`
- `historial_pedidos.pedido_id -> pedidos.id`
- `historial_pedidos.realizado_por -> usuarios.id`
- `notificaciones.usuario_id -> usuarios.id`

## Relaciones
- 1:N: `roles -> usuarios`, `usuarios -> pedidos`, `pedidos -> detalle_pedido`.
- 1:1: `productos -> inventario` (restriccion unica por `producto_id`).
- N:M: `usuarios <-> productos` por `favoritos` y `valoraciones`.
- Jerarquica: `categorias.padre_id -> categorias.id`.

## Normalizacion hasta 3FN
- **1FN**: atributos atomicos, sin grupos repetidos en tablas operativas.
- **2FN**: en tablas transaccionales (`detalle_carrito`, `detalle_pedido`) los atributos dependen de la clave completa.
- **3FN**: los atributos no clave dependen de la PK y no de otros no-clave (por ejemplo, datos de marca/categoria separados de `productos`).
- **Notas de diseno**: campos como `ventas`, `visitas`, `subtotal`, `total` son denormalizaciones controladas para analitica y rendimiento.

## Vistas y Procedimientos
- `views.sql`: `vw_resumen_ventas`, `vw_stock_bajo`, `vw_productos_populares`.
- `procedures.sql`: `sp_crear_pedido` para registrar pedido, detalle, inventario e historial en transaccion.

## Instrucciones para Importar la Base de Datos
1. Crear base:
   - `CREATE DATABASE IF NOT EXISTS marketplus_db;`
2. Importar estructura:
   - `source database/marketplus.sql`
3. Importar datos:
   - `source database/seed.sql`
4. Importar vistas:
   - `source database/views.sql`
5. Importar procedimientos:
   - `source database/procedures.sql`
6. Verificar:
   - `SHOW TABLES;`
   - `SELECT COUNT(*) FROM productos;`

## Observaciones para Sustentacion
- El modelo es coherente con el flujo web (catalogo -> carrito -> pedido -> pago -> seguimiento).
- Se usan FKs e indices para integridad y rendimiento.
- El esquema mantiene trazabilidad mediante `historial_pedidos` y `notificaciones`.
