import { useState, useMemo } from 'react'
import { SaleByCountry } from '../types'
import { getSalesByCountries } from '../api'
import { getCountryName } from '../../../common/utils'

export const usePieChart = () => {
  const [salesByCountries, setSalesByCountries] = useState<SaleByCountry[]>([])
  const fetchSalesData = () => {
    getSalesByCountries().then((data) => {
      data.sort((a, b) => b._sum - a._sum)

      if (data.length > 5) {
        const others = data.slice(5).reduce(
          (acc, group) => ({
            _sum: acc._sum + group._sum,
            country: 'other'
          }),
          { country: 'other', _sum: 0 }
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
        label: getCountryName(group), // capitalize
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
      sales: bc._sum,
      fill: `var(--color-${groupKey})`
    }
  })

  return { chartData, chartConfig, fetchSalesData }
}
