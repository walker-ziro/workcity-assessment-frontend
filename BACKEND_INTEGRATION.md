# Backend Integration Guide

This document explains how to integrate the Workcity Assessment Frontend with the backend API.

## Quick Setup

1. **Environment Configuration**
   ```bash
   # Copy the environment example file
   cp .env.example .env.local
   
   # Edit .env.local to match your backend URL
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

2. **Start the Backend Server**
   - Navigate to your backend directory: `C:\Users\USER\Desktop\Work\Work\workcity-assessment-backend`
   - Follow the backend setup instructions (typically `npm install` and `npm start`)
   - Ensure it's running on port 3001 (or update the API URL accordingly)

3. **Start the Frontend**
   ```bash
   npm run dev
   ```

4. **Test the Connection**
   - Look for the gear icon (⚙️) in the bottom-right corner
   - Click it and select "🔍 Check System Status"
   - This will verify your backend connection

## API Endpoints Expected

The frontend expects the following API endpoints from the backend:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Clients
- `GET /api/clients` - Get all clients (with pagination/filtering)
- `GET /api/clients/:id` - Get specific client
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Projects
- `GET /api/projects` - Get all projects (with pagination/filtering)
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Health Check
- `GET /api/health` - API health status
- `GET /api/health/database` - Database health status

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}
```

### Client
```typescript
interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  position?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  status: 'active' | 'inactive';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Project
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  client?: Client;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  startDate: string;
  endDate?: string;
  budget?: number;
  technologies?: string[];
  createdAt: string;
  updatedAt: string;
}
```

## Authentication Flow

1. **Login/Signup**: Frontend sends credentials to `/api/auth/login` or `/api/auth/signup`
2. **Token Storage**: Backend returns JWT token, frontend stores in localStorage
3. **API Requests**: All subsequent requests include `Authorization: Bearer <token>` header
4. **Token Validation**: Backend validates token on protected routes
5. **Auto Logout**: Frontend automatically logs out on 401 responses

## Development Tools

The frontend includes development tools accessible via the gear icon (⚙️) in the bottom-right corner:

- **System Status**: Check API and database connectivity
- **Reload App**: Refresh the entire application
- **Clear Local Storage**: Reset authentication and cached data

## Troubleshooting

### Backend Not Connecting
1. Verify the backend server is running
2. Check the API URL in `.env.local`
3. Use the System Status tool to diagnose connection issues
4. Check browser console for CORS errors

### Authentication Issues
1. Clear local storage using Dev Tools
2. Verify JWT token format with backend
3. Check token expiration handling

### CORS Issues
Ensure your backend allows requests from `http://localhost:3000` (or your frontend URL):

```javascript
// Example Express.js CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

## Production Deployment

1. **Environment Variables**
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
   NEXT_PUBLIC_APP_ENV=production
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   npm start
   ```

## Mock vs API Mode

- **API Mode** (Current): Uses real backend API calls
- **Mock Mode**: Available in `src/lib/auth-mock.ts` for development without backend

To switch back to mock mode:
```bash
mv src/lib/auth.ts src/lib/auth-api.ts
mv src/lib/auth-mock.ts src/lib/auth.ts
```
