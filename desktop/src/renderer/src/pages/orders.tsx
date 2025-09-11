import { aggregateOrders, getOrders } from '@renderer/features/orders/api'
import { OrdersTable } from '@renderer/features/orders/components/orders-table'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { useOrderFiltersContext } from '../features/orders/contexts/order-filters-context'
import { useEffect, useState } from 'react'
import { Order, OrdersAggregate } from '../features/orders/types'
import { useFiltersContext } from '../common/contexts/filters-context'
import qs from 'query-string'
import { useTable } from '../common/data-table'
import { columns } from '../features/orders/components/columns'

export default function OrdersPage() {
  const { total, from, to, selectedCountries, status, shippingCost } = useOrderFiltersContext()
  const {
    q,
    pagination,
    total: totalCount,
    setTotal: setTotalCount,
    sortBy,
    order
  } = useFiltersContext()
  const [orders, setOrders] = useState<Order[]>([])
  const [groups, setGroups] = useState<OrdersAggregate>({
    countryGroups: [],
    shippingOptionGroups: [],
    statusGroups: []
  })
  const table = useTable(columns, orders, totalCount)

  useEffect(() => {
    const validSortByColumns = ['total', 'shippingCost', 'createdAt', 'deliveredAt', 'id']
    const invalidSortBy = sortBy && !validSortByColumns.includes(sortBy)
    const fetchData = async () => {
      const query = qs.stringifyUrl({
        url: '',
        query: {
          limit: pagination.pageSize.toString(),
          offset: (pagination.pageIndex * pagination.pageSize).toString(),
          q,
          shippingCost,
          totalRange: total.map((p) => p || '').join('-'),
          from: from?.toISOString(),
          to: to?.toISOString(),
          countries: selectedCountries.length > 0 ? selectedCountries.join(',') : undefined,
          status,
          sortBy: invalidSortBy ? 'createdAt' : sortBy,
          order
        }
      })
      const { data, count } = await getOrders(query)
      setTotalCount(count)
      const groups = await aggregateOrders(query)
      setGroups(groups)
      setOrders(data)
    }
    fetchData()
  }, [pagination, q, total, from, to, selectedCountries, status, sortBy, order, shippingCost])

  return (
    <>
      <div className="container mx-auto max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: 'Orders', href: '#' }]} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Orders ({totalCount})</h1>
        <div className="mt-6 space-y-3">
          <OrdersTable
            table={table}
            countryGroups={groups.countryGroups}
            shippingOptionGroups={groups.shippingOptionGroups}
            statusGroups={groups.statusGroups}
          />
        </div>
      </div>
    </>
  )
}
