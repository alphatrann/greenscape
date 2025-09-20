import { DataTable, DataTablePagination, DataTableViewOptions } from '@renderer/common/data-table'
import { Input } from '@renderer/features/ui/input'
import { Table } from '@tanstack/react-table'
import { useFiltersContext } from '@renderer/common/contexts/filters-context'
import { CountryGroup, DeliveryStatusGroups, Order, ShippingGroup } from '../types'
import { columns } from './columns'
import { CountriesFilter } from './countries-filter'
import { ShippingOptionFilter } from './shipping-options-filter'
import { StatusFilter } from './status-filter'
import { TotalFilter } from './total-filter'
import { useOrderFiltersContext } from '../contexts/order-filters-context'
import { CountryFlag, DateRangeSelect } from '@renderer/common/components'
import { TableCell, TableRow } from '../../ui/table'
import { formatPrice } from '../../../common/utils'
import { getCountryName, getShippingOption } from '../utils'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface OrdersTableProps {
  table: Table<Order>
  sales: number
  countryGroups: CountryGroup[]
  deliveryStatusGroups: DeliveryStatusGroups
  shippingGroups: ShippingGroup[]
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  table,
  sales,
  countryGroups,
  deliveryStatusGroups,
  shippingGroups
}) => {
  const { q, setQ, reset } = useFiltersContext()
  const {
    from,
    setFrom,
    to,
    setTo,
    reset: resetOrderFilters,
    selectedCountries,
    shippingCost,
    status
  } = useOrderFiltersContext()

  const resetAll = () => {
    reset()
    resetOrderFilters()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-x-2 gap-y-4 lg:flex-1 lg:flex-row">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search orders..."
            className="h-8 w-[250px]"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <CountriesFilter countryGroups={countryGroups} />
            <DateRangeSelect from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
            <TotalFilter />
            <StatusFilter deliveryStatusGroup={deliveryStatusGroups} />
            <ShippingOptionFilter shippingGroups={shippingGroups} />
            {selectedCountries.length > 0 || from || to || shippingCost !== undefined || status ? (
              <Button variant="ghost" onClick={resetAll} className="h-8 px-2 lg:px-3">
                Reset
                <XMarkIcon className="ml-2 h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <DataTable
        columns={columns}
        table={table}
        summaryRow={
          <TableRow className="bg-secondary">
            <TableCell className="font-medium text-right" colSpan={2}>
              {formatPrice(sales)}
            </TableCell>
            <TableCell colSpan={3}>
              {countryGroups
                .filter(
                  (g) =>
                    g.total > 0 &&
                    (selectedCountries.length > 0 ? selectedCountries.includes(g.country) : true)
                )
                .map((group) => (
                  <div key={group.country} className="flex justify-between items-center">
                    <div className="flex items-center gap-x-3">
                      <CountryFlag code={group.country} />
                      <span className="text-sm font-medium text-foreground">
                        {getCountryName(group.country)}
                      </span>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      {formatPrice(group.total)} ({((group.total / sales) * 100).toFixed(2)}%)
                    </span>
                  </div>
                ))}
            </TableCell>
            <TableCell colSpan={2}>
              {shippingGroups
                .filter((g) =>
                  shippingCost === undefined ? true : g.shippingCost === shippingCost
                )
                .map((group) => (
                  <div
                    key={getShippingOption(group.shippingCost)}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-x-3">
                      <Badge
                        className="h-3 w-3"
                        variant={group.shippingCost === 0 ? 'destructive' : 'default'}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {getShippingOption(group.shippingCost)}
                      </span>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      {formatPrice(group.total)} ({((group.total / sales) * 100).toFixed(2)}%)
                    </span>
                  </div>
                ))}
            </TableCell>
            <TableCell colSpan={2}>
              {(['Delivered', 'Pending'] as const)
                .filter(
                  (g) =>
                    deliveryStatusGroups[g.toLowerCase()].total > 0 &&
                    (status !== undefined ? status === g.toLowerCase() : true)
                )
                .map((group) => (
                  <div key={group} className="flex justify-between items-center">
                    <div className="flex items-center gap-x-3">
                      <Badge
                        className="h-3 w-3"
                        variant={group === 'Pending' ? 'destructive' : 'default'}
                      />
                      <span className="text-sm font-medium text-foreground">{group}</span>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      {formatPrice(deliveryStatusGroups[group.toLowerCase()].total)} (
                      {((deliveryStatusGroups[group.toLowerCase()].total / sales) * 100).toFixed(2)}
                      %)
                    </span>
                  </div>
                ))}
            </TableCell>
          </TableRow>
        }
      />
      <DataTablePagination table={table} />
    </div>
  )
}
