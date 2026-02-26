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
    const [step, setStep] = useState<'EMAIL' | 'PASSWORD'>('EMAIL');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNext = async () => {
        setLoading(true);
        try {
            const { exists } = await userService.checkEmailExists(email);
            if (exists) {
                setStep('PASSWORD'); // Usuario encontrado, pedir clave
            } else {
                // No existe, redirigir al registro con el email ya cargado
                navigate('/register', { state: { email } });
            }
        } catch (error) {
            console.error("Error al verificar usuario");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const user = await userService.login(email, password);
            onLoginSuccess(user); // Redirige al Dashboard según el rol
        } catch (error) {
            console.error("Contraseña incorrecta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen surface-ground">
            <Card title={step === 'EMAIL' ? "Bienvenido" : "Ingresa tu clave"} className="w-full md:w-25rem shadow-4">
                <div className="p-fluid">
                    {step === 'EMAIL' ? (
                        <div className="field">
                            <label htmlFor="email">Correo Electrónico</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@mail.com" />
                            <Button label="Continuar" icon="pi pi-arrow-right" className="mt-3" onClick={handleNext} loading={loading} />
                        </div>
                    ) : (
                        <div className="field">
                            <label htmlFor="password">Contraseña</label>
                            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask />
                            <div className="flex gap-2 mt-3">
                                <Button label="Volver" className="p-button-text" onClick={() => setStep('EMAIL')} />
                                <Button label="Entrar" icon="pi pi-check" onClick={handleLogin} loading={loading} />
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};