const formatPrice = (price: number): string => {
    return `S/ ${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

const generateSlug = (text: string): string => {
    return text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

export { formatPrice, formatDate, truncateText, generateSlug };
