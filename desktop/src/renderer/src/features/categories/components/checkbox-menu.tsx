import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@renderer/features/ui/dropdown-menu'
import { ReactNode, useMemo } from 'react'
import { Category } from '@renderer/../../common/types'
import { CategorySubmenu } from './submenu'

interface CategoriesCheckboxMenuProps {
  categories: Category[]
  trigger: ReactNode
  selectedCategories: (string | number)[]
  onChange: (newValues: (string | number)[]) => void
  field: 'id' | 'slug'
}

export const CategoriesCheckboxMenu = ({
  categories,
  trigger,
  selectedCategories,
  onChange,
  field
}: CategoriesCheckboxMenuProps) => {
  const selectedSet = useMemo(() => new Set(selectedCategories), [selectedCategories])
  const removeCategory = (category: string | number) => {
    onChange(selectedCategories.filter((c) => c !== category))
  }

  const addCategory = (category: string | number) => {
    onChange([...selectedCategories, category])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {categories.map((c) => (
          <CategorySubmenu
            category={c}
            key={c.id}
            render={(category) => (
              <DropdownMenuCheckboxItem
                className="min-w-[180px]"
                onCheckedChange={(checked) => {
                  if (!checked) removeCategory(category[field])
                  else addCategory(category[field])
                }}
                checked={selectedSet.has(category[field])}
              >
                {category.name}

                {category?._count?.products > 0 && (
                  <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {category?._count?.products}
                  </span>
                )}
              </DropdownMenuCheckboxItem>
            )}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
