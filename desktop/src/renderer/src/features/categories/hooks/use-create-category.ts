import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { formSchema } from '../utils'
import { createCategory } from '../api'
import { Category } from '../types'
import { useFiltersContext } from '@renderer/common/contexts/filters-context'

export const useCreateCategory = (
  addCategory: (newCategory: Category) => void,
  parentCategoryId?: number
) => {
  const [loading, setLoading] = useState(false)
  const { setTotal } = useFiltersContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', slug: '' }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const newCategory = await createCategory({ ...values, parentCategoryId })
      toast.success('Category created')
      form.reset()
      setTotal((t) => t + 1)
      addCategory({ ...newCategory, _count: { products: 0, subCategories: 0 } })
    } catch (error: any) {
      const message: string = error.message
      if (message.includes('slug')) form.setError('slug', { message }, { shouldFocus: true })
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) }
}
