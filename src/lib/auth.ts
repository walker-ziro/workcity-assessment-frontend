import { User, LoginCredentials, SignupData } from '@/types';
import { api } from './api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // Handle demo credentials locally
    if (credentials.email === 'demo@workcity.com' && credentials.password === 'demo123') {
      const demoUser: User = {
        id: 'demo-user-1',
        email: 'demo@workcity.com',
        firstName: 'Demo',
        lastName: 'User',
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const demoToken = 'demo-token-' + Date.now();
      
      // Store token and user data
      localStorage.setItem('authToken', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      return { user: demoUser, token: demoToken };
    }

    // For non-demo credentials, use API
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
    // Note: Demo signup is not typically needed, but we'll handle it for completeness
    if (userData.email === 'demo@workcity.com') {
      throw new Error('Cannot create account with demo email address');
    }

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
      const token = localStorage.getItem('authToken');
      
      // Skip API call for demo tokens
      if (!token?.startsWith('demo-token-')) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      // Even if the API call fails, we should still clear local storage
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // For demo users, ensure we also clear any other potential auth-related data
      if (typeof window !== 'undefined') {
        // Clear any session storage as well
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
      }
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      // Handle demo token
      if (token.startsWith('demo-token-')) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          return JSON.parse(storedUser);
        }
        return null;
      }

      // For non-demo tokens, use API
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
      const token = localStorage.getItem('authToken');
      
      // Handle demo user profile updates locally
      if (token?.startsWith('demo-token-')) {
        const currentUser = this.getCurrentUserFromStorage();
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData, updatedAt: new Date().toISOString() };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          return updatedUser;
        }
        throw new Error('Demo user not found');
      }

      // For non-demo users, use API
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
