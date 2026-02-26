import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export const AuthHome = () => {
    const navigate = useNavigate();

    return (
        <div className="flex align-items-center justify-content-center min-h-screen surface-ground p-4">
            <Card className="w-full md:w-30rem shadow-4 text-center">
                <h1 className="text-4xl font-bold text-green-600 mb-2">SalesSystem</h1>
                <p className="text-600 mb-5">Gestión de Inventario y Ventas</p>
                
                <div className="flex flex-column gap-3">
                    <Button 
                        label="Iniciar Sesión" 
                        icon="pi pi-sign-in" 
                        className="p-button-lg" 
                        onClick={() => navigate('/login')} 
                    />
                    <Button 
                        label="Crear una Cuenta" 
                        icon="pi pi-user-plus" 
                        className="p-button-outlined p-button-lg" 
                        onClick={() => navigate('/register')} 
                    />
                </div>
            </Card>
        </div>
    );
};