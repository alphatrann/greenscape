import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { Badge } from '@renderer/features/ui/badge'
import { Label } from '@renderer/features/ui/label'
import { Switch } from '@renderer/features/ui/switch'
import { format } from 'date-fns'
import React from 'react'
import { CountryFlag } from '../../../common/components'
import { useSetDelivered } from '../hooks/use-set-delivered'
import { Order } from '@renderer/../../common/types'
import { getCountryName, getPostalAddress, getShippingOption } from '@renderer/../../common/utils'

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
  const { online } = useOnlineStatus()
  const { delivered, onUpdateDeliveryStatus } = useSetDelivered(id, deliveredAt)

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
          {country && (
            <span className="flex gap-x-3 text-sm font-medium">
              <CountryFlag code={country} />
              {getCountryName(country)}
            </span>
          )}
        </p>
      </div>
      <div className="grid w-full grid-cols-3 gap-x-8">
        <Label>Delivery status</Label>
        <div className="gap-y-2 flex flex-col">
          <Badge className="w-fit" variant={delivered ? 'default' : 'secondary'}>
            {delivered ? 'Delivered' : 'Pending'}
          </Badge>
          <div className="text-sm font-medium">{delivered && format(delivered, 'Pp')}</div>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 gap-x-8">
        <Label>Shipping option</Label>
        <p className="col-span-2 whitespace-pre-wrap text-sm text-secondary-foreground">
          {getShippingOption(+shippingCost)}
        </p>
      </div>
      {online && !delivered && (
        <div className="flex items-center space-x-2">
          <Switch
            checked={!!delivered}
            onCheckedChange={onUpdateDeliveryStatus}
            disabled={!!delivered}
            id="delivered"
          />
          <Label htmlFor="delivered">Set to delivered</Label>
        </div>
      )}
    </div>
  )
}
