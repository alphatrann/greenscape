import { MonthlyRevenue } from '../types'

export const groupRevenuesByMonths = (monthlyRevenues: MonthlyRevenue[]) => {
  const revenuesEveryMonth = [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
    { name: 'May', total: 0 },
    { name: 'Jun', total: 0 },
    { name: 'Jul', total: 0 },
    { name: 'Aug', total: 0 },
    { name: 'Sep', total: 0 },
    { name: 'Oct', total: 0 },
    { name: 'Nov', total: 0 },
    { name: 'Dec', total: 0 }
  ]

  monthlyRevenues.forEach((revenue) => {
    const revenueMonth = new Date(revenue.createdAt).getMonth()
    revenuesEveryMonth[revenueMonth].total += revenue.total
  })
  return revenuesEveryMonth
}
