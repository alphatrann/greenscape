"use client";
import { useState, useEffect, useMemo } from "react";
import { getCartProducts } from "../../products/actions";
import { Product } from "../../products/types";
import { useBagStore } from "../contexts";
import { BagList } from "./list";
import { BagSummary } from "./summary";
import { BagItem } from "../types";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export const BagClient = () => {
  const searchParams = useSearchParams();
  const [cartProducts, setCartProducts] = useState<(Product & BagItem)[]>([]);
  const bag = useBagStore((state) => state.bag);
  const clearBag = useBagStore((state) => state.clearBag);
  const [mounted, setMounted] = useState(false);

  const total = useMemo(() => {
    return cartProducts.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cartProducts]);

  useEffect(() => {
    const success = searchParams.get("success");
    const cancelled = searchParams.get("cancelled");
    if (success === "1") {
      toast.success("Payment completed");
      clearBag();
    }
    if (cancelled === "1") toast.error("Payment cancelled");
  }, [searchParams]);

  useEffect(() => {
    if (!mounted) return;
    const cartProductIds = bag.map((item) => item.id);
    if (cartProductIds.length === 0) {
      setCartProducts([]); // <-- clear local state when bag is empty
      return;
    }

    if (cartProductIds.length === 0) return;
    const productQtyMap = new Map(bag.map((item) => [item.id, item.qty]));
    getCartProducts(cartProductIds).then((products) => {
      setCartProducts(
        products.map((p) => ({
          ...p,
          qty: Math.max(1, Math.min(productQtyMap.get(p.id) ?? 1, p.inStock)),
        }))
      );
    });
  }, [bag, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="lg:grid relative lg:grid-cols-12 lg:items-start lg:gap-x-12">
      <BagList cartProducts={cartProducts} />
      <BagSummary total={total} />
    </div>
  );
};
