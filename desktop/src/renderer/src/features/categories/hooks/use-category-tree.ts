import { create } from 'zustand'
import { produce } from 'immer'
import { Category, SortState } from '@renderer/../../common/types'
import { searchCategory } from '../utils'
import { sortCategories } from '../utils/sort-categories'

type CategoryTreeState = {
  categories: Category[]
  fetchCategoriesOffline: () => Promise<void>
  fetchCategories: (queryString?: string) => Promise<void>
  addCategory: (newCategory: Category) => Promise<void>
  editCategory: (updatedCategory: Category) => Promise<void>
  deleteCategory: (id: number) => Promise<void>
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
  fetchCategoriesOffline: async () => {
    const categories = await window.electronAPI.getCategoriesTree()
    set({ categories })
  },

  fetchCategories: async (queryString) => {
    const categories = await window.electronAPI.fetchCategoriesTree(queryString)
    set({ categories })
    await window.electronAPI.setCategories(categories)
  },

  addCategory: async (newCategory) => {
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
    await window.electronAPI.setCategories(get().categories)
  },

  editCategory: async (updatedCategory) => {
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
    await window.electronAPI.setCategories(get().categories)
  },

  deleteCategory: async (id) => {
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
    await window.electronAPI.setCategories(get().categories)
  }
}))
