export interface Cupon {
    id?: number;
    codigo: string;
    descripcion?: string;
    tipo: string;
    valor: number;
    minimo_compra?: number;
    maximo_descuento?: number;
    usos_maximos?: number;
    usos_actuales?: number;
    fecha_inicio: string;
    fecha_fin: string;
    estado?: string;
}
