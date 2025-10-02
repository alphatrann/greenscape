import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { formSchema } from '../utils'
import { Category } from '@renderer/../../common/types'
import { useFiltersContext } from '@renderer/common/contexts/filters-context'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { v4 } from 'uuid'

export const useCreateCategory = (
  addCategory: (newCategory: Category) => void,
  closeModal: () => void,
  parentCategoryId?: number
) => {
  const { online } = useOnlineStatus()
  const [loading, setLoading] = useState(false)
  const { setTotal } = useFiltersContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if (online) {
        const response = await window.electronAPI.createCategory({ ...values, parentCategoryId })

        if ('message' in response) {
          form.setError('slug', { message: response.message })
          return
        } else addCategory({ ...response, unitsSold: 0, sales: 0, subCategories: [] })
      } else {
        const offlineSlug = `${values.slug}-${v4()}`
        const newCategory: Category = {
          id: -Math.floor(Math.random() * 2 ** 32 - 1),
          ...values,
          slug: offlineSlug,
          productCount: 0,
          parentCategoryId,
          unitsSold: 0,
          sales: 0,
          subCategories: [],
          parentCategory: null
        }
        await window.electronAPI.createCategoryOffline(newCategory)
        addCategory(newCategory)
      }
      closeModal()
      toast.success('Category created')
      form.reset()
      setTotal((t) => t + 1)
    } catch (error: any) {
      const message: string = error.message
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) }
}
