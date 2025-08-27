"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/features/ui/chart";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatPrice } from "../../common/utils";
import { MonthlyRevenue } from "../types";
import { groupRevenuesByMonths } from "../utils";
import { YearsSelect } from "./years-select";

interface RevenuesChartProps {
  startYear: number;
  endYear: number;
  monthlyRevenues: MonthlyRevenue[];
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#16a34a",
  },
} satisfies ChartConfig;

export const RevenuesChart = ({
  startYear,
  endYear,
  monthlyRevenues,
}: RevenuesChartProps) => {
  const data = useMemo(
    () => groupRevenuesByMonths(monthlyRevenues),
    [monthlyRevenues],
  );

  return (
    <Card className="col-span-3 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          Overview
          <YearsSelect startYear={startYear} endYear={endYear} />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
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
            <YAxis
              dataKey="revenue"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => formatPrice(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  formatter={(value, name, item) => (
                    <>
                      <div className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-primary" />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        <span className="font-normal text-muted-foreground">
                          $
                        </span>
                        {formatPrice(+value).slice(1)}
                      </div>
                    </>
                  )}
                />
              }
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
