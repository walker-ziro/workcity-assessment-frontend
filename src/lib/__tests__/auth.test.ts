import { authService } from '../auth';

// Mock localStorage globally
const mockSetItem = jest.fn();
const mockGetItem = jest.fn();
const mockRemoveItem = jest.fn();
const mockClear = jest.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: mockSetItem,
    getItem: mockGetItem,
    removeItem: mockRemoveItem,
    clear: mockClear,
  },
  writable: true,
});

// Mock API
jest.mock('../api', () => ({
  api: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
  },
}));

// Mock Date.now for consistent timestamps
const mockDate = new Date('2023-01-01T00:00:00.000Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
Date.now = jest.fn(() => mockDate.getTime());

describe('authService Demo Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockReturnValue(null);
  });

  it('should handle demo login credentials locally', async () => {
    const demoCredentials = {
      email: 'demo@workcity.com',
      password: 'demo123',
    };

    const result = await authService.login(demoCredentials);

    expect(result.user.email).toBe('demo@workcity.com');
    expect(result.user.firstName).toBe('Demo');
    expect(result.user.lastName).toBe('User');
    expect(result.user.role).toBe('user');
    expect(result.token).toBe('demo-token-1672531200000'); // Using mocked Date.now

    // Verify localStorage was called
    expect(mockSetItem).toHaveBeenCalledWith('authToken', 'demo-token-1672531200000');
    expect(mockSetItem).toHaveBeenCalledWith('user', JSON.stringify(result.user));
  });

  it('should handle demo user getCurrentUser', async () => {
    const demoToken = 'demo-token-123456789';
    const demoUser = {
      id: 'demo-user-1',
      email: 'demo@workcity.com',
      firstName: 'Demo',
      lastName: 'User',
      role: 'user' as const,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    mockGetItem.mockImplementation((key: string) => {
      if (key === 'authToken') return demoToken;
      if (key === 'user') return JSON.stringify(demoUser);
      return null;
    });

    const result = await authService.getCurrentUser();

    expect(result).toEqual(demoUser);
    expect(mockGetItem).toHaveBeenCalledWith('authToken');
    expect(mockGetItem).toHaveBeenCalledWith('user');
  });

  it('should handle demo user profile update', async () => {
    const demoToken = 'demo-token-123456789';
    const demoUser = {
      id: 'demo-user-1',
      email: 'demo@workcity.com',
      firstName: 'Demo',
      lastName: 'User',
      role: 'user' as const,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    mockGetItem.mockImplementation((key: string) => {
      if (key === 'authToken') return demoToken;
      if (key === 'user') return JSON.stringify(demoUser);
      return null;
    });

    const updateData = { firstName: 'Updated Demo' };
    const result = await authService.updateProfile(updateData);

    expect(result.firstName).toBe('Updated Demo');
    expect(result.email).toBe('demo@workcity.com');
    expect(result.updatedAt).toBe('2023-01-01T00:00:00.000Z'); // Using mocked date
    expect(mockSetItem).toHaveBeenCalledWith('user', JSON.stringify(result));
  });

  it('should prevent signup with demo email', async () => {
    const demoSignupData = {
      email: 'demo@workcity.com',
      password: 'demo123',
      confirmPassword: 'demo123',
      firstName: 'Demo',
      lastName: 'User',
    };

    await expect(authService.signup(demoSignupData)).rejects.toThrow(
      'Cannot create account with demo email address'
    );
  });
});
