# Contributing to Workcity Assessment Frontend

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/workcity-assessment-frontend.git
   ```
3. Navigate to the project directory:
   ```bash
   cd workcity-assessment-frontend
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and conventions
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Ensure proper error handling and loading states

### Component Guidelines

- Use functional components with hooks
- Implement proper accessibility (ARIA labels, semantic HTML)
- Make components responsive using Tailwind CSS
- Include proper TypeScript types for all props
- Add unit tests for new components

### Commit Messages

Follow conventional commit format:
```
type(scope): description

feat(components): add new Button variant
fix(auth): resolve login validation issue
docs(readme): update installation instructions
test(hooks): add tests for useAuth hook
```

### Branch Naming

Use descriptive branch names:
- `feature/add-client-search`
- `fix/login-validation-bug`
- `refactor/update-api-service`
- `docs/update-contributing-guide`

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Writing Tests

- Write unit tests for all new components and hooks
- Use React Testing Library for component tests
- Test accessibility features
- Aim for high test coverage
- Include both positive and negative test cases

### Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);
    
    await user.click(screen.getByRole('button'));
    // Add assertions
  });
});
```

## 🔧 Pull Request Process

1. Create a new branch from `main`
2. Make your changes following the guidelines above
3. Add tests for new functionality
4. Ensure all tests pass
5. Update documentation if needed
6. Submit a pull request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - Test coverage information

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🐛 Reporting Issues

When reporting issues, please include:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots or error messages
- Relevant code snippets

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro)

## 💬 Getting Help

If you need help or have questions:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Join our community discussions

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this project better! 🎉
