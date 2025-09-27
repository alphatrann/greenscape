import { useEffect } from 'react'
import { useCategoryTreeStore } from './use-category-tree'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'

export const useFetchCategories = () => {
  const { fetchCategories, fetchCategoriesOffline } = useCategoryTreeStore()
  const online = useOnlineStatus()

  useEffect(() => {
    if (online) fetchCategories().catch(fetchCategoriesOffline)
    else fetchCategoriesOffline()
  }, [fetchCategories, fetchCategoriesOffline])
}
