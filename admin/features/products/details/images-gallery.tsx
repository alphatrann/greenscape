"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { getLocalImage } from "../../common/utils";
import { Product } from "../types";

interface ImagesGalleryProps {
  product: Product;
}

export const ImagesGallery: React.FC<ImagesGalleryProps> = ({ product }) => {
  const [pos, setPos] = useState(0);

  return (
    <div className="space-y-6">
      <div className="w-full rounded-md bg-gray-200/50">
        <Image
          src={
            product.images[pos].file.url ||
            getLocalImage(product.images[pos].file.id)
          }
          alt="Cover image"
          width={1024}
          height={1024}
          className="aspect-square h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="grid h-fit w-full grid-cols-4 gap-6">
        {product.images.map((image, i) => (
          <div
            onClick={() => setPos(i)}
            className={cn(
              "cursor-pointer",
              pos === i && "h-fit rounded ring-2 ring-primary ring-offset-2",
            )}
            key={image.file.id}
          >
            <Image
              width={200}
              height={200}
              className={cn(
                "aspect-square rounded object-cover",
                pos !== i && "opacity-50",
              )}
              src={image.file.url || getLocalImage(image.file.id)}
              alt={product.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
