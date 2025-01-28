import axios from "axios";
import { cookies } from "next/headers";
import { Order } from "../types";

export const getOrder = async (id: string) => {
  const {
    data: { data },
  } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/orders/details/" + id,
    {
      headers: { Cookie: (await cookies()).toString() },
    },
  );

  return data as Order | undefined;
};
