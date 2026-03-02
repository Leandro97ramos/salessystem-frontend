import apiClient from '../api/apiClient';
import type { AppUser, UserRole, UserPermission } from '../types/auth';
import type { Person } from '../types/core';


/*
Los usuarios pueden ser Compradores o vendedores, esto se debe distinguir en el registro
*/

export interface CreateUserRequest {
    person: {
        first_name: string;
        last_name: string;
        identification: string;
        phone?: string;
        personal_address?: string;
    };
    user: {
        username: string;
        email: string;
        password_hash: string;
        company_id?: number | null;
    };
    // Añadimos esta propiedad para que el error desaparezca
    company?: {
        legal_name: string;
        tax_id: string;
        address?: string;
        phoneNumber?: string;
    };
    roles: string[]; // O el tipo que estés usando para los IDs de roles
}



export const userService = {
    /** Crea un usuario completo con su información personal */
    create: async (data: CreateUserRequest): Promise<AppUser> => {
        const response = await apiClient.post<AppUser>('/users', data);
        return response.data;
    },

    /** Obtiene la lista de usuarios con su información básica */
    getAll: async (): Promise<AppUser[]> => {
        const response = await apiClient.get<AppUser[]>('/users');
        return response.data;
    },

    /** Asigna roles a un usuario existente */
    assignRoles: async (userId: number, roleIds: number[]): Promise<void> => {
        await apiClient.post(`/users/${userId}/roles`, { roleIds });
    },

    /** Verifica si un email ya está registrado en el sistema */
    checkEmailExists: async (email: string): Promise<{ exists: boolean }> => {
        const response = await apiClient.get<{ exists: boolean }>(`/users/check-email?email=${email}`);
        return response.data;
    },

    /** Intento de login tradicional */
    login: async (email: string, password_hash: string): Promise<AppUser> => {
        const response = await apiClient.post<AppUser>('/auth/login', { email, password_hash });
        return response.data;
    }
};