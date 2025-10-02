export interface Category {
  id: number
  name: string
  slug: string
  parentCategory: Category | null
  subCategories?: Category[]
  parentCategoryId?: number
  productCount: number
  unitsSold: number
  sales: number
}

export type SortOrder = 'asc' | 'desc'
export interface SortState {
  sortBy: CategorySortBy
  order: SortOrder
}

export interface CategoryFormDto {
  name: string
  slug: string
  parentCategoryId?: number
}

export type CategorySortBy = 'id' | 'sales' | 'unitsSold'
