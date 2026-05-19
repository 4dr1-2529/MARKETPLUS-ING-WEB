export interface Valoracion {
    id?: number;
    usuario_id?: number;
    producto_id: number;
    pedido_id?: number;
    calificacion: number;
    comentario?: string;
    estado?: string;
    creado_en?: string;
    usuario_nombre?: string;
}
