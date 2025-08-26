import { create } from 'zustand'
import { Category } from '../types'

interface EditCategoryModalStore {
  isOpen: boolean
  currentCategory: Category | null
  onOpen: (category: Category) => void
  onClose: () => void
}

export const useEditCategoryModal = create<EditCategoryModalStore>((set) => ({
  isOpen: false,
  currentCategory: null,
  onOpen: (category) => set({ isOpen: true, currentCategory: category }),
  onClose: () => set({ isOpen: false, currentCategory: null })
}))
