import axios from "axios";
import { Product } from "../types";

export const getProducts = async (
  query = "",
  categorySlug = ""
): Promise<{ count: number; data: Product[] }> => {
  try {
    const {
      data: { count, data },
    } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
        "/products/store" +
        (categorySlug ? "/category/" + categorySlug : "") +
        query
    );
    return { count, data };
  } catch (error: any) {
    return { count: 0, data: [] };
  }
};
