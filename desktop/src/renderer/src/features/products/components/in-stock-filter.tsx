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
import { Ellipsis, PlusCircleIcon } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useEffect, useMemo, useState } from 'react'
import { InStockGroup, Product } from '../types'

interface InStockFilterProps {
  inStockGroups: InStockGroup[]
  table: Table<Product>
}

export const InStockFilter: React.FC<InStockFilterProps> = ({ inStockGroups, table }) => {
  const [inStock, setInStock] = useState<boolean | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const currentStatus = searchParams.get('inStock')
    if (!currentStatus) setInStock(null)
    else setInStock(Boolean(inStock))
  }, [searchParams.get('inStock')])

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString())
    if (inStock !== null) currentQuery.inStock = String(inStock)
    else delete currentQuery.inStock
    table.resetPageIndex()
    const urlWithInStockQuery = qs.stringifyUrl({
      url: location.pathname,
      query: currentQuery
    })
    navigate(urlWithInStockQuery, { replace: false })
  }, [inStock])

  const inStockSum = useMemo(
    () =>
      inStockGroups.reduce(
        (acc, group) => {
          if (group.inStock === 0) acc[1] += group._count.id
          else acc[0] += group._count.id
          return acc
        },
        [0, 0]
      ),
    [inStockGroups]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Availability
          {inStock !== null && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                {inStock ? 'In stock' : 'Out of stock'}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {(['In stock', 'Out of stock'] as const).map((s, i) => (
                <CommandItem key={s} onSelect={() => setInStock(s === 'In stock')}>
                  <div
                    className={cn(
                      'mr-2 h-4 w-4',
                      !Boolean(i) === inStock ? 'text-primary' : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <Ellipsis className="h-4 w-4" />
                  </div>
                  <span>{s}</span>
                  {inStockSum[i] > 0 && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {inStockSum[i]}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {inStock !== null && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setInStock(null)}
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
