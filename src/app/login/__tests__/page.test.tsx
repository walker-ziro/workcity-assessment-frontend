import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginPage from '../page'

// Mock the useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
    isLoading: false,
  }),
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('LoginPage', () => {
  it('renders login form with email and password fields', () => {
    render(<LoginPage />)
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('displays "Try Demo" button', () => {
    render(<LoginPage />)
    
    expect(screen.getByRole('button', { name: /try demo/i })).toBeInTheDocument()
    expect(screen.getByText(/click to auto-fill demo credentials/i)).toBeInTheDocument()
  })

  it('fills demo credentials when "Try Demo" button is clicked', async () => {
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
    const demoButton = screen.getByRole('button', { name: /try demo/i })
    
    // Initially empty
    expect(emailInput.value).toBe('')
    expect(passwordInput.value).toBe('')
    
    // Click demo button
    fireEvent.click(demoButton)
    
    // Wait for values to be filled
    await waitFor(() => {
      expect(emailInput.value).toBe('demo@workcity.com')
      expect(passwordInput.value).toBe('demo123')
    })
  })

  it('does not display static demo credentials', () => {
    render(<LoginPage />)
    
    // Should not show the old static demo credentials
    expect(screen.queryByText('Email: demo@workcity.com')).not.toBeInTheDocument()
    expect(screen.queryByText('Password: demo123')).not.toBeInTheDocument()
    expect(screen.queryByText('Demo Credentials')).not.toBeInTheDocument()
  })

  it('shows signup link', () => {
    render(<LoginPage />)
    
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up here/i })).toBeInTheDocument()
  })
})
