const PROFESSIONAL_FALLBACK = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&q=85&auto=format';

export function getProductImageUrl(product: any): string {
    if (product.imagen_principal && /^https?:\/\//i.test(product.imagen_principal)) {
        return product.imagen_principal;
    }

    return PROFESSIONAL_FALLBACK;
}

export function getCategoryFallbackUrl(categorySlug: string | undefined): string {
    return PROFESSIONAL_FALLBACK;
}
