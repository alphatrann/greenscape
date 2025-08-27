"use client";
import { Button } from "@/features/ui/button";
import { Product } from "../types";

export const AddToBag = ({ product }: { product: Product }) => {
  if (product.inStock === 0)
    return <div className="mt-6 font-semibold text-red-600">Out of stock</div>;
  return (
    <Button className="mt-6 w-1/2 rounded-full" size="lg">
      Add to bag
    </Button>
  );
};
