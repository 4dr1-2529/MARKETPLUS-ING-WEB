-- =============================================
-- MARKETPLUS - VISTA: Resumen de Ventas
-- =============================================

USE marketplus_db;

CREATE OR REPLACE VIEW vw_resumen_ventas AS
SELECT
    p.numero_pedido,
    p.creado_en as fecha,
    u.nombres,
    u.apellidos,
    u.email,
    p.subtotal,
    p.descuento,
    p.igv,
    p.costo_envio,
    p.total,
    p.estado,
    p.metodo_pago,
    COUNT(dp.id) as total_items,
    GROUP_CONCAT(pr.nombre SEPARATOR ', ') as productos
FROM pedidos p
JOIN usuarios u ON p.usuario_id = u.id
JOIN detalle_pedido dp ON p.id = dp.pedido_id
JOIN productos pr ON dp.producto_id = pr.id
GROUP BY p.id
ORDER BY p.creado_en DESC;

CREATE OR REPLACE VIEW vw_stock_bajo AS
SELECT
    p.id as producto_id,
    p.nombre,
    p.sku,
    c.nombre as categoria,
    m.nombre as marca,
    i.stock,
    i.stock_minimo,
    (i.stock_minimo - i.stock) as cantidad_faltante
FROM inventario i
JOIN productos p ON i.producto_id = p.id
JOIN categorias c ON p.categoria_id = c.id
JOIN marcas m ON p.marca_id = m.id
WHERE i.stock <= i.stock_minimo
ORDER BY i.stock ASC;

CREATE OR REPLACE VIEW vw_productos_populares AS
SELECT
    p.id,
    p.nombre,
    p.slug,
    p.imagen_principal,
    p.precio,
    p.precio_oferta,
    p.ventas,
    p.visitas,
    c.nombre as categoria,
    m.nombre as marca,
    COALESCE(AVG(v.calificacion), 0) as promedio_valoracion,
    COUNT(v.id) as total_valoraciones
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
JOIN marcas m ON p.marca_id = m.id
LEFT JOIN valoraciones v ON p.id = v.producto_id
WHERE p.estado = 'activo'
GROUP BY p.id
ORDER BY p.ventas DESC
LIMIT 20;
