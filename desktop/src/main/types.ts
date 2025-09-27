export enum Status {
  Active = 'Active',
  Draft = 'Draft',
  Archived = 'Archived'
}
export interface Product {
  id: number
  name: string
  slug: string
  desc: string
  price: number
  status: Status
  inStock: number
  categories: Category[]
  createdAt: Date
  updatedAt: Date
  images: ProductImage[]
  _count: { orders: number }
}
export interface ProductImage {
  file: {
    id: string
    url?: string
  }
}
export interface Category {
  id: number
  name: string
  slug: string
  parentCategory: Category | null
  subCategories?: Category[]
  parentCategoryId?: number
  _count: { products: number; subCategories: number }
}
export interface Order {
  id: string
  customer: string
  email: string
  line1: string
  line2?: string
  state?: string
  city?: string
  postalCode?: string
  country?: string
  phone: string
  products: OrdersOnProducts[]
  shippingCost: number
  total: number
  createdAt: Date
  deliveredAt?: Date
  tax: number
}
interface OrdersOnProducts {
  productId: number
  orderId: string
  qty: number
  product: {
    name: string
    price: number
    category: { name: string }
  }
}

export interface StatusGroup {
  _count: { id: number }
  status: Status
}

export interface File {
  buffer: Buffer
  filename: string
}

export interface SaveImagesOfflineDto {
  files: File[]
  imagesDir: string
}

export interface ProductQuery {
  q?: string
  price?: [number?, number?]
  inStock?: [number?, number?]
  status?: string
  selectedCategory?: string
  from?: Date
  to?: Date
  sortBy?: 'price' | 'inStock' | 'orders' | 'createdAt' | 'id'
  order?: 'asc' | 'desc'
  offset?: number
  limit?: number
}
