import { Category } from './categories'

export type FilePreview = File & { preview: string }

export enum Status {
  Active = 'Active',
  Draft = 'Draft',
  Archived = 'Archived'
}

export interface GetProductsResponse {
  count: number
  success: boolean
  data: Product[]
  statusGroups: StatusGroup[]
  categoryGroups: CategoryGroup[]
}

export interface Product {
  id: number
  name: string
  slug: string
  desc: string
  price: number
  status: Status
  inStock: number
  categories: Pick<Category, 'id'>[]
  createdAt: Date
  updatedAt: Date
  images: ProductImage[]
  ordersMade: number
}

export interface ProductImage {
  file: {
    id: string
    url?: string
  }
}

export interface ProductFormDto {
  name: string
  slug: string
  desc: string
  price: number
  inStock: number
  status: Status
  categoryIds: number[]
}

export interface StatusGroup {
  count: number
  status: Status
}

export interface CategoryGroup {
  count: number
  id: number
}
