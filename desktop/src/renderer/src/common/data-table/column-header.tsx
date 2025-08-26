'use client'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpDownIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'
import { Column, SortDirection } from '@tanstack/react-table'
import qs from 'query-string'

import { Button } from '@renderer/features/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/features/ui/dropdown-menu'
import { cn } from '@renderer/lib/utils'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

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
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const toggleSortingServer = useDebouncedCallback(async () => {
    const currentQuery = qs.parse(searchParams.toString())
    currentQuery.sortBy = column.id || 'id'
    currentQuery.order = (column.getIsSorted() as SortDirection) || 'asc'
    const url = qs.stringifyUrl({
      url: location.pathname,
      query: currentQuery
    })

    navigate(url, { replace: false })
  }, 500)

  useEffect(() => {
    if (column.getIsSorted()) toggleSortingServer()
  }, [column.getIsSorted(), searchParams])

  useEffect(() => {
    const order = searchParams.get('order')
    const sortBy = searchParams.get('sortBy') || 'id'
    if (!order || !['asc', 'desc'].includes(order)) return
    if (column.id === sortBy) column.toggleSorting(order === 'desc')
  }, [searchParams.get('sortBy'), searchParams.get('order')])

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
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
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
