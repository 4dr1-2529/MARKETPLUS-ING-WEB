/**
 * 20 categorías × 15 productos — nombres y marcas reales de mercado.
 * Imágenes: DummyJSON CDN + Unsplash (electrodomésticos / tech).
 */
const D = 'https://cdn.dummyjson.com/product-images';
const U = (id) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=85`;

/** @type {{ slug: string, nombre: string, desc: string, productos: Array<{nombre:string,marca:string,desc:string,precio:number,oferta?:number,dcto?:number,img:string}> }} */
const CATALOG = [
    {
        slug: 'celulares',
        nombre: 'Celulares',
        desc: 'Smartphones de todas las marcas',
        productos: [
            { nombre: 'Samsung Galaxy S24 Ultra 256GB', marca: 'Samsung', desc: 'Pantalla Dynamic AMOLED 6.8", cámara 200MP, S Pen integrado.', precio: 5499, oferta: 4899, dcto: 11, img: `${D}/smartphones/iphone-13-pro/thumbnail.webp` },
            { nombre: 'iPhone 15 Pro Max 256GB', marca: 'Apple', desc: 'Chip A17 Pro, titanio, cámara 48MP con zoom óptico 5x.', precio: 6999, oferta: 6299, dcto: 10, img: `${D}/smartphones/iphone-x/thumbnail.webp` },
            { nombre: 'Xiaomi Redmi Note 13 Pro 256GB', marca: 'Xiaomi', desc: 'Cámara 200MP, pantalla AMOLED 120Hz, carga 67W.', precio: 1399, oferta: 1199, dcto: 14, img: `${D}/smartphones/realme-c35/thumbnail.webp` },
            { nombre: 'Samsung Galaxy A54 5G 128GB', marca: 'Samsung', desc: 'Gama media con IP67, pantalla Super AMOLED y batería 5000mAh.', precio: 1599, oferta: 1399, dcto: 13, img: `${D}/smartphones/iphone-6/thumbnail.webp` },
            { nombre: 'Motorola Edge 40 Pro 256GB', marca: 'Motorola', desc: 'Pantalla pOLED 165Hz, Snapdragon 8 Gen 2, carga 125W.', precio: 3499, oferta: 2999, dcto: 14, img: `${D}/smartphones/oppo-f19-pro-plus/thumbnail.webp` },
            { nombre: 'Huawei P60 Pro 256GB', marca: 'Huawei', desc: 'Cámara XMAGE, pantalla OLED 120Hz, diseño premium.', precio: 4299, oferta: 3799, dcto: 12, img: `${D}/smartphones/oppo-k1/thumbnail.webp` },
            { nombre: 'Samsung Galaxy S23 FE 128GB', marca: 'Samsung', desc: 'Experiencia flagship accesible con cámara versátil.', precio: 2799, oferta: 2499, dcto: 11, img: `${D}/smartphones/iphone-5s/thumbnail.webp` },
            { nombre: 'iPhone 14 128GB', marca: 'Apple', desc: 'iPhone confiable con gran ecosistema iOS y cámara dual.', precio: 4499, oferta: 3999, dcto: 11, img: `${D}/smartphones/iphone-6/thumbnail.webp` },
            { nombre: 'Xiaomi 13T Pro 256GB', marca: 'Xiaomi', desc: 'Cámara Leica, carga 120W, MediaTek Dimensity 9200+.', precio: 2999, oferta: 2699, dcto: 10, img: `${D}/smartphones/realme-x/thumbnail.webp` },
            { nombre: 'Motorola Moto G84 256GB', marca: 'Motorola', desc: 'pOLED, Android puro, excelente batería.', precio: 1299, oferta: 1099, dcto: 15, img: `${D}/smartphones/realme-xt/thumbnail.webp` },
            { nombre: 'iPhone 13 Pro 128GB', marca: 'Apple', desc: 'Pantalla ProMotion, chip A15 Bionic, triple cámara.', precio: 3899, oferta: 3499, dcto: 10, img: `${D}/smartphones/iphone-13-pro/thumbnail.webp` },
            { nombre: 'Samsung Galaxy A34 5G', marca: 'Samsung', desc: 'Equilibrio precio-rendimiento con 5G y cámara OIS.', precio: 1199, oferta: 999, dcto: 17, img: `${D}/smartphones/iphone-5s/thumbnail.webp` },
            { nombre: 'OPPO Reno 10 256GB', marca: 'OPPO', desc: 'Diseño delgado, carga rápida SUPERVOOC.', precio: 1899, oferta: 1699, dcto: 11, img: `${D}/smartphones/oppo-f19-pro-plus/thumbnail.webp` },
            { nombre: 'Realme 11 Pro+ 256GB', marca: 'Realme', desc: 'Curvatura premium, cámara 200MP, carga 100W.', precio: 1799, oferta: 1549, dcto: 14, img: `${D}/smartphones/realme-x/thumbnail.webp` },
            { nombre: 'Google Pixel 8 128GB', marca: 'Google', desc: 'Android puro, fotografía computacional, actualizaciones 7 años.', precio: 3299, oferta: 2999, dcto: 9, img: `${D}/smartphones/iphone-x/thumbnail.webp` }
        ]
    },
    {
        slug: 'laptops',
        nombre: 'Laptops',
        desc: 'Portátiles para trabajo, estudio y gaming',
        productos: [
            { nombre: 'MacBook Air M3 15" 256GB', marca: 'Apple', desc: 'Chip M3, pantalla Liquid Retina, hasta 18h batería.', precio: 5999, oferta: 5499, dcto: 8, img: `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp` },
            { nombre: 'Lenovo Legion 5 Pro RTX 4060', marca: 'Lenovo', desc: 'Gaming Ryzen 7, RTX 4060, pantalla 16" QHD 165Hz.', precio: 5299, oferta: 4799, dcto: 9, img: `${D}/laptops/lenovo-yoga-920/thumbnail.webp` },
            { nombre: 'ASUS ROG Strix G16 RTX 4070', marca: 'ASUS', desc: 'Intel Core i9, RTX 4070, 32GB RAM, 1TB SSD.', precio: 7499, oferta: 6899, dcto: 8, img: `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp` },
            { nombre: 'HP Pavilion 15 Ryzen 5', marca: 'HP', desc: 'Uso diario y estudio, SSD 512GB, pantalla FHD.', precio: 2499, oferta: 2199, dcto: 12, img: `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp` },
            { nombre: 'Dell Inspiron 14 Core i7', marca: 'Dell', desc: 'Compacta profesional, 16GB RAM, ideal oficina.', precio: 3299, oferta: 2899, dcto: 12, img: `${D}/laptops/huawei-matebook-x-pro/thumbnail.webp` },
            { nombre: 'Lenovo IdeaPad Slim 5', marca: 'Lenovo', desc: 'Ultrabook AMD Ryzen, pantalla IPS, ligera.', precio: 2799, oferta: 2499, dcto: 11, img: `${D}/laptops/lenovo-yoga-920/thumbnail.webp` },
            { nombre: 'ASUS Vivobook 15 OLED', marca: 'ASUS', desc: 'Pantalla OLED, Intel Core i5, diseño moderno.', precio: 3199, oferta: 2799, dcto: 13, img: `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp` },
            { nombre: 'HP Victus 16 RTX 4050', marca: 'HP', desc: 'Gaming accesible, 144Hz, refrigeración mejorada.', precio: 3899, oferta: 3499, dcto: 10, img: `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp` },
            { nombre: 'MacBook Pro 14" M3 Pro', marca: 'Apple', desc: 'Para creativos, pantalla XDR, chip M3 Pro.', precio: 8999, oferta: 8299, dcto: 8, img: `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp` },
            { nombre: 'Dell G15 Gaming RTX 4050', marca: 'Dell', desc: 'Gaming Dell con teclado retroiluminado RGB.', precio: 4299, oferta: 3899, dcto: 9, img: `${D}/laptops/huawei-matebook-x-pro/thumbnail.webp` },
            { nombre: 'Acer Aspire 5 Ryzen 7', marca: 'Acer', desc: 'Productividad multitarea, buena autonomía.', precio: 2699, oferta: 2399, dcto: 11, img: `${D}/laptops/lenovo-yoga-920/thumbnail.webp` },
            { nombre: 'Microsoft Surface Laptop 5', marca: 'Microsoft', desc: 'Windows 11, pantalla táctil PixelSense.', precio: 4599, oferta: 4199, dcto: 9, img: `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp` },
            { nombre: 'MSI Katana 15 RTX 4060', marca: 'MSI', desc: 'Gaming MSI, Cooler Boost, teclado gaming.', precio: 4499, oferta: 4099, dcto: 9, img: `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp` },
            { nombre: 'Huawei MateBook D16', marca: 'Huawei', desc: 'Pantalla 16", cuerpo metálico, buena relación precio.', precio: 2999, oferta: 2699, dcto: 10, img: `${D}/laptops/huawei-matebook-x-pro/thumbnail.webp` },
            { nombre: 'Samsung Galaxy Book3', marca: 'Samsung', desc: 'Integración ecosistema Galaxy, pantalla AMOLED.', precio: 4199, oferta: 3799, dcto: 10, img: `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp` }
        ]
    },
    {
        slug: 'computadoras-escritorio',
        nombre: 'Computadoras de Escritorio',
        desc: 'PC de escritorio para oficina y hogar',
        productos: mkDesktop()
    },
    {
        slug: 'tablets',
        nombre: 'Tablets',
        desc: 'Tablets para estudio y entretenimiento',
        productos: [
            { nombre: 'iPad Air M2 11" 128GB', marca: 'Apple', desc: 'Chip M2, compatible Apple Pencil, pantalla Liquid Retina.', precio: 2999, oferta: 2699, dcto: 10, img: `${D}/tablets/ipad-air-4/thumbnail.webp` },
            { nombre: 'Samsung Galaxy Tab S9 FE', marca: 'Samsung', desc: 'S Pen incluido, IP68, pantalla 10.9".', precio: 1899, oferta: 1699, dcto: 11, img: `${D}/tablets/samsung-galaxy-tab-s8-ultra/thumbnail.webp` },
            { nombre: 'Lenovo Tab P12 Pro', marca: 'Lenovo', desc: 'Pantalla 12.7" 3K, ideal multimedia.', precio: 2199, oferta: 1999, dcto: 9, img: `${D}/tablets/lenovo-yoga-tab-11/thumbnail.webp` },
            { nombre: 'Xiaomi Pad 6 128GB', marca: 'Xiaomi', desc: 'Snapdragon 870, pantalla 144Hz, altavoces quad.', precio: 1499, oferta: 1299, dcto: 13, img: `${D}/tablets/ipad-air-4/thumbnail.webp` },
            { nombre: 'Huawei MatePad 11', marca: 'Huawei', desc: 'HarmonyOS, lápiz M-Pencil, multitarea.', precio: 1299, oferta: 1149, dcto: 12, img: `${D}/tablets/lenovo-yoga-tab-11/thumbnail.webp` },
            { nombre: 'Amazon Fire HD 10', marca: 'Amazon', desc: 'Entretenimiento económico, pantalla Full HD.', precio: 599, oferta: 499, dcto: 17, img: `${D}/tablets/ipad-air-4/thumbnail.webp` },
            { nombre: 'iPad 10.9" 64GB', marca: 'Apple', desc: 'iPad entrada, chip A14, gran catálogo apps.', precio: 1999, oferta: 1799, dcto: 10, img: `${D}/tablets/ipad-air-4/thumbnail.webp` },
            { nombre: 'Samsung Galaxy Tab A9+', marca: 'Samsung', desc: 'Familiar, pantalla 11", batería duradera.', precio: 899, oferta: 749, dcto: 17, img: `${D}/tablets/samsung-galaxy-tab-s8-ultra/thumbnail.webp` },
            { nombre: 'Microsoft Surface Pro 9', marca: 'Microsoft', desc: '2-en-1 con teclado opcional, Windows 11.', precio: 4999, oferta: 4499, dcto: 10, img: `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp` },
            { nombre: 'Lenovo Tab M10 Plus', marca: 'Lenovo', desc: 'Niños y estudio, modo niños, parental control.', precio: 699, oferta: 599, dcto: 14, img: `${D}/tablets/lenovo-yoga-tab-11/thumbnail.webp` },
            { nombre: 'Realme Pad 2', marca: 'Realme', desc: 'Pantalla 11.5", cuatro altavoces Dolby.', precio: 999, oferta: 849, dcto: 15, img: `${D}/tablets/ipad-air-4/thumbnail.webp` },
            { nombre: 'iPad Pro 12.9" M2', marca: 'Apple', desc: 'Máximo rendimiento iPad, pantalla XDR.', precio: 6499, oferta: 5999, dcto: 8, img: `${D}/tablets/ipad-air-4/thumbnail.webp` },
            { nombre: 'Galaxy Tab S9 Ultra', marca: 'Samsung', desc: 'Pantalla AMOLED 14.6", productividad extrema.', precio: 5499, oferta: 4999, dcto: 9, img: `${D}/tablets/samsung-galaxy-tab-s8-ultra/thumbnail.webp` },
            { nombre: 'Xiaomi Redmi Pad SE', marca: 'Xiaomi', desc: 'Económica 11", ideal streaming y lectura.', precio: 749, oferta: 649, dcto: 13, img: `${D}/tablets/lenovo-yoga-tab-11/thumbnail.webp` },
            { nombre: 'Huawei MatePad SE 11', marca: 'Huawei', desc: 'Pantalla 11", metal body, batería 7700mAh.', precio: 899, oferta: 799, dcto: 11, img: `${D}/tablets/lenovo-yoga-tab-11/thumbnail.webp` }
        ]
    },
    {
        slug: 'smartwatches',
        nombre: 'Smartwatches',
        desc: 'Relojes inteligentes y wearables',
        productos: mkWatches()
    },
    {
        slug: 'audifonos-headsets',
        nombre: 'Audífonos y Headsets',
        desc: 'Auriculares inalámbricos y con cable',
        productos: mkAudio()
    },
    {
        slug: 'accesorios-gamer',
        nombre: 'Accesorios Gamer',
        desc: 'Periféricos y accesorios para gaming',
        productos: mkGamer()
    },
    {
        slug: 'monitores',
        nombre: 'Monitores',
        desc: 'Monitores para trabajo y gaming',
        productos: mkMonitors()
    },
    {
        slug: 'teclados-mouse',
        nombre: 'Teclados y Mouse',
        desc: 'Teclados y ratones inalámbricos y gaming',
        productos: mkKeyboardMouse()
    },
    {
        slug: 'impresoras',
        nombre: 'Impresoras',
        desc: 'Impresoras y multifuncionales',
        productos: mkPrinters()
    },
    {
        slug: 'camaras-fotografia',
        nombre: 'Cámaras y Fotografía',
        desc: 'Cámaras digitales y accesorios',
        productos: mkCameras()
    },
    {
        slug: 'parlantes-audio',
        nombre: 'Parlantes y Audio',
        desc: 'Parlantes Bluetooth y sistemas de audio',
        productos: mkSpeakers()
    },
    {
        slug: 'componentes-pc',
        nombre: 'Componentes PC',
        desc: 'Procesadores, tarjetas gráficas y más',
        productos: mkComponents()
    },
    {
        slug: 'almacenamiento',
        nombre: 'Almacenamiento SSD y HDD',
        desc: 'Discos SSD, HDD y unidades externas',
        productos: mkStorage()
    },
    {
        slug: 'redes-wifi',
        nombre: 'Redes y WiFi',
        desc: 'Routers, mesh y adaptadores de red',
        productos: mkNetwork()
    },
    {
        slug: 'consolas-videojuegos',
        nombre: 'Consolas y Videojuegos',
        desc: 'Consolas y accesorios de videojuegos',
        productos: mkConsoles()
    },
    {
        slug: 'smart-tv',
        nombre: 'Smart TV',
        desc: 'Televisores inteligentes 4K',
        productos: mkSmartTv()
    },
    {
        slug: 'hogar-inteligente',
        nombre: 'Hogar Inteligente',
        desc: 'Domótica y dispositivos smart home',
        productos: mkSmartHome()
    },
    {
        slug: 'cargadores-powerbanks',
        nombre: 'Cargadores y Power Banks',
        desc: 'Cargadores rápidos y baterías portátiles',
        productos: mkChargers()
    },
    {
        slug: 'accesorios-celulares',
        nombre: 'Accesorios para Celulares',
        desc: 'Fundas, protectores y cables',
        productos: mkPhoneAcc()
    }
];

function mkDesktop() {
    const img = U('1587831990882-82477074aa58');
    const items = [
        ['HP Pavilion Desktop TP01', 'HP', 'Intel Core i5, 8GB RAM, 512GB SSD, Windows 11.'],
        ['Dell OptiPlex 7010', 'Dell', 'PC empresarial compacto, confiable para oficina.'],
        ['Lenovo ThinkCentre M70q', 'Lenovo', 'Mini PC, ahorra espacio, Core i5.'],
        ['ASUS ExpertCenter D5', 'ASUS', 'Torre silenciosa, puertos completos.'],
        ['Acer Aspire TC', 'Acer', 'Uso hogar y estudio, buen precio.'],
        ['MSI Pro DP21', 'MSI', 'Diseño compacto, Intel Core i3.'],
        ['HP ProDesk 400 G9', 'HP', 'Seguridad empresarial, fácil mantenimiento.'],
        ['Dell Vostro 3030', 'Dell', 'Pequeña empresa, rendimiento sólido.'],
        ['Lenovo IdeaCentre 3', 'Lenovo', 'Familia, multimedia y trabajo.'],
        ['Intel NUC 13 Pro', 'Intel', 'Mini PC potente, montaje VESA.'],
        ['CyberPowerPC Gamer', 'CyberPowerPC', 'Gaming entrada, GTX dedicada.'],
        ['iMac 24" M3', 'Apple', 'Todo en uno, pantalla 4.5K Retina.'],
        ['ASUS ROG Strix GA15', 'ASUS', 'Torre gaming RGB, Ryzen 7.'],
        ['HP Envy Desktop TE01', 'HP', 'Creativos, RAM expandible.'],
        ['Dell XPS Desktop', 'Dell', 'Premium, chasis tool-less.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 1999 + i * 280, oferta: 1799 + i * 250, dcto: 10,
        img: i % 2 ? `${D}/laptops/huawei-matebook-x-pro/thumbnail.webp` : img
    }));
}

function mkWatches() {
    const imgs = [
        `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
        `${D}/mens-watches/1/thumbnail.webp` || `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
        `${D}/womens-watches/1/thumbnail.webp` || `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`
    ];
    const items = [
        ['Apple Watch Series 9 GPS 45mm', 'Apple', 'Chip S9, pantalla Always-On, detección caídas.'],
        ['Samsung Galaxy Watch 6 Classic', 'Samsung', 'Bisel giratorio, BioActive Sensor, 5ATM.'],
        ['Garmin Forerunner 255', 'Garmin', 'GPS running, batería 14 días.'],
        ['Xiaomi Smart Band 8 Pro', 'Xiaomi', 'Pantalla AMOLED, GPS integrado.'],
        ['Huawei Watch GT 4', 'Huawei', 'Batería 14 días, monitoreo salud.'],
        ['Amazfit GTR 4', 'Amazfit', '150 modos deporte, llamadas Bluetooth.'],
        ['Fitbit Charge 6', 'Fitbit', 'Google Fit, ECG y SpO2.'],
        ['Samsung Galaxy Watch 6 40mm', 'Samsung', 'Diseño ligero, Wear OS.'],
        ['Apple Watch SE 2', 'Apple', 'Funciones esenciales a mejor precio.'],
        ['Garmin Venu 3', 'Garmin', 'Pantalla AMOLED, música onboard.'],
        ['Xiaomi Watch S3', 'Xiaomi', 'HyperOS, NFC pagos.'],
        ['Huawei Band 8', 'Huawei', 'Ultraligera, 14 días batería.'],
        ['Casio G-Shock GBD-200', 'Casio', 'Resistente, conectividad Bluetooth.'],
        ['TicWatch Pro 5', 'Mobvoi', 'Doble pantalla, Wear OS 3.'],
        ['Polar Pacer Pro', 'Polar', 'Entrenamiento running avanzado.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 399 + i * 120, oferta: 349 + i * 100, dcto: 12,
        img: `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`
    }));
}

function mkAudio() {
    const items = [
        ['AirPods Pro 2 USB-C', 'Apple', 'Cancelación activa adaptativa, audio espacial.'],
        ['Samsung Galaxy Buds3 Pro', 'Samsung', 'Audio Hi-Fi 24bit en Galaxy.'],
        ['Sony WH-1000XM5', 'Sony', 'Referencia en cancelación de ruido over-ear.'],
        ['JBL Tune 770NC', 'JBL', 'Over-ear 44h batería, ANC.'],
        ['Bose QuietComfort Ultra', 'Bose', 'Audio inmersivo, máximo confort.'],
        ['JBL Wave Beam 2', 'JBL', 'Earbuds resistentes al agua IP54.'],
        ['Xiaomi Redmi Buds 5 Pro', 'Xiaomi', 'LDAC, ANC, carga rápida.'],
        ['Sony LinkBuds S', 'Sony', 'Compactos, ANC, multipoint.'],
        ['Beats Studio Pro', 'Beats', 'Sonido espacial, USB-C universal.'],
        ['Sennheiser HD 450SE', 'Sennheiser', 'Over-ear calidad alemana.'],
        ['Logitech G Pro X 2', 'Logitech', 'Gaming ligero, micrófono Blue VO!CE.'],
        ['HyperX Cloud III', 'HyperX', 'Gaming cómodo, audio DTS.'],
        ['Razer BlackShark V2', 'Razer', 'Esports, micrófono desmontable.'],
        ['JBL Charge 5', 'JBL', 'Portátil resistente agua, PartyBoost.'],
        ['Audio-Technica ATH-M50x', 'Audio-Technica', 'Monitoreo profesional cerrados.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 199 + i * 95, oferta: 169 + i * 80, dcto: 15,
        img: i % 3 === 0 ? `${D}/mobile-accessories/apple-airpods/thumbnail.webp`
            : i % 3 === 1 ? `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`
                : `${D}/mobile-accessories/apple-airpods-max-silver/thumbnail.webp`
    }));
}

function mkGamer() {
    const items = [
        ['Logitech G Pro X Superlight 2', 'Logitech', 'Mouse gaming 60g, sensor HERO 2.'],
        ['Razer DeathAdder V3 Pro', 'Razer', 'Ergonómico inalámbrico esports.'],
        ['SteelSeries Arctis Nova Pro', 'SteelSeries', 'Headset gaming premium dual battery.'],
        ['Corsair K70 RGB Pro', 'Corsair', 'Teclado mecánico Cherry MX.'],
        ['HyperX Alloy Origins 60', 'HyperX', 'Teclado compacto 60% gaming.'],
        ['ASUS ROG Sheath XL', 'ASUS', 'Mousepad extended XXL.'],
        ['Elgato Stream Deck MK.2', 'Elgato', '15 teclas LCD personalizables streaming.'],
        ['Razer Huntsman V3 Pro', 'Razer', 'Teclado óptico analog switches.'],
        ['Logitech G923 Racing Wheel', 'Logitech', 'Volante TrueForce PC/PS/Xbox.'],
        ['Secretlab Titan Evo', 'Secretlab', 'Silla ergonómica gaming premium.'],
        ['NZXT H5 Flow RGB', 'NZXT', 'Gabinete airflow con ventiladores.'],
        ['Cooler Master MM712', 'Cooler Master', 'Mouse ultraligero honeycomb.'],
        ['Razer Kiyo Pro Ultra', 'Razer', 'Webcam 4K HDR streaming.'],
        ['SteelSeries QcK Prism', 'SteelSeries', 'Mousepad RGB reversible.'],
        ['Xbox Elite Controller Series 2', 'Microsoft', 'Control inalámbrico pro Xbox/PC.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 249 + i * 110, oferta: 219 + i * 95, dcto: 12,
        img: `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`
    }));
}

function mkMonitors() {
    const img = U('152744085-6b469ab79c7e12307b2697a6b01d629');
    const items = [
        ['LG UltraGear 27" 165Hz', 'LG', 'IPS QHD 165Hz, 1ms, G-Sync Compatible.'],
        ['Samsung Odyssey G5 27"', 'Samsung', 'Curvo 144Hz, AMD FreeSync Premium.'],
        ['ASUS TUF Gaming VG27AQ', 'ASUS', 'WQHD 165Hz, ELMB Sync.'],
        ['Dell S2722DZ 27" QHD', 'Dell', 'USB-C 65W, pantalla IPS.'],
        ['BenQ MOBIUZ EX2710Q', 'BenQ', 'HDRi, altavoces treVolo.'],
        ['AOC 24G2 144Hz', 'AOC', 'Gaming entrada, panel IPS.'],
        ['MSI MAG 274UPF 4K', 'MSI', '4K 144Hz, Rapid IPS.'],
        ['LG 34" UltraWide', 'LG', '34WP65C-B, productividad multitarea.'],
        ['Samsung ViewFinity S8', 'Samsung', '4K UHD IPS, USB-C.'],
        ['ASUS ProArt PA278QV', 'ASUS', 'Calibrado color profesional.'],
        ['HP X27qc Curved', 'HP', 'QHD 165Hz, micro-edge.'],
        ['Lenovo Legion Y27f-30', 'Lenovo', '240Hz esports, HDR400.'],
        ['Philips Evnia 27M2C5500', 'Philips', 'QD OLED gaming 175Hz.'],
        ['ViewSonic VX2758-2KP-MHD', 'ViewSonic', 'QHD 144Hz presupuesto.'],
        ['Gigabyte M27Q 170Hz', 'Gigabyte', 'KVM switch integrado.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 899 + i * 150, oferta: 799 + i * 130, dcto: 11,
        img: i % 2 ? img : U('1593640485578-273456394311f5fc9485c5d8bb192a')
    }));
}

function mkKeyboardMouse() {
    const items = [
        ['Logitech MX Keys S', 'Logitech', 'Teclado inalámbrico retroiluminación inteligente.'],
        ['Logitech MX Master 3S', 'Logitech', 'Mouse ergonómico 8000 DPI silencioso.'],
        ['Apple Magic Keyboard', 'Apple', 'Teclado fino Bluetooth para Mac/iPad.'],
        ['Apple Magic Mouse', 'Apple', 'Multi-Touch superficie, recargable.'],
        ['Razer BlackWidow V4', 'Razer', 'Mecánico RGB switches green.'],
        ['Corsair K55 RGB Pro', 'Corsair', 'Membrana resistente salpicaduras.'],
        ['HyperX Alloy FPS Pro', 'HyperX', 'Tenkeyless mecánico Cherry MX Red.'],
        ['Microsoft Ergonomic Desktop', 'Microsoft', 'Kit teclado split + mouse.'],
        ['Redragon K552 Kumara', 'Redragon', 'Mecánico económico TKL.'],
        ['Logitech G502 X Plus', 'Logitech', 'Gaming RGB sensor HERO 25K.'],
        ['Keychron K2 V2', 'Keychron', 'Mecánico inalámbrico compacto.'],
        ['Razer Basilisk V3', 'Razer', '11 botones programables scroll tilt.'],
        ['SteelSeries Apex 3 TKL', 'SteelSeries', 'Resistente agua IP32.'],
        ['Logitech Pebble Keys 2', 'Logitech', 'Minimalista portátil multi-device.'],
        ['HP 230 Wireless Combo', 'HP', 'Kit oficina inalámbrico.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 149 + i * 45, oferta: 129 + i * 38, dcto: 13,
        img: i % 2 ? `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp` : `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`
    }));
}

function mkPrinters() {
    const img = U('1612815392350-39a1dd78c870');
    const items = [
        ['HP DeskJet 2820e', 'HP', 'Multifuncional WiFi, HP Smart app.'],
        ['Epson EcoTank L3250', 'Epson', 'Tanque tinta recargable, bajo costo página.'],
        ['Canon PIXMA G3160', 'Canon', 'Sistema tanque, WiFi Direct.'],
        ['Brother DCP-T420W', 'Brother', 'Inyección tanque, dúplex automático.'],
        ['HP LaserJet Pro M404n', 'HP', 'Láser monocromo oficina rápido.'],
        ['Canon imageCLASS MF3010', 'Canon', 'Láser multifuncional compacto.'],
        ['Epson L1250', 'Epson', 'Entrada EcoTank hogar.'],
        ['HP Smart Tank 580', 'HP', 'Tanque alta capacidad color.'],
        ['Brother HL-L2350DW', 'Brother', 'Láser WiFi dúplex automático.'],
        ['Canon G6010', 'Canon', 'MegaTank oficina pequeña.'],
        ['Epson Workforce Pro WF-4830', 'Epson', 'Inyección precisión oficina.'],
        ['Xerox B210DNI', 'Xerox', 'Láser compacto red.'],
        ['HP OfficeJet Pro 9015e', 'HP', 'Oficina hogar fax escaneo.'],
        ['Canon TR4720', 'Canon', 'Compacta multifuncional.'],
        ['Epson L6490', 'Epson', 'Fax ADF oficina tanque.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 499 + i * 120, oferta: 449 + i * 100, dcto: 10,
        img
    }));
}

function mkCameras() {
    const img = U('9091503710848-64b89f070b8a');
    const items = [
        ['Canon EOS R50 Kit', 'Canon', 'Mirrorless 24MP, 4K 30p, ideal iniciación.'],
        ['Sony ZV-E10 Vlog', 'Sony', 'APS-C para creadores, enfoque rápido.'],
        ['GoPro HERO12 Black', 'GoPro', '5.3K HyperSmooth 6.0, waterproof.'],
        ['DJI Osmo Pocket 3', 'DJI', 'Gimbal 4K portátil Creator Combo.'],
        ['Sony Alpha a6400', 'Sony', 'APS-C 425 puntos AF, sin espejo.'],
        ['Fujifilm X-S20', 'Fujifilm', '26MP IBIS, modos film simulation.'],
        ['Canon PowerShot G7 X III', 'Canon', 'Compacta premium 4K vlog.'],
        ['Insta360 X3', 'Insta360', 'Cámara 360° 5.7K Active HDR.'],
        ['Nikon Z fc', 'Nikon', 'Diseño retro, Z mount, 4K.'],
        ['Panasonic Lumix GH6', 'Panasonic', 'Micro Four Thirds video pro.'],
        ['DJI Mini 4 Pro', 'DJI', 'Drone 4K HDR obstáculos omnidireccional.'],
        ['Sony FX30', 'Sony', 'Cinema Line Super 35.'],
        ['Canon EOS R6 Mark II', 'Canon', 'Full frame 24MP foto/video.'],
        ['GoPro MAX', 'GoPro', '360° reframing Horizon Lock.'],
        ['Rode VideoMic Pro+', 'Rode', 'Micrófono shotgun cámara.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 1299 + i * 350, oferta: 1199 + i * 300, dcto: 8,
        img
    }));
}

function mkSpeakers() {
    const items = [
        ['JBL Flip 6', 'JBL', 'Bluetooth IP67, 12h batería, PartyBoost.'],
        ['Sony SRS-XB33', 'Sony', 'Extra Bass, resistencia agua polvo.'],
        ['Bose SoundLink Flex', 'Bose', 'Posición flexible, PositionIQ.'],
        ['Marshall Emberton II', 'Marshall', 'Diseño icónico, 30+ horas.'],
        ['JBL PartyBox 110', 'JBL', 'Fiesta portátil luces dinámicas.'],
        ['Ultimate Ears BOOM 3', 'Ultimate Ears', '360° sonido, flotante.'],
        ['Sonos Era 100', 'Sonos', 'WiFi smart speaker Trueplay.'],
        ['Amazon Echo Pop', 'Amazon', 'Alexa compacto smart speaker.'],
        ['Google Nest Audio', 'Google', 'Asistente Google sonido claro.'],
        ['Edifier R1280DB', 'Edifier', 'Monitores estantería Bluetooth.'],
        ['Klipsch The One Plus', 'Klipsch', 'Heritage wireless premium.'],
        ['JBL Charge 5', 'JBL', 'Powerbank integrado IP67.'],
        ['Sony HT-S40R', 'Sony', 'Barra sonido 5.1ch subwoofer inalámbrico.'],
        ['Bose Soundbar 300', 'Bose', 'Dolby Atmos compacta.'],
        ['Samsung MX-ST40B', 'Samsung', 'Torre fiesta 160W bi-directional.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 299 + i * 80, oferta: 259 + i * 65, dcto: 13,
        img: `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`
    }));
}

function mkComponents() {
    const items = [
        ['Intel Core i7-14700K', 'Intel', '20 núcleos, socket LGA1700.'],
        ['AMD Ryzen 7 7800X3D', 'AMD', 'Gaming 3D V-Cache, AM5.'],
        ['NVIDIA RTX 4070 Super 12GB', 'NVIDIA', 'DLSS 3, ray tracing, 1440p.'],
        ['AMD Radeon RX 7800 XT', 'AMD', '16GB GDDR6, FSR 3.'],
        ['Corsair Vengeance 32GB DDR5', 'Corsair', '5600MHz kit 2x16GB.'],
        ['Kingston Fury 16GB DDR4', 'Kingston', '3200MHz CL16 dual channel.'],
        ['ASUS ROG Strix B650E-F', 'ASUS', 'Placa madre AM5 WiFi PCIe 5.0.'],
        ['MSI MAG B760 Tomahawk', 'MSI', 'Intel 12/13/14 gen DDR5.'],
        ['Corsair RM850e 850W', 'Corsair', '80 Plus Gold modular.'],
        ['Cooler Master Hyper 212', 'Cooler Master', 'Disipador aire universal.'],
        ['NZXT Kraken 240', 'NZXT', 'AIO líquido 240mm LCD.'],
        ['Samsung 990 Pro 1TB', 'Samsung', 'NVMe PCIe 4.0 7450 MB/s.'],
        ['WD Black SN850X 2TB', 'WD', 'Gaming SSD heatsink opcional.'],
        ['TP-Link Archer TX50E', 'TP-Link', 'WiFi 6E PCIe tarjeta.'],
        ['Thermal Grizzly Kryonaut', 'Thermal Grizzly', 'Pasta térmica alta conductividad.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 199 + i * 180, oferta: 179 + i * 155, dcto: 10,
        img: `${D}/laptops/huawei-matebook-x-pro/thumbnail.webp`
    }));
}

function mkStorage() {
    const items = [
        ['Samsung 990 Pro 1TB NVMe', 'Samsung', 'PCIe 4.0 hasta 7450 MB/s lectura.'],
        ['WD Black SN850X 2TB', 'WD', 'Gaming con heatsink opcional.'],
        ['Crucial P3 Plus 1TB', 'Crucial', 'Gen4 económico 5000 MB/s.'],
        ['Kingston NV2 500GB', 'Kingston', 'NVMe PCIe 4.0 entrada.'],
        ['Seagate Barracuda 2TB HDD', 'Seagate', '3.5" 7200RPM almacenamiento masivo.'],
        ['WD Blue 1TB HDD', 'WD', 'Confiable PC escritorio.'],
        ['SanDisk Extreme Portable 2TB', 'SanDisk', 'SSD externo USB 3.2 1050 MB/s.'],
        ['Samsung T7 Shield 1TB', 'Samsung', 'Externo resistente IP65.'],
        ['Lexar NM790 1TB', 'Lexar', 'Gen4 con disipador.'],
        ['TeamGroup MP44 2TB', 'TeamGroup', 'Alto rendimiento precio.'],
        ['Seagate Expansion 4TB', 'Seagate', 'USB 3.0 plug and play.'],
        ['WD My Passport 5TB', 'WD', 'Portátil cifrado hardware.'],
        ['Kingston XS2000 2TB', 'Kingston', 'USB-C pocket size.'],
        ['Sabrent Rocket 4 Plus 2TB', 'Sabrent', 'PS5 compatible heatsink.'],
        ['ADATA Legend 960 1TB', 'ADATA', 'NVMe 7400 MB/s.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 149 + i * 55, oferta: 129 + i * 45, dcto: 12,
        img: `${D}/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp`
    }));
}

function mkNetwork() {
    const img = U('1558618666-fcd25c949306');
    const items = [
        ['TP-Link Archer AX73', 'TP-Link', 'WiFi 6 router dual-band AX5400.'],
        ['ASUS RT-AX86U Pro', 'ASUS', 'Gaming router AiMesh, 2.5G port.'],
        ['Netgear Nighthawk AX8', 'Netgear', 'WiFi 6 8 streams cobertura amplia.'],
        ['Xiaomi Router AX3000', 'Xiaomi', 'WiFi 6 económico 4 antenas.'],
        ['TP-Link Deco M5 Mesh', 'TP-Link', 'Kit 3 nodos mesh hogar.'],
        ['Google Nest Wifi Pro', 'Google', 'WiFi 6E mesh sistema.'],
        ['Mercusys MW301R', 'Mercusys', 'Router N300 básico económico.'],
        ['Ubiquiti UniFi AP AC Pro', 'Ubiquiti', 'Access point enterprise.'],
        ['TP-Link TL-SG108', 'TP-Link', 'Switch 8 puertos Gigabit.'],
        ['Netgear GS308', 'Netgear', 'Switch no administrado metal.'],
        ['ASUS PCE-AX58BT', 'ASUS', 'WiFi 6E tarjeta PCIe.'],
        ['TP-Link Archer T3U Plus', 'TP-Link', 'Adaptador USB WiFi AC1300.'],
        ['Starlink Standard Kit', 'Starlink', 'Internet satelital alta velocidad.'],
        ['MikroTik hAP ax3', 'MikroTik', 'Router WiFi 6 RouterOS.'],
        ['D-Link DWR-961', 'D-Link', 'Router 4G LTE backup.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 199 + i * 70, oferta: 169 + i * 58, dcto: 14,
        img
    }));
}

function mkConsoles() {
    const items = [
        ['PlayStation 5 Slim Digital', 'Sony', 'SSD 1TB, DualSense incluido.'],
        ['Xbox Series X 1TB', 'Microsoft', '4K 120fps, Game Pass ready.'],
        ['Nintendo Switch OLED', 'Nintendo', 'Pantalla 7" OLED, 64GB.'],
        ['Steam Deck OLED 512GB', 'Valve', 'PC gaming portátil SteamOS.'],
        ['PlayStation 5 Disc Edition', 'Sony', 'Lector Ultra HD Blu-ray.'],
        ['Xbox Series S 512GB', 'Microsoft', 'Compacta next-gen digital.'],
        ['Nintendo Switch Lite', 'Nintendo', 'Portátil dedicada colores.'],
        ['PS5 DualSense Edge', 'Sony', 'Control pro personalizable.'],
        ['Xbox Elite Controller Series 2', 'Microsoft', 'Control premium ajustable.'],
        ['Nintendo Pro Controller', 'Nintendo', 'Control Switch ergonómico.'],
        ['PlayStation Portal', 'Sony', 'Streaming PS5 remoto.'],
        ['Meta Quest 3 128GB', 'Meta', 'VR mixed reality standalone.'],
        ['ASUS ROG Ally Z1 Extreme', 'ASUS', 'PC handheld Windows 11.'],
        ['Logitech G Cloud', 'Logitech', 'Cloud gaming handheld.'],
        ['Razer Kishi V2 Pro', 'Razer', 'Gamepad móvil USB-C.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 899 + i * 200, oferta: 849 + i * 175, dcto: 6,
        img: `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`
    }));
}

function mkSmartTv() {
    const img = U('1593359624479-15d47a30958d');
    const items = [
        ['Samsung Smart TV 55" Crystal UHD', 'Samsung', '4K Tizen, HDR, AirSlim.'],
        ['LG OLED C3 55"', 'LG', 'OLED evo 4K 120Hz Dolby Vision.'],
        ['Sony Bravia XR A80L 55"', 'Sony', 'OLED Cognitive Processor XR.'],
        ['TCL 55" C645 QLED', 'TCL', 'Google TV 4K QLED 120Hz.'],
        ['Hisense 58" U6K ULED', 'Hisense', 'Mini-LED 600 nits peak.'],
        ['Xiaomi TV A Pro 55"', 'Xiaomi', 'Android TV 4K HDR10+.'],
        ['Samsung Frame 55" 2024', 'Samsung', 'Modo arte, pantalla QLED.'],
        ['LG QNED80 65"', 'LG', 'Quantum Dot NanoCell 4K.'],
        ['Philips Ambilight 55"', 'Philips', 'Ambilight 3 lados inmersivo.'],
        ['Panasonic MX800 50"', 'Panasonic', 'Fire TV integrado Dolby Atmos.'],
        ['Samsung Neo QLED 65" QN85C', 'Samsung', 'Mini LED 4K 120Hz.'],
        ['Sony X90L 65" Full Array', 'Sony', 'LED zonas controladas gaming.'],
        ['TCL 65" C735 QLED', 'TCL', 'ONKYO audio Google TV.'],
        ['Hisense U8K 65" ULED', 'Hisense', '1600 nits peak IMAX Enhanced.'],
        ['LG StanbyME Go 27"', 'LG', 'Portable swiveling touchscreen.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 1799 + i * 350, oferta: 1599 + i * 300, dcto: 11,
        img
    }));
}

function mkSmartHome() {
    const items = [
        ['Amazon Echo Dot 5', 'Amazon', 'Alexa altavoz smart compacto.'],
        ['Google Nest Hub 7"', 'Google', 'Pantalla control hogar.'],
        ['Philips Hue Starter Kit', 'Philips', '3 bombillos + bridge WiZ.'],
        ['Xiaomi Smart Camera C200', 'Xiaomi', '360° 1080p visión nocturna.'],
        ['TP-Link Tapo C210', 'TP-Link', 'Cámara WiFi 360° 3MP.'],
        ['Samsung SmartThings Hub', 'Samsung', 'Centro automatización Zigbee.'],
        ['Aqara Door Sensor P2', 'Aqara', 'Sensor puerta Matter compatible.'],
        ['Ring Video Doorbell', 'Ring', 'Timbre video 1080p WiFi.'],
        ['Nest Thermostat', 'Google', 'Control temperatura inteligente.'],
        ['Xiaomi Mi Robot Vacuum S10', 'Xiaomi', 'Láser LDS navegación.'],
        ['Roborock Q Revo', 'Roborock', 'Robot aspirador estación auto.'],
        ['Sonoff SNZB-04P', 'Sonoff', 'Sensor puerta Zigbee 3.0.'],
        ['Meross Smart Plug', 'Meross', 'Enchufe WiFi programable.'],
        ['Aqara Smart Lock U100', 'Aqara', 'Cerradura huella Apple Home.'],
        ['Ecobee Smart Sensor', 'Ecobee', 'Sensor temperatura/humedad.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 99 + i * 65, oferta: 79 + i * 55, dcto: 15,
        img: `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`
    }));
}

function mkChargers() {
    const items = [
        ['Samsung 45W USB-C Cargador', 'Samsung', 'Carga súper rápida PPS.'],
        ['Apple 20W USB-C Adapter', 'Apple', 'Cargador oficial iPhone/iPad.'],
        ['Anker 737 Power Bank 24000mAh', 'Anker', '140W PD 3.0 laptop+phone.'],
        ['Xiaomi Power Bank 20000mAh', 'Xiaomi', '22.5W carga bidireccional.'],
        ['Belkin BoostCharge Pro 3-en-1', 'Belkin', 'Qi2 MagSafe Apple Watch.'],
        ['UGREEN Nexode 100W GaN', 'UGREEN', 'Cargador compacto 4 puertos.'],
        ['Baseus 65W GaN II', 'Baseus', 'Cargador pared triple USB-C.'],
        ['Anker PowerCore 10000mAh', 'Anker', 'Slim portátil PowerIQ.'],
        ['Samsung Wireless Charger Duo', 'Samsung', 'Teléfono + reloj simultáneo.'],
        ['Mophie Snap+ Juice Pack', 'Mophie', 'MagSafe batería magnética.'],
        ['Huawei SuperCharge 66W', 'Huawei', 'Cargador pared Huawei.'],
        ['Xiaomi 33W Power Bank 10000', 'Xiaomi', 'Compacto bolsillo.'],
        ['Belkin BoostCharge 15W', 'Belkin', 'Pad inalámbrico Qi.'],
        ['Cable USB-C 100W 2m Anker', 'Anker', 'PD e-mark chip seguro.'],
        ['Multi cargador 6 puertos', 'Ugreen', 'Estación carga familiar.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 49 + i * 35, oferta: 39 + i * 28, dcto: 18,
        img: `${D}/mobile-accessories/apple-iphone-charger/thumbnail.webp`
    }));
}

function mkPhoneAcc() {
    const items = [
        ['Funda iPhone 15 Pro Silicona', 'Apple', 'MagSafe compatible oficial.'],
        ['Funda Samsung S24 Ultra Clear', 'Samsung', 'Transparente anti-amarillo.'],
        ['Protector pantalla tempered', 'Belkin', 'Cristal templado 9H 2 piezas.'],
        ['Cable USB-C a Lightning 1m', 'Apple', 'Certificado MFi carga sync.'],
        ['Cable USB-C 2m 100W', 'Anker', 'Nylon trenzado PD e-mark.'],
        ['Soporte móvil auto magnético', 'Baseus', 'MagSafe ventilación 15W.'],
        ['Anillo soporte móvil', 'Spigen', 'Grip kickstand adhesivo.'],
        ['Lente clip macro smartphone', 'Apexel', 'Kit 3 lentes clip-on.'],
        ['Funda Xiaomi Redmi Note 13', 'Xiaomi', 'Silicona oficial colores.'],
        ['PopSocket MagSafe', 'PopSockets', 'Agarre intercambiable.'],
        ['Adaptador USB-C a 3.5mm', 'Google', 'Audio DAC digital.'],
        ['Estabilizador gimbal OM 6', 'DJI', 'Gimbal 3 ejes smartphone.'],
        ['Funda universal waterproof', 'JOTO', 'Bolsa estanca playa.'],
        ['Tarjeta microSD 256GB', 'SanDisk', 'Ultra 150MB/s smartphone.'],
        ['Kit limpieza pantalla', 'Whoosh', 'Spray + paño microfibra.']
    ];
    return items.map(([n, m, d], i) => ({
        nombre: n, marca: m, desc: d,
        precio: 29 + i * 25, oferta: 24 + i * 20, dcto: 15,
        img: i % 2 ? `${D}/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp` : `${D}/mobile-accessories/apple-iphone-charger/thumbnail.webp`
    }));
}

module.exports = { CATALOG };
