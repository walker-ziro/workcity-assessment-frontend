import { api } from './api';
import { Client, FilterOptions, PaginatedResponse } from '@/types';

export const clientService = {
  async getClients(filters?: FilterOptions): Promise<PaginatedResponse<Client>> {
    try {
      const response = await api.getPaginated<Client>('/clients', filters);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch clients');
    }
  },

  async getClientById(id: string): Promise<Client> {
    try {
      const response = await api.get<Client>(`/clients/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch client');
    }
  },

  async createClient(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    try {
      const response = await api.post<Client>('/clients', clientData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create client');
    }
  },

  async updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
    try {
      const response = await api.put<Client>(`/clients/${id}`, clientData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update client');
    }
  },

  async deleteClient(id: string): Promise<void> {
    try {
      await api.delete(`/clients/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete client');
    }
  },
};
