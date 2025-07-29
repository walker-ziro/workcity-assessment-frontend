'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useClients } from '@/hooks/useClients'
import { useProjects } from '@/hooks/useProjects'
import Button from '@/components/Button'
import LoadingSpinner from '@/components/LoadingSpinner'
import Modal from '@/components/Modal'
import { AddEditClientForm } from '@/components/AddEditClientForm'
import type { Client, Project } from '@/types'
import {
  ArrowLeftIcon,
  PencilIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  DocumentTextIcon,
  CalendarIcon,
  FolderIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export default function ClientProfile() {
  const params = useParams()
  const router = useRouter()
  const { clients, isLoading: clientsLoading } = useClients()
  const { projects, isLoading: projectsLoading } = useProjects()
  const [client, setClient] = useState<Client | null>(null)
  const [clientProjects, setClientProjects] = useState<Project[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const clientId = params.id as string

  useEffect(() => {
    if (clients.length > 0) {
      const foundClient = clients.find(c => c.id === clientId)
      setClient(foundClient || null)
    }
  }, [clients, clientId])

  useEffect(() => {
    if (projects.length > 0 && clientId) {
      const relatedProjects = projects.filter(p => p.clientId === clientId)
      setClientProjects(relatedProjects)
    }
  }, [projects, clientId])

  const handleBack = () => {
    router.push('/clients')
  }

  const handleViewProject = (projectId: string) => {
    router.push(`/projects/${projectId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProjectStatusColor = (status: string) => {
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

  if (clientsLoading || projectsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!client) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Client Not Found</h1>
          <p className="text-gray-600 mb-6">The client you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={handleBack}>
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Clients
          </Button>
        </div>
      </div>
    )
  }

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
          Back to Clients
        </Button>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <UserIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
                <span className="text-gray-500 text-sm">
                  Client since {new Date(client.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PencilIcon className="h-5 w-5" />
            Edit Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a 
                    href={`mailto:${client.email}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {client.email}
                  </a>
                </div>
              </div>

              {client.phone && (
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a 
                      href={`tel:${client.phone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {client.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="text-gray-900">{client.company}</p>
                </div>
              </div>

              {client.address && (
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{client.address}</p>
                  </div>
                </div>
              )}

              {client.notes && (
                <div className="flex items-start">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="text-gray-900">{client.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-gray-900">
                    {new Date(client.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FolderIcon className="h-6 w-6 text-gray-400 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Projects ({clientProjects.length})
                  </h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/projects/new?clientId=' + client.id)}
                >
                  Add Project
                </Button>
              </div>
            </div>

            <div className="p-6">
              {clientProjects.length === 0 ? (
                <div className="text-center py-8">
                  <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This client doesn&apos;t have any projects yet.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => router.push('/projects/new?clientId=' + client.id)}
                    >
                      Create First Project
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {clientProjects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {project.name}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getProjectStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ')}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{project.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div>
                              <span className="font-medium">Start Date:</span>{' '}
                              {new Date(project.startDate).toLocaleDateString()}
                            </div>
                            {project.endDate && (
                              <div>
                                <span className="font-medium">End Date:</span>{' '}
                                {new Date(project.endDate).toLocaleDateString()}
                              </div>
                            )}
                            {project.budget && (
                              <div>
                                <span className="font-medium">Budget:</span>{' '}
                                ${project.budget.toLocaleString()}
                              </div>
                            )}
                          </div>
                          
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="mt-3">
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProject(project.id)}
                          className="ml-4"
                        >
                          <EyeIcon className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Client Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Client"
      >
        <AddEditClientForm
          client={client}
          onSuccess={() => setIsEditModalOpen(false)}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
