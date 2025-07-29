# Workcity Assessment Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Assessment-green)](https://github.com/walker-ziro/workcity-assessment-frontend)

A comprehensive React/Next.js application for managing clients and projects, built with modern web technologies and following accessibility standards.

## 🚀 Features

- **Client Management**: Create, read, update, and delete client information
- **Project Tracking**: Manage projects with status tracking, budgets, and timelines
- **User Authentication**: Secure login/signup system with JWT tokens
- **Backend Integration**: REST API integration with authentication
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **TypeScript**: Full type safety throughout the application
- **Testing**: Unit tests with Jest and React Testing Library
- **Development Tools**: Built-in system status and debugging tools

### ✅ Implementation Status

- [x] Authentication system with backend API integration
- [x] Responsive navigation bar
- [x] Dashboard with client/project stats
- [x] Client management pages
- [x] Project management pages  
- [x] Form validation with React Hook Form + Yup
- [x] Loading states and error handling
- [x] TypeScript type definitions
- [x] Unit test setup
- [x] Accessibility features (ARIA labels, keyboard navigation)
- [x] Mobile-responsive design
- [x] Backend API integration
- [x] Development tools and system status monitoring

## 📋 Pages

- **Home**: Dashboard overview with quick stats and actions
- **Login/Signup**: Authentication pages with form validation
- **Client Dashboard**: List and manage all clients
- **Add/Edit Client**: Form for creating and updating client information
- **Project Dashboard**: List and manage all projects with filtering
- **Add/Edit Project**: Form for creating and updating project information
- **Client Profile View**: Detailed client information with associated projects

## 🛠 Technology Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **Testing**: Jest, React Testing Library
- **Development**: ESLint, TypeScript

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── clients/           # Client management pages
│   ├── projects/          # Project management pages
│   ├── login/             # Authentication pages
│   ├── signup/
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navbar.tsx
│   ├── AddEditClientForm.tsx
│   └── AddEditProjectForm.tsx
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useClients.ts
│   └── useProjects.ts
├── lib/                   # Utility functions and services
│   ├── api.ts             # API client configuration
│   ├── auth.ts            # Authentication service
│   ├── clients.ts         # Client service
│   ├── projects.ts        # Project service
│   └── utils.ts           # Helper utilities
└── types/                 # TypeScript type definitions
    └── index.ts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Backend server running (see [Backend Integration Guide](./BACKEND_INTEGRATION.md))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/walker-ziro/workcity-assessment-frontend.git
   cd workcity-assessment-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # Copy environment example
   cp .env.example .env.local
   
   # Edit .env.local with your backend URL
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Integration

This frontend requires a backend API to function properly. See the [Backend Integration Guide](./BACKEND_INTEGRATION.md) for detailed setup instructions.

**Quick Backend Setup:**
1. Ensure your backend server is running on `http://localhost:3001`
2. Use the development tools (⚙️ icon) to check system status
3. Verify API connectivity before using the application

### Development Tools

In development mode, you'll see a gear icon (⚙️) in the bottom-right corner. Click it to access:
- System status monitoring
- API connectivity checks
- Local storage management
- Environment information

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 🧪 Testing

The project includes comprehensive unit tests for components and hooks:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🔧 Troubleshooting

### Common Issues

**Hydration Errors:**
- Fixed by adding `suppressHydrationWarning` to prevent browser extension conflicts

**Authentication Issues:**
- Use the "Try Demo" button on the login page to auto-fill demo credentials
- Clear localStorage if experiencing login issues: `localStorage.clear()`

**Build Errors:**
- Ensure Node.js 18+ is installed
- Delete `node_modules` and `package-lock.json`, then run `npm install`

## 🔑 Authentication

The application includes a functional demo authentication system:

**Demo Access:**
- Click the "Try Demo" button on the login page to automatically fill demo credentials
- Demo authentication works locally without requiring a backend API
- This allows you to test the application features immediately
- For production use, the authentication system will seamlessly integrate with your backend API

## 🎨 Design System

The application uses a consistent design system built with Tailwind CSS:

- **Colors**: Blue primary, semantic colors for status
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable with variant systems
- **Responsive**: Mobile-first breakpoints

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels and descriptions
- Keyboard navigation support
- Color contrast compliance
- Screen reader support
- Focus management

## 🔧 API Integration

The application is structured to work with REST APIs:

- Axios HTTP client with interceptors
- JWT token handling
- Error handling and loading states
- Pagination support
- Filtering and sorting

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts  
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔒 Security Considerations

- JWT token storage
- Route protection
- Input validation
- XSS prevention
- CSRF protection ready

## 🚀 Deployment

The application is ready for deployment on platforms like:

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker containers

## 📖 Documentation

Each component and hook includes JSDoc comments and TypeScript interfaces for better developer experience.

## 🔗 Repository

- **GitHub**: [https://github.com/walker-ziro/workcity-assessment-frontend](https://github.com/walker-ziro/workcity-assessment-frontend)
- **Issues**: [Report bugs or request features](https://github.com/walker-ziro/workcity-assessment-frontend/issues)
- **Live Demo**: Access the application at [http://localhost:3000](http://localhost:3000) after setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is part of the Workcity Assessment and is for demonstration purposes.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
