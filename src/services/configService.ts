import apiClient from '../api/apiClient';
import type { ConfiguracionTipo, ConfiguracionCab, ConfiguracionDet } from '../types/config';

export const configService = {
  // ==========================================
  // 1. CONFIGURACIÓN TIPO
  // ==========================================
  
  /** Obtiene todos los tipos de configuración (SISTEMA, VENTAS, etc.) */
  getTipos: async (): Promise<ConfiguracionTipo[]> => {
    const response = await apiClient.get<ConfiguracionTipo[]>('/configuracion/tipos');
    return response.data;
  },

  // ==========================================
  // 2. CONFIGURACIÓN CABECERA
  // ==========================================

  /** Obtiene todas las cabeceras */
  getAllCabeceras: async (): Promise<ConfiguracionCab[]> => {
    const response = await apiClient.get<ConfiguracionCab[]>('/configuracion/cabeceras');
    return response.data;
  },

  /** Obtiene cabeceras filtradas por un tipo específico */
  getCabecerasByTipo: async (tipoId: number): Promise<ConfiguracionCab[]> => {
    const response = await apiClient.get<ConfiguracionCab[]>(`/configuracion/cabeceras/tipo/${tipoId}`);
    return response.data;
  },

  // ==========================================
  // 3. CONFIGURACIÓN DETALLE
  // ==========================================

  /** * METODO CRÍTICO: Obtiene los valores para dropdowns usando el CÓDIGO de la cabecera.
   * Ejemplo: getDetallesByCabecera('METODOS_PAGO')
   */
  getDetallesByCabeceraCodigo: async (codigo: string): Promise<ConfiguracionDet[]> => {
    const response = await apiClient.get<ConfiguracionDet[]>(`/configuracion/detalles/codigo-cabecera/${codigo}`);
    return response.data;
  },

  /** Obtiene detalles por ID de cabecera */
  getDetallesByCabeceraId: async (cabeceraId: number): Promise<ConfiguracionDet[]> => {
    const response = await apiClient.get<ConfiguracionDet[]>(`/configuracion/detalles/cabecera/${cabeceraId}`);
    return response.data;
  },

  /** * Obtiene detalles hijos (para jerarquías como País -> Provincia)
   * Usa el campo padre_configuracion_det_id de tu modelo
   */
  getDetallesHijos: async (padreId: number): Promise<ConfiguracionDet[]> => {
    const response = await apiClient.get<ConfiguracionDet[]>(`/configuracion/detalles/hijos/${padreId}`);
    return response.data;
  },

  /** Crear un nuevo detalle de configuración */
  createDetalle: async (data: Partial<ConfiguracionDet>): Promise<ConfiguracionDet> => {
    const response = await apiClient.post<ConfiguracionDet>('/configuracion/detalles', data);
    return response.data;
  }
};