/** Nombres cortos para la UI del cliente */
const LABELS: Record<string, string> = {
    'celulares': 'Celulares',
    'celulares-smartphones': 'Celulares',
    'laptops': 'Laptops',
    'laptops-computadoras': 'Laptops',
    'computadoras-escritorio': 'PC Escritorio',
    'tablets': 'Tablets',
    'smartwatches': 'Smartwatches',
    'smartwatch-wearables': 'Smartwatches',
    'audifonos-headsets': 'Audífonos',
    'auriculares-audio': 'Audífonos',
    'audifonos-audio': 'Audífonos',
    'accesorios-gamer': 'Gaming',
    'monitores': 'Monitores',
    'teclados-mouse': 'Teclado y Mouse',
    'impresoras': 'Impresoras',
    'camaras-fotografia': 'Cámaras',
    'parlantes-audio': 'Parlantes',
    'componentes-pc': 'Componentes PC',
    'almacenamiento': 'Almacenamiento',
    'redes-wifi': 'Redes y WiFi',
    'consolas-videojuegos': 'Consolas',
    'smart-tv': 'Smart TV',
    'hogar-inteligente': 'Hogar Inteligente',
    'cargadores-powerbanks': 'Cargadores',
    'accesorios-celulares': 'Accesorios Celular',
    'accesorios': 'Accesorios',
    'refrigeradoras': 'Refrigeradoras'
};

export function getCategoryLabel(slug: string, fallback?: string): string {
    return LABELS[slug] || fallback || slug;
}
