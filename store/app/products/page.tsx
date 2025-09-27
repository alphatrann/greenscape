import { PAGE_SIZE } from "@/constants";
import { getCategoriesTree } from "@/features/categories/actions";
import { getProducts, paginateProducts } from "@/features/products/actions";
import qs from "query-string";
import { ProductsClient } from "../../features/products";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
    price?: string;
    inStock?: "1";
  }>;
}

export const metadata = {
  title: "Products",
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { page = "1", sortBy, order, q, price, inStock } = await searchParams;

  const query = qs.stringifyUrl({
    url: "",
    query: {
      limit: PAGE_SIZE.toString(),
      offset: ((parseInt(page, 10) || 1) - 1) * PAGE_SIZE,
      sortBy,
      order,
      q,
      price,
      inStock: inStock === "1" ? "1-" : undefined,
    },
  });

  const products = await getProducts(query);
  const count = await paginateProducts(query);
  const categories = await getCategoriesTree();
  return (
    <ProductsClient products={products} count={count} categories={categories} />
  );
}
