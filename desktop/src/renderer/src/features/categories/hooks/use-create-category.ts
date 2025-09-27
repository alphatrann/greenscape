import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { formSchema } from '../utils'
import { createCategory } from '../api'
import { Category } from '../types'
import { useFiltersContext } from '@renderer/common/contexts/filters-context'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'

export const useCreateCategory = (
  addCategory: (newCategory: Category) => void,
  parentCategoryId?: number
) => {
  const online = useOnlineStatus()
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
        const newCategory = await createCategory({ ...values, parentCategoryId })
        addCategory({ ...newCategory, unitsSold: 0, sales: 0, subCategories: [] })
      } else {
        const newCategory: Category = {
          id: -Math.floor(Math.random() * 2 ** 32 - 1),
          ...values,
          _count: { products: 0 },
          parentCategoryId,
          unitsSold: 0,
          sales: 0,
          subCategories: [],
          parentCategory: null
        }
        /** @todo store pending writes here */
        addCategory(newCategory)
      }
      toast.success('Category created')
      form.reset()
      setTotal((t) => t + 1)
    } catch (error: any) {
      const message: string = error.message
      if (message.includes('slug')) form.setError('slug', { message }, { shouldFocus: true })
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) }
}
