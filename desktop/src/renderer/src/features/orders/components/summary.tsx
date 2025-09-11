import { Label } from '@renderer/features/ui/label'
import { Switch } from '@renderer/features/ui/switch'
import React, { useEffect } from 'react'
import { Badge } from '@renderer/features/ui/badge'
import { Order } from '../types'
import { getPostalAddress, getShippingOption } from '../utils'
import { useSetDelivered } from '../hooks/use-set-delivered'

interface OrderSummaryProps {
  order: Order
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  order: {
    id,
    line1,
    line2,
    city,
    state,
    country,
    customer,
    postalCode,
    email,
    phone,
    deliveredAt,
    shippingCost
  }
}) => {
  const { delivered, setDelivered, onUpdateDeliveryStatus } = useSetDelivered(id, deliveredAt)

  useEffect(() => {
    onUpdateDeliveryStatus()
  }, [delivered])

  return (
    <div className="space-y-6">
      <div className="grid w-full grid-cols-3 gap-x-8">
        <Label>Customer details</Label>
        <ul className="col-span-2 space-y-1 text-sm text-secondary-foreground">
          <li>{customer}</li>
          <li>{phone}</li>
          <li>{email}</li>
        </ul>
      </div>

      <div className="grid w-full grid-cols-3 gap-x-8">
        <Label>Shipping details</Label>
        <p className="col-span-2 whitespace-pre-wrap text-sm text-secondary-foreground">
          {getPostalAddress({
            line1,
            line2,
            city,
            state,
            postalCode,
            country,
            customer
          })}
        </p>
      </div>
      <div className="grid w-full grid-cols-3 gap-x-8">
        <Label>Delivery status</Label>
        <Badge className="w-fit" variant={deliveredAt ? 'default' : 'secondary'}>
          {deliveredAt ? 'Delivered' : 'Pending'}
        </Badge>
      </div>
      <div className="grid w-full grid-cols-3 gap-x-8">
        <Label>Shipping option</Label>
        <p className="col-span-2 whitespace-pre-wrap text-sm text-secondary-foreground">
          {getShippingOption(+shippingCost)}
        </p>
      </div>
      {!deliveredAt && (
        <div className="flex items-center space-x-2">
          <Switch
            checked={delivered}
            onCheckedChange={() =>
              setDelivered(
                confirm('Do you want to set this order to delivered? This cannot be undone')
              )
            }
            disabled={delivered}
            id="delivered"
          />
          <Label htmlFor="delivered">Set to delivered</Label>
        </div>
      )}
    </div>
  )
}
