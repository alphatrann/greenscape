import { contextBridge, ipcRenderer } from 'electron'

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    exportData: (payload: any) => ipcRenderer.send('export-data', payload),
    exportInvoice: (order: any) => ipcRenderer.send('export-invoice', order),

    upsertProducts: (products: any[], options?: { uploadImages: boolean }) =>
      ipcRenderer.invoke('upsert-products', products, options),
    upsertOrders: (orders: any[]) => ipcRenderer.invoke('upsert-orders', orders),
    uploadProductImages: (productId: number, files: File[]) =>
      ipcRenderer.invoke('upload-product-images', productId, files),

    getProducts: (query: Record<string, any>) => ipcRenderer.invoke('get-products', query),
    getOrders: (query: Record<string, any>) => ipcRenderer.invoke('get-orders', query),

    getProductDetail: (slug: string) => ipcRenderer.invoke('get-product-detail', slug),
    getOrderDetail: (id: string) => ipcRenderer.invoke('get-order-detail', id)
  })
} catch (error) {
  console.error(error)
}
