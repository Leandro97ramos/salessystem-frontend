import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Warehouse,
  ShoppingCart,
  Settings,
  LogOut
} from 'lucide-react';

const SELLER_MENU = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Usuarios', path: '/usuarios' }, // Para crear otros sellers/buyers
  { icon: Warehouse, label: 'Inventario', path: '/inventario' }, // Bodegas-Lotes-Stock
  { icon: ShoppingCart, label: 'Ventas', path: '/ventas' },      // Historial
  { icon: Settings, label: 'Configuración', path: '/config' },   //
];

const BUYER_MENU = [
  { icon: Settings, label: 'Configuración', path: '/config' },   //
  /*
  { icon: Home, label: 'Inicio', path: '/' },
  { icon: Package, label: 'Mis Pedidos', path: '/mis-pedidos' },
  */
];

interface AppLayoutProps {
  role: 'SELLER' | 'BUYER';
}
export const AppLayout = ({ role }: AppLayoutProps) => {
  // Definimos los menús según el rol
  const menu = role === 'SELLER' ? SELLER_MENU : BUYER_MENU;

  return (
      <div className="flex h-screen surface-ground">
          <aside className="w-20rem surface-section shadow-2 flex flex-column border-right-1 border-gray-200">
              <div className="p-4 border-bottom-1 border-gray-200 text-center">
                  <span className="text-2xl font-bold text-green-600">SalesSystem</span>
              </div>
              <nav className="flex-1 p-3">
                  {menu.map(item => (
                      <NavLink 
                          key={item.path} 
                          to={item.path} 
                          className={({ isActive }) => 
                              `flex align-items-center p-3 mb-2 border-round no-underline transition-colors ${
                                  isActive ? 'bg-blue-50 text-900 font-bold' : 'text-900 hover:surface-200'
                              }`
                          }
                      >
                          <item.icon size={20} className="mr-3" />
                          <span>{item.label}</span>
                      </NavLink>
                  ))}
              </nav>
          </aside>
          
          <main className="flex-1 p-4 overflow-y-auto">
              {/* Outlet renderiza el componente de la ruta hija actual */}
              <Outlet /> 
          </main>
      </div>
  );
};