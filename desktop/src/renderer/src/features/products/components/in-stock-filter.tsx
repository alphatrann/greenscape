import { Button } from '@renderer/features/ui/button'
import { Label } from '@renderer/features/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/features/ui/popover'
import { PlusCircleIcon } from 'lucide-react'
import { useProductFiltersContext } from '../contexts/product-filters-context'
import { Input } from '../../ui/input'

export const InStockFilter = () => {
  const { inStock, setInStock } = useProductFiltersContext()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed font-normal">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          In stock
          {inStock[0] || inStock[1] ? (
            <span>
              : {inStock[0] ? +inStock[0] : 'Under '}
              {inStock[1] ? (inStock[0] ? ' - ' : '') + +inStock[1] : '+'}
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
            <Input
              placeholder="0"
              type="number"
              step={1}
              value={inStock[0]?.toString() ?? ''}
              onChange={(e) =>
                setInStock([e.target.value ? parseInt(e.target.value) : null, inStock[1]])
              }
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label>Max</Label>
            <Input
              placeholder="5"
              type="number"
              step={1}
              value={inStock[1]?.toString() ?? ''}
              onChange={(e) =>
                setInStock([inStock[0], e.target.value ? parseInt(e.target.value) : null])
              }
            />
          </div>
        </div>
        <Button onClick={() => setInStock([null, null])} className="mt-3 w-full">
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  )
}
