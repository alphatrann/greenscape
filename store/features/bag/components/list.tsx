"use client";
import { Button } from "@/features/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BagItem as IBagItem } from "../types";
import { BagItem } from "./bag-item";
import { Product } from "../../products/types";
import { useBagStore } from "../contexts";

interface BagListProps {
  cartProducts: (Product & IBagItem)[];
}

export const BagList = ({ cartProducts }: BagListProps) => {
  const [mounted, setMounted] = useState(false);
  const clearBag = useBagStore((state) => state.clearBag);
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <section className="lg:col-span-7 mt-8">
        <p className="text-muted-foreground">Loading bag...</p>
      </section>
    );

  if (cartProducts.length === 0)
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
