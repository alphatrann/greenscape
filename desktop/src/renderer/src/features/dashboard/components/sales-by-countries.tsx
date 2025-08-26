import { Card, CardContent, CardHeader, CardTitle } from '@renderer/features/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '../../ui/chart'
import { Pie, PieChart } from 'recharts'
import { usePieChart } from '../hooks'
import { useEffect } from 'react'

export const SalesByCountries = () => {
  const { chartConfig, chartData, fetchSalesData } = usePieChart()

  useEffect(() => {
    fetchSalesData()
  }, [])

  return (
    <Card className="col-span-3 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-base">Sales by Countries</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center lg:mt-16">
            <h3 className="text-center text-xl font-medium text-muted-foreground">
              No data available
              <br />
              right now
            </h3>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-[300px] max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="sales" nameKey="country" innerRadius={80} />
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
