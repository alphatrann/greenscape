import { KeyStats, SaleByCountry, YearRevenuesResponse } from './types'

export const getKeyStats = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/stats/key`, {
    credentials: 'include'
  })
  const data = await response.json()

  return data.data as KeyStats
}

export const getMonthlyRevenuesInYear = async (year: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/stats/year/${year}`, {
    credentials: 'include'
  })
  const data = await response.json()

  return data.data as YearRevenuesResponse
}

export const getSalesByCountries = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/stats/countries`, {
    credentials: 'include'
  })
  const data = await response.json()

  return data.data as SaleByCountry[]
}
