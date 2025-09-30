import { formatPrice } from '@renderer/../../common/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/features/ui/card'
import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '../../ui/chart'
import { MonthlySales } from '@renderer/../../common/types'
import { groupSalesByMonths } from '../utils'
import { YearsSelect } from './years-select'

const chartConfig = {
  freeShipping: {
    label: 'Free Shipping',
    color: 'var(--chart-1)'
  },
  nextDayAir: {
    label: 'Next Day Air',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

export const MonthlySalesChart = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [startYear, setStartYear] = useState(new Date().getFullYear())
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>([])

  const data = useMemo(() => groupSalesByMonths(monthlySales), [monthlySales])

  useEffect(() => {
    window.electronAPI.getMonthlySalesInYear(year).then((data) => {
      setMonthlySales(data.monthlySales)
      setStartYear(data.startYear)
    })
  }, [year])

  return (
    <Card className="md:col-span-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          Monthly Sales
          <YearsSelect
            onYearChange={setYear}
            year={year}
            startYear={startYear}
            endYear={new Date().getFullYear()}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="max-w-[100vw] pl-2">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="min-w-[250px]"
                  formatter={(value, name, item, index) => (
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
                        {formatPrice(+value, { inCent: true })}
                      </div>
                      {/* Add this after the last item */}
                      {index === 1 && (
                        <div className="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                          Total
                          <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                            {formatPrice(item.payload.freeShipping + item.payload.nextDayAir, {
                              inCent: true
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="freeShipping"
              stackId="a"
              fill="var(--color-freeShipping)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="nextDayAir"
              stackId="a"
              fill="var(--color-nextDayAir)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
