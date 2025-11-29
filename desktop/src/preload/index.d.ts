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
  FilePayload,
  ExportOrdersPayload,
  ExportPayload,
  LoginDto,
  SyncOptions
} from '../common/types'

declare global {
  interface Window {
    electronAPI: {
      syncOperations: () => Promise<void>

      getMonthlySalesInYear: (
        year: number
      ) => Promise<{ startYear: number; monthlySales: MonthlySales[] }>
      getKeyStats: (start: Date, end: Date) => Promise<KeyStats>
      getSalesByCountries: (start: Date, end: Date) => Promise<SalesByCountry[]>

      exportProducts: (payload: ExportPayload) => Promise<{ success: boolean }>
      exportOrders: (payload: ExportOrdersPayload) => Promise<{ success: boolean }>
      exportInvoice: (id: string) => Promise<{ success: boolean }>

      getProductDetail: (slug: string) => Promise<Product | null>
      fetchProduct: (slug: string) => Promise<Product | null>
      upsertOfflineProducts: (
        products: Product[],
        options?: { overrideImages: boolean }
      ) => Promise<void>
      createProduct: (dto: ProductFormDto) => Promise<Product | { message: string }>
      uploadProductImages: (productId: number, paths: string[]) => Promise<string[]>
      syncProductImageIds: (productId: number, ids: string[]) => Promise<void>
      updateProduct: (
        productId: number,
        dto: ProductFormDto
      ) => Promise<Product | { message: string }>
      deleteImages: (productId: number, imageIds: string[]) => Promise<void>
      getProducts: (query: Record<string, any>) => Promise<GetProductsResponse>
      fetchProducts: (
        query?: string,
        selectedCategory?: string
      ) => Promise<GetProductsResponse | { message: string }>
      updateOfflineProduct: (product: Product) => Promise<void>
      createOfflineProduct: (product: Product) => Promise<void>
      uploadLocalProductImages: (
        productId: number,
        filesPayload: LocalFilePayload[],
        options?: SyncOptions
      ) => Promise<string[]>
      deleteLocalProductImages: (productId: number, imageIds: string[]) => Promise<void>

      deleteRecords: (
        ids: (number | string)[],
        entityName: 'categories' | 'products'
      ) => Promise<void>

      upsertOfflineOrders: (orders: Order[]) => Promise<void>
      getOrders: (query: Record<string, any>) => Promise<OrdersResponse>
      fetchOrders: (query?: string) => Promise<OrdersResponse>
      updateDeliveryStatus: (orderId: string) => Promise<{ deliveredAt: string }>
      updateDeliveryStatusOffline: (orderId: string) => Promise<void>
      getOfflineOrder: (id: string) => Promise<Order | null>
      fetchOrder: (id: string) => Promise<Order | null>

      exportCategories: (payload: ExportPayload) => Promise<{ success: boolean }>
      upsertCategories: (categories: Category[]) => Promise<void>
      setCategories: (categories: Category[]) => Promise<void>
      createCategory: (dto: CategoryFormDto) => Promise<Category | { message: string }>
      updateCategory: (id: number, dto: CategoryFormDto) => Promise<Category | { message: string }>
      createCategoryOffline: (category: Category) => Promise<void>
      updateCategoryOffline: (category: Category) => Promise<void>
      getCategoriesTree: () => Promise<Category[]>
      fetchCategoriesTree: (query?: string) => Promise<Category[]>

      login: (dto: LoginDto) => Promise<User>
      logout: () => Promise<void>
      getCurrentUser: () => Promise<User | null>
      getLocalUser: () => Promise<User | null>
    }
  }
}
