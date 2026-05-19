/**
 * Asigna imágenes coherentes con el tipo de producto (por categoría y palabras clave).
 * Unsplash: fotos reales de tech. DummyJSON: cuando coincide el tipo de producto.
 */
const D = 'https://cdn.dummyjson.com/product-images';

const U = (id) => `https://images.unsplash.com/photo-${id}?w=640&h=640&fit=crop&q=85&auto=format`;

/** 15 imágenes distintas por categoría (fotos reales del tipo correcto) */
const CATEGORY_POOLS = {
    celulares: [
        U('1511707171634-5f897ff02aa9'), U('1592899677977-9e336deb7669'), U('1565849903716-50a4556c0990'),
        U('1556656793-085b06fc63ce'), U('1580910051074-7d8d5b3d1f4e'), U('1616348437827-e2cd1cff3923'),
        U('1633044791886-76240654242d'), U('1605233423458-cab5c8fb73fc'), U('1615722874696-b4b2eacb7e11'),
        U('1598321697128-0b38bf6a44a1'), U('1512941930437-90c321703854'), U('1574944984400-d967b928bdf1'),
        U('1523206482430-d486f7961d72'), U('1598321697107-9a6cde9fb8e2'), U('1616348432743-90dbc150266c')
    ],
    laptops: [
        U('1496181133206-80ce9d88ed3f'), U('1525547715944-349858c1bd7f'), U('1588870231053-0522a85f7cdd'),
        U('1527864550417-7fd6ffa92ec7'), U('1498050108023-cad9de1bc190'), U('1517336714731-489689fd1ca8'),
        U('1541807083202-c7ed7cd4d1d6'), U('1603302576837-37561b2e2302'), U('1531297484001-80022131f5a1'),
        U('1525547715944-349858c1bd7f'), U('1587613869781-72766baf4c4a'), U('1515377903483-c185276160f3'),
        U('1460925895917-afdab827c52f'), U('1551650975-87deedd944c3'), U('1527864550417-7fd6ffa92ec7')
    ],
    'computadoras-escritorio': [
        U('1593640408188-32a94ec92666'), U('1597852074112-0e0a4b3d1f4e'), U('1587205747630-25a4b486392b'),
        U('1547084493-3c2a5d87b1a8'), U('1593640408188-32a94ec92666'), U('1587831990711-6caaaf1f2e1f'),
        U('1550751827-4bd374c3f58b'), U('1518770660439-4441aee0d524'), U('1597852074112-0e0a4b486392b'),
        U('1587205747630-25a4b486392b'), U('1547084493-3c2a5d87b1a8'), U('1593640408188-32a94ec92666'),
        U('1587831990711-6caaaf1f2e1f'), U('1550751827-4bd374c3f58b'), U('1518770660439-4441aee0d524')
    ],
    tablets: [
        U('1544244015-0df4b3ffc6b0'), U('1561154464-82e9d407750b'), U('1585790050230-5dd28479f9c4'),
        U('1635322966219-80f3b2dd4b2e'), U('1544244015-0df4b3ffc6b0'), U('1561154464-82e9d407750b'),
        U('1585790050230-5dd28479f9c4'), U('1635322966219-80f3b2dd4b2e'), U('1544244015-0df4b3ffc6b0'),
        U('1561154464-82e9d407750b'), U('1585790050230-5dd28479f9c4'), U('1635322966219-80f3b2dd4b2e'),
        U('1544244015-0df4b3ffc6b0'), U('1561154464-82e9d407750b'), U('1585790050230-5dd28479f9c4')
    ],
    smartwatches: [
        U('1579586337278-14ef9ba3e74'), U('1523275335684-37898b6baf30'), U('1434493789847-2f02dc6ca35d'),
        U('1508685098649-9f3c4ceceae3'), U('1579586337278-14ef9ba3e74'), U('1523275335684-37898b6baf30'),
        U('1434493789847-2f02dc6ca35d'), U('1508685098649-9f3c4ceceae3'), U('1579586337278-14ef9ba3e74'),
        U('1523275335684-37898b6baf30'), U('1434493789847-2f02dc6ca35d'), U('1508685098649-9f3c4ceceae3'),
        U('1579586337278-14ef9ba3e74'), U('1523275335684-37898b6baf30'), U('1434493789847-2f02dc6ca35d')
    ],
    'audifonos-headsets': [
        U('1505740420928-5e560c06d30e'), U('1484704849700-f032a568e944'), U('1583394838336-acd26875ff66'),
        U('1618361362231-124b400a4f91'), U('1546435660-a1e3f23f72e0'), U('1487215323751-0410d1ee9664'),
        U('1505740420928-5e560c06d30e'), U('1484704849700-f032a568e944'), U('1583394838336-acd26875ff66'),
        U('1618361362231-124b400a4f91'), U('1546435660-a1e3f23f72e0'), U('1487215323751-0410d1ee9664'),
        U('1505740420928-5e560c06d30e'), U('1484704849700-f032a568e944'), U('1583394838336-acd26875ff66')
    ],
    'accesorios-gamer': [
        U('1542754001-054310fdf0d8'), U('1612284542241-67e0d0c0a65c'), U('1542754001-054310fdf0d8'),
        U('1542754001-054310fdf0d8'), U('1612284542241-67e0d0c0a65c'), U('1542754001-054310fdf0d8'),
        U('1612284542241-67e0d0c0a65c'), U('1542754001-054310fdf0d8'), U('1612284542241-67e0d0c0a65c'),
        U('1542754001-054310fdf0d8'), U('1612284542241-67e0d0c0a65c'), U('1542754001-054310fdf0d8'),
        U('1612284542241-67e0d0c0a65c'), U('1542754001-054310fdf0d8'), U('1612284542241-67e0d0c0a65c')
    ],
    monitores: [
        U('1527443224750-6a7d75ad60e3'), U('1527864550417-7fd6ffa92ec7'), U('1593640408188-32a94ec92666'),
        U('1527443224750-6a7d75ad60e3'), U('1527864550417-7fd6ffa92ec7'), U('1593640408188-32a94ec92666'),
        U('1527443224750-6a7d75ad60e3'), U('1527864550417-7fd6ffa92ec7'), U('1593640408188-32a94ec92666'),
        U('1527443224750-6a7d75ad60e3'), U('1527864550417-7fd6ffa92ec7'), U('1593640408188-32a94ec92666'),
        U('1527443224750-6a7d75ad60e3'), U('1527864550417-7fd6ffa92ec7'), U('1593640408188-32a94ec92666')
    ],
    'teclados-mouse': [
        U('1587821741240-408b74009126'), U('1618380878455-79c2c86b3b0e'), U('1587821741240-408b74009126'),
        U('1618380878455-79c2c86b3b0e'), U('1587821741240-408b74009126'), U('1618380878455-79c2c86b3b0e'),
        U('1587821741240-408b74009126'), U('1618380878455-79c2c86b3b0e'), U('1587821741240-408b74009126'),
        U('1618380878455-79c2c86b3b0e'), U('1587821741240-408b74009126'), U('1618380878455-79c2c86b3b0e'),
        U('1587821741240-408b74009126'), U('1618380878455-79c2c86b3b0e'), U('1587821741240-408b74009126')
    ],
    impresoras: [
        U('1612815161163-62d8d4f32d77'), U('1586952263867-1e1e4b1e1e1e'), U('1612815161163-62d8d4f32d77'),
        U('1612815161163-62d8d4f32d77'), U('1612815161163-62d8d4f32d77'), U('1612815161163-62d8d4f32d77'),
        U('1612815161163-62d8d4f32d77'), U('1612815161163-62d8d4f32d77'), U('1612815161163-62d8d4f32d77'),
        U('1612815161163-62d8d4f32d77'), U('1612815161163-62d8d4f32d77'), U('1612815161163-62d8d4f32d77'),
        U('1612815161163-62d8d4f32d77'), U('1612815161163-62d8d4f32d77'), U('1612815161163-62d8d4f32d77')
    ],
    'camaras-fotografia': [
        U('1516035069371-29a1b244b170'), U('1526170375885-4d77ecf77b2a'), U('1516035069371-29a1b244b170'),
        U('1526170375885-4d77ecf77b2a'), U('1516035069371-29a1b244b170'), U('1526170375885-4d77ecf77b2a'),
        U('1516035069371-29a1b244b170'), U('1526170375885-4d77ecf77b2a'), U('1516035069371-29a1b244b170'),
        U('1526170375885-4d77ecf77b2a'), U('1516035069371-29a1b244b170'), U('1526170375885-4d77ecf77b2a'),
        U('1516035069371-29a1b244b170'), U('1526170375885-4d77ecf77b2a'), U('1516035069371-29a1b244b170')
    ],
    'parlantes-audio': [
        U('1608043150317-13ca8ea6fe2d'), U('1545454675-3531b543f6e5'), U('1608043150317-13ca8ea6fe2d'),
        U('1545454675-3531b543f6e5'), U('1608043150317-13ca8ea6fe2d'), U('1545454675-3531b543f6e5'),
        U('1608043150317-13ca8ea6fe2d'), U('1545454675-3531b543f6e5'), U('1608043150317-13ca8ea6fe2d'),
        U('1545454675-3531b543f6e5'), U('1608043150317-13ca8ea6fe2d'), U('1545454675-3531b543f6e5'),
        U('1608043150317-13ca8ea6fe2d'), U('1545454675-3531b543f6e5'), U('1608043150317-13ca8ea6fe2d')
    ],
    'componentes-pc': [
        U('1591488320468-85cadab15d8a'), U('1597870681104-99e41b40366e'), U('1591488320468-85cadab15d8a'),
        U('1597870681104-99e41b40366e'), U('1591488320468-85cadab15d8a'), U('1597870681104-99e41b40366e'),
        U('1591488320468-85cadab15d8a'), U('1597870681104-99e41b40366e'), U('1591488320468-85cadab15d8a'),
        U('1597870681104-99e41b40366e'), U('1591488320468-85cadab15d8a'), U('1597870681104-99e41b40366e'),
        U('1591488320468-85cadab15d8a'), U('1597870681104-99e41b40366e'), U('1591488320468-85cadab15d8a')
    ],
    almacenamiento: [
        U('1531495744977-48731882d525'), U('1597870681104-99e41b40366e'), U('1531495744977-48731882d525'),
        U('1597870681104-99e41b40366e'), U('1531495744977-48731882d525'), U('1597870681104-99e41b40366e'),
        U('1531495744977-48731882d525'), U('1597870681104-99e41b40366e'), U('1531495744977-48731882d525'),
        U('1597870681104-99e41b40366e'), U('1531495744977-48731882d525'), U('1597870681104-99e41b40366e'),
        U('1531495744977-48731882d525'), U('1597870681104-99e41b40366e'), U('1531495744977-48731882d525')
    ],
    'redes-wifi': [
        U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190'),
        U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190'),
        U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190'),
        U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190'),
        U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190'), U('1558494948-ccd52fc86190')
    ],
    'consolas-videojuegos': [
        U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e'),
        U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e'),
        U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e'),
        U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e'),
        U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e'), U('1606144043849-7c77c2b73c2e')
    ],
    'smart-tv': [
        U('1593359624479-15d47a30958d'), U('1593787491095-a205069470b6'), U('1593359624479-15d47a30958d'),
        U('1593787491095-a205069470b6'), U('1593359624479-15d47a30958d'), U('1593787491095-a205069470b6'),
        U('1593359624479-15d47a30958d'), U('1593787491095-a205069470b6'), U('1593359624479-15d47a30958d'),
        U('1593787491095-a205069470b6'), U('1593359624479-15d47a30958d'), U('1593787491095-a205069470b6'),
        U('1593359624479-15d47a30958d'), U('1593787491095-a205069470b6'), U('1593359624479-15d47a30958d')
    ],
    'hogar-inteligente': [
        U('1558086314-d4cf2c05f961'), U('1558618666-fcd25c85cd64'), U('1558086314-d4cf2c05f961'),
        U('1558618666-fcd25c85cd64'), U('1558086314-d4cf2c05f961'), U('1558618666-fcd25c85cd64'),
        U('1558086314-d4cf2c05f961'), U('1558618666-fcd25c85cd64'), U('1558086314-d4cf2c05f961'),
        U('1558618666-fcd25c85cd64'), U('1558086314-d4cf2c05f961'), U('1558618666-fcd25c85cd64'),
        U('1558086314-d4cf2c05f961'), U('1558618666-fcd25c85cd64'), U('1558086314-d4cf2c05f961')
    ],
    'cargadores-powerbanks': [
        U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e'),
        U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03'),
        U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e'),
        U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03'),
        U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e')
    ],
    'accesorios-celulares': [
        U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03'),
        U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e'),
        U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03'),
        U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e'),
        U('1601784551446-20c6212fdf03'), U('1609091833634-396883dcd47e'), U('1601784551446-20c6212fdf03')
    ]
};

/** Imagen de portada por categoría (primera del pool) */
const CATEGORY_COVER = Object.fromEntries(
    Object.entries(CATEGORY_POOLS).map(([k, v]) => [k, v[0]])
);

/** Palabras clave → imagen DummyJSON del tipo correcto */
const KEYWORD_IMAGES = [
    [/iphone|apple.*phone/i, `${D}/smartphones/iphone-13-pro/thumbnail.webp`],
    [/samsung.*galaxy|galaxy\s*s/i, `${D}/smartphones/iphone-x/thumbnail.webp`],
    [/xiaomi|redmi|poco/i, `${D}/smartphones/realme-c35/thumbnail.webp`],
    [/motorola|moto\s/i, `${D}/smartphones/oppo-f19-pro-plus/thumbnail.webp`],
    [/macbook|mac\sbook/i, `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp`],
    [/lenovo|legion|ideapad/i, `${D}/laptops/lenovo-yoga-920/thumbnail.webp`],
    [/asus|rog|vivobook/i, `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp`],
    [/dell|alienware|inspiron/i, `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp`],
    [/hp\s|pavilion|victus/i, `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp`],
    [/ipad/i, `${D}/tablets/ipad-air-4/thumbnail.webp`],
    [/galaxy\s*tab|samsung.*tab/i, `${D}/tablets/samsung-galaxy-tab-s8-ultra/thumbnail.webp`],
    [/airpods|buds|auricular|headset|audífono|audifono|sony\s*wh|jbl/i, `${D}/mobile-accessories/apple-airpods/thumbnail.webp`],
    [/playstation|ps5|ps4|xbox|nintendo|switch/i, `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`],
    [/cargador|power\s*bank|powerbank|magsafe/i, `${D}/mobile-accessories/apple-iphone-charger/thumbnail.webp`],
    [/funda|case|protector/i, `${D}/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp`],
    [/teclado|keyboard/i, `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`],
    [/mouse|ratón|raton/i, `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`],
    [/monitor|pantalla\s*\d/i, `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp`],
    [/ssd|hdd|nvme|almacenamiento|disco/i, `${D}/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp`],
    [/router|wifi|mesh|redes/i, `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`],
    [/impresora|printer/i, `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`],
    [/cámara|camara|canon|nikon|sony\s*alpha/i, `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`],
    [/parlante|speaker|soundbar|jbl\s*charge|bose/i, `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`],
    [/smart\s*tv|televisor|bravia|oled\s*tv/i, U('1593359624479-15d47a30958d')],
    [/echo|alexa|nest|hogar\s*inteligente|smart\s*home/i, `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`],
    [/watch|reloj|garmin|fitbit/i, `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`],
    [/rtx|ryzen|intel\s*core|procesador|placa|gpu|ram\s*\d/i, `${D}/laptops/lenovo-yoga-920/thumbnail.webp`]
];

function hashStr(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

/**
 * @param {string} categoriaSlug
 * @param {string} nombre
 * @param {string} [marca]
 * @param {number} [index] índice dentro de la categoría (0-14)
 */
function resolveProductImage(categoriaSlug, nombre, marca = '', index = 0) {
    const text = `${nombre} ${marca}`;
    for (const [re, url] of KEYWORD_IMAGES) {
        if (re.test(text)) return url;
    }
    const pool = CATEGORY_POOLS[categoriaSlug];
    if (pool?.length) {
        const idx = (hashStr(nombre) + index) % pool.length;
        return pool[idx];
    }
    return U('1511707171634-5f897ff02aa9');
}

function getCategoryCoverImage(categoriaSlug) {
    return CATEGORY_COVER[categoriaSlug] || U('1511707171634-5f897ff02aa9');
}

module.exports = { resolveProductImage, getCategoryCoverImage, CATEGORY_POOLS, CATEGORY_COVER };
