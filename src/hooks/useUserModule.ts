import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, type CreateUserRequest } from '../services/userService';
import { companyService } from '../services/companyService';
import { configService } from '../services/configService';


export const useUserModule = () => {
    const queryClient = useQueryClient();

    // 1. Obtención de Empresas (Útil para que el Comprador seleccione una existente)
    const { data: companies, isLoading: isLoadingCompanies } = useQuery({
        queryKey: ['companies'],
        queryFn: companyService.getAll,
        staleTime: 1000 * 60 * 5, // 5 minutos de caché
    });

    // 2. Obtención de Roles dinámicos (Usando el eslabón 'ROLES')
    const { data: roles, isLoading: isLoadingRoles } = useQuery({
        queryKey: ['config', 'ROLES'],
        queryFn: () => configService.getDetallesByCabeceraCodigo('ROLES'),
        staleTime: 1000 * 60 * 10, // Los roles no cambian seguido, 10 min de caché
    });

    // 3. Mutación para crear el usuario (Persona + User + Roles + Opcional Company)
    const createUserMutation = useMutation({
        mutationFn: (data: CreateUserRequest) => userService.create(data), //
        onSuccess: () => {
            // Refresca cualquier lista de usuarios activa en el sistema
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const getDynamicConfig = (codigoCabecera: string) => {
        return configService.getDetallesByCabeceraCodigo(codigoCabecera);
    };

    return {
        // Datos de la DB
        companies: companies || [],
        roles: roles || [],

        // Estados de carga combinados
        isLoadingData: isLoadingCompanies || isLoadingRoles,

        // Estado de la mutación
        isCreating: createUserMutation.isPending,
        error: createUserMutation.error,

        // Acciones
        createUser: createUserMutation.mutateAsync,
        getDynamicConfig
    };
};

