import { KeyStats, YearSalesResponse, SalesByCountry } from '../../common/types'
import { getToken } from '../local-store/token'

const getDateString = (date: Date) => {
  return `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export const getKeyStats = async (start: Date, end: Date): Promise<KeyStats> => {
  const token = await getToken({ throw: true })
  const startStr = getDateString(start)
  const endStr = getDateString(end)
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/stats/key?start=${startStr}&end=${endStr}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data = await response.json()

  return data.data as KeyStats
}

export const getMonthlySalesInYear = async (year: number): Promise<YearSalesResponse> => {
  const token = await getToken({ throw: true })
  const response = await fetch(`${import.meta.env.VITE_API_URL}/stats/year/${year}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  return data.data as YearSalesResponse
}

export const getSalesByCountries = async (start: Date, end: Date) => {
  const token = await getToken({ throw: true })
  const startStr = getDateString(start)
  const endStr = getDateString(end)
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/stats/countries?start=${startStr}&end=${endStr}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data = await response.json()

  return data.data as SalesByCountry[]
}
