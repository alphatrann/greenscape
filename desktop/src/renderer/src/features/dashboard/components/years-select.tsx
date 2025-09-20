import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/features/ui/select'
import { useMemo } from 'react'

interface YearsSelectProps {
  year: number
  startYear: number
  endYear: number
  onYearChange: (newYear: number) => void
}

export const YearsSelect = ({ year, startYear, onYearChange }: YearsSelectProps) => {
  const diffBetweenTwoYears = useMemo(() => new Date().getFullYear() - startYear + 1, [startYear])

  return (
    <Select value={year.toString()} onValueChange={(value) => onYearChange(+value)}>
      <SelectTrigger className="w-[100px] font-normal">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        {Array(diffBetweenTwoYears)
          .fill(null)
          .map((_, i) => (
            <SelectItem key={i} value={(i + startYear).toString()}>
              {i + startYear}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
