'use client'
import { PriceInput } from '@renderer/common/components'
import { formatPrice } from '@renderer/common/utils'
import { Button } from '@renderer/features/ui/button'
import { Label } from '@renderer/features/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/features/ui/popover'
import { PlusCircleIcon } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Product } from '../types'

interface PriceFilterProps {
  table: Table<Product>
}

export const PriceFilter: React.FC<PriceFilterProps> = ({ table }) => {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const price = searchParams.get('price')
    if (price) {
      const [min, max] = price.split(',')
      setMinPrice(!isNaN(+min) ? min : '')
      setMaxPrice(!isNaN(+max) ? max : '')
    } else {
      setMinPrice('')
      setMaxPrice('')
    }
  }, [searchParams.get('price')])

  const filterProductsByPriceRange = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString())
    if (minPrice || maxPrice) {
      currentQuery.price = `${minPrice},${maxPrice}`
    } else delete currentQuery.price
    table.resetPageIndex()
    const urlWithPriceRange = qs.stringifyUrl({
      url: location.pathname,
      query: currentQuery
    })
    navigate(urlWithPriceRange, { replace: false })
  }, 1000)

  useEffect(() => {
    filterProductsByPriceRange()
  }, [minPrice, maxPrice])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Price
          {(minPrice || maxPrice) && (
            <span>
              : {minPrice ? formatPrice(+minPrice) : 'Under '}
              {maxPrice ? (minPrice ? ' - ' : '') + formatPrice(+maxPrice) : '+'}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex gap-x-4">
          <div className="flex-1 space-y-2">
            <Label>Min</Label>
            <PriceInput value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          </div>
          <div className="flex-1 space-y-2">
            <Label>Max</Label>
            <PriceInput value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
        </div>
        <Button
          onClick={() => {
            setMinPrice('')
            setMaxPrice('')
          }}
          className="mt-3 w-full"
        >
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  )
}
