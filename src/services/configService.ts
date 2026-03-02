import apiClient from '../api/apiClient';
import type { ConfiguracionTipo, ConfiguracionCab, ConfiguracionDet } from '../types/config';

export const configService = {

  // ==========================================
  // 1. CONFIGURACIÓN TIPO (Eslabón 1: Sistema, Ventas, etc.)
  // ==========================================

  /** Obtiene todos los tipos de configuración activos */
  getTiposActivos: async (): Promise<ConfiguracionTipo[]> => {
    const response = await apiClient.get<ConfiguracionTipo[]>('/configuracion-tipos/activos');
    return response.data;
  },

  /** Obtiene un tipo por su código único */
  getTipoByCodigo: async (codigo: string): Promise<ConfiguracionTipo> => {
    const response = await apiClient.get<ConfiguracionTipo>(`/configuracion-tipos/codigo/${codigo}`);
    return response.data;
  },

  //saveTipo

  saveTipo: async (tipo: Partial<ConfiguracionTipo>): Promise<ConfiguracionTipo> => {
    const response = await apiClient.post<ConfiguracionTipo>('/configuracion-tipos', tipo);
    return response.data;
  },



  // ==========================================
  // 2. CONFIGURACIÓN CABECERA (Eslabón 2: ROLES, METODOS_PAGO, etc.)
  // ==========================================

  /** Obtiene cabeceras filtradas por el ID del Tipo */
  getCabecerasByTipo: async (tipoId: number): Promise<ConfiguracionCab[]> => {
    const response = await apiClient.get<ConfiguracionCab[]>(`/configuracion-cabecera/tipo/${tipoId}`);
    return response.data;
  },

  /** Obtiene una cabecera específica por su código (ej: 'ROLES') */
  getCabeceraByCodigo: async (codigo: string): Promise<ConfiguracionCab> => {
    const response = await apiClient.get<ConfiguracionCab>(`/configuracion-cabecera/codigo/${codigo}`);
    return response.data;
  },

  saveCabecera: async (cabecera: Partial<ConfiguracionCab>): Promise<ConfiguracionCab> => {
    const response = await apiClient.post<ConfiguracionCab>('/configuracion-cabecera', cabecera);
    return response.data;
  },

  // ==========================================
  // 3. CONFIGURACIÓN DETALLE (Eslabón 3: SELLER, BUYER, EFECTIVO, etc.)
  // ==========================================

  /** * MÉTODO CRÍTICO: Obtiene los valores finales para dropdowns usando el CÓDIGO de la cabecera.
   * Mapea con @GetMapping("/cabecera/{cabeceraCodigo}") en Java.
   */
  getDetallesByCabeceraCodigo: async (cabeceraCodigo: string): Promise<ConfiguracionDet[]> => {
    const response = await apiClient.get<ConfiguracionDet[]>(`/configuracion-detalles/cabecera/${cabeceraCodigo}`);
    return response.data;
  },

  /** Obtiene un detalle específico por su código propio */
  getDetalleByCodigo: async (codigo: string): Promise<ConfiguracionDet> => {
    const response = await apiClient.get<ConfiguracionDet>(`/configuracion-detalles/codigo/${codigo}`);
    return response.data;
  },

  /** Obtiene detalles hijos (para jerarquías como País -> Provincia) */
  getDetallesHijos: async (padreId: number): Promise<ConfiguracionDet[]> => {
    const response = await apiClient.get<ConfiguracionDet[]>(`/configuracion-detalles/hijos/${padreId}`);
    return response.data;
  },

  /** Guarda o actualiza un detalle de configuración */
  saveDetalle: async (detalle: ConfiguracionDet): Promise<ConfiguracionDet> => {
    const response = await apiClient.post<ConfiguracionDet>('/configuracion-detalles', detalle);
    return response.data;
  }
};