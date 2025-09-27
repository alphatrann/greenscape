import { useRouter } from "next/navigation";
import { useHydrateQueryStore } from "./use-hydrate-query-store";
import { useQueryStore } from "./use-query-store";
import { useEffect, useRef } from "react";
import { searchCategory } from "../../categories/utils";
import { Category } from "../../categories/types";
import qs from "query-string";

export const useQueryProducts = (categories: Category[]) => {
  useHydrateQueryStore();
  const router = useRouter();
  const minPrice = useQueryStore((state) => state.minPrice);
  const page = useQueryStore((state) => state.page);
  const maxPrice = useQueryStore((state) => state.maxPrice);
  const sortBy = useQueryStore((state) => state.sortBy);
  const order = useQueryStore((state) => state.order);
  const outOfStockIncluded = useQueryStore((state) => state.outOfStockIncluded);
  const selectedCategory = useQueryStore((state) => state.selectedCategory);

  const hydrated = useRef(false);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }

    let url = "/products";

    if (selectedCategory) {
      const [path] = searchCategory(categories, selectedCategory, "slug");
      if (!path || path.length === 0) return;
      url += "/category/" + path.map((c) => c.slug).join("/");
    }

    const inStock = outOfStockIncluded ? undefined : "1";

    const urlWithQueries = qs.stringifyUrl({
      url,
      query: {
        price:
          minPrice !== null || maxPrice !== null
            ? `${minPrice || ""}-${maxPrice || ""}`
            : undefined,
        page: page === 1 ? undefined : page,
        inStock,
        sortBy: sortBy || undefined,
        order: order || undefined,
      },
    });

    const currentUrl = window.location.pathname + window.location.search;
    if (currentUrl !== urlWithQueries) {
      router.push(urlWithQueries, { scroll: false });
    }
  }, [
    minPrice,
    maxPrice,
    page,
    sortBy,
    order,
    outOfStockIncluded,
    selectedCategory,
  ]);
};
