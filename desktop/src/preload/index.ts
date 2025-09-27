import { contextBridge, ipcRenderer } from 'electron'

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    exportData: (payload: any) => ipcRenderer.send('export-data', payload),
    exportInvoice: (order: any) => ipcRenderer.send('export-invoice', order),

    upsertProducts: (products: any[]) => ipcRenderer.invoke('upsert-products', products),
    upsertOrders: (orders: any[]) => ipcRenderer.invoke('upsert-orders', orders),
    uploadProductImages: (productId: number, files: File[]) =>
      ipcRenderer.invoke('upload-product-images', productId, files),
    deleteProductImages: (productId: number, imageIds: string[]) =>
      ipcRenderer.invoke('delete-product-images', productId, imageIds),
    deleteProducts: (productIds: number[]) => ipcRenderer.invoke('delete-products', productIds),

    getProducts: (query: Record<string, any>) => ipcRenderer.invoke('get-products', query),
    getOrders: (query: Record<string, any>) => ipcRenderer.invoke('get-orders', query),
    checkUniqueSlug: (slug: string) => ipcRenderer.invoke('check-unique-slug', slug),

    getProductDetail: (slug: string) => ipcRenderer.invoke('get-product-detail', slug),
    getOrderDetail: (id: string) => ipcRenderer.invoke('get-order-detail', id)
  })
} catch (error) {
  console.error(error)
}
