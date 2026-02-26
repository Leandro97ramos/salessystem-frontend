// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// ESTILOS NECESARIOS
import 'primereact/resources/themes/lara-light-green/theme.css'; // Tema
import 'primereact/resources/primereact.min.css';                // Core
import 'primeicons/primeicons.css';                             // Iconos
import 'primeflex/primeflex.css';                                // Layout
import './index.css';                                           // Tu Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)