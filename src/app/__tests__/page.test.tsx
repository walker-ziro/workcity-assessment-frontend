import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../page'

// Mock the auth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn(),
    signup: jest.fn(),
  }),
}))

// Mock the clients hook
jest.mock('@/hooks/useClients', () => ({
  useClients: () => ({
    clients: [],
    isLoading: false,
    error: null,
  }),
}))

// Mock the projects hook
jest.mock('@/hooks/useProjects', () => ({
  useProjects: () => ({
    projects: [],
    isLoading: false,
    error: null,
  }),
}))

describe('HomePage', () => {
  it('renders welcome message for unauthenticated users', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/Welcome to Workcity Assessment/i)).toBeInTheDocument()
    expect(screen.getByText(/Manage your clients and projects efficiently/i)).toBeInTheDocument()
  })

  it('displays main features', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/Client Management/i)).toBeInTheDocument()
    expect(screen.getByText(/Project Tracking/i)).toBeInTheDocument()
    expect(screen.getByText(/User Dashboard/i)).toBeInTheDocument()
  })

  it('shows call-to-action buttons', () => {
    render(<HomePage />)
    
    expect(screen.getByRole('link', { name: /Get Started/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Sign In/i })).toBeInTheDocument()
  })
})
