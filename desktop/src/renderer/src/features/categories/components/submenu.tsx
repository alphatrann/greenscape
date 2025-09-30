import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@renderer/features/ui/dropdown-menu'
import React from 'react'
import { Category } from '@renderer/../../common/types'

interface CategorySubmenuProps {
  category: Category
  render: (category: Category) => React.ReactNode
}

export const CategorySubmenu = ({ category, render }: CategorySubmenuProps) => {
  if (!category.subCategories?.length) return render(category)

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {category.subCategories.map((sc) => (
            <CategorySubmenu key={sc.id} category={sc} render={render} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
