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
import { ShippingOptionGroup } from '../types'
import { getShippingOption } from '../utils'
import { useOrderFiltersContext } from '../contexts/order-filters-context'

interface ShippingOptionFilterProps {
  shippingOptionGroups: ShippingOptionGroup[]
}

export const ShippingOptionFilter: React.FC<ShippingOptionFilterProps> = ({
  shippingOptionGroups
}) => {
  const { shippingCost, setShippingCost } = useOrderFiltersContext()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
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
                    <CircleIcon className="h-4 w-4" />
                  </div>
                  <span>{getShippingOption(option)}</span>
                  {shippingOptionGroups.find((group) => +group.shippingCost === option)?._count !==
                    null && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {
                        shippingOptionGroups.find((group) => +group.shippingCost === option)?._count
                          .id
                      }
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {shippingCost !== null && (
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
