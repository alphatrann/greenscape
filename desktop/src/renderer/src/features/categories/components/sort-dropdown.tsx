import { ChevronUpDownIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { Button } from '@renderer/features/ui/button'
import { cn } from '@renderer/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/features/ui/dropdown-menu'
import { CategorySortBy } from '../types'
import { SortOrder } from '../../../common/types'

interface CategorySortDropdownProps {
  field: CategorySortBy
  title: string
  sortByField: (field: CategorySortBy, order: SortOrder) => void
  sortBy?: CategorySortBy
  order?: SortOrder
}

export const CategorySortDropdown = ({
  field,
  sortBy,
  order,
  title,
  sortByField: setOrder
}: CategorySortDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="px-3 w-fit justify-end gap-x-0 data-[state=open]:bg-accent"
        >
          <span>{title}</span>
          {field === sortBy && order === 'desc' ? (
            <ArrowDownIcon className="ml-1 h-4 w-4" />
          ) : field === sortBy && order === 'asc' ? (
            <ArrowUpIcon className="ml-1 h-4 w-4" />
          ) : (
            <ChevronUpDownIcon className="ml-1 h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          className={cn(field === sortBy && order === 'asc' && 'bg-secondary/80')}
          onClick={() => setOrder(field, 'asc')}
        >
          <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(field === sortBy && order === 'desc' && 'bg-secondary/80')}
          onClick={() => setOrder(field, 'desc')}
        >
          <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setOrder('id', 'asc')}>
          <EyeSlashIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Reset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
