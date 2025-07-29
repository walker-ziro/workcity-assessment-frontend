import { api } from './api';
import { Project, FilterOptions, PaginatedResponse } from '@/types';

export const projectService = {
  async getProjects(filters?: FilterOptions): Promise<PaginatedResponse<Project>> {
    try {
      const response = await api.getPaginated<Project>('/projects', filters);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch projects');
    }
  },

  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await api.get<Project>(`/projects/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch project');
    }
  },

  async getProjectsByClientId(clientId: string): Promise<Project[]> {
    try {
      const response = await api.get<Project[]>(`/projects/client/${clientId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch client projects');
    }
  },

  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    try {
      const response = await api.post<Project>('/projects', projectData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create project');
    }
  },

  async updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
    try {
      const response = await api.put<Project>(`/projects/${id}`, projectData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update project');
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      await api.delete(`/projects/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete project');
    }
  },
};
