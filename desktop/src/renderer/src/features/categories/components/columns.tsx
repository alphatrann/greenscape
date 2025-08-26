import { CopyButton } from '@renderer/common/components'
import { DataTableColumnHeader, DataTableRowActions } from '@renderer/common/data-table'
import { useDeleteRecordsModal } from '@renderer/common/delete-records'
import { Checkbox } from '@renderer/features/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { useEditCategoryModal } from '../hooks'
import { Category } from '../types'
import { ShowSubcategoriesButton } from './show-subcategories-button'

export const columns: ColumnDef<Category>[] = [
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
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Category" />
    },
    cell: ({ row }) => <div className="line-clamp-1 font-medium">{row.original.name}</div>
  },
  {
    id: 'subCategories',
    accessorKey: 'subCategories',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader className="justify-end" column={column} title="Sub-categories" />
      )
    },
    cell: ({ row }) => <div className="text-right">{row.original._count.subCategories}</div>
  },
  {
    id: 'products',
    accessorKey: 'products',
    header: ({ column }) => {
      return <DataTableColumnHeader className="justify-end" column={column} title="Products" />
    },
    cell: ({ row }) => <div className="text-right">{row.original._count.products}</div>
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { onOpen: onEditOpen } = useEditCategoryModal()
      const { onOpen: onDeleteOpen } = useDeleteRecordsModal()
      return (
        <div className="flex items-center justify-end">
          <ShowSubcategoriesButton slug={row.original.slug} />
          <CopyButton text="Copy category name" content={row.original.name} />
          <DataTableRowActions row={row} onEditAction={onEditOpen} onDeleteAction={onDeleteOpen} />
        </div>
      )
    }
  }
]
