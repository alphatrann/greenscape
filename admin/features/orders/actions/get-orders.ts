import axios from "axios";
import { cookies } from "next/headers";
import { Order } from "../types";

interface OrdersResponse {
  data: Order[];
  count: number;
}

export const getOrders = async (query = ""): Promise<OrdersResponse> => {
  const {
    data: { data, count },
  } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/orders" + query, {
    headers: { Cookie: (await cookies()).toString() },
  });
  return { data, count };
};
