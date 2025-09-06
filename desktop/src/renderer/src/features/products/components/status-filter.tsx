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
import { useProductFiltersContext } from '../contexts/product-filters-context'
import { Status, StatusGroup } from '../types'

interface StatusFilterProps {
  statusGroups: StatusGroup[]
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ statusGroups }) => {
  const { status, setStatus } = useProductFiltersContext()

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
                    <CircleIcon className="fill-current" />
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
                    onSelect={() => setStatus(undefined)}
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
