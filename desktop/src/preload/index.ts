import { contextBridge, ipcRenderer } from 'electron'
import { LocalFilePayload, ProductFormDto } from '../common/types'

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    exportData: (payload: any) => ipcRenderer.send('export-data', payload),
    exportInvoice: (order: any) => ipcRenderer.send('export-invoice', order),

    upsertProducts: (products: any[], options?: { overrideImages: boolean }) =>
      ipcRenderer.invoke('upsert-products', products, options),
    upsertOrders: (orders: any[]) => ipcRenderer.invoke('upsert-orders', orders),
    uploadProductImages: (productId: number, paths: string[]) =>
      ipcRenderer.invoke('upload-product-images', productId, paths),

    getProducts: (query: Record<string, any>) => ipcRenderer.invoke('get-products', query),
    getOrders: (query: Record<string, any>) => ipcRenderer.invoke('get-orders', query),

    getProductDetail: (slug: string) => ipcRenderer.invoke('get-product-detail', slug),
    getOrderDetail: (id: string) => ipcRenderer.invoke('get-order-detail', id),

    // Added handlers below
    getMonthlySalesInYear: (year: number) => ipcRenderer.invoke('get-monthly-sales-in-year', year),
    getKeyStats: (start: Date, end: Date) => ipcRenderer.invoke('get-key-stats', start, end),
    getSalesByCountries: (start: Date, end: Date) =>
      ipcRenderer.invoke('get-sales-by-countries', start, end),

    createProduct: (dto: any) => ipcRenderer.invoke('create-product', dto),
    updateProduct: (productId: number, dto: Partial<ProductFormDto>) =>
      ipcRenderer.invoke('update-product', productId, dto),
    deleteImages: (productId: number, imageIds: string[]) =>
      ipcRenderer.invoke('delete-images', productId, imageIds),
    deleteRecords: (ids: (number | string)[], entityName: 'categories' | 'products') =>
      ipcRenderer.invoke('delete-records', ids, entityName),
    fetchProducts: (query?: string, selectedCategory?: string) =>
      ipcRenderer.invoke('fetch-products', query, selectedCategory),
    uploadLocalProductImages: (productId: number, filePayloads: LocalFilePayload[]) =>
      ipcRenderer.invoke('upload-local-product-images', productId, filePayloads),

    fetchOrders: (query?: string) => ipcRenderer.invoke('fetch-orders', query),
    updateDeliveryStatus: (orderId: string) =>
      ipcRenderer.invoke('update-delivery-status', orderId),

    upsertCategories: (categories: any[]) => ipcRenderer.invoke('upsert-categories', categories),
    createCategory: (dto: any) => ipcRenderer.invoke('create-category', dto),
    updateCategory: (id: number, dto: any) => ipcRenderer.invoke('update-category', id, dto),
    getCategories: (query: Record<string, any>) => ipcRenderer.invoke('get-categories', query),
    getCategoriesTree: (query?: string) => ipcRenderer.invoke('get-categories-tree', query),

    fetchProduct: (slug: string) => ipcRenderer.invoke('fetch-product', slug),
    fetchOrder: (id: string) => ipcRenderer.invoke('fetch-order', id),

    saveToken: (token: string) => ipcRenderer.invoke('save-token', token),
    deleteToken: () => ipcRenderer.invoke('delete-token'),

    getCurrentUser: () => ipcRenderer.invoke('get-current-user')
  })
} catch (error) {
  console.error(error)
}
