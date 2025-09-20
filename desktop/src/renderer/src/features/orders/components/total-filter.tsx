import { PriceInput } from '@renderer/common/components'
import { formatPrice } from '@renderer/common/utils'
import { Button } from '@renderer/features/ui/button'
import { Label } from '@renderer/features/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/features/ui/popover'
import { PlusCircleIcon } from 'lucide-react'
import { useOrderFiltersContext } from '../contexts/order-filters-context'

export const TotalFilter = () => {
  const { total, setTotal } = useOrderFiltersContext()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed font-normal">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Total
          {total[0] || total[1] ? (
            <span>
              : {total[0] ? formatPrice(+total[0]) : 'Under '}
              {total[1] ? (total[0] ? ' - ' : '') + formatPrice(+total[1]) : '+'}
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
              value={total[0] ? total[0].toString() : ''}
              onChange={(e) => setTotal([parseFloat(e.target.value), total[1]])}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label>Max</Label>
            <PriceInput
              value={total[1] ? total[1].toString() : ''}
              onChange={(e) => setTotal([total[0], parseFloat(e.target.value)])}
            />
          </div>
        </div>
        <Button onClick={() => setTotal([null, null])} className="mt-3 w-full">
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  )
}
