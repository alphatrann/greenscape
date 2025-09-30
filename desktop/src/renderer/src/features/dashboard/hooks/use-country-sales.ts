import { useState, useMemo } from 'react'
import { SalesByCountry } from '@renderer/../../common/types'
import { getCountryName } from '../../../../../common/utils/get-country-name'

export const useCountrySales = () => {
  const [salesByCountries, setSalesByCountries] = useState<SalesByCountry[]>([])

  const fetchSalesData = (start: Date, end: Date) => {
    window.electronAPI.getSalesByCountries(start, end).then((data) => {
      data.sort((a, b) => b.sales - a.sales)

      if (data.length > 5) {
        const others = data.slice(5).reduce(
          (acc, group) => ({
            sales: acc.sales + group.sales,
            country: 'other'
          }),
          { country: 'other', sales: 0 }
        )
        setSalesByCountries([...data.slice(0, 4), others])
      } else {
        setSalesByCountries(data)
      }
    })
  }

  const chartConfig = useMemo(() => {
    const config: Record<string, any> = {
      sales: { label: 'Sales' }
    }
    let index = 1
    for (const groupSales of salesByCountries) {
      const group = groupSales.country
      const groupKey = group.toLowerCase().split(' ').join('-')
      config[groupKey] = {
        label: getCountryName(group) ?? 'Other', // capitalize
        color: `var(--chart-${index})`
      }
      index++
    }

    return config
  }, [salesByCountries])

  const chartData = salesByCountries.map((bc) => {
    const group = bc.country
    const groupKey = group.toLowerCase().split(' ').join('-')
    return {
      country: groupKey,
      sales: bc.sales,
      fill: `var(--color-${groupKey})`
    }
  })

  return { chartData, chartConfig, fetchSalesData }
}
