import axios from "axios";
import { cookies } from "next/headers";
import { KeyStats } from "../types";

export const getKeyStats = async () => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stats/key`, {
    headers: { Cookie: (await cookies()).toString() },
  });

  return data as KeyStats;
};
