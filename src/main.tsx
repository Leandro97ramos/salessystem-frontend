// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'primereact/resources/themes/lara-light-green/theme.css'; // Tema
import 'primereact/resources/primereact.min.css';                // Core
import 'primeicons/primeicons.css';                             // Iconos
import 'primeflex/primeflex.css';                                // Layout
import './index.css';                                           // Tu Tailwind
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita recargas molestas al cambiar de pestaña
      retry: 1,                    // Reintenta una vez si la petición falla
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

  </React.StrictMode>,
)