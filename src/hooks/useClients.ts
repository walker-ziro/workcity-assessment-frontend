'use client';

import { useState, useEffect, useCallback } from 'react';
import { Client, FilterOptions, PaginatedResponse, LoadingState } from '@/types';
import { clientService } from '@/lib/clients';

export const useClients = (initialFilters?: FilterOptions) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
  });
  const [filters, setFilters] = useState<FilterOptions>(initialFilters || {});

  const fetchClients = useCallback(async (filterOptions?: FilterOptions) => {
    setLoadingState({ isLoading: true, error: null });
    try {
      const response = await clientService.getClients(filterOptions || filters);
      setClients(response.data);
      setPagination(response.pagination);
      setLoadingState({ isLoading: false, error: null });
    } catch (error: any) {
      setLoadingState({ isLoading: false, error: error.message });
    }
  }, [filters]);

  const createClient = useCallback(async (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newClient = await clientService.createClient(clientData);
      setClients(prev => [newClient, ...prev]);
      return newClient;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  const updateClient = useCallback(async (id: string, clientData: Partial<Client>) => {
    try {
      const updatedClient = await clientService.updateClient(id, clientData);
      setClients(prev => prev.map(client => 
        client.id === id ? updatedClient : client
      ));
      return updatedClient;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  const deleteClient = useCallback(async (id: string) => {
    try {
      await clientService.deleteClient(id);
      setClients(prev => prev.filter(client => client.id !== id));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  const updateFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    fetchClients(newFilters);
  }, [fetchClients]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    pagination,
    ...loadingState,
    filters,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    updateFilters,
  };
};

export const useClient = (id?: string) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: !!id,
    error: null,
  });

  const fetchClient = useCallback(async (clientId?: string) => {
    const idToUse = clientId || id;
    if (!idToUse) return;

    setLoadingState({ isLoading: true, error: null });
    try {
      const fetchedClient = await clientService.getClientById(idToUse);
      setClient(fetchedClient);
      setLoadingState({ isLoading: false, error: null });
    } catch (error: any) {
      setLoadingState({ isLoading: false, error: error.message });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchClient();
    }
  }, [fetchClient, id]);

  return {
    client,
    ...loadingState,
    fetchClient,
    setClient,
  };
};
