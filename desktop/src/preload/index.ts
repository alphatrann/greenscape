import { contextBridge, ipcRenderer } from 'electron'

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    exportData: (payload: any) => ipcRenderer.send('export-data', payload),
    exportInvoice: (order: any) => ipcRenderer.send('export-invoice', order),

    upsertCategories: (categories: any[]) => ipcRenderer.send('upsert-categories', categories),
    upsertProducts: (products: any[]) => ipcRenderer.send('upsert-products', products),
    upsertOrders: (orders: any[]) => ipcRenderer.send('upsert-orders', orders),

    getProducts: (query: Record<string, any>) => ipcRenderer.invoke('get-products', query),
    getOrders: (query: Record<string, any>) => ipcRenderer.invoke('get-orders', query),
    getCategories: (query: Record<string, any>) => ipcRenderer.invoke('get-categories', query),

    getProductDetail: (id: number) => ipcRenderer.invoke('get-product-detail', id),
    getOrderDetail: (id: string) => ipcRenderer.invoke('get-order-detail', id)
  })
} catch (error) {
  console.error(error)
}
