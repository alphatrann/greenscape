import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import { ReactNode } from "react";
import { Category } from "../types";
import { CategorySubmenu } from "./submenu";

type CategoryRadioOption = `${string}|${string}`;

interface CategoriesRadioMenuProps {
  categories: Category[];
  trigger: ReactNode;
  selectedCategory?: CategoryRadioOption;
  onChange: (selectedCategory: string) => void;
  disabled?: boolean;
  field: "id" | "slug";
}

export const CategoriesRadioMenu = ({
  categories,
  trigger,
  selectedCategory,
  onChange,
  disabled = false,
  field,
}: CategoriesRadioMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={selectedCategory}
          onValueChange={onChange}
        >
          {categories.map((c) => (
            <CategorySubmenu
              category={c}
              key={c.id}
              render={(category) => (
                <DropdownMenuRadioItem
                  className="min-w-[180px]"
                  value={`${category[field]}|${category.name}`}
                  disabled={disabled}
                >
                  {category.name}
                </DropdownMenuRadioItem>
              )}
            />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
