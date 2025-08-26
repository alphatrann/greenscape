export interface Category {
  id: number
  name: string
  slug: string
  parentCategory: Category | null
  subCategories?: Category[]
  parentCategoryId?: number
  _count: { products: number; subCategories: number }
}

export interface CategoryFormDto {
  name: string
  slug: string
  parentCategoryId?: number
}

export interface CategoriesResponse {
  count: number
  data: {
    categories: Category[]
    parents: Category | null
  }
}
