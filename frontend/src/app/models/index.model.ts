export interface Categoria {
    id: number;
    nombre: string;
    slug: string;
    descripcion?: string;
    imagen?: string;
    padre_id?: number;
    estado: string;
    total_productos?: number;
}

export interface Marca {
    id: number;
    nombre: string;
    slug: string;
    logo?: string;
    pais_origen?: string;
    sitio_web?: string;
    estado: string;
    total_productos?: number;
}

export interface CarritoItem {
    id: number;
    producto_id: number;
    nombre: string;
    slug: string;
    imagen_principal?: string;
    precio: number;
    precio_oferta?: number;
    precio_unitario: number;
    cantidad: number;
    categoria?: string;
    marca?: string;
    stock_disponible?: number;
}

export interface CarritoResponse {
    success: boolean;
    data: {
        items: CarritoItem[];
        subtotal: number;
        total_items: number;
    };
}

export interface Pedido {
    id: number;
    numero_pedido: string;
    subtotal: number;
    descuento: number;
    igv: number;
    costo_envio: number;
    total: number;
    estado: string;
    metodo_pago?: string;
    tracking_numero?: string;
    creado_en: string;
    nombres?: string;
    apellidos?: string;
}

export interface DashboardStats {
    total_ventas: number;
    ingresos_totales: number;
    total_usuarios: number;
    total_productos: number;
    pedidos_mes: number;
    ingresos_mes: number;
}
