'use client'

import { Button } from '@renderer/features/ui/button'
import { Calendar } from '@renderer/features/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/features/ui/popover'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { Table } from '@tanstack/react-table'
import { differenceInCalendarDays, format, isValid } from 'date-fns'
import { redirect, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useDebouncedCallback } from 'use-debounce'

interface DateRangeFilterProps<T> {
  table: Table<T>
}

export function DateRangeFilter<T>({ table }: DateRangeFilterProps<T>) {
  const [searchParams] = useSearchParams()
  const [date, setDate] = useState<DateRange | undefined>()

  useEffect(() => {
    const startDate = searchParams.get('from')
    const endDate = searchParams.get('to')
    if (
      startDate &&
      endDate &&
      isValid(new Date(startDate)) &&
      isValid(new Date(endDate)) &&
      differenceInCalendarDays(new Date(endDate), new Date(startDate)) > 0
    )
      setDate({
        from: new Date(startDate),
        to: new Date(endDate)
      })
    else setDate(undefined)
  }, [searchParams.get('from'), searchParams.get('to')])

  const filterWithinDateRange = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString())
    if (date?.from && date?.to) {
      currentQuery.from = format(date.from, 'yyyy-MM-dd')
      currentQuery.to = format(date.to, 'yyyy-MM-dd')
    } else {
      delete currentQuery.from
      delete currentQuery.to
    }
    table.resetPageIndex()
    const urlWithDateRange = qs.stringifyUrl({ url: '', query: currentQuery })
    redirect(urlWithDateRange)
  }, 500)

  useEffect(() => {
    filterWithinDateRange()
  }, [date])

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <CalendarIcon className="mr-2 h-4 w-4" />

            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yyyy')} - {format(date.to, 'dd/MM/yyyy')}
                </>
              ) : (
                format(date.from, 'dd/MM/yyyy')
              )
            ) : (
              <span>Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
