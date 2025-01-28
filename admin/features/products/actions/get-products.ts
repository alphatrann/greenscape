import axios from "axios";
import { cookies } from "next/headers";
import { Product } from "../types";

export const getProducts = async (
  query = "",
  slug = "",
): Promise<Product[]> => {
  try {
    const {
      data: { data },
    } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
        "/products" +
        (slug ? "/category/" + slug : slug) +
        query,
      {
        headers: { Cookie: (await cookies()).toString() },
      },
    );
    return data as Product[];
  } catch (error: any) {
    return [];
  }
};
