import { PAGE_SIZE } from "@/constants";
import { getCategoriesTree } from "@/features/categories/actions";
import { getProducts, paginateProducts } from "@/features/products/actions";
import qs from "query-string";
import { ProductsClient } from "@/features/products";
import { searchCategory } from "@/features/categories/utils";

interface ProductsPageProps {
  searchParams: Promise<{
    offset?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
    price?: string;
    inStock?: "true";
  }>;
  params: Promise<{
    slug: string[];
  }>;
}

export const generateMetadata = async ({ params }: ProductsPageProps) => {
  const { slug } = await params;
  const categories = await getCategoriesTree();
  const [path] = searchCategory(categories, slug.at(-1) || "", "slug");
  return {
    title:
      path && path.length > 0
        ? path.map((c) => c.name).join(" / ")
        : "Category",
  };
};

export default async function CategoryProductsPage({
  searchParams,
  params,
}: ProductsPageProps) {
  const { offset, sortBy, order, q, price, inStock } = await searchParams;
  const { slug } = await params;
  const query = qs.stringifyUrl({
    url: "",
    query: {
      limit: PAGE_SIZE.toString(),
      offset,
      sortBy,
      order,
      q,
      price,
      inStock,
    },
  });
  const products = await getProducts(query, slug.at(-1));
  const count = await paginateProducts(query, slug.at(-1));
  const categories = await getCategoriesTree();

  return (
    <ProductsClient products={products} count={count} categories={categories} />
  );
}
