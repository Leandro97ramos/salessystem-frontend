import React, { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { useUserModule } from '../../../hooks/useUserModule';
import type { CreateUserRequest } from '../../../services/userService';
import { Toast } from 'primereact/toast';      // Componente de notificación
import { useNavigate } from 'react-router-dom';



interface UserFormProps {
    onAuthSuccess?: (role: 'SELLER' | 'BUYER') => void;
}



// Opciones para distinguir el flujo de registro
const userTypeOptions = [
    { label: 'Vendedor (Interno)', value: 'SELLER' },
    { label: 'Comprador (Cliente)', value: 'BUYER' }
];

export const UserForm = ({ onAuthSuccess }: UserFormProps) => {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const { companies, roles, isLoadingData, isCreating, createUser } = useUserModule();
    const [userType, setUserType] = useState('SELLER');
    
    // Estado inicial basado en tus interfaces: Person, AppUser y Roles
    const [formData, setFormData] = useState({
        person: { first_name: '', last_name: '', identification: '', phone: '', personal_address: '' },
        user: { username: '', email: '', password_hash: '', company_id: null as number | null },
        selectedRoles: [] as number[]
    });

    const onSave = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const payload: CreateUserRequest = {
            person: { ...formData.person }, // Datos de la tabla 'person'
            user: {
                username: formData.user.username,
                email: formData.user.email,
                password_hash: formData.user.password_hash,
                // Si es SELLER, no enviamos company_id (o enviamos undefined)
                company_id: userType === 'BUYER' ? formData.user.company_id : undefined,
                // No incluimos person_id porque enviamos el objeto 'person' arriba
            },
            roles: formData.selectedRoles // Mapeo a 'roles' como espera el servicio
        };
    
        try {
            await createUser(payload);

            // Notificación de Éxito
            if (onAuthSuccess) {
                const roleDetermined = userType === 'BUYER' ? 'BUYER' : 'SELLER';
                onAuthSuccess(roleDetermined);
                // La redirección a /dashboard la hará el App.tsx al cambiar el estado
            } else {
                // Si se usa desde adentro del panel de admin, solo avisamos éxito
                toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado' });
            }

        } catch (err) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo crear el usuario. Revisa los datos o la conexión.',
                life: 5000
            });
        }
    };

    if (isLoadingData) return <div className="p-4">Cargando configuraciones...</div>;

    return (
        <div className="flex justify-content-center p-4">
            <Toast ref={toast} />
            <Card title="Registro de Usuario" className="w-full md:w-10 lg:w-8 shadow-2">
                <form onSubmit={onSave} className="p-fluid grid">
                    
                    {/* 1. Selector de Tipo de Usuario */}
                    <div className="col-12 mb-3">
                        <label className="block mb-2 font-bold">Tipo de Perfil</label>
                        <SelectButton 
                            value={userType} 
                            options={userTypeOptions} 
                            onChange={(e) => setUserType(e.value)} 
                        />
                    </div>

                    {/* 2. Sección de Datos Personales (Person) */}
                    <div className="col-12"><h5>Información Personal</h5></div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText id="first_name" value={formData.person.first_name} onChange={(e) => setFormData({...formData, person: {...formData.person, first_name: e.target.value}})} required />
                            <label htmlFor="first_name">Nombres</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText id="last_name" value={formData.person.last_name} onChange={(e) => setFormData({...formData, person: {...formData.person, last_name: e.target.value}})} required />
                            <label htmlFor="last_name">Apellidos</label>
                        </span>
                    </div>

                    {/* 3. Sección de Cuenta (AppUser) */}
                    <div className="col-12 mt-3"><h5>Credenciales de Acceso</h5></div>
                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <InputText id="username" value={formData.user.username} onChange={(e) => setFormData({...formData, user: {...formData.user, username: e.target.value}})} required />
                            <label htmlFor="username">Nombre de Usuario</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-8">
                        <span className="p-float-label">
                            <InputText id="email" type="email" value={formData.user.email} onChange={(e) => setFormData({...formData, user: {...formData.user, email: e.target.value}})} required />
                            <label htmlFor="email">Correo Electrónico</label>
                        </span>
                    </div>

                    {/* 4. Asignación Lógica (Empresa y Roles) */}
                    <div className="col-12 mt-3"><h5>Configuración del Sistema</h5></div>
                    
                    {/* RENDERIZADO CONDICIONAL: Solo si es COMPRADOR */}
                    {userType === 'BUYER' && (
                        <div className="field col-12 md:col-6 animate-fadein">
                            <label htmlFor="company" className="font-semibold">Empresa del Comprador</label>
                            <Dropdown 
                                id="company" 
                                value={formData.user.company_id} 
                                options={companies} 
                                optionLabel="legal_name" 
                                optionValue="id" 
                                placeholder="Seleccione una Empresa"
                                onChange={(e) => setFormData({...formData, user: {...formData.user, company_id: e.value}})}
                                filter // Para búsqueda rápida
                            />
                        </div>
                    )}

                    <div className={`field col-12 ${userType === 'BUYER' ? 'md:col-6' : 'md:col-12'}`}>
                        <label htmlFor="roles" className="font-semibold">Roles del Sistema</label>
                        <MultiSelect 
                            id="roles" 
                            value={formData.selectedRoles} 
                            options={roles} 
                            optionLabel="nombre" 
                            optionValue="configuracion_det_id" 
                            placeholder="Asigne uno o más roles"
                            onChange={(e) => setFormData({...formData, selectedRoles: e.value})} 
                        />
                    </div>

                    <div className="col-12 flex justify-content-end mt-4">
                        <Button label="Crear Usuario" icon="pi pi-check" loading={isCreating} className="w-auto p-button-lg" />
                    </div>
                </form>
            </Card>
        </div>
    );
};