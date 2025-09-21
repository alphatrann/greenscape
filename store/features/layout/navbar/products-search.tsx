"use client";

import { useSearchProducts } from "@/features/products/hooks";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/features/ui/command";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Product } from "@/features/products/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getLocalImage } from "../../categories/utils";

export const ProductsSearch = () => {
  const [open, setOpen] = useState(false);
  const { term, onChange, results } = useSearchProducts();
  const plants = useMemo(
    () =>
      results.filter((result) =>
        result.categories.some((cat) => cat.slug === "plants")
      ),
    [results]
  );
  const care = useMemo(
    () =>
      results.filter((result) =>
        result.categories.some((cat) => cat.slug === "care")
      ),
    [results]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <MagnifyingGlassIcon
        onClick={() => setOpen(true)}
        className="h-6 w-6 flex-shrink-0 text-muted-foreground group-hover:text-secondary-foreground"
      />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false} className="rounded-lg border shadow-md">
          <CommandInput
            value={term}
            onValueChange={onChange}
            placeholder="Search products..."
          />
          <CommandList>
            {term &&
              (plants.length + care.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <>
                  <SearchResultsGroup
                    closeModal={() => setOpen(false)}
                    products={plants}
                    heading="Plants"
                  />
                  {care.length > 0 && <CommandSeparator />}
                  <SearchResultsGroup
                    closeModal={() => setOpen(false)}
                    products={care}
                    heading="Care"
                  />
                </>
              ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

interface SearchResultsGroupProps {
  products: Product[];
  heading: string;
  closeModal: () => void;
}
const SearchResultsGroup = ({
  products,
  heading,
  closeModal,
}: SearchResultsGroupProps) => {
  if (products.length === 0) return null;
  return (
    <CommandGroup heading={heading}>
      {products.map((product) => (
        <CommandItem className="cursor-pointer" asChild key={product.id}>
          <Link onClick={closeModal} href={`/products/details/${product.slug}`}>
            <Image
              width={100}
              height={100}
              src={
                product.images[0].file.url ||
                getLocalImage(product.images[0].file.id)
              }
              alt={product.name + " image"}
              className="w-12 h-12 rounded-sm aspect-square object-cover"
            />
            <div className="ml-4">
              <h5 className="font-medium">{product.name}</h5>
              <span className="text-xs font-normal text-muted-foreground line-clamp-2">
                {product.desc}
              </span>
            </div>
          </Link>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
