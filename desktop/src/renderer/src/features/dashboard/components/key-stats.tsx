import { formatPrice } from '@renderer/common/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/features/ui/card'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import { KeyStats as IKeyStats } from '../types'
import { getGrowthRate } from '@renderer/features/dashboard/utils'

export const KeyStats = ({
  keyStats: {
    thisMonthRevenue,
    lastMonthRevenue,
    thisMonthAvgOrderValue,
    lastMonthAvgOrderValue,
    lastMonthCustomers,
    thisMonthCustomers,
    thisMonthSales,
    lastMonthSales
  }
}: {
  keyStats: IKeyStats
}) => {
  const revenueGrowthRate = useMemo(
    () => getGrowthRate(thisMonthRevenue, lastMonthRevenue),
    [lastMonthRevenue, thisMonthRevenue]
  )
  const salesGrowthRate = useMemo(
    () => getGrowthRate(thisMonthSales, lastMonthSales),
    [thisMonthSales, lastMonthSales]
  )
  const avgOrderGrowthRate = useMemo(
    () => getGrowthRate(thisMonthAvgOrderValue, lastMonthAvgOrderValue),
    [thisMonthAvgOrderValue, lastMonthAvgOrderValue]
  )
  const customersGrowthRate = useMemo(
    () => getGrowthRate(thisMonthCustomers, lastMonthCustomers),
    [thisMonthCustomers, lastMonthCustomers]
  )

  const stats = useMemo(
    () => [
      {
        term: 'Total Revenue',
        curMonth: formatPrice(thisMonthRevenue),
        prevMonth: formatPrice(lastMonthRevenue),
        rate: revenueGrowthRate,
        icon: CurrencyDollarIcon
      },
      {
        term: 'Total Sales',
        curMonth: thisMonthSales,
        prevMonth: lastMonthSales,
        rate: salesGrowthRate,
        icon: CreditCardIcon
      },
      {
        term: 'Avg. Order Price',
        curMonth: formatPrice(thisMonthAvgOrderValue),
        prevMonth: formatPrice(lastMonthAvgOrderValue),
        rate: avgOrderGrowthRate,
        icon: BanknotesIcon
      },
      {
        term: 'Customers',
        curMonth: thisMonthCustomers,
        prevMonth: lastMonthCustomers,
        rate: customersGrowthRate,
        icon: UserGroupIcon
      }
    ],
    [
      thisMonthAvgOrderValue,
      lastMonthAvgOrderValue,
      thisMonthCustomers,
      lastMonthCustomers,
      thisMonthSales,
      lastMonthSales
    ]
  )

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">This month</h3>
      <dl className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.term}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">{stat.term}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="mt-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-gray-900">{stat.curMonth}</span>
                <div className="ml-2">
                  {isFinite(stat.rate) && (
                    <>
                      {+stat.rate > 0 && (
                        <div className="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0">
                          <ArrowUpIcon className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-primary" />
                          <span className="sr-only">Increased by</span>
                          {Math.abs(stat.rate).toFixed(1)}%
                        </div>
                      )}

                      {+stat.rate < 0 && (
                        <div className="inline-flex items-baseline rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 md:mt-2 lg:mt-0">
                          <ArrowDownIcon className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-red-500" />
                          <span className="sr-only">Decreased by</span>
                          {Math.abs(stat.rate).toFixed(1)}%
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="mt-1 text-sm font-medium text-muted-foreground">
                from {stat.prevMonth}
              </div>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  )
}
