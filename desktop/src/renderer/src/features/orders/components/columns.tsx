import { CopyButton } from '@renderer/common/components'
import { formatPrice } from '@renderer/common/utils'
import { Badge } from '@renderer/features/ui/badge'
import { Button } from '@renderer/features/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/features/ui/tooltip'
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Order } from '../types'
import { getCountryName, getShippingOption } from '../utils'
import { Link } from 'react-router-dom'
import { AppRoute } from '@renderer/common/app-route'
import { DataTableColumnHeader } from '@renderer/common/data-table'

export const columns: ColumnDef<Order>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[100px] font-mono text-sm">{row.original.id}</div>
    )
  },
  {
    id: 'total',
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader className="justify-end" column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatPrice(row.original.total)}</div>
    )
  },
  {
    id: 'phone',
    accessorKey: 'Phone',
    header: 'Phone number',
    cell: ({ row }) => <div>{row.original.phone}</div>
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.original.email}</div>
  },
  {
    id: 'country',
    accessorKey: 'country',
    header: 'Country',
    cell: ({ row }) => <div>{getCountryName(row.original.country || '')}</div>
  },
  {
    id: 'shippingCost',
    accessorKey: 'shippingCost',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Shipping Option" />,
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {getShippingOption(+row.original.shippingCost)}
      </div>
    )
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Purchase Date" />,
    cell: ({ row }) => <div>{format(new Date(row.original.createdAt), 'Pp')}</div>
  },
  {
    id: 'deliveredAt',
    accessorKey: 'deliveredAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery Date" />,
    cell: ({ row }) =>
      row.original.deliveredAt ? (
        <div>{format(new Date(row.original.deliveredAt), 'Pp')}</div>
      ) : (
        <Badge variant="secondary" className="text-muted-foreground">
          Pending
        </Badge>
      )
  },

  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <CopyButton text="Copy payment ID" content={row.original.id} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild size="icon" variant="ghost">
                  <Link to={`${AppRoute.Orders}/${row.original.id}`}>
                    <ViewfinderCircleIcon className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View order details</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }
  }
]
