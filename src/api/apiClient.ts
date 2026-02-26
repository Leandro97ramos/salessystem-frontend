import axios from 'axios';

// Creamos la instancia centralizada
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de espera máxima
});

/**
 * INTERCEPTOR DE PETICIONES (Request)
 * Ideal para inyectar el Token JWT en cada llamada al backend de Spring Boot.
 */
apiClient.interceptors.request.use(
  (config) => {
    // Cuando implementes el login, aquí recuperarás el token del storage
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTOR DE RESPUESTAS (Response)
 * Centraliza el manejo de errores para que no tengas que poner try/catch
 * repetitivos en cada componente de PrimeReact.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      console.error("Sesión expirada o no autorizada. Redirigiendo...");
      // Lógica para limpiar el storage y redirigir al /login
    } else if (status === 403) {
      console.error("No tienes permisos para realizar esta acción.");
    } else if (status === 500) {
      console.error("Error interno del servidor. Revisa los logs de Spring Boot.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;