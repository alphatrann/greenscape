export interface KeyStats {
  thisMonthRevenue: number
  lastMonthRevenue: number
  thisMonthAvgOrderValue: number
  lastMonthAvgOrderValue: number
  thisMonthSales: number
  lastMonthSales: number
  thisMonthCustomers: number
  lastMonthCustomers: number
}

export interface MonthlyRevenue {
  createdAt: Date
  total: number
}

export interface SaleByCountry {
  country: string
  _sum: number
}

export interface YearRevenuesResponse {
  startYear: number
  endYear: number
  monthlyRevenues: MonthlyRevenue[]
}
