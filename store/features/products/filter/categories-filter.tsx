"use client";
import { CategoriesRadioMenu } from "@/features/categories/menu";
import { Category } from "@/features/categories/types";
import { searchCategory } from "@/features/categories/utils";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import { Separator } from "@/features/ui/separator";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useQueryStore } from "../hooks";

interface CategoriesFilterProps {
  categories: Category[];
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  categories,
}) => {
  const selectedCategory = useQueryStore((state) => state.selectedCategory);
  const update = useQueryStore((state) => state.update);

  const [foundCategoryPath, foundCategory] = useMemo(() => {
    if (!selectedCategory) return [[], null];
    return searchCategory(categories, selectedCategory, "slug");
  }, [selectedCategory, categories]);

  return (
    <div className="space-y-3">
      <CategoriesRadioMenu
        categories={categories}
        field="slug"
        onChange={(newValue) => {
          const newSlug = newValue.split("|")[0];

          if (newSlug === selectedCategory) update({ selectedCategory: null });
          else update({ selectedCategory: newSlug });
        }}
        selectedCategory={`${foundCategory?.slug}|${foundCategory?.name}`}
        trigger={
          <Button variant="outline" className="w-full">
            Categories
            {foundCategoryPath.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm line-clamp-1 px-1 font-normal"
                >
                  {foundCategoryPath.map((p) => p.name).join("/")}
                </Badge>
              </>
            )}
          </Button>
        }
      />
      {selectedCategory && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            update({ selectedCategory: null });
          }}
        >
          Reset
        </Button>
      )}
    </div>
  );
};
