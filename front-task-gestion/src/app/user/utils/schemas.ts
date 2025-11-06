export interface UsuarioApiResponse{
    id: number;
    nombre: string;
    email: string;
    estado: 'activo' | 'inactivo';
}

export interface Usuario extends UsuarioApiResponse{
    codigo: string;
    avatar: string;
}

export interface ChangePasswordRequest{
    userId: number;
    old_password: string;
    new_password:    string;
}