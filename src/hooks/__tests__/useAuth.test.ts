import { renderHook, waitFor } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/lib/auth'

// Mock the auth service
jest.mock('@/lib/auth', () => ({
  authService: {
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}))

describe('useAuth', () => {
  const mockAuthService = authService as jest.Mocked<typeof authService>

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
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

    await result.current.login('test@example.com', 'password')

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
    })

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password')
    expect(localStorage.getItem('token')).toBe('fake-token')
  })

  it('should logout successfully', async () => {
    // Set up initial authenticated state
    localStorage.setItem('token', 'fake-token')
    
    const { result } = renderHook(() => useAuth())

    await result.current.logout()

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(localStorage.getItem('token')).toBeNull()
    expect(mockAuthService.logout).toHaveBeenCalled()
  })

  it('should handle login error', async () => {
    const mockError = new Error('Invalid credentials')
    mockAuthService.login.mockRejectedValue(mockError)

    const { result } = renderHook(() => useAuth())

    await expect(
      result.current.login('test@example.com', 'wrong-password')
    ).rejects.toThrow('Invalid credentials')

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})
