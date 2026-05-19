export interface Notificacion {
    id?: number;
    usuario_id?: number;
    titulo: string;
    mensaje: string;
    tipo: string;
    leido: boolean;
    enlace?: string;
    creado_en?: string;
}
