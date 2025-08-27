"use client";
import { CategoriesRadioMenu } from "@/features/categories/menu";
import { Category } from "@/features/categories/types";
import { searchCategory } from "@/features/categories/utils";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import { Separator } from "@/features/ui/separator";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useMemo, useState } from "react";
import { Product } from "../types";

interface CategoriesFilterProps {
  categories: Category[];
  table: Table<Product>;
  slug?: string;
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  categories,
  table,
  slug,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [foundCategoryPath, foundCategory] = useMemo(() => {
    if (!selectedCategory) return [];
    return searchCategory(categories, selectedCategory, "slug");
  }, [selectedCategory, categories]);

  useEffect(() => {
    if (slug) setSelectedCategory(slug);
  }, [slug]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    let url = "/products";
    if (foundCategoryPath && foundCategoryPath?.length > 0) {
      url += "/category/" + foundCategoryPath.map((c) => c.slug).join("/");
    }

    const urlWithCategorySlug = qs.stringifyUrl({
      url,
      query: currentQuery,
    });
    // prevent infinite re-rendering
    if (
      urlWithCategorySlug !==
      window.location.pathname + window.location.search
    ) {
      table.resetPageIndex();
      router.push(urlWithCategorySlug, { scroll: false });
    }
  }, [searchParams.toString(), foundCategoryPath]);

  return (
    <CategoriesRadioMenu
      categories={categories}
      field="slug"
      onChange={(newValue) => {
        const slug = newValue.split("|")[0];
        if (slug === selectedCategory) setSelectedCategory(null);
        else setSelectedCategory(slug);
      }}
      selectedCategory={`${foundCategory?.slug}|${foundCategory?.name}`}
      trigger={
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Categories
          {foundCategoryPath && foundCategoryPath?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {foundCategoryPath.map((p) => p.name).join("/")}
              </Badge>
            </>
          )}
        </Button>
      }
    />
  );
};
