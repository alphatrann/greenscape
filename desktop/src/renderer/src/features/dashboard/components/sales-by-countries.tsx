import { Card, CardContent, CardHeader, CardTitle } from '@renderer/features/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '../../ui/chart'
import { Pie, PieChart } from 'recharts'
import { useCountrySales } from '../hooks'
import { useEffect, useMemo } from 'react'
import { useDateRange } from '../hooks/use-date-range'
import { DateRangeSelect } from '@renderer/common/components'
import { startOfMonth } from 'date-fns'
import { formatPrice } from '@renderer/../../common/utils'

export const SalesByCountries = () => {
  const { chartConfig, chartData, fetchSalesData } = useCountrySales()
  const { from, to, onFromChange, onToChange } = useDateRange({
    start: startOfMonth(new Date()),
    end: new Date()
  })
  const salesTotal = useMemo(() => {
    return chartData.reduce((acc, item) => acc + item.sales, 0)
  }, [chartData])

  useEffect(() => {
    if (!from || !to) return
    fetchSalesData(from, to)
  }, [from, to])

  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-wrap items-center justify-between">
        <CardTitle className="text-base">Country Sales</CardTitle>
        <DateRangeSelect from={from} to={to} onFromChange={onFromChange} onToChange={onToChange} />
      </CardHeader>
      <CardContent className="w-full p-0 h-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <h3 className="text-center text-xl font-medium text-muted-foreground">
              No data available
              <br />
              in this period
            </h3>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-[300px] max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return value
                    }}
                    formatter={(value, name) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                          style={
                            {
                              '--color-bg': `var(--color-${name})`
                            } as React.CSSProperties
                          }
                        />
                        {chartConfig[name as keyof typeof chartConfig]?.label || name}
                        <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                          {formatPrice(+value, { inCent: true })} (
                          {((+value / salesTotal) * 100).toFixed(2)}%)
                        </div>
                      </>
                    )}
                  />
                }
                cursor={false}
                defaultIndex={1}
              />
              <Pie data={chartData} dataKey="sales" nameKey="country" innerRadius={70} />
              <ChartLegend
                content={<ChartLegendContent className="w-full" nameKey="country" />}
                className="-translate-y-2 flex-wrap gap-2 w-full"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
