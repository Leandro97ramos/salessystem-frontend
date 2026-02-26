import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, type CreateUserRequest } from '../services/userService';
import { companyService } from '../services/companyService';
import { configService } from '../services/configService';

export const useUserModule = () => {
    const queryClient = useQueryClient();

    // 1. Hook para obtener empresas (para el Dropdown)
    const companiesQuery = useQuery({
        queryKey: ['companies'],
        queryFn: companyService.getAll,
        staleTime: 1000 * 60 * 5, // 5 minutos de caché
    });

    // 2. Hook para obtener los roles disponibles (de configuracion_det)
    const rolesQuery = useQuery({
        queryKey: ['config', 'ROLES'],
        queryFn: () => configService.getDetallesByCabeceraCodigo('ROLES'),
    });

    // 3. Mutación para crear el usuario
    const createUserMutation = useMutation({
        mutationFn: (data: CreateUserRequest) => userService.create(data),
        onSuccess: () => {
            // Invalida la lista de usuarios para que se refresque automáticamente
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    return {
        companies: companiesQuery.data || [],
        roles: rolesQuery.data || [],
        isLoadingData: companiesQuery.isLoading || rolesQuery.isLoading,
        isCreating: createUserMutation.isPending,
        createUser: createUserMutation.mutateAsync,
        error: createUserMutation.error
    };
};