export interface Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    telefono?: string;
    dni?: string;
    avatar?: string;
    role?: string;
    estado?: string;
    creado_en?: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        nombres: string;
        apellidos: string;
        email: string;
        role: string;
        avatar?: string;
        token: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    telefono?: string;
    dni?: string;
}
