import { contextBridge, ipcRenderer } from 'electron'

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    exportData: (payload: any) => ipcRenderer.send('export-data', payload),
    exportInvoice: (order: any) => ipcRenderer.send('export-invoice', order)
  })
} catch (error) {
  console.error(error)
}
