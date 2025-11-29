import { contextBridge, ipcRenderer } from 'electron'
import {
  Category,
  CategoryFormDto,
  ExportOrdersPayload,
  ExportPayload,
  LocalFilePayload,
  LoginDto,
  Order,
  Product,
  ProductFormDto
} from '../common/types'

contextBridge.exposeInMainWorld('electronAPI', {
  syncOperations: () => ipcRenderer.invoke('sync-operations'),
  getMonthlySalesInYear: (year: number) => ipcRenderer.invoke('get-monthly-sales-in-year', year),
  getKeyStats: (start: Date, end: Date) => ipcRenderer.invoke('get-key-stats', start, end),
  getSalesByCountries: (start: Date, end: Date) =>
    ipcRenderer.invoke('get-sales-by-countries', start, end),

  exportProducts: (payload: ExportPayload) => ipcRenderer.invoke('export-products', payload),
  exportOrders: (payload: ExportOrdersPayload) => ipcRenderer.invoke('export-orders', payload),
  exportInvoice: (id: string) => ipcRenderer.invoke('export-invoice', id),

  upsertOfflineProducts: (products: Product[], options?: { overrideImages: boolean }) =>
    ipcRenderer.invoke('upsert-offline-products', products, options),
  createProduct: (dto: ProductFormDto) => ipcRenderer.invoke('create-product', dto),
  uploadProductImages: (productId: number, paths: string[]) =>
    ipcRenderer.invoke('upload-product-images', productId, paths),
  updateProduct: (productId: number, dto: ProductFormDto) =>
    ipcRenderer.invoke('update-product', productId, dto),
  deleteImages: (productId: number, imageIds: string[]) =>
    ipcRenderer.invoke('delete-images', productId, imageIds),
  getProducts: (query: Record<string, any>) => ipcRenderer.invoke('get-products', query),
  fetchProducts: (query?: string, selectedCategory?: string) =>
    ipcRenderer.invoke('fetch-products', query, selectedCategory),
  createOfflineProduct: (product: Product) => ipcRenderer.invoke('create-offline-product', product),
  updateOfflineProduct: (product: Product) => ipcRenderer.invoke('update-offline-product', product),
  uploadLocalProductImages: (productId: number, filesPayload: LocalFilePayload[]) =>
    ipcRenderer.invoke('upload-local-product-images', productId, filesPayload),
  deleteLocalProductImages: (productId: number, imageIds: string[]) =>
    ipcRenderer.invoke('delete-local-product-images', productId, imageIds),
  syncProductImageIds: (productId: number, ids: string[]) =>
    ipcRenderer.invoke('sync-product-image-ids', productId, ids),

  deleteRecords: (ids: (number | string)[], entityName: 'categories' | 'products') =>
    ipcRenderer.invoke('delete-records', ids, entityName),

  upsertOfflineOrders: (orders: Order[]) => ipcRenderer.invoke('upsert-offline-orders', orders),
  getOrders: (query: Record<string, any>) => ipcRenderer.invoke('get-orders', query),
  fetchOrders: (query?: string) => ipcRenderer.invoke('fetch-orders', query),
  updateDeliveryStatus: (orderId: string) => ipcRenderer.invoke('update-delivery-status', orderId),
  updateDeliveryStatusOffline: (orderId: string) =>
    ipcRenderer.invoke('update-delivery-status-offline', orderId),
  getOfflineOrder: (id: string) => ipcRenderer.invoke('get-offline-order', id),
  fetchOrder: (id: string) => ipcRenderer.invoke('fetch-order', id),

  // ✅ Category-related
  exportCategories: (payload: ExportPayload) => ipcRenderer.invoke('export-categories', payload),
  upsertCategories: (categories: Category[]) => ipcRenderer.invoke('upsert-categories', categories),
  setCategories: (categories: Category[]) => ipcRenderer.invoke('set-categories', categories),
  createCategory: (dto: CategoryFormDto) => ipcRenderer.invoke('create-category', dto),
  updateCategory: (id: number, dto: CategoryFormDto) =>
    ipcRenderer.invoke('update-category', id, dto),
  createCategoryOffline: (category: Category) =>
    ipcRenderer.invoke('create-category-offline', category),
  updateCategoryOffline: (category: Category) =>
    ipcRenderer.invoke('update-category-offline', category),
  fetchCategoriesTree: (query?: string) => ipcRenderer.invoke('fetch-categories-tree', query),
  getCategoriesTree: () => ipcRenderer.invoke('get-categories-tree'),

  getProductDetail: (slug: string) => ipcRenderer.invoke('get-product-detail', slug),
  fetchProduct: (slug: string) => ipcRenderer.invoke('fetch-product', slug),

  login: (dto: LoginDto) => ipcRenderer.invoke('login', dto),
  logout: () => ipcRenderer.invoke('logout'),
  getCurrentUser: () => ipcRenderer.invoke('get-current-user'),
  getLocalUser: () => ipcRenderer.invoke('get-local-user')
})
