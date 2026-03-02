import { LoginForm } from '../components/LoginForm';

interface AuthPageProps {
    onLogin: (user: any) => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
    return (
        <div className="auth-container">
            {/* El LoginForm ya tiene la lógica de verificar email y redirigir */}
            <LoginForm onLoginSuccess={onLogin} />
        </div>
    );
};

