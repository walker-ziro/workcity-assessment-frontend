import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '@/components/Button'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600', 'text-white')
  })

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>)
    
    const button = screen.getByRole('button', { name: /outline button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('border-gray-300', 'text-gray-700')
  })

  it('renders with small size', () => {
    render(<Button size="sm">Small Button</Button>)
    
    const button = screen.getByRole('button', { name: /small button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('px-3', 'py-2', 'text-sm')
  })

  it('shows loading state', () => {
    render(<Button isLoading>Loading Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByRole('button', { name: /disabled button/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
  })
})
