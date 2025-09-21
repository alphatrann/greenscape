import { useEffect } from "react";
import { useQueryStore } from "@/features/products/hooks";
import { useParams, useSearchParams } from "next/navigation";

export function useHydrateQueryStore() {
  const update = useQueryStore((state) => state.update);
  const searchParams = useSearchParams();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) update({ selectedCategory: params.slug.at(-1) });
  }, [update, params?.slug]);

  useEffect(() => {
    const page = searchParams.get("page");
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order") as "asc" | "desc" | null;
    const price = searchParams.get("price");
    const inStock = searchParams.get("inStock");

    let minPrice: number | null = null;
    let maxPrice: number | null = null;
    if (price) {
      const [min, max] = price.split("-");
      minPrice = min ? parseFloat(min) : null;
      maxPrice = max ? parseFloat(max) : null;
    }

    update({
      page: page && !isNaN(parseInt(page, 10)) ? parseInt(page, 10) : 1,
      sortBy: sortBy || null,
      order: order || null,
      minPrice,
      maxPrice,
      outOfStockIncluded: inStock !== "1",
    });
  }, [update, searchParams]);
}
