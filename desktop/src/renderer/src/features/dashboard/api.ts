import { KeyStats, SaleByCountry, YearRevenuesResponse } from './types'

export const getKeyStats = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/stats/key`, {
      credentials: 'include'
    })
    const data = await response.json()

    return data.data as KeyStats
  } catch {
    return []
  }
}

export const getMonthlyRevenuesInYear = async (year: number): Promise<YearRevenuesResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/stats/year/${year}`, {
      credentials: 'include'
    })
    const data = await response.json()

    return data.data as YearRevenuesResponse
  } catch {
    const currentYear = new Date().getFullYear()
    return { startYear: currentYear, endYear: currentYear, monthlyRevenues: [] }
  }
}

export const getSalesByCountries = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/stats/countries`, {
      credentials: 'include'
    })
    const data = await response.json()

    return data.data as SaleByCountry[]
  } catch {
    return []
  }
}
