import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  DateRangeFilter
} from '@renderer/common/data-table'
import { Input } from '@renderer/features/ui/input'
import { Table } from '@tanstack/react-table'
import { useFiltersContext } from '@renderer/common/contexts/filters-context'
import { CountryGroup, Order, ShippingOptionGroup, StatusGroup } from '../types'
import { columns } from './columns'
import { CountriesFilter } from './countries-filter'
import { ShippingOptionFilter } from './shipping-options-filter'
import { StatusFilter } from './status-filter'
import { TotalFilter } from './total-filter'
import { useOrderFiltersContext } from '../contexts/order-filters-context'

interface OrdersTableProps {
  table: Table<Order>
  countryGroups: CountryGroup[]
  statusGroups: StatusGroup[]
  shippingOptionGroups: ShippingOptionGroup[]
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  table,
  countryGroups,
  statusGroups,
  shippingOptionGroups
}) => {
  const { q, setQ } = useFiltersContext()
  const { from, setFrom, to, setTo } = useOrderFiltersContext()

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
            <DateRangeFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
            <TotalFilter />
            <StatusFilter statusGroups={statusGroups} />
            <ShippingOptionFilter shippingOptionGroups={shippingOptionGroups} />
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}
