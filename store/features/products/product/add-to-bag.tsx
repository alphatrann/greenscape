"use client";
import React, { useMemo } from "react";
import { Button } from "@/features/ui/button";
import { useBagStore } from "@/features/bag/contexts";
import { Product } from "../types";

export const AddToBag = ({ product }: { product: Product }) => {
  const { addToBag, updateQty, findBagItem, removeBagItem } = useBagStore();
  const existingQty = useMemo(
    () => findBagItem(product.id)?.qty || 0,
    [findBagItem(product.id)?.qty]
  );

  const onAddToBag = () => {
    addToBag({ id: product.id, qty: 1 });
  };

  const rem = useMemo(
    () => product.inStock - existingQty,
    [existingQty, product.inStock]
  );

  if (product.inStock === 0)
    return <div className="mt-6 text-red-600 font-semibold">Out of stock</div>;
  if (existingQty === 0)
    return (
      <Button
        className="w-1/2 mt-6 rounded-full"
        size="lg"
        onClick={onAddToBag}
      >
        Add to bag
      </Button>
    );

  return (
    <div className="mt-6">
      <div className="flex justify-between w-1/2 items-center rounded-full p-1 bg-primary">
        <Button
          className="bg-transparent font-normal hover:bg-green-800 rounded-full text-2xl"
          size="icon"
          onClick={() => {
            if (existingQty === 1) removeBagItem(product.id);
            else updateQty(product.id, existingQty - 1);
          }}
        >
          -
        </Button>
        <span className="text-white font-medium text-sm">
          {rem > 0 ? `${existingQty} added` : `Max ${existingQty}`}
        </span>
        <Button
          disabled={rem === 0}
          className="bg-transparent font-normal hover:bg-green-800 rounded-full text-2xl"
          size="icon"
          onClick={() => updateQty(product.id, existingQty + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};
