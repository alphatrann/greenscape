"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "@/features/products/types";
import { useBagStore } from "../contexts";
import { Skeleton } from "@/features/ui/skeleton";
import { ProductList } from "@/features/products/product-list";
import { getRelatedProducts } from "@/features/products/actions";

export const Related = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { bag } = useBagStore();
  const bagItemIds = useMemo(() => bag.map((item) => item.id), [bag]);

  const fetchRelatedProducts = useCallback(async () => {
    setLoading(true);
    const products = await getRelatedProducts(bagItemIds);
    setRelatedProducts(products);
    setLoading(false);
  }, [bag, bagItemIds]);

  useEffect(() => {
    if (bag.length > 0 && bagItemIds.length > 0) fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  useEffect(() => {
    if (!loading && bag.length === 0) setRelatedProducts([]);
  }, [bag.length, loading]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-24">
      <h2 className="text-gray-900 font-medium text-lg">
        You may also like...
      </h2>
      {loading ? (
        <div className="mt-6 grid lg:grid-cols-4 gap-y-10 gap-x-6 sm:grid-cols-2">
          <Skeleton className="w-full h-[350px] rounded-md" />
          <Skeleton className="w-full h-[350px] rounded-md" />
          <Skeleton className="w-full h-[350px] rounded-md" />
          <Skeleton className="w-full h-[350px] rounded-md" />
        </div>
      ) : (
        <ProductList
          products={relatedProducts}
          className="mt-6 sm:grid-cols-2 lg:grid-cols-4"
        />
      )}
    </section>
  );
};
