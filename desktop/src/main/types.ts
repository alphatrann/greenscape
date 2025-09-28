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
  count: number
  status: Status
}

export interface File {
  id?: string
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

export type OrderQuery = {
  q?: string
  totalRange?: [number?, number?]
  shippingCost?: number
  status?: string
  countries?: string[]
  from?: Date
  to?: Date
  sortBy?: 'total' | 'shippingCost' | 'createdAt' | 'deliveredAt' | 'id'
  order?: 'asc' | 'desc'
  offset?: number
  limit?: number
}

export interface ShippingGroup {
  shippingCost: number
  count: number
  total: number
}

export interface CountryGroup {
  country: string
  count: number
  total: number
}

export interface DeliveryStatusGroups {
  delivered: {
    count: number
    total: number
  }
  pending: {
    count: number
    total: number
  }
}

export interface OrdersResponse {
  data: Order[]
  count: number
  sales: number
  deliveryStatusGroups: DeliveryStatusGroups
  shippingGroups: ShippingGroup[]
  countryGroups: CountryGroup[]
}

export enum DeliveryStatus {
  Pending = 'pending',
  Delivered = 'delivered'
}
