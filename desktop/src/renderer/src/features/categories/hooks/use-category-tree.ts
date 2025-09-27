import { create } from 'zustand'
import { produce } from 'immer'
import { getCategoriesTree } from '../api'
import { Category, CategorySortBy } from '../types'
import { searchCategory } from '../utils'
import { SortOrder } from '../../../common/types'
import { sortCategories } from '../utils/sort-categories'

interface SortState {
  sortBy: CategorySortBy
  order: SortOrder
}

type CategoryTreeState = {
  categories: Category[]
  fetchCategoriesOffline: () => void
  fetchCategories: (queryString?: string) => Promise<void>
  addCategory: (newCategory: Category) => void
  editCategory: (updatedCategory: Category) => void
  deleteCategory: (id: number) => void
  sortCategories: (sortState: SortState) => void
}

export const useCategoryTreeStore = create<CategoryTreeState>((set, get) => ({
  categories: [],
  sortState: {
    sortBy: 'id',
    order: 'asc'
  },
  sortCategories: (sortState: SortState) => {
    set(
      produce((state: CategoryTreeState) => {
        sortCategories(state.categories, sortState.sortBy, sortState.order)
      })
    )
  },
  fetchCategoriesOffline: () => {
    const items = localStorage.getItem('category-tree')
    if (!items) return
    try {
      const localCategories = JSON.parse(items) as Category[]
      set({ categories: localCategories })
    } catch {
      // ignore JSON errors
    }
  },

  fetchCategories: async (queryString) => {
    const categories = await getCategoriesTree(queryString)
    set({ categories })
    localStorage.setItem('category-tree', JSON.stringify(categories))
  },

  addCategory: (newCategory) => {
    set(
      produce((state: CategoryTreeState) => {
        const parentId = newCategory.parentCategoryId
        if (!parentId) {
          state.categories.push(newCategory)
          return
        }
        const [, parent] = searchCategory(state.categories, parentId, 'id')
        if (parent) {
          if (!parent.subCategories) parent.subCategories = []
          parent.subCategories.push(newCategory)
        }
      })
    )
    localStorage.setItem('category-tree', JSON.stringify(get().categories))
  },

  editCategory: (updatedCategory) => {
    set(
      produce((state: CategoryTreeState) => {
        const parentId = updatedCategory.parentCategoryId
        if (!parentId) {
          state.categories = state.categories.map((p) =>
            p.id === updatedCategory.id
              ? {
                  ...updatedCategory,
                  sales: p.sales,
                  unitsSold: p.unitsSold,
                  subCategories: p.subCategories
                }
              : p
          )
          return
        }

        const [, parent] = searchCategory(state.categories, parentId, 'id')
        if (parent) {
          if (!parent.subCategories) parent.subCategories = []
          const idx = parent.subCategories.findIndex((c) => c.id === updatedCategory.id)
          if (idx >= 0) {
            parent.subCategories[idx] = {
              ...updatedCategory,
              unitsSold: parent.subCategories[idx].unitsSold,
              sales: parent.subCategories[idx].sales,
              subCategories: parent.subCategories[idx].subCategories
            }
          }
        }
      })
    )
    localStorage.setItem('category-tree', JSON.stringify(get().categories))
  },

  deleteCategory: (id) => {
    set(
      produce((state: CategoryTreeState) => {
        const [, found] = searchCategory(state.categories, id, 'id')
        if (!found) return

        const parentId = found.parentCategoryId
        if (!parentId) {
          state.categories = state.categories.filter((p) => p.id !== id)
          return
        }

        const [, parent] = searchCategory(state.categories, parentId, 'id')
        if (parent?.subCategories) {
          const index = parent.subCategories.findIndex((c) => c.id === id)
          if (index >= 0) parent.subCategories.splice(index, 1)
        }
      })
    )
    localStorage.setItem('category-tree', JSON.stringify(get().categories))
  }
}))
