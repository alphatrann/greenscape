import axios from "axios";
import { cookies } from "next/headers";
import { CountryGroup, ShippingOptionGroup, StatusGroup } from "../types";

interface OrdersResponse {
  data: {
    shippingOptionGroups: ShippingOptionGroup[];
    statusGroups: StatusGroup[];
    countryGroups: CountryGroup[];
  };
}

export const aggregateOrders = async (query = "") => {
  const {
    data: {
      data: { statusGroups, countryGroups, shippingOptionGroups },
    },
  } = await axios.get<OrdersResponse>(
    process.env.NEXT_PUBLIC_API_URL + "/orders/aggregate" + query,
    {
      headers: { Cookie: (await cookies()).toString() },
    },
  );
  return { statusGroups, countryGroups, shippingOptionGroups };
};
