import { renderHook, waitFor, act } from '@testing-library/react'

// Mock the auth service before importing
jest.mock('@/lib/auth', () => ({
  authService: {
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
    getCurrentUser: jest.fn(),
    getStoredUser: jest.fn(),
    isAuthenticated: jest.fn(),
    clearStorage: jest.fn(),
    updateProfile: jest.fn(),
  },
}))

import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/lib/auth'

describe('useAuth', () => {
  const mockAuthService = authService as jest.Mocked<typeof authService>

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    // Set up default mock returns
    mockAuthService.getStoredUser.mockReturnValue(null)
    mockAuthService.isAuthenticated.mockReturnValue(false)
  })

  it('should initialize with no user when no token exists', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should login successfully', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user' as const,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    }

    const mockLoginResponse = {
      user: mockUser,
      token: 'fake-token',
    }

    mockAuthService.login.mockResolvedValue(mockLoginResponse)

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
    })

    expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' })
  })

  it('should logout successfully', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.logout()
    })

    await waitFor(() => {
      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })
    expect(mockAuthService.logout).toHaveBeenCalled()
  })

  it('should handle login error', async () => {
    const mockError = new Error('Invalid credentials')
    mockAuthService.login.mockRejectedValue(mockError)

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await expect(
        result.current.login('test@example.com', 'wrong-password')
      ).rejects.toThrow('Invalid credentials')
    })

    await waitFor(() => {
      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })
  })
})
