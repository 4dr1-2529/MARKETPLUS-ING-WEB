-- MARKETPLUS - Catálogo: 10 celulares, 10 refrigeradoras, 10 laptops, 10 accesorios
USE marketplus_db;

SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM detalle_carrito;
DELETE FROM detalle_pedido;
DELETE FROM favoritos;
DELETE FROM valoraciones;
DELETE FROM inventario;
DELETE FROM productos;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO categorias (nombre, slug, descripcion, estado) VALUES
('Refrigeradoras', 'refrigeradoras', 'Refrigeradoras y línea blanca', 'activo')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

INSERT INTO marcas (nombre, slug, pais_origen, estado) VALUES
('LG', 'lg', 'Corea del Sur', 'activo'),
('Mabe', 'mabe', 'México', 'activo'),
('Indurama', 'indurama', 'Perú', 'activo'),
('Bosch', 'bosch', 'Alemania', 'activo')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- 10 CELULARES
INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta, descuento_porcentaje, sku, garantia_meses, estado, destacado, nuevo, imagen_principal) VALUES
(1,1,1,'Samsung Galaxy S24 Ultra 256GB','samsung-galaxy-s24-ultra-256gb','Flagship Samsung S Pen 200MP.',5499,4899,11,'SAM-S24U',12,'activo',1,1,'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop'),
(1,2,1,'iPhone 15 Pro Max 256GB','iphone-15-pro-max-256gb','iPhone titanio A17 Pro.',6999,6299,10,'APL-IP15PM',12,'activo',1,1,'https://images.unsplash.com/photo-1695048133142-1a20484d8769?w=400&h=400&fit=crop'),
(1,3,2,'Xiaomi Redmi Note 13 Pro 256GB','xiaomi-redmi-note-13-pro-256gb','Gama media 200MP.',1399,1199,14,'XIA-RN13P',12,'activo',1,1,'https://images.unsplash.com/photo-1598327105666-5b8174ea5773?w=400&h=400&fit=crop'),
(1,1,1,'Samsung Galaxy A54 5G 128GB','samsung-galaxy-a54-5g-128gb','Mid-range IP67.',1599,1399,13,'SAM-A54',12,'activo',0,0,'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'),
(1,12,3,'Motorola Edge 40 Pro 256GB','motorola-edge-40-pro-256gb','165Hz carga 125W.',3499,2999,14,'MOT-E40P',12,'activo',0,1,'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop'),
(1,4,2,'Huawei P60 Pro 256GB','huawei-p60-pro-256gb','Cámara XMAGE premium.',4299,3799,12,'HUA-P60P',12,'activo',0,1,'https://images.unsplash.com/photo-1565849907041-7aa0a27340ae?w=400&h=400&fit=crop'),
(1,1,1,'Samsung Galaxy S23 FE 128GB','samsung-galaxy-s23-fe-128gb','Flagship accesible.',2799,2499,11,'SAM-S23FE',12,'activo',0,0,'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop'),
(1,2,1,'iPhone 14 128GB','iphone-14-128gb','iPhone confiable.',4499,3999,11,'APL-IP14',12,'activo',0,0,'https://images.unsplash.com/photo-1678652197831-9baf04bfce19?w=400&h=400&fit=crop'),
(1,3,2,'Xiaomi 13T Pro 256GB','xiaomi-13t-pro-256gb','Leica 120W.',2999,2699,10,'XIA-13TP',12,'activo',0,1,'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop'),
(1,12,3,'Motorola Moto G84 256GB','motorola-moto-g84-256gb','pOLED gran batería.',1299,1099,15,'MOT-G84',12,'activo',0,1,'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop');

-- 10 REFRIGERADORAS (categoria slug refrigeradoras)
INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta, descuento_porcentaje, sku, garantia_meses, estado, destacado, nuevo, imagen_principal)
SELECT c.id, m.id, 1, v.nombre, v.slug, v.descripcion, v.precio, v.oferta, v.dcto, v.sku, 24, 'activo', v.dest, 1, v.img
FROM categorias c
JOIN (SELECT 'refrigeradora-samsung-rt38-400l' slug, 'Samsung' marca, 'Refrigeradora Samsung RT38 400L No Frost' nombre, 'No Frost 400L.' descripcion, 1899 precio, 1699 oferta, 11 dcto, 'REF-SAM-RT38' sku, 1 dest, 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop' img
UNION ALL SELECT 'refrigeradora-lg-door-in-door-430l','LG','Refrigeradora LG Door-in-Door 430L','Door-in-Door.',2299,1999,13,'REF-LG-DID',1,'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop'
UNION ALL SELECT 'refrigeradora-mabe-rms400-14pc','Mabe','Refrigeradora Mabe RMS400 14 pies','Eficiente.',1599,1399,13,'REF-MABE-400',0,'https://images.unsplash.com/photo-1626804475297-41608ea09eca?w=400&h=400&fit=crop'
UNION ALL SELECT 'refrigeradora-indurama-fr-450','Indurama','Refrigeradora Indurama FR-450','Marca peruana.',1499,1299,13,'REF-IND-450',0,'https://images.unsplash.com/photo-1631545259747-c1e39a88a59a?w=400&h=400&fit=crop'
UNION ALL SELECT 'refrigeradora-samsung-french-door-530l','Samsung','Refrigeradora Samsung French Door 530L','French door.',3499,3199,9,'REF-SAM-FD',1,'https://images.unsplash.com/photo-1631889992176-688e8ba314e3?w=400&h=400&fit=crop'
UNION ALL SELECT 'refrigeradora-lg-linear-420l','LG','Refrigeradora LG Linear 420L','Linear Cooling.',2199,1899,14,'REF-LG-LIN',0,'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop'
UNION ALL SELECT 'refrigeradora-bosch-serie-4-360l','Bosch','Refrigeradora Bosch Serie 4 360L','Calidad alemana.',2799,2499,11,'REF-BOS-S4',0,'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop'
UNION ALL SELECT 'refrigeradora-mabe-top-mount-320l','Mabe','Refrigeradora Mabe Top Mount 320L','Compacta.',1299,1149,12,'REF-MABE-320',0,'https://images.unsplash.com/photo-1626804475297-41608ea09eca?w=400&h=400&fit=crop'
UNION ALL SELECT 'refrigeradora-samsung-side-by-side-600l','Samsung','Refrigeradora Samsung Side by Side 600L','Gran capacidad.',3999,3599,10,'REF-SAM-SBS',1,'https://images.unsplash.com/photo-1631889992176-688e8ba314e3?w=400&h=400&fit=crop'
UNION ALL SELECT 'refrigeradora-lg-combi-380l','LG','Refrigeradora LG Combi 380L','Freezer inferior.',1999,1749,13,'REF-LG-COM',0,'https://images.unsplash.com/photo-1631545259747-c1e39a88a59a?w=400&h=400&fit=crop'
) v ON m.nombre = v.marca
WHERE c.slug = 'refrigeradoras';

-- 10 LAPTOPS
INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta, descuento_porcentaje, sku, garantia_meses, estado, destacado, nuevo, imagen_principal) VALUES
(2,5,1,'Lenovo Legion 5 Pro RTX 4060','lenovo-legion-5-pro-rtx4060','Gaming RTX 4060.',5299,4799,9,'LEN-L5P',24,'activo',1,1,'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'),
(2,6,1,'ASUS ROG Strix G16 RTX 4070','asus-rog-strix-g16-rtx4070','Gaming RTX 4070.',7499,6899,8,'ASU-ROG16',24,'activo',1,1,'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop'),
(2,2,2,'MacBook Air M3 15" 256GB','macbook-air-m3-15-256gb','Apple M3 ultraligera.',5999,5499,8,'APL-MBA-M3',12,'activo',1,1,'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'),
(2,7,3,'HP Pavilion 15 Ryzen 5','hp-pavilion-15-ryzen5','Estudiantes.',2499,2199,12,'HP-PAV15',12,'activo',0,0,'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop'),
(2,8,1,'Dell Inspiron 14 Core i7','dell-inspiron-14-corei7','Profesional.',3299,2899,12,'DEL-INS14',12,'activo',0,1,'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop'),
(2,5,1,'Lenovo IdeaPad Slim 5','lenovo-ideapad-slim-5','Productividad.',2799,2499,11,'LEN-IDP5',12,'activo',0,1,'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop'),
(2,6,1,'ASUS Vivobook 15 OLED','asus-vivobook-15-oled','Pantalla OLED.',3199,2799,13,'ASU-VIV15',12,'activo',0,0,'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'),
(2,7,3,'HP Victus 16 RTX 4050','hp-victus-16-rtx4050','Gaming accesible.',3899,3499,10,'HP-VIC16',24,'activo',0,1,'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop'),
(2,2,2,'MacBook Pro 14" M3','macbook-pro-14-m3','Para creativos.',8999,8299,8,'APL-MBP14',12,'activo',1,0,'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'),
(2,8,1,'Dell G15 Gaming 5530','dell-g15-gaming-5530','Gaming Dell G.',4299,3899,9,'DEL-G15',24,'activo',0,0,'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop');

-- 10 ACCESORIOS (compatibles con celulares)
INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta, descuento_porcentaje, sku, garantia_meses, estado, destacado, nuevo, imagen_principal) VALUES
(6,1,1,'Cargador Samsung 45W USB-C','cargador-samsung-45w-usbc','Para Galaxy S24/S23.',149,119,20,'ACC-SAM-CHG',6,'activo',0,0,'https://images.unsplash.com/photo-1591290619762-d2aaddfdbaba?w=400&h=400&fit=crop'),
(6,1,1,'Funda Samsung Galaxy S24 Ultra','funda-samsung-galaxy-s24-ultra','Silicona S24 Ultra.',89,69,22,'ACC-SAM-FUN',6,'activo',0,0,'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop'),
(6,2,2,'Cargador Apple 20W USB-C','cargador-apple-20w-usbc','Para iPhone/iPad.',129,99,23,'ACC-APL-CHG',12,'activo',0,0,'https://images.unsplash.com/photo-1583394838336-acd977bcfba7?w=400&h=400&fit=crop'),
(6,2,2,'Funda iPhone 15 Pro Silicona','funda-iphone-15-pro-silicone','MagSafe compatible.',99,79,20,'ACC-APL-FUN',6,'activo',0,1,'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop'),
(6,3,3,'Cable USB-C 2m 100W','cable-usbc-2m-100w','Carga rápida universal.',49,39,20,'ACC-CBL-2M',6,'activo',0,0,'https://images.unsplash.com/photo-1625948515291-696698f0c35f?w=400&h=400&fit=crop'),
(6,11,3,'Mouse Logitech MX Master 3S','mouse-logitech-mx-master-3s','Ergonómico.',449,379,16,'ACC-LOG-MX',12,'activo',1,0,'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'),
(6,11,3,'Teclado Logitech MX Keys S','teclado-logitech-mx-keys-s','Retroiluminado.',499,429,14,'ACC-LOG-KEY',12,'activo',1,0,'https://images.unsplash.com/photo-1587829741301-dc798b83ef98?w=400&h=400&fit=crop'),
(6,10,3,'Audífonos JBL Tune 520BT','auriculares-jbl-tune-520bt','Bluetooth 57h.',199,169,15,'ACC-JBL-520',12,'activo',0,0,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'),
(6,3,3,'Power Bank Xiaomi 20000mAh','powerbank-xiaomi-20000mah','2 puertos.',149,119,20,'ACC-XIA-PB',12,'activo',0,1,'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c8?w=400&h=400&fit=crop'),
(6,1,1,'Protector Pantalla Samsung x2','protector-pantalla-samsung-pack-2','Cristal templado.',59,45,24,'ACC-SAM-PROT',3,'activo',0,0,'https://images.unsplash.com/photo-1616344564071-4376ea7936e3?w=400&h=400&fit=crop');

INSERT INTO inventario (producto_id, stock, stock_minimo, stock_maximo, ubicacion)
SELECT p.id, 50, 5, 200, CONCAT('Almacén-', c.slug)
FROM productos p
JOIN categorias c ON p.categoria_id = c.id;

SELECT COUNT(*) AS total_productos FROM productos;
SELECT c.nombre, COUNT(*) AS cantidad FROM productos p JOIN categorias c ON p.categoria_id = c.id GROUP BY c.nombre;
