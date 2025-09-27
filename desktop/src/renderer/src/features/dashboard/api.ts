import { KeyStats, SalesByCountry, YearSalesResponse } from './types'
import { getDateString } from './utils'

export const getKeyStats = async (start: Date, end: Date): Promise<KeyStats> => {
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
}

export const getMonthlySalesInYear = async (year: number): Promise<YearSalesResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/stats/year/${year}`, {
    credentials: 'include'
  })
  const data = await response.json()

  return data.data as YearSalesResponse
}

export const getSalesByCountries = async (start: Date, end: Date) => {
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
}
