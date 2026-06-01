export type TipoEntrega = 'domicilio' | 'recojo_tienda';

export interface Direccion {
    id?: number;
    usuario_id?: number;
    tipo: TipoEntrega | string;
    destinatario: string;
    direccion_linea1: string;
    direccion_linea2?: string;
    departamento: string;
    provincia: string;
    distrito: string;
    codigo_postal?: string;
    referencia?: string;
    telefono?: string;
    dni_contacto?: string;
    es_principal: boolean;
    creado_en?: string;
}
