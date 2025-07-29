import { User, LoginCredentials, SignupData } from '@/types';

// Mock users for demo purposes
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'demo@workcity.com',
    firstName: 'Demo',
    lastName: 'User',
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'user@workcity.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Demo passwords (in real app, these would be hashed)
const DEMO_PASSWORDS: { [email: string]: string } = {
  'demo@workcity.com': 'password',
  'user@workcity.com': 'password',
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = DEMO_USERS.find(u => u.email === credentials.email);
    const validPassword = DEMO_PASSWORDS[credentials.email];

    if (!user || validPassword !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    const token = `demo-token-${user.id}-${Date.now()}`;
    
    // Store token and user data
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, token };
  },

  async signup(userData: SignupData): Promise<{ user: User; token: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUser = DEMO_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: `${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to demo users (in memory only)
    DEMO_USERS.push(newUser);
    DEMO_PASSWORDS[userData.email] = userData.password;

    const token = `demo-token-${newUser.id}-${Date.now()}`;
    
    // Store token and user data
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return { user: newUser, token };
  },

  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      // In a real app, this would validate the token with the server
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      // Clear invalid data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return null;
    }
  },

  getStoredUser(): User | null {
    try {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },
};
