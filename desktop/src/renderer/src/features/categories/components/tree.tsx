import { ChevronRight, EditIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible'
import { Category } from '@renderer/../../common/types'
import { formatPrice } from '@renderer/../../common/utils'
import { useEditCategoryModal } from '../hooks'
import { Button } from '../../ui/button'
import { useDeleteRecordsModal } from '@renderer/common/delete-records'
import { useState } from 'react'
import { cn } from '../../../lib/utils'
import { Badge } from '../../ui/badge'

interface CategoryTreeProps {
  openAddCategoryModal: (parentId?: number) => void
  category: Category
  depth?: number
}

export function CategoryTree({ category, openAddCategoryModal, depth = 0 }: CategoryTreeProps) {
  const paddingLeft = depth * 16 + 8 // 1rem per level
  const { onOpen: onEditCategoryModalOpen } = useEditCategoryModal()
  const { onOpen: onDeleteCategoryModalOpen } = useDeleteRecordsModal()
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)

  const Action = () => {
    return (
      <div className="flex justify-end gap-x-3">
        <Button
          size="icon"
          className="h-8 w-8"
          variant="outline"
          onClick={() => openAddCategoryModal(category.id)}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          className="h-8 w-8"
          variant="secondary"
          onClick={() => {
            onEditCategoryModalOpen(category)
          }}
        >
          <EditIcon className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          className="h-8 w-8"
          variant="destructive"
          onClick={() => {
            onDeleteCategoryModalOpen([category.id])
          }}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  if (!category.subCategories || category.subCategories.length === 0) {
    return (
      <div className="flex justify-between items-center gap-x-3">
        <div className="grid grid-cols-4 md:grid-cols-6 items-center w-full py-2 pr-3 rounded-md">
          <div
            style={{ paddingLeft: paddingLeft + 8 }}
            className="col-span-2 md:col-span-4 flex items-center gap-x-2"
          >
            {category.name}
          </div>

          <span className="text-right font-medium text-sm">
            {formatPrice(category.sales, { inCent: true })}
          </span>
          <span className="text-right font-medium text-sm text-muted-foreground">
            {category.unitsSold.toLocaleString('en-US')}
          </span>
        </div>
        <Action />
      </div>
    )
  }

  return (
    <Collapsible
      open={isCollapsibleOpen}
      onOpenChange={setIsCollapsibleOpen}
      className="group/collapsible w-full [&[data-state=open]>button>svg:first-child]:rotate-90"
    >
      <div className="flex justify-between items-center gap-x-3">
        <CollapsibleTrigger className="grid grid-cols-4 md:grid-cols-6 items-center w-full py-2 pr-3 hover:bg-muted/50 rounded-md">
          <div
            style={{ paddingLeft }}
            className="col-span-2 md:col-span-4 flex items-center gap-x-2"
          >
            <ChevronRight
              className={cn(isCollapsibleOpen && 'rotate-90', 'w-4 h-4 transition-transform')}
            />
            {category.name}
            <Badge>{category.subCategories?.length ?? 0}</Badge>
          </div>

          <span className="text-right font-medium text-sm">
            {formatPrice(category.sales, { inCent: true })}
          </span>
          <span className="text-right font-medium text-sm text-muted-foreground">
            {category.unitsSold.toLocaleString('en-US')}
          </span>
        </CollapsibleTrigger>
        <Action />
      </div>

      <CollapsibleContent>
        {category.subCategories.map((subCategory) => (
          <CategoryTree
            key={subCategory.id}
            openAddCategoryModal={openAddCategoryModal}
            category={subCategory}
            depth={depth + 1}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
