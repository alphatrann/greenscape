import { contextBridge, ipcRenderer } from 'electron'

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    exportData: (payload: any) => ipcRenderer.send('export-data', payload)
  })
} catch (error) {
  console.error(error)
}
