import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { formSchema } from '../utils'
import { Category } from '../types'
import { useEditCategoryModal } from './use-edit-category-modal'
import { updateCategory } from '../api'

export const useEditCategory = (
  category: Category | null,
  editCategory: (updated: Category) => void
) => {
  const [loading, setLoading] = useState(false)
  const { onClose } = useEditCategoryModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (category) {
      form.setValue('name', category.name)
      form.setValue('slug', category.slug)
    }
  }, [category])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!category) return
    try {
      setLoading(true)
      const updated = await updateCategory(category.id, values)
      editCategory(updated)
      toast.success('Category updated')
      onClose()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) }
}
