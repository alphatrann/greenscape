declare global {
  interface Window {
    electronAPI: {
      exportData: (payload: any) => void
    }
  }
}
