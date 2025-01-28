import axios from "axios";
import { cookies } from "next/headers";
import { InStockGroup, StatusGroup } from "../types";

interface ProductsResponse {
  statusGroups: StatusGroup[];
  inStockGroups: InStockGroup[];
}

export const aggregateProducts = async (
  query = "",
  slug = "",
): Promise<ProductsResponse> => {
  const {
    data: { statusGroups, inStockGroups },
  } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
      "/products/aggregate" +
      (slug ? "/" : "") +
      slug +
      query,
    {
      headers: { Cookie: (await cookies()).toString() },
    },
  );
  return { statusGroups, inStockGroups };
};
