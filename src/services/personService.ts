import apiClient from '../api/apiClient';
import type { Person } from '../types/core';

export const personService = {
  /**
   * Obtiene una persona por su número de identificación (DNI/RUC/etc).
   * Muy útil para validar si alguien ya existe antes de crear un usuario.
   */
  getByIdentification: async (identification: string): Promise<Person> => {
    const response = await apiClient.get<Person>(`/persons/identification/${identification}`);
    return response.data;
  },

  /**
   * Crea un nuevo registro de persona.
   */
  create: async (person: Omit<Person, 'id'>): Promise<Person> => {
    const response = await apiClient.post<Person>('/persons', person);
    return response.data;
  },

  /**
   * Actualiza los datos de una persona existente.
   */
  update: async (id: number, person: Partial<Person>): Promise<Person> => {
    const response = await apiClient.put<Person>(`/persons/${id}`, person);
    return response.data;
  },

  /**
   * Busca personas por nombre o apellido (para buscadores rápidos).
   */
  search: async (query: string): Promise<Person[]> => {
    const response = await apiClient.get<Person[]>(`/persons/search?q=${query}`);
    return response.data;
  }
};