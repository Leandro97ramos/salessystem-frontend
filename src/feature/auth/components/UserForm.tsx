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
import { Divider } from 'primereact/divider';  // Componente de división
import { useLocation, useNavigate } from 'react-router-dom';



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
    const location = useLocation();
    const toast = useRef<Toast>(null);
    const { companies, roles, isLoadingData, isCreating, createUser } = useUserModule();
    const [userType, setUserType] = useState('SELLER');

    const prefilledEmail = location.state?.email || '';
    const prefilledPassword = location.state?.password || '';




    // Estado inicial basado en tus interfaces: Person, AppUser y Roles
    const [formData, setFormData] = useState({
        person: {
            first_name: '',
            last_name: '',
            identification: '',
            phone: '',
            personal_address: ''
        },
        user: {
            username: '',
            email: prefilledEmail,
            password_hash: prefilledPassword, // Ya viene cargado
            company_id: null
        },
        company: {
            legal_name: '',
            tax_id: '',
            personal_address: '',
            phoneNumber: ''
        },

        selectedRoles: []
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
            company: userType === 'SELLER' ? formData.company : undefined,
            roles: formData.selectedRoles // Mapeo a 'roles' como espera el servicio
        };

        try {
            await createUser(payload);
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Cuenta creada correctamente' });

            if (onAuthSuccess) {
                onAuthSuccess(userType as 'SELLER' | 'BUYER');
            } else {
                setTimeout(() => navigate('/dashboard'), 2000);
            }
        } catch (err) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al registrarse' });
        }
    };

    //if (isLoadingData) return <div className="p-4">Cargando...</div>;

    return (
        <div className="flex justify-content-center p-4">
            <Toast ref={toast} />
            <Card title="Registro de Usuario" className="w-full md:w-10 lg:w-8 shadow-2">
                <form onSubmit={onSave} className="p-fluid grid">

                    {/* Selector de Perfil - Esto define el ROL automáticamente */}
                    <div className="col-12 mb-4">
                        <label className="block mb-2 font-bold text-center">Selecciona tu Rol en el Sistema</label>
                        <SelectButton
                            value={userType}
                            options={[
                                { label: 'Vendedor', value: 'SELLER' },
                                { label: 'Comprador', value: 'BUYER' }
                            ]}
                            onChange={(e) => setUserType(e.value)}
                            className="flex justify-content-center"
                        />
                    </div>

                    {/* 2. Sección de Datos Personales (Person) */}
                    <div className="col-12"><h5>Información Personal</h5></div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText id="first_name" value={formData.person.first_name} onChange={(e) => setFormData({ ...formData, person: { ...formData.person, first_name: e.target.value } })} required />
                            <label htmlFor="first_name">Nombres</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText id="last_name" value={formData.person.last_name} onChange={(e) => setFormData({ ...formData, person: { ...formData.person, last_name: e.target.value } })} required />
                            <label htmlFor="last_name">Apellidos</label>
                        </span>
                    </div>



                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <InputText value={formData.person.identification} onChange={(e) => setFormData({ ...formData, person: { ...formData.person, identification: e.target.value } })} required />
                            <label >Identificación (DNI/Cédula)</label>
                        </span>
                    </div>

                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <InputText value={formData.person.phone} onChange={(e) => setFormData({ ...formData, person: { ...formData.person, phone: e.target.value } })} />
                            <label >Teléfono</label>
                        </span>
                    </div>

                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <InputText value={formData.person.personal_address} onChange={(e) => setFormData({ ...formData, person: { ...formData.person, personal_address: e.target.value } })} />
                            <label >Dirección Personal</label>
                        </span>
                    </div>

                    {/* 3. Sección de Cuenta (AppUser) */}
                    <div className="col-12 mt-3"><h5>Credenciales de Acceso</h5></div>
                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <InputText id="username" value={formData.user.username} onChange={(e) => setFormData({ ...formData, user: { ...formData.user, username: e.target.value } })} required />
                            <label htmlFor="username">Nombre de Usuario</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-8">
                        <span className="p-float-label">
                            <InputText id="email" type="email" value={formData.user.email} onChange={(e) => setFormData({ ...formData, user: { ...formData.user, email: e.target.value } })} required />
                            <label htmlFor="email">Correo Electrónico</label>
                        </span>
                    </div>

                    {/* RENDERIZADO CONDICIONAL: Solo si es COMPRADOR */}
                    {userType === 'SELLER' && (
                        <>
                            <div className="col-12 mt-4">
                                <Divider align="left"><b>Datos de la Empresa</b></Divider></div>
                            <div className="field col-12 md:col-6">
                                <label className="font-bold">Nombre Legal</label>
                                <InputText value={formData.company.legal_name} onChange={(e) => setFormData({ ...formData, company: { ...formData.company, legal_name: e.target.value } })} required />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label className="font-bold">Tax ID / RUT</label>
                                <InputText value={formData.company.tax_id} onChange={(e) => setFormData({ ...formData, company: { ...formData.company, tax_id: e.target.value } })} required />
                            </div>
                        </>
                    )}

                    <div className="col-12 flex justify-content-center mt-4">
                        <Button
                            label="Finalizar Registro"
                            icon="pi pi-check"
                            className="p-button-success p-button-lg w-full md:w-6"
                            loading={isCreating}
                        />
                    </div>


                </form>
            </Card>
        </div>
    );
};