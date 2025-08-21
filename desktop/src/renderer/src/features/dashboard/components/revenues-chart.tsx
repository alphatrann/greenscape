'use client'
import { formatPrice } from '@renderer/common/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/features/ui/card'
import { useMemo } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { MonthlyRevenue } from '../types'
import { groupRevenuesByMonths } from '../utils'
import { YearsSelect } from './years-select'

interface RevenuesChartProps {
  startYear: number
  endYear: number
  monthlyRevenues: MonthlyRevenue[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="z-50 overflow-hidden rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-950 shadow-md animate-in fade-in-0 zoom-in-95 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
        {formatPrice(payload[0].value)}
      </div>
    )
  }

  return null
}

export const RevenuesChart = ({ startYear, endYear, monthlyRevenues }: RevenuesChartProps) => {
  const data = useMemo(() => groupRevenuesByMonths(monthlyRevenues), [monthlyRevenues])

  return (
    <Card className="col-span-3 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          Overview
          <YearsSelect startYear={startYear} endYear={endYear} />
        </CardTitle>
      </CardHeader>
      <CardContent className="max-w-[100vw] pl-2">
        <ResponsiveContainer width="98%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatPrice(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
