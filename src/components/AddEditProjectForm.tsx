'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useProjects } from '@/hooks/useProjects'
import { useClients } from '@/hooks/useClients'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import type { Project } from '@/types'

const projectSchema = yup.object({
  name: yup.string().required('Project name is required'),
  description: yup.string().required('Description is required'),
  clientId: yup.string().required('Client is required'),
  status: yup.string().oneOf(['planning', 'in-progress', 'completed', 'on-hold', 'cancelled']).required('Status is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().optional(),
  budget: yup.number().positive('Budget must be positive').optional(),
  technologies: yup.string().optional(),
})

type ProjectFormData = {
  name: string;
  description: string;
  clientId: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  startDate: string;
  endDate?: string;
  budget?: number;
  technologies?: string;
}

interface AddEditProjectFormProps {
  project?: Project | null
  onSuccess: () => void
  onCancel: () => void
}

const statusOptions = [
  { value: 'planning', label: 'Planning' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'cancelled', label: 'Cancelled' },
]

export function AddEditProjectForm({ project, onSuccess, onCancel }: AddEditProjectFormProps) {
  const { createProject, updateProject } = useProjects()
  const { clients } = useClients()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!project

  const clientOptions = clients.map(client => ({
    value: client.id,
    label: `${client.name} (${client.company})`
  }))

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProjectFormData>({
    resolver: yupResolver(projectSchema) as any,
    defaultValues: {
      name: '',
      description: '',
      clientId: '',
      status: 'planning',
      startDate: '',
      endDate: '',
      budget: undefined,
      technologies: '',
    },
  })

  // Pre-populate form when editing
  useEffect(() => {
    if (project) {
      setValue('name', project.name)
      setValue('description', project.description)
      setValue('clientId', project.clientId)
      setValue('status', project.status)
      setValue('startDate', project.startDate.split('T')[0]) // Convert to YYYY-MM-DD format
      setValue('endDate', project.endDate ? project.endDate.split('T')[0] : '')
      setValue('budget', project.budget || undefined)
      setValue('technologies', project.technologies?.join(', ') || '')
    }
  }, [project, setValue])

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)
    try {
      const projectData = {
        ...data,
        budget: data.budget || undefined,
        technologies: data.technologies ? data.technologies.split(',').map(tech => tech.trim()).filter(Boolean) : undefined,
      }

      if (isEditing && project) {
        await updateProject(project.id, projectData)
      } else {
        await createProject(projectData)
      }
      onSuccess()
      reset()
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Name */}
        <div className="md:col-span-2">
          <Input
            label="Project Name"
            type="text"
            placeholder="Enter project name"
            error={errors.name?.message}
            {...register('name')}
          />
        </div>

        {/* Client */}
        <div className="md:col-span-2">
          <Select
            label="Client"
            options={[
              { value: '', label: 'Select a client' },
              ...clientOptions
            ]}
            error={errors.clientId?.message}
            {...register('clientId')}
          />
        </div>

        {/* Status */}
        <div>
          <Select
            label="Status"
            options={statusOptions}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        {/* Budget */}
        <div>
          <Input
            label="Budget"
            type="number"
            placeholder="0"
            error={errors.budget?.message}
            {...register('budget', { 
              setValueAs: (value) => value === '' ? undefined : parseFloat(value) 
            })}
          />
        </div>

        {/* Start Date */}
        <div>
          <Input
            label="Start Date"
            type="date"
            error={errors.startDate?.message}
            {...register('startDate')}
          />
        </div>

        {/* End Date */}
        <div>
          <Input
            label="End Date"
            type="date"
            error={errors.endDate?.message}
            {...register('endDate')}
          />
        </div>

        {/* Technologies */}
        <div className="md:col-span-2">
          <Input
            label="Technologies"
            type="text"
            placeholder="React, Node.js, PostgreSQL (comma separated)"
            error={errors.technologies?.message}
            {...register('technologies')}
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter technologies separated by commas
          </p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-200"
            placeholder="Describe the project goals, requirements, and deliverables..."
            {...register('description')}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isEditing ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
    </div>
  )
}
