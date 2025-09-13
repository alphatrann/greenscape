declare global {
  interface Window {
    electronAPI: {
      exportData: (payload: any) => void
      exportInvoice: (payload: any) => void
    }
  }
}
