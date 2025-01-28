import axios from "axios";
import { cookies } from "next/headers";
import { Category } from "../types";

interface CategoriesResponse {
  count: number;
  data: {
    categories: Category[];
    parents: Category;
  };
}

export const getCategories = async (query = "", slug: string = "") => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories${
      (slug ? "/" : "") + slug
    }/subs${query}`;

    const {
      data: { count, data },
    } = await axios.get<CategoriesResponse>(url, {
      headers: { Cookie: (await cookies()).toString() },
    });
    return {
      count,
      data,
    };
  } catch (error: any) {
    return { count: 0, data: { categories: [], parents: null } };
  }
};
