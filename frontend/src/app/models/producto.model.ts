export interface Producto {
    id: number;
    nombre: string;
    slug: string;
    descripcion?: string;
    precio: number;
    precio_oferta?: number;
    descuento_porcentaje?: number;
    sku: string;
    estado: string;
    destacado: boolean;
    nuevo: boolean;
    imagen_principal?: string;
    imagenes?: string[];
    visitas?: number;
    ventas?: number;
    garantia_meses?: number;
    categoria?: string;
    marca?: string;
    categoria_slug?: string;
    marca_slug?: string;
    promedio_valoracion?: number;
    total_valoraciones?: number;
    especificaciones?: any;
    creado_en?: string;
}

export interface ProductoResponse {
    success: boolean;
    data: Producto[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

export interface ProductoDetailResponse {
    success: boolean;
    data: Producto;
    related: Producto[];
    reviews: Review[];
}

export interface Review {
    id: number;
    calificacion: number;
    comentario: string;
    nombres: string;
    apellidos: string;
    avatar?: string;
    creado_en: string;
}
