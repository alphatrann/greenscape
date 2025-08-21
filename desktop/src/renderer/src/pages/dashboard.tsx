import { KeyStats } from '@renderer/features/dashboard/components/key-stats'
import {
  getKeyStats,
  getMonthlyRevenuesInYear,
  getSalesByCountries
} from '@renderer/features/dashboard/api'
import { useEffect, useState } from 'react'
import {
  KeyStats as IKeyStats,
  SaleByCountry,
  YearRevenuesResponse
} from '../features/dashboard/types'
import { redirect, useSearchParams } from 'react-router-dom'
import { RevenuesChart } from '@renderer/features/dashboard/components/revenues-chart'
import { SalesByCountries } from '@renderer/features/dashboard/components/sales-by-countries'
import { useUserGuard } from '../features/users/hooks/use-user-guard'

export function DashboardPage() {
  useUserGuard()
  const [searchParams] = useSearchParams()
  const [keyStats, setKeyStats] = useState<IKeyStats | null>(null)
  const [revenueData, setRevenueData] = useState<YearRevenuesResponse>({
    endYear: new Date().getFullYear(),
    startYear: new Date().getFullYear(),
    monthlyRevenues: []
  })
  const [salesByCountries, setSalesByCountries] = useState<SaleByCountry[]>()

  useEffect(() => {
    getKeyStats().then((ks) => {
      setKeyStats(ks)
      console.log({ ks })
    })

    getSalesByCountries().then((sales) => {
      setSalesByCountries(sales)
      console.log({ sales })
    })
  }, [])

  useEffect(() => {
    const year = +(searchParams.get('year') || new Date().getFullYear())
    getMonthlyRevenuesInYear(year).then((data) => {
      setRevenueData(data)
      console.log({ data })
    })
  }, [searchParams.get('year')])

  if (!keyStats || !salesByCountries) {
    redirect('/error')
    return null
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h2>
      <KeyStats keyStats={keyStats} />
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <RevenuesChart {...revenueData} />
        <SalesByCountries data={salesByCountries} />
      </div>
    </div>
  )
}
