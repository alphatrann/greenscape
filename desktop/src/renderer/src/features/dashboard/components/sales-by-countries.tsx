import { Card, CardContent, CardHeader, CardTitle } from '@renderer/features/ui/card'
import { useEffect, useState } from 'react'
import { useDateRange } from '../hooks/use-date-range'
import { CountryFlag, DateRangeSelect } from '@renderer/common/components'
import { startOfMonth } from 'date-fns'
import { WorldMap } from './world-map'
import { Tooltip } from 'react-tooltip'
import { SalesByCountry } from '@renderer/../../common/types'

export const SalesByCountries = () => {
  const { from, to, onFromChange, onToChange } = useDateRange({
    start: startOfMonth(new Date()),
    end: new Date()
  })

  const [salesByCountries, setSalesByCountries] = useState<SalesByCountry[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')

  const fetchSalesData = (start: Date, end: Date) => {
    window.electronAPI.getSalesByCountries(start, end).then((data) => {
      setSalesByCountries(data)
    })
  }
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!from || !to) return
    fetchSalesData(from, to)
  }, [from, to])

  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-wrap items-center justify-between">
        <CardTitle className="text-base">Country Sales</CardTitle>
        <DateRangeSelect from={from} to={to} onFromChange={onFromChange} onToChange={onToChange} />
      </CardHeader>
      <CardContent className="w-full p-0 h-full">
        <WorldMap
          content={content}
          data={salesByCountries}
          setTooltipContent={setContent}
          setSelectedCountry={setSelectedCountry}
        />
        <Tooltip id="world-map" className="flex gap-x-3 items-center">
          {selectedCountry && <CountryFlag code={selectedCountry} />}
          {content}
        </Tooltip>
      </CardContent>
    </Card>
  )
}
