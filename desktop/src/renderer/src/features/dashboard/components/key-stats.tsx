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
import { useEffect, useMemo, useState } from 'react'
import { KeyStats as IKeyStats } from '../types'
import { getGrowthRate } from '@renderer/features/dashboard/utils'
import { startOfMonth } from 'date-fns'
import { getKeyStats } from '../api'
import { DateRangeSelect } from '@renderer/common/components'
import { useDateRange } from '../hooks/use-date-range'

export const KeyStats = () => {
  const [
    {
      thisUnitsSold,
      thisSales,
      lastUnitsSold,
      lastSales,
      thisCustomers,
      thisAvgOrderValue,
      lastCustomers,
      lastAvgOrderValue
    },
    setKeyStats
  ] = useState<IKeyStats>({
    lastAvgOrderValue: 0,
    lastCustomers: 0,
    lastSales: 0,
    lastUnitsSold: 0,
    thisAvgOrderValue: 0,
    thisCustomers: 0,
    thisSales: 0,
    thisUnitsSold: 0
  })

  const { from, to, onFromChange, onToChange } = useDateRange({
    start: startOfMonth(new Date()),
    end: new Date()
  })

  useEffect(() => {
    if (!from || !to) return
    getKeyStats(from, to).then(setKeyStats)
  }, [from, to])

  const revenueGrowthRate = useMemo(
    () => getGrowthRate(thisSales, lastSales),
    [lastSales, thisSales]
  )
  const unitsSoldGrowthRate = useMemo(
    () => getGrowthRate(thisUnitsSold, lastUnitsSold),
    [thisUnitsSold, lastUnitsSold]
  )
  const avgOrderGrowthRate = useMemo(
    () => getGrowthRate(thisAvgOrderValue, lastAvgOrderValue),
    [thisAvgOrderValue, lastAvgOrderValue]
  )
  const customersGrowthRate = useMemo(
    () => getGrowthRate(thisCustomers, lastCustomers),
    [thisCustomers, lastCustomers]
  )

  const stats = useMemo(
    () => [
      {
        term: 'Sales',
        cur: formatPrice(thisSales, { inCent: true }),
        prev: formatPrice(lastSales, { inCent: true }),
        rate: revenueGrowthRate,
        icon: CurrencyDollarIcon
      },
      {
        term: 'Units Sold',
        cur: thisUnitsSold.toLocaleString('en-US'),
        prev: lastUnitsSold.toLocaleString('en-US'),
        rate: unitsSoldGrowthRate,
        icon: CreditCardIcon
      },
      {
        term: 'Avg. Order Price',
        cur: formatPrice(thisAvgOrderValue, { inCent: true }),
        prev: formatPrice(lastAvgOrderValue, { inCent: true }),
        rate: avgOrderGrowthRate,
        icon: BanknotesIcon
      },
      {
        term: 'Customers',
        cur: thisCustomers.toLocaleString('en-US'),
        prev: lastCustomers.toLocaleString('en-US'),
        rate: customersGrowthRate,
        icon: UserGroupIcon
      }
    ],
    [
      thisAvgOrderValue,
      lastAvgOrderValue,
      thisCustomers,
      lastCustomers,
      thisUnitsSold,
      lastUnitsSold
    ]
  )

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Key Metrics</h3>
        <DateRangeSelect from={from} to={to} onFromChange={onFromChange} onToChange={onToChange} />
      </div>
      <dl className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.term}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">{stat.term}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="mt-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-gray-900">{stat.cur}</span>
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
              <div className="mt-1 text-sm font-medium text-muted-foreground">from {stat.prev}</div>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  )
}
