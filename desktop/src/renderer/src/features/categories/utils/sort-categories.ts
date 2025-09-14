import { Category, CategorySortBy, SortOrder } from '../types'

export const sortCategories = (
  categories: Category[],
  sortBy: CategorySortBy,
  order: SortOrder
) => {
  categories.sort((c1, c2) => (order === 'asc' ? c1[sortBy] - c2[sortBy] : c2[sortBy] - c1[sortBy]))
  for (const c of categories) {
    sortCategories(c.subCategories ?? [], sortBy, order)
  }
}
