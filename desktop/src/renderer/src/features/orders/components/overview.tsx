import { Button } from '@renderer/features/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@renderer/features/ui/hover-card'
import { Label } from '@renderer/features/ui/label'
import { Separator } from '@renderer/features/ui/separator'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import { Order } from '../types'

interface OrderOverviewProps {
  order: Order
}

export const OrderOverview: React.FC<OrderOverviewProps> = ({ order }) => {
  return (
    <div className="flex h-12 items-center space-x-4 text-sm">
      <div className="space-y-2">
        <Label className="block font-normal text-muted-foreground">Paid at</Label>
        <p className="text-sm text-foreground">
          {format(new Date(order.createdAt), 'MMM d y, h:mm a')}
        </p>
      </div>
      <Separator orientation="vertical" />
      <div>
        <Label className="mb-2 block font-normal text-muted-foreground">Customer</Label>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="h-fit p-0">
              {order.customer ?? 'N/A'}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto">
            <Label className="mb-4 block">Customer information</Label>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="sr-only">Email</span>
                <EnvelopeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <p>{order.email}</p>
              </li>
              <li className="flex items-center">
                <span className="sr-only">Phone number</span>
                <PhoneIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                {order.phone}
              </li>
            </ul>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}
