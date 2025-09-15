import { contextBridge, ipcRenderer } from 'electron'

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    exportData: (payload: any) => ipcRenderer.send('export-data', payload),
    exportInvoice: (order: any) => ipcRenderer.send('export-invoice', order),

    upsertCategories: (categories: any[]) => ipcRenderer.send('upsert-categories', categories),
    upsertProducts: (products: any[]) => ipcRenderer.send('upsert-products', products),
    upsertOrders: (orders: any[]) => ipcRenderer.send('upsert-orders', orders),
    uploadProductImages: (productId: number, files: File[]) =>
      ipcRenderer.send('upload-product-images', productId, files),
    deleteProductImages: (productId: number, imageIds: string[]) =>
      ipcRenderer.send('delete-product-images', productId, imageIds),
    deleteProduct: (productId: number) => ipcRenderer.send('delete-product', productId),

    getProducts: (query: Record<string, any>) => ipcRenderer.invoke('get-products', query),
    getOrders: (query: Record<string, any>) => ipcRenderer.invoke('get-orders', query),
    getCategories: (query: Record<string, any>) => ipcRenderer.invoke('get-categories', query),

    getProductDetail: (id: number) => ipcRenderer.invoke('get-product-detail', id),
    getOrderDetail: (id: string) => ipcRenderer.invoke('get-order-detail', id)
  })
} catch (error) {
  console.error(error)
}
