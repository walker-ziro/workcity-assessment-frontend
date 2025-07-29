# Copilot Instructions for Workcity Assessment Frontend

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a **Workcity Full-Stack & WordPress Developer Assessment** frontend application built with Next.js 15, TypeScript, and Tailwind CSS.

## Key Requirements
- **Pages**: Home, Login/Signup, Client Dashboard, Add/Edit Client, Project Dashboard, Add/Edit Project, Client Profile View
- **Styling**: Use Tailwind CSS for responsive design
- **API**: Use Axios for HTTP requests  
- **Forms**: Use React Hook Form with Yup validation
- **Accessibility**: Follow WCAG guidelines
- **Testing**: Jest and React Testing Library for unit tests

## Code Standards
- Use TypeScript for type safety
- Follow React functional components with hooks
- Implement proper error handling and loading states
- Use semantic HTML elements for accessibility
- Include proper ARIA labels and keyboard navigation
- Write clean, maintainable, and well-documented code
- Follow Next.js App Router conventions

## Architecture
- `/src/app` - Next.js App Router pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and API calls
- `/src/types` - TypeScript type definitions
- `/src/hooks` - Custom React hooks
- `/src/styles` - Global styles and Tailwind config

## Best Practices
- Always prioritize accessibility and responsive design
- Use proper TypeScript types for all props and functions
- Implement loading and error states for all async operations
- Write comprehensive unit tests for components
- Use proper SEO meta tags and structured data
