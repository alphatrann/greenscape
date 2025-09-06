import { PriceInput } from '@renderer/common/components'
import { formatPrice } from '@renderer/common/utils'
import { Button } from '@renderer/features/ui/button'
import { Label } from '@renderer/features/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/features/ui/popover'
import { PlusCircleIcon } from 'lucide-react'
import { useProductFiltersContext } from '../contexts/product-filters-context'

export const PriceFilter = () => {
  const { price, setPrice } = useProductFiltersContext()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Price
          {price[0] || price[1] ? (
            <span>
              : {price[0] ? formatPrice(+price[0]) : 'Under '}
              {price[1] ? (price[0] ? ' - ' : '') + formatPrice(+price[1]) : '+'}
            </span>
          ) : (
            <></>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex gap-x-4">
          <div className="flex-1 space-y-2">
            <Label>Min</Label>
            <PriceInput
              value={price[0]?.toString()}
              onChange={(e) => setPrice([parseFloat(e.target.value), price[1]])}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label>Max</Label>
            <PriceInput
              value={price[1]?.toString()}
              onChange={(e) => setPrice([price[0], parseFloat(e.target.value)])}
            />
          </div>
        </div>
        <Button onClick={() => setPrice([null, null])} className="mt-3 w-full">
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  )
}
