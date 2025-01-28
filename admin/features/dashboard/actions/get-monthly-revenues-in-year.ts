import axios from "axios";
import { cookies } from "next/headers";
import { MonthlyRevenue } from "../types";

export const getMonthlyRevenuesInYear = async (year: string) => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stats/year/${year}`, {
    headers: { Cookie: (await cookies()).toString() },
  });

  return data as {
    startYear: number;
    endYear: number;
    monthlyRevenues: MonthlyRevenue[];
  };
};
