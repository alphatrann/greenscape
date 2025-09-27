'use client'

import { Button } from '@renderer/features/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@renderer/features/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

interface DataTableRowActionsProps<TData extends { id: number }> {
  row: Row<TData>
  onEditAction: (data: TData) => void
  onDeleteAction: (ids: number[]) => void
}

export function DataTableRowActions<TData extends { id: number }>({
  row,
  onDeleteAction,
  onEditAction
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            onEditAction(row.original)
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDeleteAction([row.original.id])}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
