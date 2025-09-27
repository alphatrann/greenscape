export interface KeyStats {
  thisSales: number
  lastSales: number
  thisAvgOrderValue: number
  lastAvgOrderValue: number
  thisUnitsSold: number
  lastUnitsSold: number
  thisCustomers: number
  lastCustomers: number
}

export interface MonthlySales {
  month: number
  shippingCost: number
  total: number
}

export interface SalesByCountry {
  country: string
  sales: number
}

export interface YearSalesResponse {
  startYear: number
  monthlySales: MonthlySales[]
}
