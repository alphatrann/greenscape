import Link from "next/link";
import { Product } from "../types";
import Image from "next/image";
import { formatPrice } from "../utils";
import { getLocalImage } from "@/features/categories/utils";

interface ProductItemProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Link
      href={`/products/details/${product.slug}`}
      key={product.id}
      className="relative max-w-[300px] mx-auto sm:mx-0 w-fit group h-full"
    >
      <Image
        alt={product.name}
        width={600}
        height={600}
        className="rounded-md object-cover transition-opacity group-hover:opacity-75 aspect-square"
        src={
          product.images[0].file.url || getLocalImage(product.images[0].file.id)
        }
      />

      <div className="pt-4 space-y-2 border-t border-gray-200">
        <div className="font-medium text-base text-foreground line-clamp-1">
          {product.name}
        </div>
        <div className="text-base text-muted-foreground">
          {formatPrice(product.price)}
        </div>
      </div>
    </Link>
  );
};
