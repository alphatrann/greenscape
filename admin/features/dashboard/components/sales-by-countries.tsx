"use client";
import { formatPrice } from "@/features/common/utils";
import { getCountryName } from "@/features/orders/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/card";
import { useMemo } from "react";
import { SaleByCountry } from "../types";
import { getSalesPieChartCss } from "../utils";

const colors = [
  "#22c55e",
  "#ef4444",
  "#14b8a6",
  "#f97316",
  "#10b981",
  "#a855f7",
  "#f43f5e",
];
export const SalesByCountries = ({ data }: { data: SaleByCountry[] }) => {
  const formattedData = useMemo(() => {
    if (data.length === 0) {
      return [{ name: "None", value: 0, color: "#d1d5db" }];
    }
    return data.map((group, index) => ({
      name: getCountryName(group.country),
      value: group._sum,
      color: colors[index % colors.length],
    }));
  }, [data]);

  const cssString = useMemo(
    () => getSalesPieChartCss(formattedData),
    [formattedData],
  );

  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle className="text-base">Sales by Countries</CardTitle>
      </CardHeader>
      <CardContent className="h-full w-full">
        {formattedData.length === 0 ? (
          <div className="flex h-full items-center justify-center lg:mt-16">
            <h3 className="text-center text-xl font-medium text-muted-foreground">
              No data available
              <br />
              right now
            </h3>
          </div>
        ) : (
          <div>
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto max-w-[250px] rounded-full"
            >
              <clipPath id="hole">
                <path d="M 50 0 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100 v 18 a 2 2 0 0 0 0 64 2 2 0 0 0 0 -64" />
              </clipPath>
              <foreignObject
                x="0"
                y="0"
                width="100"
                height="100"
                clipPath="url(#hole)"
              >
                <div
                  className="h-full w-full"
                  style={{
                    background: `conic-gradient(${cssString})`,
                  }}
                />
              </foreignObject>
            </svg>
            <ul className="mt-4 space-y-4">
              {formattedData.length === 1 &&
              formattedData.some((data) => data.value === 0) ? (
                <li className="w-full text-center text-sm text-muted-foreground">
                  No data available
                </li>
              ) : (
                formattedData.map((sale) => (
                  <li
                    key={sale.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-x-3">
                      <div
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: sale.color }}
                      />
                      <span className="text-sm font-medium">{sale.name}</span>
                    </div>

                    <span className="text-sm text-muted-foreground">
                      {formatPrice(+sale.value)}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
