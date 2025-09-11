import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpDownIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'
import { Column, SortDirection } from '@tanstack/react-table'
import { Button } from '@renderer/features/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/features/ui/dropdown-menu'
import { cn } from '@renderer/lib/utils'
import { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useFiltersContext } from '../contexts/filters-context'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }
  const { setSortBy, setOrder } = useFiltersContext()

  const toggleSortingServer = useDebouncedCallback(async () => {
    setSortBy(column.id || 'id')
    setOrder((column.getIsSorted() as SortDirection) || 'asc')
  }, 500)

  useEffect(() => {
    if (column.getIsSorted()) toggleSortingServer()
  }, [column.getIsSorted()])

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 px-3 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ChevronUpDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className={cn(column.id && column.getIsSorted() === 'asc' && 'bg-secondary/80')}
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(column.id && column.getIsSorted() === 'desc' && 'bg-secondary/80')}
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeSlashIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
