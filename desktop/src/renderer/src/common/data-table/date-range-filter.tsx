import { Button } from '@renderer/features/ui/button'
import { Calendar } from '@renderer/features/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/features/ui/popover'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'

interface DateRangeFilterProps {
  from?: Date
  to?: Date
  onFromChange: (date?: Date) => void
  onToChange: (date?: Date) => void
  placeholder?: string
}

export function DateRangeFilter({
  from,
  to,
  onFromChange,
  onToChange,
  placeholder
}: DateRangeFilterProps) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />

            {from ? (
              to ? (
                <>
                  {format(from, 'dd/MM/yyyy')} - {format(to, 'dd/MM/yyyy')}
                </>
              ) : (
                format(from, 'dd/MM/yyyy')
              )
            ) : (
              <span>{placeholder ?? 'Date'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={from}
            selected={{ from, to }}
            onSelect={(selected) => {
              onFromChange(selected?.from)
              onToChange(selected?.to)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
