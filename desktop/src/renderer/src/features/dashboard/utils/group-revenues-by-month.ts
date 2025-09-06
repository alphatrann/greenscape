import { MonthlyRevenue } from '../types'

export const groupRevenuesByMonths = (monthlyRevenues: MonthlyRevenue[]) => {
  const revenuesEveryMonth = [
    { month: 'Jan', revenue: 0 },
    { month: 'Feb', revenue: 0 },
    { month: 'Mar', revenue: 0 },
    { month: 'Apr', revenue: 0 },
    { month: 'May', revenue: 0 },
    { month: 'Jun', revenue: 0 },
    { month: 'Jul', revenue: 0 },
    { month: 'Aug', revenue: 0 },
    { month: 'Sep', revenue: 0 },
    { month: 'Oct', revenue: 0 },
    { month: 'Nov', revenue: 0 },
    { month: 'Dec', revenue: 0 }
  ]

  monthlyRevenues.forEach((revenue) => {
    const revenueMonth = new Date(revenue.createdAt).getMonth()
    revenuesEveryMonth[revenueMonth].revenue += revenue.total
  })
  return revenuesEveryMonth
}
