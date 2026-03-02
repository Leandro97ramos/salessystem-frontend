import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { userService } from '../../../services/userService';

interface LoginFormProps {
    onLoginSuccess: (user: any) => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAccess = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // 1. Primero verificamos si el correo existe
            const { exists } = await userService.checkEmailExists(email);

            if (exists) {
                // 2. Si existe, intentamos el login tradicional
                try {
                    const user = await userService.login(email, password);
                    onLoginSuccess(user);
                } catch (error) {
                    // Aquí manejamos si el password es incorrecto
                    alert("Contraseña incorrecta. Por favor, verifica tus datos.");
                }
            } else {
                // 3. Si NO existe, lo mandamos directo al registro
                // Pasamos tanto el email como el password para que no tenga que volver a escribirlos
                navigate('/register', { 
                    state: { 
                        email, 
                        password // Esto facilitará la vida al nuevo usuario
                    } 
                });
            }
        } catch (error) {
            console.error("Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div className="flex justify-content-center align-items-center min-h-screen surface-ground">
            <Card title="Acceso a SalesSystem" className="w-full md:w-25rem shadow-4">
                <form onSubmit={handleAccess} className="p-fluid">
                    <div className="field">
                        <label htmlFor="email" className="font-bold">Correo Electrónico</label>
                        <InputText 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="ejemplo@mail.com"
                            required 
                        />
                    </div>
                    <div className="field mt-3">
                        <label htmlFor="password" className="font-bold">Contraseña</label>
                        <Password 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            feedback={false} 
                            toggleMask 
                            required
                        />
                    </div>
                    <Button 
                        type="submit" 
                        label="Entrar o Registrarse" 
                        icon="pi pi-sign-in" 
                        className="mt-4 p-button-success" 
                        loading={loading} 
                    />
                </form>
            </Card>
        </div>
    );
};