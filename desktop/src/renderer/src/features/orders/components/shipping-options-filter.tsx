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
import { CircleIcon, PlusCircleIcon } from 'lucide-react'
import { ShippingGroup } from '../types'
import { getShippingOption } from '../utils'
import { useOrderFiltersContext } from '../contexts/order-filters-context'

interface ShippingOptionFilterProps {
  shippingGroups: ShippingGroup[]
}

export const ShippingOptionFilter: React.FC<ShippingOptionFilterProps> = ({ shippingGroups }) => {
  const { shippingCost, setShippingCost } = useOrderFiltersContext()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed font-normal">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Shipping option
          {shippingCost !== undefined && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal capitalize">
                {getShippingOption(shippingCost)}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {([0, 15] as const).map((option) => (
                <CommandItem key={option} onSelect={() => setShippingCost(option)}>
                  <div
                    className={cn(
                      'mr-2 h-4 w-4',
                      shippingCost === option ? 'text-primary' : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CircleIcon className="h-2 w-2 fill-current" />
                  </div>
                  <span>{getShippingOption(option)}</span>
                  {shippingGroups.find((group) => +group.shippingCost === option)?.count !==
                    null && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {shippingGroups.find((group) => +group.shippingCost === option)?.count}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {shippingCost !== undefined && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setShippingCost(undefined)}
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
