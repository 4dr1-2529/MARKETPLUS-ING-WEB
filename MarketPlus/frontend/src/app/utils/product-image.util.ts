/**
 * Imágenes de producto: DummyJSON CDN + Pexels (fotos reales).
 * Siempre prioriza el mapa por slug (más fiable que URLs viejas en BD).
 */
const D = 'https://cdn.dummyjson.com/product-images';
const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=85`;

const IMAGE_MAP: Record<string, string> = {
    // Celulares
    'samsung-galaxy-s24-ultra-256gb': `${D}/smartphones/samsung-galaxy-s23/thumbnail.webp`,
    'iphone-15-pro-max-256gb': `${D}/smartphones/iphone-13-pro/thumbnail.webp`,
    'xiaomi-redmi-note-13-pro-256gb': `${D}/smartphones/realme-c35/thumbnail.webp`,
    'samsung-galaxy-a54-5g-128gb': `${D}/smartphones/samsung-galaxy-s23/thumbnail.webp`,
    'motorola-edge-40-pro-256gb': `${D}/smartphones/oppo-f19-pro-plus/thumbnail.webp`,
    'huawei-p60-pro-256gb': `${D}/smartphones/oppo-k1/thumbnail.webp`,
    'samsung-galaxy-s23-fe-128gb': `${D}/smartphones/samsung-galaxy-s23/thumbnail.webp`,
    'iphone-14-128gb': `${D}/smartphones/iphone-x/thumbnail.webp`,
    'xiaomi-13t-pro-256gb': `${D}/smartphones/realme-x/thumbnail.webp`,
    'motorola-moto-g84-256gb': `${D}/smartphones/realme-xt/thumbnail.webp`,
    // Laptops
    'lenovo-legion-5-pro-rtx4060': `${D}/laptops/lenovo-yoga-920/thumbnail.webp`,
    'asus-rog-strix-g16-rtx4070': `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp`,
    'macbook-air-m3-15-256gb': `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp`,
    'hp-pavilion-15-ryzen5': `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp`,
    'dell-inspiron-14-corei7': `${D}/laptops/huawei-matebook-x-pro/thumbnail.webp`,
    // Tablets
    'ipad-air-m2-11-128gb': `${D}/tablets/ipad-air-4/thumbnail.webp`,
    'samsung-galaxy-tab-s9-fe-128gb': `${D}/tablets/samsung-galaxy-tab-s8/thumbnail.webp`,
    // Audífonos
    'airpods-pro-2-usbc': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'samsung-galaxy-buds3-pro': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'jbl-tune-770nc-bluetooth': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    // Smartwatch
    'samsung-galaxy-watch-6-classic-47mm': `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
    'apple-watch-series-9-45mm': `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
    'xiaomi-smart-band-8-pro': `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
    // Accesorios
    'cargador-samsung-45w-usbc': `${D}/mobile-accessories/apple-iphone-charger/thumbnail.webp`,
    'mouse-logitech-mx-master-3s': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'teclado-logitech-mx-keys-s': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    // Gaming
    'monitor-asus-rog-swift-27-165hz': `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp`,
    'teclado-mecanico-logitech-g-pro-x': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    // Televisores
    'samsung-smart-tv-55-4k-crystal': U('1593797792981-40f0854f822f'),
    'sony-bravia-50-4k-google-tv': U('1593797792981-40f0854f822f')
};

const CATEGORY_FALLBACK: Record<string, string> = {
    'celulares': `${D}/smartphones/iphone-13-pro/thumbnail.webp`,
    'celulares-smartphones': `${D}/smartphones/iphone-13-pro/thumbnail.webp`,
    'laptops': `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp`,
    'laptops-computadoras': `${D}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp`,
    'computadoras-escritorio': `${D}/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp`,
    'tablets': `${D}/tablets/ipad-air-4/thumbnail.webp`,
    'smartwatch': `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
    'smartwatch-wearables': `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
    'audifonos': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'audifonos-audio': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'audifonos-headsets': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'auriculares-audio': `${D}/mobile-accessories/apple-airpods/thumbnail.webp`,
    'accesorios-gamer': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'gaming': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'monitores': `${D}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp`,
    'teclados-mouse': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'impresoras': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'camaras-fotografia': `${D}/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp`,
    'parlantes-audio': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'componentes-pc': `${D}/laptops/lenovo-yoga-920/thumbnail.webp`,
    'almacenamiento': `${D}/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp`,
    'redes-wifi': `${D}/mobile-accessories/amazon-echo-plus/thumbnail.webp`,
    'consolas-videojuegos': `${D}/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp`,
    'smart-tv': U('1593797792981-40f0854f822f'),
    'televisores': U('1593797792981-40f0854f822f'),
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
