import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Product } from "../types";
import toast from "react-hot-toast";

export const useSearchProducts = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const searchProducts = useCallback(async (): Promise<Product[]> => {
    const {
      data: { data },
    } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/products/store?q=" + term
    );
    return data;
  }, [term]);

  useEffect(() => {
    if (term.length > 0)
      searchProducts()
        .then((data) => setResults(data))
        .catch((error) =>
          toast.error(error?.response?.data?.message || "Something went wrong")
        );
  }, [searchProducts]);

  const onChange = (search: string) => {
    setTerm(search);
  };
  return { results, term, onChange };
};
