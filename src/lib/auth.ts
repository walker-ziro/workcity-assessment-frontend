import { User, LoginCredentials, SignupData } from '@/types';
import { api } from './api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
      
      // Store token and user data
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Invalid email or password');
    }
  },

  async signup(userData: SignupData): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post<{ user: User; token: string }>('/auth/signup', userData);
      
      // Store token and user data
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create account');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Even if the API call fails, we should still clear local storage
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      // If API call fails, remove invalid token
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return null;
    }
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put<User>('/auth/profile', userData);
      
      // Update local storage with new user data
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      await api.put('/auth/change-password', { oldPassword, newPassword });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  },

  getCurrentUserFromStorage(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  },

  getTokenFromStorage(): string | null {
    return localStorage.getItem('authToken');
  },

  isAuthenticated(): boolean {
    const token = this.getTokenFromStorage();
    const user = this.getCurrentUserFromStorage();
    return !!(token && user);
  },

  // Legacy method for compatibility
  getStoredUser(): User | null {
    return this.getCurrentUserFromStorage();
  }
};
