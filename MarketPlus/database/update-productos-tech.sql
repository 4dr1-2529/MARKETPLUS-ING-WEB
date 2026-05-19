-- =============================================
-- MARKETPLUS - ACTUALIZACION DE PRODUCTOS TECNOLOGICOS REALES
-- Ejecutar despues de marketplus.sql y seed.sql
-- =============================================

USE marketplus_db;

-- Actualizar productos con descripciones reales y detalladas
UPDATE productos SET 
    descripcion = 'Smartphone flagship de Samsung con chip Snapdragon 8 Gen 3 para Galaxy, pantalla Dynamic AMOLED 2X de 6.8 pulgadas con resolucion QHD+ y tasa de refresco adaptativa de 120Hz. Camara principal de 200MP con OIS, ultra gran angular de 12MP y teleobjetivo de 50MP con zoom optico 5x. S Pen integrado con latencia de 2.8ms. Bateria de 5000mAh con carga rapida de 45W. Marco de titanio y Gorilla Armor.',
    especificaciones = JSON_OBJECT('pantalla', '6.8" Dynamic AMOLED 2X QHD+', 'procesador', 'Snapdragon 8 Gen 3', 'ram', '12GB', 'almacenamiento', '256GB', 'camara_principal', '200MP', 'bateria', '5000mAh', 'sistema_operativo', 'Android 14')
WHERE slug = 'samsung-galaxy-s24-ultra-256gb';

UPDATE productos SET 
    descripcion = 'El iPhone mas avanzado de Apple con chip A17 Pro de 3nm, pantalla Super Retina XDR de 6.7 pulgadas con ProMotion y Always-On Display. Sistema de camaras Pro de 48MP con zoom optico 5x, modo retrato de nueva generacion y grabacion de video espacial. Cuerpo de titanio grado aeroespacial, boton de accion personalizable y conector USB-C con USB 3. Hasta 29 horas de reproduccion de video.',
    especificaciones = JSON_OBJECT('pantalla', '6.7" Super Retina XDR OLED', 'procesador', 'A17 Pro', 'ram', '8GB', 'almacenamiento', '256GB', 'camara_principal', '48MP', 'bateria', '4422mAh', 'sistema_operativo', 'iOS 17')
WHERE slug = 'iphone-15-pro-max-256gb';

UPDATE productos SET 
    descripcion = 'Smartphone de gama media premium con camara Samsung HP3 de 200MP con OIS, pantalla Super AMOLED de 6.67 pulgadas con resolucion FHD+ y 120Hz. Procesador MediaTek Helio G99 Ultra de 6nm, bateria de 5100mAh con carga rapida de 67W (cargador incluido). Diseño premium con marco plano y acabado en cristal. Incluye NFC, IR blaster y jack de 3.5mm.',
    especificaciones = JSON_OBJECT('pantalla', '6.67" Super AMOLED FHD+', 'procesador', 'Helio G99 Ultra', 'ram', '8GB', 'almacenamiento', '256GB', 'camara_principal', '200MP', 'bateria', '5100mAh', 'sistema_operativo', 'Android 14')
WHERE slug = 'xiaomi-redmi-note-13-pro-256gb';

UPDATE productos SET 
    descripcion = 'Laptop gaming de alto rendimiento con procesador AMD Ryzen 7 7745HX de 8 nucleos y 16 hilos, tarjeta grafica NVIDIA GeForce RTX 4060 de 8GB GDDR6 con DLSS 3. Pantalla IPS de 16 pulgadas QHD+ (2560x1600) con 165Hz, 100% sRGB y 500 nits. 16GB RAM DDR5-5600, SSD NVMe de 512GB. Sistema de refrigeracion Coldfront 5.0 con camara de vapor. Teclado RGB por tecla Lenovo LA2.',
    especificaciones = JSON_OBJECT('pantalla', '16" QHD+ 165Hz IPS', 'procesador', 'AMD Ryzen 7 7745HX', 'grafica', 'RTX 4060 8GB', 'ram', '16GB DDR5', 'almacenamiento', '512GB SSD NVMe', 'peso', '2.5kg')
WHERE slug = 'lenovo-legion-5-pro-rtx4060';

UPDATE productos SET 
    descripcion = 'Laptop gaming extrema con Intel Core i9-13980HX de 24 nucleos (8P+16E), NVIDIA GeForce RTX 4070 de 8GB GDDR6 con ray tracing. Pantalla ROG Nebula de 16 pulgadas QHD+ (2560x1600), 240Hz, 3ms, 100% DCI-P3, Pantone Validated. 32GB RAM DDR5-4800, SSD NVMe de 1TB PCIe 4.0. Sistema de refrigeracion ROG Intelligent Cooling con metal liquido. Teclado per-key RGB, Dolby Atmos, Wi-Fi 6E.',
    especificaciones = JSON_OBJECT('pantalla', '16" QHD+ 240Hz', 'procesador', 'Intel Core i9-13980HX', 'grafica', 'RTX 4070 8GB', 'ram', '32GB DDR5', 'almacenamiento', '1TB SSD PCIe 4.0', 'peso', '2.5kg')
WHERE slug = 'asus-rog-strix-g16-rtx4070';

UPDATE productos SET 
    descripcion = 'Laptop ultradelgada y ligera con chip Apple M3 de 8 nucleos (4 rendimiento + 4 eficiencia) y GPU de 10 nucleos. Pantalla Liquid Retina de 15.3 pulgadas con tecnologia True Tone y 500 nits de brillo. 8GB de memoria unificada, SSD de 256GB. Hasta 18 horas de bateria. Diseño de aluminio reciclado, solo 1.51kg de peso. MagSafe, 2x USB-C Thunderbolt, jack de 3.5mm. Compatible con iPhone y iPad.',
    especificaciones = JSON_OBJECT('pantalla', '15.3" Liquid Retina', 'procesador', 'Apple M3', 'ram', '8GB Unificada', 'almacenamiento', '256GB SSD', 'bateria', 'Hasta 18 horas', 'peso', '1.51kg')
WHERE slug = 'macbook-air-m3-15-256gb';

UPDATE productos SET 
    descripcion = 'Audifonos in-ear premium con chip H2 de Apple, cancelacion activa de ruido adaptativa que se ajusta 48,000 veces por segundo. Audio espacial personalizado con seguimiento dinamico de cabeza. Modo de transparencia adaptativa. Control por doble toque en el tallo. Estuche de carga con USB-C, altavoz integrado yPrecision Finding. Hasta 6 horas de escucha (30h con estuche). Resistencia IP54.',
    especificaciones = JSON_OBJECT('tipo', 'In-Ear True Wireless', 'cancelacion_ruido', 'Activa Adaptativa', 'chip', 'Apple H2', 'bateria', '6h (30h con estuche)', 'resistencia', 'IP54', 'conexion', 'Bluetooth 5.3')
WHERE slug = 'airpods-pro-2-usbc';

UPDATE productos SET 
    descripcion = 'Smartwatch premium de Samsung con bisel giratorio fisico clasico, pantalla Super AMOLED de 1.5 pulgadas con cristal de zafiro. Sensor BioActive de 3ra generacion (FCG, ECG, BIA). Procesador Exynos W930, 2GB RAM, 16GB almacenamiento. GPS dual-band, NFC para Samsung Pay. Resistencia al agua 5ATM + IP68, certificado MIL-STD-810H. Wear OS 4 con One UI Watch 5. Bateria de 425mAh.',
    especificaciones = JSON_OBJECT('pantalla', '1.5" Super AMOLED', 'procesador', 'Exynos W930', 'ram', '2GB', 'almacenamiento', '16GB', 'bateria', '425mAh', 'resistencia', '5ATM + IP68')
WHERE slug = 'samsung-galaxy-watch-6-classic-47mm';

UPDATE productos SET 
    descripcion = 'Consola de videojuegos de Sony con procesador AMD Zen 2 de 8 nucleos a 3.5GHz, GPU AMD RDNA 2 personalizada con 10.28 TFLOPS. SSD personalizado de 825GB con velocidad de lectura de 5.5GB/s. Soporte para ray tracing en tiempo real, audio 3D Tempest, retrocompatibilidad con PS4. Incluye control DualSense con retroalimentacion haptica y gatillos adaptativos. Lector de discos Blu-ray 4K UHD.',
    especificaciones = JSON_OBJECT('procesador', 'AMD Zen 2 8 núcleos', 'grafica', 'AMD RDNA 2 10.28 TFLOPS', 'ram', '16GB GDDR6', 'almacenamiento', '825GB SSD', 'resolucion', 'Hasta 4K 120fps', 'conexion', 'Wi-Fi 6, Bluetooth 5.1')
WHERE slug = 'playstation-5-slim';

UPDATE productos SET 
    descripcion = 'Consola de Microsoft con procesador AMD Zen 2 personalizado de 8 nucleos a 3.8GHz, GPU AMD RDNA 2 de 12 TFLOPS con 52 CUs. SSD NVMe de 1TB con velocidad de 2.4GB/s (expansible via tarjeta de expansion). Soporte para ray tracing, hasta 120fps, 4K nativo. Retrocompatibilidad con 4 generaciones de Xbox. Incluye control Xbox Wireless con Share button. Xbox Game Pass disponible.',
    especificaciones = JSON_OBJECT('procesador', 'AMD Zen 2 8 núcleos 3.8GHz', 'grafica', 'AMD RDNA 2 12 TFLOPS', 'ram', '16GB GDDR6', 'almacenamiento', '1TB SSD NVMe', 'resolucion', 'Hasta 4K 120fps', 'conexion', 'Wi-Fi 5, Bluetooth 5.1')
WHERE slug = 'xbox-series-x-1tb';

UPDATE productos SET 
    descripcion = 'Monitor gaming ultrawide curvo de 34 pulgadas con panel VA, resolucion WQHD (3440x1440), tasa de refresco de 165Hz y tiempo de respuesta de 1ms MPRT. Tecnologia AMD FreeSync Premium, HDR400, 90% DCI-P3. Diseño sin bordes en 3 lados, soporte ajustable en altura/inclinacion/giro. Conectividad: 2x HDMI 2.0, DisplayPort 1.4, USB Hub. Flicker-Free y Low Blue Light de TUV Rheinland.',
    especificaciones = JSON_OBJECT('pantalla', '34" Curvo VA WQHD', 'refresco', '165Hz', 'respuesta', '1ms MPRT', 'hdr', 'HDR400', 'conexion', '2x HDMI, 1x DP', 'ajuste', 'Altura/Inclinacion/Giro')
WHERE slug = 'monitor-gaming-34-curvo-165hz';

UPDATE productos SET 
    descripcion = 'Router WiFi 6E de alto rendimiento con tecnologia tri-band (2.4GHz + 5GHz + 6GHz), velocidad combinada de hasta 11Gbps. Procesador quad-core de 2.0GHz, 1GB RAM. 4 puertos Gigabit LAN, 1 puerto WAN, 1 USB 3.0. Cobertura de hasta 250m2, soporta mas de 100 dispositivos conectados simultaneamente. AiMesh para sistema mesh, AiProtection Pro de Trend Micro, QoS adaptativo.',
    especificaciones = JSON_OBJECT('estandar', 'WiFi 6E (802.11ax)', 'velocidad', 'Hasta 11Gbps', 'bandas', 'Tri-band 2.4+5+6GHz', 'puertos', '4x LAN, 1x WAN, 1x USB 3.0', 'cobertura', 'Hasta 250m2', 'seguridad', 'WPA3, AiProtection Pro')
WHERE slug = 'router-wifi6e-gaming-11gbps';

UPDATE productos SET 
    descripcion = 'Tarjeta grafica NVIDIA GeForce RTX 4070 SUPER con arquitectura Ada Lovelace, 12GB GDDR6X, bus de 192-bit. 7168 nucleos CUDA, DLSS 3 con Frame Generation, ray tracing de 3ra generacion. TDP de 220W, conector de alimentacion 16-pin. Soporte para AV1 encode/decode, HDMI 2.1a, 3x DisplayPort 1.4a. Ideal para gaming 1440p y creacion de contenido. Incluye soporte anti-sag.',
    especificaciones = JSON_OBJECT('gpu', 'RTX 4070 SUPER', 'memoria', '12GB GDDR6X', 'cuda_cores', '7168', 'tdp', '220W', 'conexion', 'HDMI 2.1a, 3x DP 1.4a', 'tecnologia', 'DLSS 3, Ray Tracing')
WHERE slug = 'rtx-4070-super-12gb';

UPDATE productos SET 
    descripcion = 'Smart TV OLED de 55 pulgadas de LG con procesador α9 Gen6 AI, panel OLED evo con tecnologia MLA (Micro Lens Array) para mayor brillo. Resolucion 4K (3840x2160), HDR10, Dolby Vision IQ, Dolby Atmos. webOS 24 con perfiles de usuario, ThinQ AI, Magic Remote incluido. 4x HDMI 2.1 (4K@120Hz, VRR, ALLM), Wi-Fi 6, Bluetooth 5.0. Compatible con NVIDIA G-Sync y AMD FreeSync Premium.',
    especificaciones = JSON_OBJECT('pantalla', '55" OLED evo 4K', 'procesador', 'α9 Gen6 AI', 'hdr', 'Dolby Vision IQ, HDR10', 'audio', 'Dolby Atmos', 'sistema', 'webOS 24', 'conexion', '4x HDMI 2.1, Wi-Fi 6')
WHERE slug = 'lg-oled55c3-55-pulgadas';

UPDATE productos SET 
    descripcion = 'Teclado mecanico gaming compacto 75% con switches Cherry MX Red (lineales, 2mm actuacion). Chasis de aluminio CNC, montaje gasket para mejor tacto y sonido. Iluminacion RGB per-key con efectos personalizables. Hot-swappable (3 y 5 pins). Conectividad triple: USB-C, Bluetooth 5.0, 2.4GHz wireless. Bateria de 4000mAh (hasta 200h sin RGB). PBT double-shot keycaps. Compatible con Windows y Mac.',
    especificaciones = JSON_OBJECT('tipo', 'Mecanico 75%', 'switches', 'Cherry MX Red', 'conexion', 'USB-C + BT 5.0 + 2.4GHz', 'bateria', '4000mAh', 'iluminacion', 'RGB Per-Key', 'keycaps', 'PBT Double-Shot')
WHERE slug = 'teclado-mecanico-gaming-75-rgb';

UPDATE productos SET 
    descripcion = 'Mouse gaming ultraligero de 54g con sensor HERO 25K de Logitech (hasta 25,600 DPI, 400+ IPS). Switches LIGHTFORCE optico-mecanicos con 90 millones de clics. Tecnologia LIGHTSPEED wireless con latencia de 1ms. Bateria de hasta 95 horas. 6 botones programables, peso ajustable con pesas incluidas. Compatible con POWERPLAY (carga inalambrica continua). LIGHTSYNC RGB.',
    especificaciones = JSON_OBJECT('peso', '54g', 'sensor', 'HERO 25K', 'dpi', 'Hasta 25,600', 'conexion', 'LIGHTSPEED Wireless', 'bateria', 'Hasta 95 horas', 'botones', '6 programables', 'rgb', 'LIGHTSYNC')
WHERE slug = 'mouse-gaming-logitech-g-pro-x';

-- Actualizar imagen_principal para que use rutas locales
UPDATE productos SET imagen_principal = CONCAT(categoria_slug, '/', imagen_principal) WHERE imagen_principal IS NOT NULL AND imagen_principal NOT LIKE '%/%';
