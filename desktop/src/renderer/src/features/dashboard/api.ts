import { KeyStats, SalesByCountry, YearSalesResponse } from './types'
import { getDateString } from './utils'

export const getKeyStats = async (start: Date, end: Date): Promise<KeyStats> => {
  try {
    const startStr = getDateString(start)
    const endStr = getDateString(end)
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/stats/key?start=${startStr}&end=${endStr}`,
      {
        credentials: 'include'
      }
    )
    const data = await response.json()

    return data.data as KeyStats
  } catch {
    return {
      lastAvgOrderValue: 0,
      lastCustomers: 0,
      lastSales: 0,
      lastUnitsSold: 0,
      thisAvgOrderValue: 0,
      thisCustomers: 0,
      thisSales: 0,
      thisUnitsSold: 0
    }
  }
}

export const getMonthlySalesInYear = async (year: number): Promise<YearSalesResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/stats/year/${year}`, {
      credentials: 'include'
    })
    const data = await response.json()

    return data.data as YearSalesResponse
  } catch {
    const currentYear = new Date().getFullYear()
    return { startYear: currentYear, monthlySales: [] }
  }
}

export const getSalesByCountries = async (start: Date, end: Date) => {
  try {
    const startStr = getDateString(start)
    const endStr = getDateString(end)
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/stats/countries?start=${startStr}&end=${endStr}`,
      {
        credentials: 'include'
      }
    )
    const data = await response.json()

    return data.data as SalesByCountry[]
  } catch {
    return []
  }
}
