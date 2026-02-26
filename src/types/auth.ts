/*
AppUser <- Refiere al usuarui en si

*/

export interface AppUser {
    id: number;
    person_id: number;
    username: string;
    password_hash: string;
    email: string;
    company_id?: number | null; // <-- Cambiado a opcional y nullable
}

export interface UserRole {
    id: number,
    user_id: number,
    role_config_det_id: number,
    status: boolean
}

export interface UserPermission {
    id: number,
    user_id: number,
    permission_config_det_id: number,
    permission_level: string

}

