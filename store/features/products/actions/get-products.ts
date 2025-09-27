import axios from "axios";
import { Product } from "../types";

export const getProducts = async (
  query = "",
  categorySlug = ""
): Promise<Product[]> => {
  try {
    const {
      data: { data },
    } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
        "/products/store" +
        (categorySlug ? "/category/" + categorySlug : "") +
        query
    );
    return data;
  } catch (error: any) {
    console.log(error.response?.data.message ?? error.message);
    return [] as Product[];
  }
};
