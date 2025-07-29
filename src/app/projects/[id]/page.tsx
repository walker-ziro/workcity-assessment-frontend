'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useProjects } from '@/hooks/useProjects'
import { useClients } from '@/hooks/useClients'
import Button from '@/components/Button'
import LoadingSpinner from '@/components/LoadingSpinner'
import Modal from '@/components/Modal'
import { AddEditProjectForm } from '@/components/AddEditProjectForm'
import type { Project, Client } from '@/types'
import {
  ArrowLeftIcon,
  PencilIcon,
  FolderIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  BuildingOfficeIcon,
  ClockIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  StopIcon
} from '@heroicons/react/24/outline'

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const { projects, isLoading: projectsLoading } = useProjects()
  const { clients, isLoading: clientsLoading } = useClients()
  const [project, setProject] = useState<Project | null>(null)
  const [client, setClient] = useState<Client | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const projectId = params.id as string

  useEffect(() => {
    if (projects.length > 0) {
      const foundProject = projects.find(p => p.id === projectId)
      setProject(foundProject || null)
    }
  }, [projects, projectId])

  useEffect(() => {
    if (project && clients.length > 0) {
      const foundClient = clients.find(c => c.id === project.clientId)
      setClient(foundClient || null)
    }
  }, [project, clients])

  const handleBack = () => {
    router.push('/projects')
  }

  const handleViewClient = () => {
    if (client) {
      router.push(`/clients/${client.id}`)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning':
        return <ClockIcon className="h-6 w-6 text-blue-600" />
      case 'in-progress':
        return <PlayIcon className="h-6 w-6 text-yellow-600" />
      case 'completed':
        return <CheckCircleIcon className="h-6 w-6 text-green-600" />
      case 'on-hold':
        return <PauseIcon className="h-6 w-6 text-orange-600" />
      case 'cancelled':
        return <StopIcon className="h-6 w-6 text-red-600" />
      default:
        return <ClockIcon className="h-6 w-6 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'on-hold':
        return 'bg-orange-100 text-orange-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateProjectProgress = () => {
    if (!project) return 0
    
    const now = new Date()
    const start = new Date(project.startDate)
    const end = project.endDate ? new Date(project.endDate) : new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000) // Default 30 days if no end date
    
    if (project.status === 'completed') return 100
    if (project.status === 'cancelled') return 0
    if (now < start) return 0
    
    const totalDuration = end.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100)
  }

  if (projectsLoading || clientsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={handleBack}>
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  const progress = calculateProjectProgress()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Projects
        </Button>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FolderIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </span>
                <span className="text-gray-500 text-sm">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PencilIcon className="h-5 w-5" />
            Edit Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Timeline</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Progress</span>
                <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(project.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {project.endDate && (
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(project.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="bg-white rounded-lg shadow border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CodeBracketIcon className="h-6 w-6 mr-2" />
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Status */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
            <div className="flex items-center justify-center p-4">
              {getStatusIcon(project.status)}
              <span className="ml-3 text-lg font-medium text-gray-900 capitalize">
                {project.status.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Client Information */}
          {client && (
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Client</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <p className="text-gray-900">{client.company}</p>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewClient}
                    className="w-full"
                  >
                    View Client Profile
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Budget */}
          {project.budget && (
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget</h3>
              <div className="flex items-center justify-center p-4">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                <span className="ml-3 text-2xl font-bold text-gray-900">
                  ${project.budget.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Project Metadata */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-3" />
                <div>
                  <span className="text-gray-500">Created:</span>{' '}
                  <span className="text-gray-900">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center">
                <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-3" />
                <div>
                  <span className="text-gray-500">Last Updated:</span>{' '}
                  <span className="text-gray-900">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Project Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Project"
      >
        <AddEditProjectForm
          project={project}
          onSuccess={() => setIsEditModalOpen(false)}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
