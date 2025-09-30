import {
  Category,
  CategoryFormDto,
  LocalFilePayload,
  GetProductsResponse,
  KeyStats,
  MonthlySales,
  Order,
  OrdersResponse,
  Product,
  ProductFormDto,
  SalesByCountry,
  User,
  FilePayload
} from '../common/types'

declare global {
  interface Window {
    electronAPI: {
      getMonthlySalesInYear: (
        year: number
      ) => Promise<{ startYear: number; monthlySales: MonthlySales[] }>
      getKeyStats: (start: Date, end: Date) => Promise<KeyStats>
      getSalesByCountries: (start: Date, end: Date) => Promise<SalesByCountry[]>

      exportData: (payload: any) => void
      exportInvoice: (payload: any) => void

      upsertProducts: (products: Product[], options?: { overrideImages: boolean }) => Promise<void>
      createProduct: (dto: ProductFormDto) => Promise<Product | { message: string }>
      uploadProductImages: (productId: number, paths: string[]) => Promise<string[]>
      updateProduct: (
        productId: number,
        dto: ProductFormDto
      ) => Promise<Product | { message: string }>
      deleteImages: (productId: number, imageIds: string[]) => Promise<void>
      getProducts: (query: Record<string, any>) => Promise<GetProductsResponse>
      deleteRecords: (
        ids: (number | string)[],
        entityName: 'categories' | 'products'
      ) => Promise<void>
      fetchProducts: (query?: string, selectedCategory?: string) => Promise<GetProductsResponse>
      uploadLocalProductImages: (
        productId: number,
        filesPayload: LocalFilePayload[]
      ) => Promise<string[]>

      upsertOrders: (orders: Order[]) => Promise<void>
      getOrders: (query: Record<string, any>) => Promise<OrdersResponse>
      fetchOrders: (query?: string) => Promise<OrdersResponse>
      updateDeliveryStatus: (orderId: string) => Promise<Date>

      upsertCategories: (categories: Category[]) => Promise<void>
      createCategory: (dto: CategoryFormDto) => Promise<Category | { message: string }>
      updateCategory: (id: number, dto: CategoryFormDto) => Promise<Category | { message: string }>
      getCategories: (query: Record<string, any>) => Promise<Category[]>
      getCategoriesTree: (query?: string) => Promise<Category[]>

      getProductDetail: (slug: string) => Promise<Product | null>
      fetchProduct: (slug: string) => Promise<Product | null>

      getOrderDetail: (id: string) => Promise<Order | null>
      fetchOrder: (id: string) => Promise<Order | null>

      saveToken: (token: string) => Promise<void>
      deleteToken: () => Promise<void>

      getCurrentUser: () => Promise<User | null>
    }
  }
}
