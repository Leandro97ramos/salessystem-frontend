import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserForm } from './feature/auth/components/UserForm';
import { useState } from 'react';
import { AuthHome } from './feature/auth/pages/AuthHome';
import { AppLayout } from './layout/AppLayout';
import type { AppUser } from './types/auth';
import { AuthPage } from './feature/auth/pages/AuthPage';

// Pantallas temporales
const Placeholder = (
  { title }: { title: string }) =>
  <div className="card">
    <h1>{title}</h1>
    <p>Próximamente...</p>
  </div>;

function App() {
  const userRole: 'SELLER' | 'BUYER' = 'SELLER';
  const [user, setUser] = useState<AppUser | null>(null);
  
  const getUserRole = (u: AppUser): 'SELLER' | 'BUYER' => {
    return u.company_id ? 'BUYER' : 'SELLER';
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* FLUJO DE IDENTIFICACIÓN */}
        {!user ? (
          <>
            <Route path="/" element={<AuthPage onLogin={(u) => setUser(u)} />} />
            <Route path="/register" element={<UserForm onAuthSuccess={() => { /* Lógica tras registro */ }} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          /* PANELES SEGÚN ROL */
          <Route element={<AppLayout role={getUserRole(user)} />}>
            <Route path="/dashboard" element={<div>Módulo de Dashboard</div>} />
            <Route path="/usuarios" element={<UserForm />} />
            <Route path="/inventario" element={<div>Gestión de Stock</div>} />
            {/* ... otras rutas */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;