"use client";
import React, { useEffect, useState } from "react";
import { useBagStore } from "../contexts";
import { BagItem } from "./bag-item";
import Link from "next/link";
import { Button } from "@/features/ui/button";
import { Product } from "../../products/types";
import { getProducts } from "../../products/actions";
import { BagItem as IBagItem } from "../types";

export const BagList = () => {
  const [mounted, setMounted] = useState(false);
  const [cartProducts, setCartProducts] = useState<(Product & IBagItem)[]>([]);
  const { bag, clearBag } = useBagStore();

  useEffect(() => {
    const cartProductIds = bag.map((item) => item.id);

    if (cartProductIds.length === 0) return;
    const productQtyMap = new Map(bag.map((item) => [item.id, item.qty]));
    getProducts(
      `?ids=${cartProductIds.join(",")}&limit=${bag.length}&offset=0`
    ).then((products) => {
      setCartProducts(
        products.map((p) => ({ ...p, qty: productQtyMap.get(p.id) ?? 0 }))
      );
    });
  }, [bag]);

  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <section className="lg:col-span-7 mt-8">
        <p className="text-muted-foreground">Loading bag...</p>
      </section>
    );
  if (bag.length === 0)
    return (
      <section className="lg:col-span-7 mt-8">
        <p className="text-muted-foreground">Your bag is currently empty</p>
        <Button size="lg" className="mt-4">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </section>
    );

  return (
    <section className="lg:col-span-7">
      <ul className="divide-y divide-gray-200">
        {cartProducts.map((item) => (
          <BagItem key={item.id} item={item} />
        ))}
      </ul>
      <Button variant="destructive" onClick={clearBag} className="mt-6">
        Clear bag
      </Button>
    </section>
  );
};
