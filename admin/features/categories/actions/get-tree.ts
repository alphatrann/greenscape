import axios from "axios";
import { cookies } from "next/headers";
import { Category } from "../types";

export const getCategoriesTree = async (query?: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/tree${
    query ?? ""
  }`;

  const {
    data: { data: categories },
  } = await axios.get(url, {
    headers: { Cookie: (await cookies()).toString() },
  });
  return categories as Category[];
};
