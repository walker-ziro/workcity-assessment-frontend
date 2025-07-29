'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useClients } from '@/hooks/useClients'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import type { Client } from '@/types'

const clientSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().notRequired(),
  company: yup.string().required('Company is required'),
  address: yup.string().notRequired(),
  status: yup.string().oneOf(['active', 'inactive'] as const).required('Status is required'),
  notes: yup.string().notRequired(),
})

type ClientFormData = {
  name: string;
  email: string;
  phone?: string;
  company: string;
  address?: string;
  status: 'active' | 'inactive';
  notes?: string;
}

interface AddEditClientFormProps {
  client?: Client | null
  onSuccess: () => void
  onCancel: () => void
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export function AddEditClientForm({ client, onSuccess, onCancel }: AddEditClientFormProps) {
  const { createClient, updateClient } = useClients()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!client

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ClientFormData>({
    resolver: yupResolver(clientSchema) as any,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      status: 'active',
      notes: '',
    },
  })

  // Pre-populate form when editing
  useEffect(() => {
    if (client) {
      setValue('name', client.name)
      setValue('email', client.email)
      setValue('phone', client.phone || '')
      setValue('company', client.company)
      setValue('address', client.address || '')
      setValue('status', client.status)
      setValue('notes', client.notes || '')
    }
  }, [client, setValue])

  const onSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true)
    try {
      if (isEditing && client) {
        await updateClient(client.id, data)
      } else {
        await createClient(data)
      }
      onSuccess()
      reset()
    } catch (error) {
      console.error('Error saving client:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter client's full name"
            error={errors.name?.message}
            {...register('name')}
          />
        </div>

        {/* Email */}
        <div>
          <Input
            label="Email Address"
            type="email"
            placeholder="client@company.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        {/* Phone */}
        <div>
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        {/* Company */}
        <div>
          <Input
            label="Company"
            type="text"
            placeholder="Company name"
            error={errors.company?.message}
            {...register('company')}
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

        {/* Address */}
        <div className="md:col-span-2">
          <Input
            label="Address"
            type="text"
            placeholder="123 Main St, City, State 12345"
            error={errors.address?.message}
            {...register('address')}
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-200"
            placeholder="Additional notes about the client..."
            {...register('notes')}
          />
          {errors.notes && (
            <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
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
          {isEditing ? 'Update Client' : 'Create Client'}
        </Button>
      </div>
    </form>
    </div>
  )
}
