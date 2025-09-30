import { MonthlySales } from '@renderer/../../common/types'

export const groupSalesByMonths = (monthlySales: MonthlySales[]) => {
  const revenuesEveryMonth = [
    { month: 'Jan', freeShipping: 0, nextDayAir: 0 },
    { month: 'Feb', freeShipping: 0, nextDayAir: 0 },
    { month: 'Mar', freeShipping: 0, nextDayAir: 0 },
    { month: 'Apr', freeShipping: 0, nextDayAir: 0 },
    { month: 'May', freeShipping: 0, nextDayAir: 0 },
    { month: 'Jun', freeShipping: 0, nextDayAir: 0 },
    { month: 'Jul', freeShipping: 0, nextDayAir: 0 },
    { month: 'Aug', freeShipping: 0, nextDayAir: 0 },
    { month: 'Sep', freeShipping: 0, nextDayAir: 0 },
    { month: 'Oct', freeShipping: 0, nextDayAir: 0 },
    { month: 'Nov', freeShipping: 0, nextDayAir: 0 },
    { month: 'Dec', freeShipping: 0, nextDayAir: 0 }
  ]

  monthlySales.forEach((revenue) => {
    const revenueMonthIndex = revenue.month - 1
    const shippingOption = revenue.shippingCost === 0 ? 'freeShipping' : 'nextDayAir'
    revenuesEveryMonth[revenueMonthIndex][shippingOption] += revenue.total
  })
  return revenuesEveryMonth
}
