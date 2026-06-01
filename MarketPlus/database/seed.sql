-- =============================================
-- MARKETPLUS - SEED DATA (Datos de Ejemplo)
-- =============================================

USE marketplus_db;

-- =============================================
-- ROLES
-- =============================================
INSERT INTO roles (nombre, descripcion) VALUES
('admin', 'Administrador del sistema con acceso total'),
('usuario', 'Usuario cliente de la tienda');

-- =============================================
-- USUARIOS (password: 12345678 hash bcrypt)
-- =============================================
INSERT INTO usuarios (role_id, username, nombres, apellidos, email, password, telefono, dni, estado) VALUES
(1, 'admin.market', 'Admin', 'MarketPlus', 'admin@marketplus.pe', '$2b$10$X7KJlH5qF3vN2mP8rT6wYuE9sL1cD4bA6fG8hJ0kM2nO5pQ7rS9tU', '999888777', '12345678', 'activo'),
(2, 'carlos.rp', 'Carlos', 'Rodriguez Perez', 'carlos.rodriguez@gmail.com', '$2b$10$X7KJlH5qF3vN2mP8rT6wYuE9sL1cD4bA6fG8hJ0kM2nO5pQ7rS9tU', '987654321', '87654321', 'activo'),
(2, 'maria.lopez', 'Maria', 'Lopez Garcia', 'maria.lopez@hotmail.com', '$2b$10$X7KJlH5qF3vN2mP8rT6wYuE9sL1cD4bA6fG8hJ0kM2nO5pQ7rS9tU', '912345678', '76543210', 'activo'),
(2, 'jose.mt', 'Jose', 'Martinez Torres', 'jose.martinez@yahoo.com', '$2b$10$X7KJlH5qF3vN2mP8rT6wYuE9sL1cD4bA6fG8hJ0kM2nO5pQ7rS9tU', '945678123', '65432109', 'activo'),
(2, 'ana.sr', 'Ana', 'Sanchez Ruiz', 'ana.sanchez@gmail.com', '$2b$10$X7KJlH5qF3vN2mP8rT6wYuE9sL1cD4bA6fG8hJ0kM2nO5pQ7rS9tU', '956781234', '54321098', 'activo');

-- =============================================
-- CATEGORIAS
-- =============================================
INSERT INTO categorias (nombre, slug, descripcion, estado) VALUES
('Celulares y Smartphones', 'celulares-smartphones', 'Teléfonos inteligentes de todas las marcas', 'activo'),
('Laptops y Computadoras', 'laptops-computadoras', 'Laptops para trabajo, gaming y uso diario', 'activo'),
('Tablets', 'tablets', 'Tablets para entretenimiento y productividad', 'activo'),
('Audífonos y Audio', 'audifonos-audio', 'Audífonos, parlantes y accesorios de audio', 'activo'),
('Smartwatch y Wearables', 'smartwatch-wearables', 'Relojes inteligentes y bandas deportivas', 'activo'),
('Accesorios', 'accesorios', 'Cargadores, fundas, cables y más', 'activo'),
('Gaming', 'gaming', 'Consolas, periféricos y accesorios gaming', 'activo'),
('Televisores', 'televisores', 'Smart TVs y televisores de todas las marcas', 'activo');

-- =============================================
-- MARCAS
-- =============================================
INSERT INTO marcas (nombre, slug, pais_origen, estado) VALUES
('Samsung', 'samsung', 'Corea del Sur', 'activo'),
('Apple', 'apple', 'Estados Unidos', 'activo'),
('Xiaomi', 'xiaomi', 'China', 'activo'),
('Huawei', 'huawei', 'China', 'activo'),
('Lenovo', 'lenovo', 'China', 'activo'),
('ASUS', 'asus', 'Taiwán', 'activo'),
('HP', 'hp', 'Estados Unidos', 'activo'),
('Dell', 'dell', 'Estados Unidos', 'activo'),
('Sony', 'sony', 'Japón', 'activo'),
('JBL', 'jbl', 'Estados Unidos', 'activo'),
('Logitech', 'logitech', 'Suiza', 'activo'),
('Motorola', 'motorola', 'Estados Unidos', 'activo');

-- =============================================
-- PROVEEDORES
-- =============================================
INSERT INTO proveedores (nombre_empresa, ruc, contacto_nombre, contacto_email, contacto_telefono, direccion, estado) VALUES
('Tech Distribuciones SAC', '20601234567', 'Roberto Diaz', 'roberto@techdist.pe', '999111222', 'Av. Giraldez 1234, Huancayo', 'activo'),
('Importaciones Global EIRL', '20609876543', 'Patricia Flores', 'patricia@importglobal.pe', '999333444', 'Jr. Real 567, Huancayo', 'activo'),
('Digital Store Peru SAC', '20605556667', 'Miguel Vargas', 'miguel@digitalstore.pe', '999555666', 'Av. Ferrocarril 890, Huancayo', 'activo');

-- =============================================
-- PRODUCTOS (Precios en Soles Peruanos S/)
-- =============================================
INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta, descuento_porcentaje, sku, garantia_meses, estado, destacado, nuevo, imagen_principal, visitas, ventas) VALUES

-- CELULARES
(1, 1, 1, 'Samsung Galaxy S24 Ultra 256GB', 'samsung-galaxy-s24-ultra-256gb', 'El smartphone más potente de Samsung con chip Snapdragon 8 Gen 3, cámara de 200MP, pantalla Dynamic AMOLED 2X de 6.8 pulgadas, S Pen integrado y batería de 5000mAh.', 5499.00, 4899.00, 11, 'SAM-S24U-256', 12, 'activo', TRUE, TRUE, 'samsung-s24-ultra.jpg', 1520, 89),
(1, 2, 1, 'iPhone 15 Pro Max 256GB', 'iphone-15-pro-max-256gb', 'El iPhone más avanzado con chip A17 Pro, cámara de 48MP con zoom óptico 5x, pantalla Super Retina XDR de 6.7 pulgadas, titanio natural y USB-C.', 6999.00, 6299.00, 10, 'APL-IP15PM-256', 12, 'activo', TRUE, TRUE, 'iphone-15-pro-max.jpg', 2340, 156),
(1, 3, 2, 'Xiaomi Redmi Note 13 Pro 256GB', 'xiaomi-redmi-note-13-pro-256gb', 'Smartphone de gama media con cámara de 200MP, pantalla AMOLED de 6.67 pulgadas, procesador MediaTek Helio G99 Ultra y batería de 5100mAh.', 1399.00, 1199.00, 14, 'XIA-RN13P-256', 12, 'activo', TRUE, TRUE, 'redmi-note-13-pro.jpg', 980, 234),
(1, 1, 1, 'Samsung Galaxy A54 5G 128GB', 'samsung-galaxy-a54-5g-128gb', 'Smartphone de gama media con pantalla Super AMOLED de 6.4 pulgadas, cámara triple de 50MP, resistencia al agua IP67 y batería de 5000mAh.', 1599.00, 1399.00, 13, 'SAM-A54-128', 12, 'activo', FALSE, FALSE, 'samsung-a54.jpg', 760, 145),
(1, 12, 3, 'Motorola Edge 40 Pro 256GB', 'motorola-edge-40-pro-256gb', 'Smartphone premium con Snapdragon 8 Gen 2, pantalla pOLED de 6.67 pulgadas a 165Hz, cámara de 50MP con OIS y carga rápida de 125W.', 3499.00, 2999.00, 14, 'MOT-E40P-256', 12, 'activo', FALSE, TRUE, 'motorola-edge-40.jpg', 430, 67),

-- LAPTOPS
(2, 5, 1, 'Lenovo Legion 5 Pro RTX 4060', 'lenovo-legion-5-pro-rtx4060', 'Laptop gaming con procesador AMD Ryzen 7 7745HX, NVIDIA RTX 4060 8GB, 16GB RAM DDR5, SSD 512GB, pantalla 16" QHD 165Hz.', 5299.00, 4799.00, 9, 'LEN-L5P-4060', 24, 'activo', TRUE, TRUE, 'lenovo-legion-5.jpg', 890, 45),
(2, 6, 1, 'ASUS ROG Strix G16 RTX 4070', 'asus-rog-strix-g16-rtx4070', 'Laptop gaming de alto rendimiento con Intel Core i9-13980HX, NVIDIA RTX 4070 8GB, 32GB RAM DDR5, SSD 1TB, pantalla 16" QHD 240Hz.', 7499.00, 6899.00, 8, 'ASU-ROG16-4070', 24, 'activo', TRUE, TRUE, 'asus-rog-strix.jpg', 670, 32),
(2, 2, 2, 'MacBook Air M3 15" 256GB', 'macbook-air-m3-15-256gb', 'Laptop ultradelgada con chip Apple M3, pantalla Liquid Retina de 15.3 pulgadas, 8GB RAM, SSD 256GB, hasta 18 horas de batería.', 5999.00, 5499.00, 8, 'APL-MBA-M3-15', 12, 'activo', TRUE, TRUE, 'macbook-air-m3.jpg', 1200, 78),
(2, 7, 3, 'HP Pavilion 15 Ryzen 5', 'hp-pavilion-15-ryzen5', 'Laptop para uso diario con AMD Ryzen 5 7530U, 8GB RAM, SSD 512GB, pantalla Full HD de 15.6 pulgadas, ideal para estudiantes.', 2499.00, 2199.00, 12, 'HP-PAV15-R5', 12, 'activo', FALSE, FALSE, 'hp-pavilion-15.jpg', 560, 123),
(2, 8, 1, 'Dell Inspiron 14 Core i7', 'dell-inspiron-14-corei7', 'Laptop profesional con Intel Core i7-1355U, 16GB RAM, SSD 512GB, pantalla Full HD de 14 pulgadas, diseño elegante y ligero.', 3299.00, 2899.00, 12, 'DEL-INS14-I7', 12, 'activo', FALSE, TRUE, 'dell-inspiron-14.jpg', 445, 56),

-- TABLETS
(3, 2, 2, 'iPad Air M2 11" 128GB WiFi', 'ipad-air-m2-11-128gb', 'Tablet potente con chip M2, pantalla Liquid Retina de 11 pulgadas, compatible con Apple Pencil Pro y Magic Keyboard.', 2999.00, 2699.00, 10, 'APL-IA-M2-11', 12, 'activo', TRUE, TRUE, 'ipad-air-m2.jpg', 780, 43),
(3, 1, 1, 'Samsung Galaxy Tab S9 FE 128GB', 'samsung-galaxy-tab-s9-fe-128gb', 'Tablet con pantalla TFT de 10.9 pulgadas, procesador Exynos 1380, S Pen incluido, batería de 8000mAh, resistente al agua IP68.', 1899.00, 1699.00, 11, 'SAM-TS9FE-128', 12, 'activo', FALSE, TRUE, 'galaxy-tab-s9.jpg', 520, 67),

-- AUDIFONOS
(4, 2, 2, 'AirPods Pro 2da Generación USB-C', 'airpods-pro-2-usbc', 'Audífonos inalámbricos con cancelación activa de ruido adaptativa, audio espacial personalizado, hasta 6 horas de reproducción.', 1199.00, 999.00, 17, 'APL-APP2-USBC', 12, 'activo', TRUE, FALSE, 'airpods-pro-2.jpg', 1890, 234),
(4, 1, 1, 'Samsung Galaxy Buds3 Pro', 'samsung-galaxy-buds3-pro', 'Audífonos premium con cancelación de ruido inteligente, audio Hi-Fi 24bit, 3 micrófonos por auricular, hasta 7 horas de batería.', 899.00, 799.00, 11, 'SAM-GB3P', 12, 'activo', TRUE, TRUE, 'galaxy-buds3-pro.jpg', 670, 89),
(4, 10, 3, 'JBL Tune 770NC Bluetooth', 'jbl-tune-770nc-bluetooth', 'Audífonos over-ear con cancelación de ruido adaptativa, driver de 40mm, hasta 44 horas de batería, carga rápida.', 349.00, 299.00, 14, 'JBL-T770NC', 12, 'activo', FALSE, FALSE, 'jbl-tune-770.jpg', 430, 156),

-- SMARTWATCH
(5, 1, 1, 'Samsung Galaxy Watch 6 Classic 47mm', 'samsung-galaxy-watch-6-classic-47mm', 'Smartwatch premium con bisel giratorio, pantalla Super AMOLED de 1.5 pulgadas, sensor BioActive, GPS, resistente al agua 5ATM.', 1799.00, 1499.00, 17, 'SAM-GW6C-47', 12, 'activo', TRUE, TRUE, 'galaxy-watch-6.jpg', 560, 45),
(5, 2, 2, 'Apple Watch Series 9 45mm GPS', 'apple-watch-series-9-45mm', 'Smartwatch con chip S9, pantalla Always-On, sensor de temperatura, detección de accidentes, doble toque, hasta 18 horas de batería.', 2199.00, 1899.00, 14, 'APL-AWS9-45', 12, 'activo', TRUE, FALSE, 'apple-watch-s9.jpg', 890, 67),
(5, 3, 3, 'Xiaomi Smart Band 8 Pro', 'xiaomi-smart-band-8-pro', 'Banda inteligente con pantalla AMOLED de 1.64 pulgadas, GPS integrado, monitoreo de sueño y SpO2, 14 días de batería.', 249.00, 199.00, 20, 'XIA-SB8P', 12, 'activo', FALSE, TRUE, 'mi-band-8-pro.jpg', 1200, 345),

-- ACCESORIOS
(6, 1, 1, 'Cargador Samsung Super Fast 45W USB-C', 'cargador-samsung-45w-usbc', 'Cargador de pared con carga súper rápida de 45W, compatible con dispositivos Samsung Galaxy, puerto USB-C.', 149.00, 119.00, 20, 'SAM-CHG-45W', 6, 'activo', FALSE, FALSE, 'samsung-charger-45w.jpg', 340, 234),
(6, 11, 3, 'Mouse Logitech MX Master 3S', 'mouse-logitech-mx-master-3s', 'Mouse inalámbrico ergonómico premium, sensor 8000 DPI, clics silenciosos, hasta 70 días de batería, USB-C.', 449.00, 379.00, 16, 'LOG-MXM3S', 12, 'activo', TRUE, FALSE, 'mx-master-3s.jpg', 560, 123),
(6, 11, 3, 'Teclado Logitech MX Keys S', 'teclado-logitech-mx-keys-s', 'Teclado inalámbrico premium con retroiluminación inteligente, teclas de perfil esférico, hasta 10 días de batería.', 499.00, 429.00, 14, 'LOG-MXKS', 12, 'activo', TRUE, FALSE, 'mx-keys-s.jpg', 340, 89),

-- GAMING
(7, 6, 1, 'Monitor ASUS ROG Swift 27" 165Hz', 'monitor-asus-rog-swift-27-165hz', 'Monitor gaming IPS de 27 pulgadas, resolución QHD 2560x1440, 165Hz, 1ms, G-Sync Compatible, HDR400.', 1899.00, 1599.00, 16, 'ASU-ROG27-165', 36, 'activo', TRUE, TRUE, 'asus-rog-monitor.jpg', 450, 34),
(7, 11, 3, 'Teclado Mecánico Logitech G Pro X', 'teclado-mecanico-logitech-g-pro-x', 'Teclado mecánico gaming compacto TKL, switches intercambiables, retroiluminación RGB LIGHTSYNC, diseño compacto.', 549.00, 479.00, 13, 'LOG-GPROX', 24, 'activo', FALSE, FALSE, 'logitech-gprox.jpg', 380, 67),

-- TELEVISORES
(8, 1, 1, 'Samsung Smart TV 55" 4K Crystal UHD', 'samsung-smart-tv-55-4k-crystal', 'Smart TV de 55 pulgadas con resolución 4K UHD, procesador Crystal 4K, HDR, Tizen OS, diseño AirSlim.', 2499.00, 2199.00, 12, 'SAM-TV55-4K', 24, 'activo', TRUE, TRUE, 'samsung-tv-55.jpg', 670, 56),
(8, 9, 2, 'Sony Bravia 50" 4K Google TV', 'sony-bravia-50-4k-google-tv', 'Smart TV de 50 pulgadas con procesador X1, 4K HDR, Google TV, Dolby Vision y Atmos, panel Triluminos Pro.', 2899.00, 2599.00, 10, 'SON-BR50-4K', 24, 'activo', TRUE, TRUE, 'sony-bravia-50.jpg', 430, 34),
(1, 1, 1, 'Samsung Galaxy Z Flip5 256GB', 'samsung-galaxy-z-flip5-256gb', 'Smartphone plegable compacto con pantalla AMOLED y gran rendimiento.', 4199.00, 3799.00, 10, 'SAM-ZFLIP5-256', 12, 'activo', TRUE, TRUE, 'samsung-zflip5.jpg', 480, 42),
(2, 8, 1, 'Dell XPS 13 Plus OLED', 'dell-xps-13-plus-oled', 'Laptop ultraligera premium con pantalla OLED y procesador Intel Core i7.', 5699.00, 5299.00, 7, 'DEL-XPS13P-OLED', 24, 'activo', TRUE, TRUE, 'dell-xps13-plus.jpg', 310, 27),
(3, 3, 2, 'Xiaomi Pad 6 256GB', 'xiaomi-pad-6-256gb', 'Tablet de alto rendimiento con pantalla 144Hz y gran batería.', 1799.00, 1599.00, 11, 'XIA-PAD6-256', 12, 'activo', TRUE, TRUE, 'xiaomi-pad6.jpg', 390, 34),
(7, 11, 3, 'Logitech G Pro X Superlight 2', 'logitech-g-pro-x-superlight-2', 'Mouse gaming ultraligero para eSports, sensor Hero 2.', 649.00, 579.00, 11, 'LOG-GPXSL2', 12, 'activo', TRUE, TRUE, 'logitech-gpro-superlight2.jpg', 260, 51),
(8, 1, 1, 'Samsung Smart TV 65" QLED 4K', 'samsung-smart-tv-65-qled-4k', 'QLED 4K de 65 pulgadas con HDR10+ y gran brillo.', 3799.00, 3399.00, 11, 'SAM-TV65-QLED4K', 24, 'activo', TRUE, TRUE, 'samsung-tv-65-qled.jpg', 220, 18);

-- =============================================
-- INVENTARIO
-- =============================================
INSERT INTO inventario (producto_id, stock, stock_minimo, stock_maximo, ubicacion) VALUES
(1, 45, 5, 100, 'Almacén A1-Estante 3'),
(2, 32, 5, 80, 'Almacén A1-Estante 1'),
(3, 120, 10, 300, 'Almacén A2-Estante 5'),
(4, 67, 5, 150, 'Almacén A2-Estante 2'),
(5, 28, 5, 60, 'Almacén A1-Estante 4'),
(6, 15, 3, 40, 'Almacén B1-Estante 1'),
(7, 10, 3, 30, 'Almacén B1-Estante 2'),
(8, 22, 5, 50, 'Almacén B1-Estante 3'),
(9, 55, 10, 150, 'Almacén B2-Estante 1'),
(10, 34, 5, 80, 'Almacén B2-Estante 2'),
(11, 40, 5, 100, 'Almacén C1-Estante 1'),
(12, 50, 5, 120, 'Almacén C1-Estante 2'),
(13, 85, 10, 200, 'Almacén D1-Estante 1'),
(14, 60, 10, 150, 'Almacén D1-Estante 2'),
(15, 45, 5, 100, 'Almacén D2-Estante 1'),
(16, 100, 10, 300, 'Almacén E1-Estante 1'),
(17, 200, 20, 500, 'Almacén E1-Estante 2'),
(18, 35, 5, 80, 'Almacén E2-Estante 1'),
(19, 25, 5, 60, 'Almacén E2-Estante 2'),
(20, 70, 10, 200, 'Almacén F1-Estante 1'),
(21, 40, 5, 100, 'Almacén F1-Estante 2'),
(22, 55, 5, 120, 'Almacén F2-Estante 1'),
(23, 30, 5, 80, 'Almacén F2-Estante 2'),
(24, 18, 3, 50, 'Almacén G1-Estante 1'),
(25, 25, 5, 60, 'Almacén G1-Estante 2'),
(26, 20, 4, 60, 'Almacén G2-Estante 1'),
(27, 12, 3, 40, 'Almacén G2-Estante 2'),
(28, 28, 5, 80, 'Almacén H1-Estante 1'),
(29, 35, 8, 120, 'Almacén H1-Estante 2'),
(30, 14, 4, 50, 'Almacén H2-Estante 1');

-- =============================================
-- DIRECCIONES
-- =============================================
INSERT INTO direcciones (usuario_id, tipo, destinatario, direccion_linea1, departamento, provincia, distrito, codigo_postal, telefono, dni_contacto, es_principal) VALUES
(2, 'domicilio', 'Carlos Rodriguez', 'Av. Giraldez 1234, Depto 501', 'Junin', 'Huancayo', 'El Tambo', '12006', '987654321', NULL, TRUE),
(2, 'recojo_tienda', 'Carlos Rodriguez', 'Recojo en tienda MarketPlus - Av. Junin 1234, Huancayo', 'Junin', 'Huancayo', 'Huancayo', '12001', '987654321', '87654321', FALSE),
(3, 'domicilio', 'Maria Lopez', 'Calle Los Olivos 890', 'Junin', 'Huancayo', 'Chilca', '12004', '912345678', NULL, TRUE),
(4, 'domicilio', 'Jose Martinez', 'Av. Ferrocarril Este 2345', 'Junin', 'Huancayo', 'Pilcomayo', '12007', '945678123', NULL, TRUE),
(5, 'domicilio', 'Ana Sanchez', 'Av. Huancavelica 1567, Urb. Santa Beatriz', 'Junin', 'Huancayo', 'Sapallanga', '12009', '956781234', NULL, TRUE);

-- =============================================
-- CUPONES
-- =============================================
INSERT INTO cupones (codigo, descripcion, tipo, valor, minimo_compra, maximo_descuento, usos_maximos, fecha_inicio, fecha_fin, estado) VALUES
('TECH2026', 'Descuento de bienvenida para nuevos usuarios', 'porcentaje', 10.00, 200.00, 100.00, 500, '2026-01-01', '2026-12-31', 'activo'),
('GAMING15', 'Descuento especial en productos gaming', 'porcentaje', 15.00, 500.00, 200.00, 200, '2026-03-01', '2026-06-30', 'activo'),
('ENVIO50', 'Descuento fijo en envío', 'fijo', 5.00, 100.00, NULL, 1000, '2026-01-01', '2026-12-31', 'activo'),
('SAMSUNG20', 'Descuento en productos Samsung', 'porcentaje', 20.00, 1000.00, 300.00, 100, '2026-05-01', '2026-05-31', 'activo'),
('NAVIDAD25', 'Promoción navideña especial', 'porcentaje', 25.00, 300.00, 500.00, 300, '2026-12-01', '2026-12-31', 'activo');

-- =============================================
-- CARRITO (para usuarios activos)
-- =============================================
INSERT INTO carrito (usuario_id) VALUES
(2),
(3),
(4);

-- =============================================
-- DETALLE_CARRITO
-- =============================================
INSERT INTO detalle_carrito (carrito_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 4899.00),
(1, 13, 2, 999.00),
(2, 3, 1, 1199.00),
(2, 17, 1, 199.00),
(3, 6, 1, 4799.00);

-- =============================================
-- PEDIDOS
-- =============================================
INSERT INTO pedidos (usuario_id, numero_pedido, direccion_envio_id, subtotal, descuento, igv, costo_envio, total, estado, metodo_pago, tipo_comprobante, comprobante_dni, comprobante_nombre, estado_pago, es_pago_simulado, tracking_numero) VALUES
(2, 'PED-000001', 1, 5898.00, 589.80, 954.48, 15.00, 6277.68, 'entregado', 'tarjeta_credito', 'boleta', '45678901', 'Carlos Rodriguez', 'simulado_completado', TRUE, 'TRK-20260101-001'),
(2, 'PED-000002', 1, 1199.00, 0, 215.82, 10.00, 1424.82, 'enviado', 'yape', 'boleta', '45678901', 'Carlos Rodriguez', 'simulado_completado', TRUE, 'TRK-20260215-002'),
(3, 'PED-000003', 3, 4799.00, 719.85, 734.23, 15.00, 4828.38, 'procesando', 'tarjeta_credito', 'factura', NULL, NULL, 'simulado_completado', TRUE, 'TRK-20260301-003'),
(4, 'PED-000004', 4, 2199.00, 219.90, 356.24, 10.00, 2345.34, 'confirmado', 'yape', 'boleta', '11223344', 'Maria Lopez', 'simulado_completado', TRUE, NULL),
(5, 'PED-000005', 5, 999.00, 0, 179.82, 10.00, 1188.82, 'pendiente', 'contra_entrega', 'boleta', '55667788', 'Pedro Gomez', 'pendiente', TRUE, NULL);

-- =============================================
-- DETALLE_PEDIDO
-- =============================================
INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 4899.00, 4899.00),
(1, 13, 1, 999.00, 999.00),
(2, 3, 1, 1199.00, 1199.00),
(3, 6, 1, 4799.00, 4799.00),
(4, 22, 1, 2199.00, 2199.00),
(5, 13, 1, 999.00, 999.00);

-- =============================================
-- PAGOS
-- =============================================
INSERT INTO pagos (pedido_id, usuario_id, monto, metodo, estado, referencia_pago, numero_tarjeta_ultimos4, fecha_pago) VALUES
(1, 2, 6277.68, 'tarjeta_credito', 'completado', 'PAY-20260101-001', '4532', '2026-01-01 10:30:00'),
(2, 2, 1424.82, 'yape', 'completado', 'PAY-20260215-002', NULL, '2026-02-15 14:20:00'),
(3, 3, 4828.38, 'tarjeta_credito', 'completado', 'PAY-20260301-003', '8765', '2026-03-01 09:15:00'),
(4, 4, 2345.34, 'yape', 'completado', 'PAY-20260315-004', NULL, '2026-03-15 11:00:00'),
(5, 5, 1188.82, 'contra_entrega', 'pendiente', NULL, NULL, NULL);

-- =============================================
-- VALORACIONES
-- =============================================
INSERT INTO valoraciones (usuario_id, producto_id, pedido_id, calificacion, comentario) VALUES
(2, 1, 1, 5, 'Excelente teléfono, la cámara es increíble y el rendimiento es de primera. Totalmente recomendado.'),
(2, 13, 1, 4, 'Muy buenos audífonos, la cancelación de ruido funciona muy bien. Solo le falta un poco más de graves.'),
(3, 3, 2, 5, 'Increíble relación calidad-precio. La cámara de 200MP toma fotos espectaculares. Mejor que muchos gama alta.'),
(4, 6, 3, 4, 'Buena laptop gaming, corre todos los juegos en alto. Se calienta un poco pero es normal en laptops gaming.'),
(5, 22, 4, 5, 'Excelente televisor, la calidad de imagen es impresionante. El sistema Tizen es muy fluido.');

-- =============================================
-- FAVORITOS
-- =============================================
INSERT INTO favoritos (usuario_id, producto_id) VALUES
(2, 2),
(2, 6),
(2, 7),
(3, 1),
(3, 11),
(3, 16),
(4, 8),
(4, 20),
(4, 24),
(5, 3),
(5, 13),
(5, 17);

-- =============================================
-- HISTORIAL_PEDIDOS
-- =============================================
INSERT INTO historial_pedidos (pedido_id, estado_anterior, estado_nuevo, comentario, realizado_por) VALUES
(1, NULL, 'pendiente', 'Pedido creado', 2),
(1, 'pendiente', 'confirmado', 'Pago verificado', 1),
(1, 'confirmado', 'procesando', 'En preparación', 1),
(1, 'procesando', 'enviado', 'Despachado con olva courier', 1),
(1, 'enviado', 'entregado', 'Entregado al cliente', 1),
(2, NULL, 'pendiente', 'Pedido creado', 2),
(2, 'pendiente', 'confirmado', 'Pago Yape recibido', 1),
(2, 'confirmado', 'procesando', 'En preparación', 1),
(2, 'procesando', 'enviado', 'Despachado', 1),
(3, NULL, 'pendiente', 'Pedido creado', 3),
(3, 'pendiente', 'confirmado', 'Pago verificado', 1),
(3, 'confirmado', 'procesando', 'En preparación', 1),
(4, NULL, 'pendiente', 'Pedido creado', 4),
(4, 'pendiente', 'confirmado', 'Transferencia registrada', 1),
(5, NULL, 'pendiente', 'Pedido creado', 5);

-- =============================================
-- NOTIFICACIONES
-- =============================================
INSERT INTO notificaciones (usuario_id, titulo, mensaje, tipo, leido, enlace) VALUES
(2, 'Pedido enviado', 'Tu pedido MP-2026-0002 ha sido enviado. Número de tracking: TRK-20260215-002', 'envio', FALSE, '/pedidos/2'),
(2, 'Pedido entregado', 'Tu pedido MP-2026-0001 ha sido entregado exitosamente.', 'pedido', TRUE, '/pedidos/1'),
(3, 'Pedido confirmado', 'Tu pedido MP-2026-0003 ha sido confirmado y está en preparación.', 'pedido', FALSE, '/pedidos/3'),
(4, 'Oferta especial', '¡20% de descuento en productos Samsung! Usa el cupón SAMSUNG20.', 'promocion', FALSE, '/catalogo?marca=samsung'),
(5, 'Pedido pendiente', 'Tu pedido MP-2026-0005 está pendiente de pago. Completa tu compra.', 'pago', FALSE, '/checkout'),
(2, '¡Bienvenido a MarketPlus!', 'Gracias por registrarte. Usa el cupón TECH2026 para 10% de descuento.', 'promocion', TRUE, '/catalogo'),
(3, 'Producto disponible', 'El producto que tenías en favoritos está de vuelta en stock.', 'sistema', FALSE, '/producto/xiaomi-redmi-note-13-pro-256gb');

-- =============================================
-- NORMALIZACION DE IMAGENES (URLs ESTABLES)
-- =============================================
UPDATE productos p
JOIN categorias c ON c.id = p.categoria_id
SET p.imagen_principal = CASE c.slug
    WHEN 'celulares-smartphones' THEN 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&q=85&auto=format'
    WHEN 'laptops-computadoras' THEN 'https://images.unsplash.com/photo-1496181133206-80ce9d88ed3f?w=800&h=600&fit=crop&q=85&auto=format'
    WHEN 'tablets' THEN 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&q=85&auto=format'
    WHEN 'audifonos-audio' THEN 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=85&auto=format'
    WHEN 'smartwatch-wearables' THEN 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&q=85&auto=format'
    WHEN 'accesorios' THEN 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&q=85&auto=format'
    WHEN 'gaming' THEN 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=600&fit=crop&q=85&auto=format'
    WHEN 'televisores' THEN 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=600&fit=crop&q=85&auto=format'
    ELSE 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&q=85&auto=format'
END
WHERE p.imagen_principal IS NULL
   OR p.imagen_principal NOT REGEXP '^https?://';
