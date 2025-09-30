import { OrdersTable } from '@renderer/features/orders/components/orders-table'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { ExportButton } from '../common/export/export-button'
import { useFetchOrders } from '../features/orders/hooks/use-fetch-orders'

export default function OrdersPage() {
  const { totalCount, sales, table, groups } = useFetchOrders()

  return (
    <>
      <div className="container mx-auto max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: 'Orders', href: '#' }]} />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Orders ({totalCount.toLocaleString('en-US')})
          </h1>
          <ExportButton entityType="orders" />
        </div>
        <div className="mt-6 space-y-3">
          <OrdersTable
            table={table}
            sales={sales}
            countryGroups={groups.countryGroups}
            shippingGroups={groups.shippingGroups}
            deliveryStatusGroups={groups.deliveryStatusGroups}
          />
        </div>
      </div>
    </>
  )
}
