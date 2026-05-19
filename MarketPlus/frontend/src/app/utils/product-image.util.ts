/**
 * Imágenes de producto: DummyJSON CDN + Pexels (fotos reales).
 * Siempre prioriza el mapa por slug (más fiable que URLs viejas en BD).
 */
const D = 'https://cdn.dummyjson.com/product-images';
const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=85`;

const IMAGE_MAP: Record<string, string> = {
    // Celulares
    'samsung-galaxy-s24-ultra-256gb': `${D}/smartphones/iphone-13-pro/thumbnail.webp`,
    'iphone-15-pro-max-256gb': `${D}/smartphones/iphone-x/thumbnail.webp`,
    'xiaomi-redmi-note-13-pro-256gb': `${D}/smartphones/realme-c35/thumbnail.webp`,
    'samsung-galaxy-a54-5g-128gb': `${D}/smartphones/iphone-6/thumbnail.webp`,
    'motorola-edge-40-pro-256gb': `${D}/smartphones/oppo-f19-pro-plus/thumbnail.webp`,
    'huawei-p60-pro-256gb': `${D}/smartphones/oppo-k1/thumbnail.webp`,
    'samsung-galaxy-s23-fe-128gb': `${D}/smartphones/iphone-5s/thumbnail.webp`,
    'iphone-14-128gb': `${D}/smartphones/iphone-6/thumbnail.webp`,
    'xiaomi-13t-pro-256gb': `${D}/smartphones/realme-x/thumbnail.webp`,
    'motorola-moto-g84-256gb': `${D}/smartphones/realme-xt/thumbnail.webp`,
    // Refrigeradoras (fotos reales de electrodomésticos)
    'refrigeradora-samsung-rt38-400l': U('1571175443880-49e1d25b2bc5'),
    'refrigeradora-lg-door-in-door-430l': U('1584568694244-14fbdf83bd30'),
    'refrigeradora-mabe-rms400': U('1626804475297-41608ea09eca'),
    'refrigeradora-indurama-fr-450': U('1631545259747-c1e39a88a59a'),
    'refrigeradora-samsung-french-door-530l': U('1631889992176-688e8ba314e3'),
    'refrigeradora-lg-linear-420l': U('1571175443880-49e1d25b2bc5'),
    'refrigeradora-bosch-serie-4-360l': U('1584568694244-14fbdf83bd30'),
    'refrigeradora-mabe-top-mount-320l': U('1626804475297-41608ea09eca'),
    'refrigeradora-samsung-side-by-side-600l': U('1631889992176-688e8ba314e3'),
    'refrigeradora-lg-combi-380l': U('1631545259747-c1e39a88a59a'),
    // Laptops
    'lenovo-legion-5-pro-rtx4060': `${D}/laptops/lenovo-yoga-920/thumbnail.webp`,
    'asus-rog-strix-g16-rtx4070': `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp`,
    'macbook-air-m3-15-256gb': `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp`,
    'hp-pavilion-15-ryzen5': `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp`,
    'dell-inspiron-14-corei7': `${D}/laptops/huawei-matebook-x-pro/thumbnail.webp`,
    'lenovo-ideapad-slim-5': `${D}/laptops/lenovo-yoga-920/thumbnail.webp`,
    'asus-vivobook-15-oled': `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp`,
    'hp-victus-16-rtx4050': `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp`,
    'macbook-pro-14-m3': `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp`,
    'dell-g15-gaming-5530': `${D}/laptops/huawei-matebook-x-pro/thumbnail.webp`,
    // Accesorios
    'cargador-samsung-45w-usbc': `${D}/mobile-accessories/apple-iphone-charger/thumbnail.webp`,
    'funda-samsung-galaxy-s24-ultra': `${D}/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp`,
    'cargador-apple-20w-usbc': `${D}/mobile-accessories/apple-airpower-wireless-charger/thumbnail.webp`,
    'funda-iphone-15-pro-silicone': `${D}/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp`,
    'cable-usbc-2m-100w': `${D}/mobile-accessories/apple-iphone-charger/thumbnail.webp`,
    'mouse-logitech-mx-master-3s': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'teclado-logitech-mx-keys-s': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'powerbank-xiaomi-20000mah': `${D}/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp`,
    'protector-pantalla-samsung-pack-2': `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
    'adaptador-usbc-hdmi': `${D}/mobile-accessories/apple-iphone-charger/thumbnail.webp`,
    // Auriculares
    'airpods-pro-2-usbc': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'samsung-galaxy-buds3-pro': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'jbl-tune-770nc-bluetooth': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'sony-wh-1000xm5': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'jbl-wave-beam-2': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'airpods-4': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'samsung-galaxy-buds-fe': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'xiaomi-redmi-buds-5-pro': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'sony-linkbuds-s': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'auriculares-jbl-tune-520bt': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`
};

const CATEGORY_FALLBACK: Record<string, string> = {
    'celulares': `${D}/smartphones/iphone-13-pro/thumbnail.webp`,
    'celulares-smartphones': `${D}/smartphones/iphone-13-pro/thumbnail.webp`,
    'laptops': `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp`,
    'laptops-computadoras': `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp`,
    'computadoras-escritorio': `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp`,
    'tablets': `${D}/tablets/ipad-air-4/thumbnail.webp`,
    'smartwatches': `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
    'audifonos-headsets': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'auriculares-audio': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'accesorios-gamer': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'monitores': `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp`,
    'teclados-mouse': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'impresoras': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'camaras-fotografia': `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
    'parlantes-audio': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'componentes-pc': `${D}/laptops/lenovo-yoga-920/thumbnail.webp`,
    'almacenamiento': `${D}/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp`,
    'redes-wifi': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'consolas-videojuegos': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'smart-tv': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'hogar-inteligente': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'cargadores-powerbanks': `${D}/mobile-accessories/apple-iphone-charger/thumbnail.webp`,
    'accesorios-celulares': `${D}/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp`,
    'accesorios': `${D}/mobile-accessories/apple-iphone-charger/thumbnail.webp`
};

const PLACEHOLDER = 'assets/images/placeholder.svg';

function isTrustedImageUrl(url: string): boolean {
    return (
        url.includes('cdn.dummyjson.com') ||
        url.includes('images.unsplash.com') ||
        url.includes('images.pexels.com') ||
        url.startsWith('assets/')
    );
}

export function getCategoryFallbackUrl(categoriaSlug?: string): string {
    if (!categoriaSlug) return PLACEHOLDER;
    if (CATEGORY_FALLBACK[categoriaSlug]) return CATEGORY_FALLBACK[categoriaSlug];
    for (const [key, url] of Object.entries(CATEGORY_FALLBACK)) {
        if (categoriaSlug.includes(key)) return url;
    }
    return PLACEHOLDER;
}

export function getProductImageUrl(product: {
    slug?: string;
    categoria?: string;
    categoria_slug?: string;
    imagen_principal?: string;
}): string {
    // 1. Imagen en BD (catálogo maestro con URL verificada)
    const dbImg = product.imagen_principal?.trim();
    if (dbImg?.startsWith('http') && isTrustedImageUrl(dbImg)) {
        return dbImg;
    }

    // 2. Mapa por slug (productos legacy)
    if (product.slug && IMAGE_MAP[product.slug]) {
        return IMAGE_MAP[product.slug];
    }

    // 3. Fallback por categoría
    const catSlug = product.categoria_slug || '';
    if (catSlug) {
        const catUrl = getCategoryFallbackUrl(catSlug);
        if (catUrl !== PLACEHOLDER) return catUrl;
    }

    return PLACEHOLDER;
}
