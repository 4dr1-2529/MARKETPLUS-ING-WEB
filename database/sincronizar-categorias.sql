-- Sincronizar categorías: solo activas con productos, auriculares corregidos
USE marketplus_db;

-- Renombrar Audífonos -> Auriculares (ortografía clara)
UPDATE categorias
SET nombre = 'Auriculares y Audio',
    slug = 'auriculares-audio',
    descripcion = 'Auriculares inalámbricos, earbuds y audio portátil'
WHERE slug IN ('audifonos-audio', 'auriculares-audio');

-- Desactivar categorías sin productos activos
UPDATE categorias c
SET c.estado = 'inactivo'
WHERE c.estado = 'activo'
  AND NOT EXISTS (
    SELECT 1 FROM productos p WHERE p.categoria_id = c.id AND p.estado = 'activo'
  );

-- Mover JBL de accesorios a auriculares si existe
UPDATE productos p
JOIN categorias ca ON ca.slug = 'accesorios'
JOIN categorias cu ON cu.slug = 'auriculares-audio'
SET p.categoria_id = cu.id
WHERE p.slug = 'auriculares-jbl-tune-520bt' AND p.categoria_id = ca.id;

-- Insertar auriculares si la categoría tiene menos de 10 productos
INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta, descuento_porcentaje, sku, garantia_meses, estado, destacado, nuevo, imagen_principal)
SELECT cu.id, m.id, 1, v.nombre, v.slug, v.descripcion, v.precio, v.oferta, v.dcto, v.sku, 12, 'activo', v.dest, 1, ''
FROM categorias cu
CROSS JOIN (
    SELECT 'Apple' marca, 'AirPods Pro 2 USB-C' nombre, 'airpods-pro-2-usbc' slug, 'Cancelación activa de ruido.' descripcion, 1199 precio, 999 oferta, 17 dcto, 'AUR-APL-AP2' sku, 1 dest
    UNION ALL SELECT 'Samsung','Samsung Galaxy Buds3 Pro','samsung-galaxy-buds3-pro','Audio Hi-Fi 24bit.',899,799,11,'AUR-SAM-GB3',1
    UNION ALL SELECT 'JBL','JBL Tune 770NC Bluetooth','jbl-tune-770nc-bluetooth','Over-ear 44h batería.',349,299,14,'AUR-JBL-770',0
    UNION ALL SELECT 'Sony','Sony WH-1000XM5','sony-wh-1000xm5','Referencia en cancelación de ruido.',1899,1699,11,'AUR-SON-XM5',1
    UNION ALL SELECT 'JBL','JBL Wave Beam 2','jbl-wave-beam-2','Earbuds resistentes al agua.',249,199,20,'AUR-JBL-WB2',0
    UNION ALL SELECT 'Apple','AirPods 4','airpods-4','Sonido espacial y USB-C.',899,799,11,'AUR-APL-A4',0
    UNION ALL SELECT 'Samsung','Samsung Galaxy Buds FE','samsung-galaxy-buds-fe','Calidad-precio Samsung.',399,349,13,'AUR-SAM-BFE',0
    UNION ALL SELECT 'Xiaomi','Xiaomi Redmi Buds 5 Pro','xiaomi-redmi-buds-5-pro','LDAC y ANC.',299,249,17,'AUR-XIA-RB5',0
    UNION ALL SELECT 'Sony','Sony LinkBuds S','sony-linkbuds-s','Compactos con ANC.',699,599,14,'AUR-SON-LBS',0
) v
JOIN marcas m ON m.nombre = v.marca
WHERE cu.slug = 'auriculares-audio'
  AND NOT EXISTS (SELECT 1 FROM productos p WHERE p.slug = v.slug);

-- Activar categorías que sí tienen productos
UPDATE categorias c
SET c.estado = 'activo'
WHERE EXISTS (
    SELECT 1 FROM productos p WHERE p.categoria_id = c.id AND p.estado = 'activo'
);

-- Inventario para productos nuevos sin stock
INSERT INTO inventario (producto_id, stock, stock_minimo, stock_maximo, ubicacion)
SELECT p.id, 40, 5, 150, 'Almacén-auriculares'
FROM productos p
JOIN categorias c ON p.categoria_id = c.id AND c.slug = 'auriculares-audio'
WHERE NOT EXISTS (SELECT 1 FROM inventario i WHERE i.producto_id = p.id);

-- Reemplazar accesorio faltante si movimos JBL
INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta, descuento_porcentaje, sku, garantia_meses, estado, destacado, nuevo, imagen_principal)
SELECT ca.id, 3, 3, 'Adaptador USB-C a HDMI', 'adaptador-usbc-hdmi', '4K para laptop y celular.', 79, 59, 25, 'ACC-USB-HDMI', 6, 'activo', 0, 0, ''
FROM categorias ca
WHERE ca.slug = 'accesorios'
  AND (SELECT COUNT(*) FROM productos p WHERE p.categoria_id = ca.id AND p.estado = 'activo') < 10
  AND NOT EXISTS (SELECT 1 FROM productos WHERE slug = 'adaptador-usbc-hdmi');

SELECT c.nombre, c.slug, c.estado, COUNT(p.id) AS productos
FROM categorias c
LEFT JOIN productos p ON p.categoria_id = c.id AND p.estado = 'activo'
GROUP BY c.id, c.nombre, c.slug, c.estado
ORDER BY productos DESC;
