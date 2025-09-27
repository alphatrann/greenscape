import { KeyStats } from '@renderer/features/dashboard/components/key-stats'
import { MonthlySalesChart } from '@renderer/features/dashboard/components/monthly-sales-chart'
import { SalesByCountries } from '@renderer/features/dashboard/components/sales-by-countries'
import { useUserGuard } from '../features/users/hooks/use-user-guard'

export function DashboardPage() {
  useUserGuard()
  return (
    <div className="container mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h2>
      <KeyStats />
      <div className="py-6 grid gap-4 md:grid-cols-5">
        <MonthlySalesChart />
        <SalesByCountries />
      </div>
    </div>
  )
}
