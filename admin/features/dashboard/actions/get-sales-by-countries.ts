import axios from "axios";
import { cookies } from "next/headers";
import { SaleByCountry } from "../types";

export const getSalesByCountries = async () => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stats/countries`, {
    headers: { Cookie: (await cookies()).toString() },
  });

  return data as SaleByCountry[];
};
