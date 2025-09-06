'use client'
import { Badge } from '@renderer/features/ui/badge'
import { Button } from '@renderer/features/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@renderer/features/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/features/ui/popover'
import { Separator } from '@renderer/features/ui/separator'
import { cn } from '@renderer/lib/utils'
import { EllipsisIcon, PlusCircleIcon } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { Product, Status, StatusGroup } from '../types'

interface StatusFilterProps {
  table: Table<Product>
  statusGroups: StatusGroup[]
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ statusGroups, table }) => {
  const [status, setStatus] = useState<Status | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const currentStatus = searchParams.get('status')
    if (!currentStatus) setStatus(null)
    else setStatus(currentStatus as Status)
  }, [searchParams.get('status')])

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString())
    if (status) {
      currentQuery.status = status
    } else delete currentQuery.status
    table.resetPageIndex()
    const urlWithStatusQuery = qs.stringifyUrl({
      url: location.pathname,
      query: currentQuery
    })
    navigate(urlWithStatusQuery, { replace: false })
  }, [status])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Status
          {status && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                {status}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {Object.values(Status).map((s) => (
                <CommandItem key={s} onSelect={() => setStatus(s)}>
                  <div
                    className={cn(
                      'mr-2 h-4 w-4',
                      status === s ? 'text-primary' : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <EllipsisIcon className="h-4 w-4" />
                  </div>
                  <span>{s}</span>
                  {statusGroups.find((group) => group.status === s)?._count && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {statusGroups.find((group) => group.status === s)?._count.id}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {status && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setStatus(null)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
