export function getProductImageUrl(product: any): string {
    if (product.imagen_principal) {
        return `assets/images/${product.imagen_principal}`;
    }
    if (product.categoria_slug) {
        return `assets/images/${product.categoria_slug}/placeholder.svg`;
    }
    return 'assets/images/placeholder.svg';
}

export function getCategoryFallbackUrl(categorySlug: string | undefined): string {
    if (!categorySlug) return 'assets/images/placeholder.svg';
    return `assets/images/${categorySlug}/placeholder.svg`;
}
