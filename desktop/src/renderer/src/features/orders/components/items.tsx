import { formatPrice } from '@renderer/../../common/utils/format-price'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/features/ui/table'
import { Order } from '@renderer/../../common/types'
import { getShippingOption } from '@renderer/../../common/utils'
import { redirect } from 'react-router-dom'
import { AppRoute } from '@renderer/common/app-route'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'

export const OrderItems = ({ order }: { order: Order }) => {
  const { online } = useOnlineStatus()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Unit price</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.products.length === 0 && !online ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-8">
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-semibold text-gray-700">No products to display</span>
                <span className="text-sm text-muted-foreground">
                  You are currently offline. Product details are unavailable.
                </span>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          order.products.map(({ productId, qty, product }) => (
            <TableRow
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => redirect(`${AppRoute.Products}/${productId}`)}
              key={productId}
            >
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="text-right">{qty}</TableCell>
              <TableCell className="text-right">{formatPrice(product.price)}</TableCell>
              <TableCell className="text-right">{formatPrice(product.price * qty)}</TableCell>
            </TableRow>
          ))
        )}
        <TableRow>
          <TableCell className="text-right" colSpan={3}>
            <ul>
              <li className="text-sm font-medium text-gray-700">Subtotal</li>
              <li className="text-sm text-muted-foreground">
                Shipping ({getShippingOption(+order.shippingCost)})
              </li>
              <li className="text-sm text-muted-foreground">Tax</li>
              <li className="font-medium text-gray-900">Total</li>
            </ul>
          </TableCell>
          <TableCell>
            <ul className="text-right">
              <li className="text-sm font-medium text-gray-700">
                {formatPrice(order.total, { inCent: true })}
              </li>
              <li className="text-sm text-muted-foreground">
                {formatPrice(order.shippingCost, { inCent: true })}
              </li>
              <li className="text-sm text-muted-foreground">
                {formatPrice(order.tax, { inCent: true })}
              </li>
              <li className="font-medium text-foreground">
                {formatPrice(order.total + order.shippingCost + order.tax, { inCent: true })}
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
