import axios from "axios";
import { cookies } from "next/headers";

export const paginateProducts = async (
  query = "",
  slug = "",
): Promise<number> => {
  try {
    const {
      data: { count },
    } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
        "/products/paginate" +
        (slug ? "/category/" + slug : slug) +
        query,
      {
        headers: { Cookie: (await cookies()).toString() },
      },
    );
    return count as number;
  } catch (error) {
    return 0;
  }
};
