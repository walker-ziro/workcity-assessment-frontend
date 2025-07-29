import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic API functions
export const api = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await apiClient.get<ApiResponse<T>>(url);
    return response.data;
  },

  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data);
    return response.data;
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete<ApiResponse<T>>(url);
    return response.data;
  },

  getPaginated: async <T>(url: string, params?: any): Promise<PaginatedResponse<T>> => {
    const response = await apiClient.get<PaginatedResponse<T>>(url, { params });
    return response.data;
  },
};

export default apiClient;
