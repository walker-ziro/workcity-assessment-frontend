'use client';

import { useState, useEffect, useCallback } from 'react';
import { Project, FilterOptions, PaginatedResponse, LoadingState } from '@/types';
import { projectService } from '@/lib/projects';

export const useProjects = (initialFilters?: FilterOptions) => {
  const [projects, setProjects] = useState<Project[]>([]);
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

  const fetchProjects = useCallback(async (filterOptions?: FilterOptions) => {
    setLoadingState({ isLoading: true, error: null });
    try {
      const response = await projectService.getProjects(filterOptions || filters);
      setProjects(response.data);
      setPagination(response.pagination);
      setLoadingState({ isLoading: false, error: null });
    } catch (error: any) {
      setLoadingState({ isLoading: false, error: error.message });
    }
  }, [filters]);

  const createProject = useCallback(async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProject = await projectService.createProject(projectData);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  const updateProject = useCallback(async (id: string, projectData: Partial<Project>) => {
    try {
      const updatedProject = await projectService.updateProject(id, projectData);
      setProjects(prev => prev.map(project => 
        project.id === id ? updatedProject : project
      ));
      return updatedProject;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    try {
      await projectService.deleteProject(id);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  const updateFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    fetchProjects(newFilters);
  }, [fetchProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    pagination,
    ...loadingState,
    filters,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    updateFilters,
  };
};

export const useProject = (id?: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: !!id,
    error: null,
  });

  const fetchProject = useCallback(async (projectId?: string) => {
    const idToUse = projectId || id;
    if (!idToUse) return;

    setLoadingState({ isLoading: true, error: null });
    try {
      const fetchedProject = await projectService.getProjectById(idToUse);
      setProject(fetchedProject);
      setLoadingState({ isLoading: false, error: null });
    } catch (error: any) {
      setLoadingState({ isLoading: false, error: error.message });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [fetchProject, id]);

  return {
    project,
    ...loadingState,
    fetchProject,
    setProject,
  };
};
