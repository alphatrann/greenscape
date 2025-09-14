import { useEffect, useState } from 'react'
import { Category, CategorySortBy } from '../types'
import { getCategoriesTree } from '../api'
import { produce } from 'immer'
import { searchCategory } from '../utils'
import { sortCategories } from '../utils/sort-categories'
import { SortOrder } from '../../../common/types'

export const useCategoryTree = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [sortBy, setSortBy] = useState<CategorySortBy>('id')
  const [order, setOrder] = useState<SortOrder>('asc')

  useEffect(() => {
    setCategories((prev) => {
      return produce(prev, (draft) => {
        sortCategories(draft, sortBy, order)
      })
    })
  }, [sortBy, order])

  const fetchCategories = (queryString?: string) => {
    getCategoriesTree(queryString).then(setCategories)
  }

  const addCategory = (newCategory: Category) => {
    setCategories((prev) => {
      const parentId = newCategory.parentCategoryId
      if (!parentId) return [...prev, newCategory]
      return produce(prev, (draft) => {
        const [, parent] = searchCategory(draft, parentId, 'id')

        if (parent) {
          if (!parent.subCategories) {
            parent.subCategories = []
          }
          parent.subCategories.push(newCategory)
        }
      })
    })
  }

  const editCategory = (updatedCategory: Category) => {
    setCategories((prev) => {
      const parentId = updatedCategory.parentCategoryId
      if (!parentId)
        return prev.map((p) =>
          p.id === updatedCategory.id
            ? {
                ...updatedCategory,
                sales: p.sales,
                productCount: p.productCount,
                subCategories: p.subCategories
              }
            : p
        )

      return produce(prev, (draft) => {
        const [, parent] = searchCategory(draft, parentId, 'id')

        if (parent) {
          if (!parent.subCategories) {
            parent.subCategories = []
          }
          const idx = parent.subCategories.findIndex((c) => c.id === updatedCategory.id)
          if (idx >= 0)
            parent.subCategories[idx] = {
              ...updatedCategory,
              productCount: parent.subCategories[idx].productCount,
              sales: parent.subCategories[idx].sales,
              subCategories: parent.subCategories[idx].subCategories
            }
        }
      })
    })
  }

  const deleteCategory = (id: number) => {
    setCategories((prev) => {
      const [, found] = searchCategory(categories, id, 'id')
      if (!found) return prev
      const parentId = found.parentCategoryId
      if (!parentId) return prev.filter((p) => p.id !== id)
      return produce(prev, (draft) => {
        const [, parent] = searchCategory(draft, parentId, 'id')
        if (parent) {
          const subCategories = parent.subCategories ?? []
          const index = subCategories.findIndex((c) => c.id === id)
          if (index >= -1) subCategories.splice(index, 1)
        }
      })
    })
  }

  return {
    categories,
    order,
    sortBy,
    fetchCategories,
    addCategory,
    editCategory,
    deleteCategory,
    setOrder,
    setSortBy
  }
}
