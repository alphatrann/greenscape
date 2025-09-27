"use client";

import { Category } from "@/features/categories/types";
import { Breadcrumb } from "../ui/breadcrumb";
import { DesktopFilter, MobileFilter } from "./filter";
import { Pagination } from "./pagination";
import { ProductList } from "./product-list";
import { SortSelect } from "./sort";
import { Product } from "./types";

interface ProductsClientProps {
  count: number;
  categories: Category[];
  products: Product[];
}

export const ProductsClient = ({
  count,
  categories,
  products,
}: ProductsClientProps) => {
  return (
    <main className="lg:px-8 sm:px-6 px-4 container max-w-7xl">
      <div className="pt-24 pb-10">
        <Breadcrumb links={[{ name: "Products", href: "#" }]} />
        <h1 className="font-bold mt-6 text-4xl tracking-tight text-gray-900">
          Products
        </h1>
        <p className="text-muted-foreground">
          Unleash the Jungle in Your Home with Monstera Deliciosa!
        </p>
      </div>
      <div className="pt-12 lg:ml-0 lg:flex relative pb-24">
        <DesktopFilter categories={categories} />
        <div className="mt-6 lg:ml-0 w-full space-y-4 lg:pl-12 lg:mt-0">
          <div className="flex -ml-2 justify-between items-center gap-x-4">
            <MobileFilter categories={categories} />
            <SortSelect />
          </div>

          {products.length === 0 ? (
            <div className="h-1/4 px-4 flex flex-col justify-center">
              <h2 className="text-2xl font-bold tracking-tight mt-4 text-gray-900 sm:text-3xl">
                No products found
              </h2>
              <p className="text-base leading-7 text-secondary-foreground mt-2">
                We couldn&apos;t find any products matching your selection.
              </p>
            </div>
          ) : (
            <ProductList products={products} />
          )}
          <div className="mt-8 flex-1">
            <Pagination totalCount={count} />
          </div>
        </div>
      </div>
    </main>
  );
};
