'use client'

import { useAuth } from '@/hooks/useAuth'
import { useClients } from '@/hooks/useClients'
import { useProjects } from '@/hooks/useProjects'
import Button from '@/components/Button'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import { 
  UserGroupIcon, 
  BriefcaseIcon, 
  ChartBarIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const { clients } = useClients()
  const { projects } = useProjects()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here&apos;s an overview of your clients and projects.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <BriefcaseIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(p => p.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <Link href="/clients" className="block">
                <Button 
                  variant="outline" 
                  className="w-full justify-between h-14 text-left hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <span className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md mr-4">
                      <UserGroupIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Manage Clients</div>
                      <div className="text-sm text-gray-500">View and edit client information</div>
                    </div>
                  </span>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                </Button>
              </Link>
              
              <Link href="/projects" className="block">
                <Button 
                  variant="outline" 
                  className="w-full justify-between h-14 text-left hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                >
                  <span className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-md mr-4">
                      <BriefcaseIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Manage Projects</div>
                      <div className="text-sm text-gray-500">Track and organize your projects</div>
                    </div>
                  </span>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-500">
                      {project.status === 'in-progress' ? 'In Progress' : project.status}
                    </p>
                  </div>
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
              
              {projects.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No projects yet. Create your first project!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Unauthenticated view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Workcity Assessment</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Manage your clients and projects efficiently with our comprehensive 
            project management platform designed for modern businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Client Management</h3>
            <p className="text-gray-600">
              Keep track of all your clients, their contact information, and project history in one place.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BriefcaseIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Tracking</h3>
            <p className="text-gray-600">
              Monitor project progress, deadlines, and budgets with intuitive dashboards and reporting.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">User Dashboard</h3>
            <p className="text-gray-600">
              Get insights into your business with comprehensive analytics and performance metrics.
            </p>
          </div>
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of businesses that trust Workcity Assessment to manage 
            their client relationships and project workflows.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Start Your Free Trial
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
