import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@renderer/features/ui/dropdown-menu'
import { ReactNode } from 'react'
import { Category } from '@renderer/../../common/types'
import { CategorySubmenu } from './submenu'

interface CategoriesRadioMenuProps {
  categories: Category[]
  trigger: ReactNode
  selectedCategory?: string
  categoryMap: Map<number, number>
  onChange: (selectedCategory: string) => void
  field: 'id' | 'slug'
}

export const CategoriesRadioMenu = ({
  categories,
  categoryMap,
  trigger,
  selectedCategory,
  onChange,
  field
}: CategoriesRadioMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={selectedCategory} onValueChange={onChange}>
          {categories.map((c) => (
            <CategorySubmenu
              category={c}
              key={c.id}
              render={(category) => (
                <DropdownMenuRadioItem
                  className="min-w-[180px]"
                  value={`${category[field]}|${category.name}`}
                >
                  {category.name}
                  <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {categoryMap.get(category.id)}
                  </span>
                </DropdownMenuRadioItem>
              )}
            />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
