import { useEffect, useState } from 'react'
import { AppRoute } from '../common/app-route'
import { CopyButton } from '../common/components'
import { OrderItems } from '../features/orders/components/items'
import { OrderOverview } from '../features/orders/components/overview'
import { OrderSummary } from '../features/orders/components/summary'
import { Breadcrumb } from '../features/ui/breadcrumb'
import { Separator } from '../features/ui/separator'
import { Order } from '../features/orders/types'
import { formatPrice } from '../common/utils'
import { getOrder } from '../features/orders/api'
import { useNavigate, useParams } from 'react-router-dom'
import { Loading } from '../common/components/loading'
import { Button } from '../features/ui/button'
import { FileDownIcon } from 'lucide-react'
import { getShippingOption } from '../features/orders/utils'
import toast from 'react-hot-toast'

export default function OrderDetailPage() {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!id || typeof id !== 'string') return
    setLoading(true)
    getOrder(id)
      .then((data) => {
        if (!data) {
          navigate('/404')
          return
        }
        setOrder(data)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [id])

  const onExportInvoice = () => {
    if (!order) return
    // @ts-ignore
    window.electronAPI.exportInvoice({
      ...order,
      shippingOption: getShippingOption(order.shippingCost)
    })
    toast.success('Order exported successfully')
  }

  if (loading) return <Loading />
  if (!order) return null

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="mb-4 max-w-full">
        <Breadcrumb
          links={[
            { name: 'Orders', href: `${AppRoute.Orders}` },
            { name: order.id, href: '#' }
          ]}
        />
      </div>
      <div className="space-y-12">
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold leading-none tracking-tight">
                {formatPrice(order.total, { inCent: true })}
              </h2>
              <div className="group flex gap-x-3">
                <p className="text-sm text-muted-foreground">
                  Order ID: <span className="font-mono">{order.id}</span>
                </p>
                <CopyButton
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  text={'Copy order ID'}
                  content={order.id}
                />
              </div>
            </div>
            <Button onClick={onExportInvoice} variant="outline">
              <FileDownIcon className="mr-2 w-4 h-4" />
              Export Invoice
            </Button>
          </div>
          <Separator className="my-4" />
          <OrderOverview order={order} />
        </div>

        <div>
          <h2 className="text-2xl font-bold leading-none tracking-tight">Checkout summary</h2>
          <Separator className="my-4" />
          <OrderSummary order={order} />
        </div>

        <div>
          <h2 className="text-2xl font-bold leading-none tracking-tight">Purchased items</h2>
          <Separator className="my-4" />
          <OrderItems order={order} />
        </div>
      </div>
    </div>
  )
}
