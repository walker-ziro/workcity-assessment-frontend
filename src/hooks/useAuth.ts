'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '@/types';
import { authService } from '@/lib/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const checkAuthStatus = useCallback(async () => {
    try {
      if (typeof window === 'undefined') return;

      const storedUser = authService.getStoredUser();
      const isAuthenticated = authService.isAuthenticated();

      if (isAuthenticated && storedUser) {
        // Verify token is still valid
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setAuthState({
            user: currentUser,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const { user, token } = await authService.login({ email, password });
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
      return user;
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  }, []);

  const signup = useCallback(async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const { user, token } = await authService.signup(userData);
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
      return user;
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const updateProfile = useCallback(async (updatedUser: User) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authService.updateProfile(updatedUser);
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
      return user;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    ...authState,
    login,
    signup,
    logout,
    updateProfile,
    checkAuthStatus,
  };
};
