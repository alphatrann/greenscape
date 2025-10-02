import { LocalFilePayload } from '../common/types'

export enum SyncActionType {
  CreateCategory = 'createCategory',
  UpdateCategory = 'updateCategory',
  CreateProduct = 'createProduct',
  UploadProductImages = 'uploadProductImages',
  UpdateProduct = 'updateProduct',
  UpdateDeliveryStatus = 'updateDeliveryStatus'
}

export interface SyncOperation {
  actionType: SyncActionType
  payload: any
  timestamp: string
}

export interface SaveImagesOfflineDto {
  files: LocalFilePayload[]
  imagesDir: string
}

export interface ProductQuery {
  q?: string
  price?: [number?, number?]
  inStock?: [number?, number?]
  status?: string
  selectedCategory?: number
  from?: Date
  to?: Date
  sortBy?: 'price' | 'inStock' | 'orders' | 'createdAt' | 'id'
  order?: 'asc' | 'desc'
  offset?: number
  limit?: number
}

export interface OrderQuery {
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
