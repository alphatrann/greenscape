import { KeyStats } from '@renderer/features/dashboard/components/key-stats'
import { getKeyStats, getMonthlyRevenuesInYear } from '@renderer/features/dashboard/api'
import { useEffect, useState } from 'react'
import { KeyStats as IKeyStats, YearRevenuesResponse } from '@renderer/features/dashboard/types'
import { redirect, useSearchParams } from 'react-router-dom'
import { RevenuesChart } from '@renderer/features/dashboard/components/revenues-chart'
import { SalesByCountries } from '@renderer/features/dashboard/components/sales-by-countries'

export function DashboardPage() {
  const [searchParams] = useSearchParams()
  const [keyStats, setKeyStats] = useState<IKeyStats | null>(null)
  const [revenueData, setRevenueData] = useState<YearRevenuesResponse>({
    endYear: new Date().getFullYear(),
    startYear: new Date().getFullYear(),
    monthlyRevenues: []
  })

  useEffect(() => {
    getKeyStats().then((ks) => {
      setKeyStats(ks)
    })
  }, [])

  useEffect(() => {
    const year = +(searchParams.get('year') || new Date().getFullYear())
    getMonthlyRevenuesInYear(year).then((data) => {
      setRevenueData(data)
    })
  }, [searchParams.get('year')])

  if (!keyStats) {
    redirect('/error')
    return null
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h2>
      <KeyStats keyStats={keyStats} />
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <RevenuesChart {...revenueData} />
        <SalesByCountries />
      </div>
    </div>
  )
}
