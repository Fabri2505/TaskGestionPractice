export interface UsuarioApiResponse{
    id: number;
    nombre: string;
    email: string;
}

export interface Usuario extends UsuarioApiResponse{
    codigo: string;
    avatar?: string;
}