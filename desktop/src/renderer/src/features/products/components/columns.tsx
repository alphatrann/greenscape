'use client'
import { EyeIcon } from '@heroicons/react/24/outline'
import { CopyButton } from '@renderer/common/components/copy-button'
import { DataTableColumnHeader, DataTableRowActions } from '@renderer/common/data-table'
import { useDeleteRecordsModal } from '@renderer/common/delete-records'
import { formatPrice } from '@renderer/common/utils'
import { Badge } from '@renderer/features/ui/badge'
import { Checkbox } from '@renderer/features/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../ui/button'
import { Product } from '../types'

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Product',
    cell: ({ row }) => <div>{row.getValue('name')}</div>
  },
  {
    id: 'price',
    accessorKey: 'price',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} className="justify-end" title="Price" />
    },
    cell: ({ row }) => <div className="mr-3 text-right">{formatPrice(row.original.price)}</div>
  },
  {
    id: 'categories',
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.categories.at(-1)?.name}</div>
    )
  },
  {
    id: 'inStock',
    accessorKey: 'inStock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="In Stock" className="justify-end" />
    ),
    cell: ({ row }) => <div className="mr-3 text-right">{row.original.inStock}</div>
  },
  {
    id: 'orders',
    accessorKey: 'orders',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales" className="justify-end" />
    ),
    cell: ({ row }) => <div className="mr-3 text-right">{row.original._count.orders}</div>
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === 'Active'
            ? 'default'
            : row.original.status === 'Draft'
              ? 'secondary'
              : 'outline'
        }
      >
        {row.original.status}
      </Badge>
    )
  },

  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created at" />,
    cell: ({ row }) => <div className="w-36">{format(new Date(row.original.createdAt), 'Pp')}</div>
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const navigate = useNavigate()
      const { onOpen: onDeleteOpen } = useDeleteRecordsModal()
      return (
        <div className="flex justify-end">
          <CopyButton text="Copy product name" content={row.original.name} />
          <Button asChild size="icon" variant="ghost">
            <Link to={`/products/${row.original.slug}`}>
              <EyeIcon className="h-5 w-5" />
            </Link>
          </Button>
          <DataTableRowActions
            row={row}
            onEditAction={() => navigate(`/products/edit/${row.original.slug}`)}
            onDeleteAction={onDeleteOpen}
          />
        </div>
      )
    }
  }
]
