import axios from "axios";
import { Product } from "../types";

export const getCartProducts = async (ids: number[]): Promise<Product[]> => {
  try {
    const {
      data: { data },
    } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/products/cart?ids=${ids.join(",")}`
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return [] as Product[];
  }
};
