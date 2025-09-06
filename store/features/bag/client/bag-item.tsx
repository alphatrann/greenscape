import React from "react";
import Image from "next/image";
import { BagItem as IBagItem } from "../types";
import { formatPrice } from "@/features/products/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/features/ui/button";
import { useBagStore } from "../contexts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/features/ui/select";
import { getLocalImage } from "@/features/categories/utils";
import { Product } from "@/features/products/types";

interface BagItemProps {
  item: Product & IBagItem;
}

export const BagItem: React.FC<BagItemProps> = ({ item }) => {
  const { updateQty, removeBagItem } = useBagStore();

  return (
    <li className="flex items-center py-6">
      <Image
        src={item.images[0].file.url || getLocalImage(item.images[0].file.id)}
        alt={item.name}
        width={300}
        height={300}
        className="flex-shrink-0 rounded-md w-24 h-24 sm:w-32 sm:h-32 aspect-square object-cover"
      />
      <div className="ml-4 sm:ml-6 flex-1 flex flex-col justify-between">
        <div className="sm:grid sm:grid-cols-2 sm:gap-x-6 items-start pr-9 sm:pr-0 relative">
          <div>
            <h4 className="text-foreground line-clamp-2 font-medium text-sm">
              {item.name}
            </h4>
            <p className="text-muted-foreground mt-1 text-sm">
              {formatPrice(item.price)}
            </p>
          </div>
          <div className="flex sm:pr-9 sm:mt-0 mt-4 items-end justify-between">
            <label htmlFor="qty" className="sr-only">
              Quantity of {item.name}
            </label>
            <Select
              value={item.qty.toString()}
              onValueChange={(value) => updateQty(item.id, +value)}
            >
              <SelectTrigger className="w-fit gap-x-4">
                {item.qty}
              </SelectTrigger>
              <SelectContent className="max-w-fit">
                {Array(item.inStock)
                  .fill(null)
                  .map((_, i) => (
                    <SelectItem className="w-fit" key={i} value={`${i + 1}`}>
                      {i + 1}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="absolute top-0 right-0">
            <span className="sr-only">Remove item from bag</span>
            <Button
              onClick={() => removeBagItem(item.id)}
              variant="ghost"
              className="group hover:bg-transparent"
            >
              <XMarkIcon className="h-5 w-5 text-muted-foreground group-hover:text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};
