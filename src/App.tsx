import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserForm } from './feature/auth/components/UserForm';
import { useState } from 'react';
import { AuthHome } from './feature/auth/pages/AuthHome';
import { AppLayout } from './layout/AppLayout';

// Pantallas temporales
const Placeholder = (
  { title }: { title: string }) =>
  <div className="card">
    <h1>{title}</h1>
    <p>Próximamente...</p>
  </div>;

function App() {
  const userRole: 'SELLER' | 'BUYER' = 'SELLER';
  const [currentUser, setCurrentUser] = useState<{role: 'SELLER' | 'BUYER'} | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        {!currentUser ? (
          /* Rutas Públicas */
          <>
            <Route path="/" element={<AuthHome />} />
            <Route path="/register" element={<UserForm onAuthSuccess={(role) => setCurrentUser({role})} />} />
            <Route path="/login" element={<div>Login Proximamente...</div>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          /* Rutas Protegidas por Rol */
          <Route element={<AppLayout role={currentUser.role} />}>
            {currentUser.role === 'SELLER' ? (
              <>
                <Route path="/dashboard" element={<div>Dashboard Vendedor</div>} />
                <Route path="/usuarios" element={<UserForm />} />
                <Route path="/inventario" element={<div>Gestión de Bodegas</div>} />
                <Route path="/ventas" element={<div>Historial Ventas</div>} />
                <Route path="/config" element={<div>Configuración</div>} />
              </>
            ) : (
              <Route path="/dashboard" element={<div>Portal de Compras (Buyer)</div>} />
            )}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;