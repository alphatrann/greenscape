import { XMarkIcon } from '@heroicons/react/24/outline'
import { DateRangeSelect } from '@renderer/common/components'
import { useFiltersContext } from '@renderer/common/contexts/filters-context'
import { DataTable, DataTablePagination, DataTableViewOptions } from '@renderer/common/data-table'
import { Table } from '@tanstack/react-table'
import { formatPrice } from '@renderer/../../common/utils'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { TableCell, TableRow } from '../../ui/table'
import { useOrderFiltersContext } from '../contexts/order-filters-context'
import {
  CountryGroup,
  DeliveryStatusGroups,
  Order,
  ShippingGroup
} from '@renderer/../../common/types'
import { getShippingOption } from '@renderer/../../common/utils'
import { columns } from './columns'
import { CountriesFilter } from './countries-filter'
import { CountryGroups } from './country-groups'
import { ShippingOptionFilter } from './shipping-options-filter'
import { StatusFilter } from './status-filter'
import { TotalFilter } from './total-filter'

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
  const { reset } = useFiltersContext()
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
              {formatPrice(sales, { inCent: true })}
            </TableCell>
            <TableCell colSpan={2}>
              <CountryGroups
                countryGroups={countryGroups}
                selectedCountries={selectedCountries}
                sales={sales}
              />
            </TableCell>
            <TableCell colSpan={2}>
              {shippingGroups
                .sort((a, b) => b.total - a.total)
                .filter((g) =>
                  shippingCost === undefined ? true : g.shippingCost === shippingCost
                )
                .map((group) => (
                  <div
                    key={getShippingOption(group.shippingCost)}
                    className="flex justify-between gap-x-3 items-center"
                  >
                    <div className="flex items-center gap-x-3">
                      <Badge
                        className="h-3 w-3"
                        variant={group.shippingCost === 0 ? 'destructive' : 'default'}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {getShippingOption(group.shippingCost)}
                      </span>
                      <span className="text-muted-foreground">
                        ({((group.total / sales) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      {formatPrice(group.total, { inCent: true })}
                    </span>
                  </div>
                ))}
            </TableCell>
            <TableCell colSpan={2}>
              {['Delivered', 'Pending']
                .sort(
                  (a, b) =>
                    deliveryStatusGroups[b.toLowerCase()].total -
                    deliveryStatusGroups[a.toLowerCase()].total
                )
                .filter(
                  (g) =>
                    deliveryStatusGroups[g.toLowerCase()].total > 0 &&
                    (status !== undefined ? status === g.toLowerCase() : true)
                )
                .map((group) => (
                  <div key={group} className="flex justify-between gap-x-3 items-center">
                    <div className="flex items-center gap-x-3">
                      <Badge
                        className="h-3 w-3"
                        variant={group === 'Pending' ? 'destructive' : 'default'}
                      />
                      <span className="text-sm font-medium text-foreground">{group}</span>
                      <span className="text-muted-foreground">
                        (
                        {((deliveryStatusGroups[group.toLowerCase()].total / sales) * 100).toFixed(
                          1
                        )}
                        %)
                      </span>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      {formatPrice(deliveryStatusGroups[group.toLowerCase()].total, {
                        inCent: true
                      })}{' '}
                    </span>
                  </div>
                ))}
            </TableCell>
            <TableCell />
          </TableRow>
        }
      />
      <DataTablePagination table={table} />
    </div>
  )
}
