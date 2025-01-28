import axios from "axios";
import { cookies } from "next/headers";
import { Category } from "../types";

interface CategoriesResponse {
  data: {
    categories: Category[];
  };
}

export const getCategories = async (query = "", slug = "") => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories${
      (slug ? "/" : "") + slug
    }/subs${query}`;

    const {
      data: {
        data: { categories },
      },
    } = await axios.get<CategoriesResponse>(url, {
      headers: { Cookie: (await cookies()).toString() },
    });
    return categories;
  } catch (error: any) {
    return [] as Category[];
  }
};
