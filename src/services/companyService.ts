import apiClient from '../api/apiClient';
import type { Company } from '../types/core';

export const companyService = {
  /**
   * Obtiene la lista de todas las empresas.
   * Fundamental para el selector de empresas en el formulario de nuevos usuarios.
   */
  getAll: async (): Promise<Company[]> => {
    const response = await apiClient.get<Company[]>('/companies');
    return response.data;
  },

  /**
   * Obtiene una empresa por su identificación fiscal (tax_id_number).
   */
  getByTaxId: async (taxId: string): Promise<Company> => {
    const response = await apiClient.get<Company>(`/companies/tax-id/${taxId}`);
    return response.data;
  },

  /**
   * Crea una nueva empresa.
   */
  create: async (company: Omit<Company, 'id'>): Promise<Company> => {
    const response = await apiClient.post<Company>('/companies', company);
    return response.data;
  },

  /**
   * Obtiene las sub-empresas o sucursales de una empresa padre.
   * Aprovecha la relación recursiva definida en tu SQL.
   */
  getSubCompanies: async (parentId: number): Promise<Company[]> => {
    const response = await apiClient.get<Company[]>(`/companies/parent/${parentId}`);
    return response.data;
  }
};

