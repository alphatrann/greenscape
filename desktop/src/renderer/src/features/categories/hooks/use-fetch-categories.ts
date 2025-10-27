import { useEffect } from 'react'
import { useCategoryTreeStore } from './use-category-tree'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import toast from 'react-hot-toast'

export const useFetchCategories = () => {
  const { fetchCategories, fetchCategoriesOffline } = useCategoryTreeStore()
  const { online } = useOnlineStatus()

  useEffect(() => {
    if (online)
      fetchCategories().catch(async () => {
        try {
          toast.error('Failed to fetch categories. Using offline data instead.')
          await fetchCategoriesOffline()
        } catch (error: any) {
          toast.error(error?.message ?? 'Failed to fetch offline categories')
        }
      })
    else fetchCategoriesOffline()
  }, [online, fetchCategories, fetchCategoriesOffline])
}
