export interface Category {
  id: number
  name: string
  slug: string
  parentCategory: Category | null
  subCategories?: Category[]
  parentCategoryId?: number
  _count: { products: number }
  unitsSold: number
  sales: number
}

export interface CategoryFormDto {
  name: string
  slug: string
  parentCategoryId?: number
}

export type CategorySortBy = 'id' | 'sales' | 'unitsSold'
