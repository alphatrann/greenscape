declare global {
  interface Window {
    electronAPI: {
      exportData: (payload: any) => void
      exportInvoice: (payload: any) => void
      upsertCategories: (categories: any[]) => Promise<void>
      upsertProducts: (products: any[]) => Promise<void>
      upsertOrders: (orders: any[]) => Promise<void>

      getProducts: (query: Record<string, any>) => Promise<{ data: any[]; count: number }>
      getOrders: (query: Record<string, any>) => Promise<{ data: any[]; count: number }[]>
      getCategories: (
        query: Record<string, any>
      ) => Promise<{ data: { parent: any | null; categories: any[] }; count: number }>

      getProductDetail: (id: number) => Promise<any | null>
      getOrderDetail: (id: string) => Promise<any | null>
    }
  }
}
