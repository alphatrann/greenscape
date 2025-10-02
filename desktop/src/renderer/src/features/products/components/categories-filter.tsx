import { CategoriesRadioMenu } from '@renderer/features/categories/components/radio-menu'
import { searchCategory } from '@renderer/features/categories/utils'
import { Badge } from '@renderer/features/ui/badge'
import { Button } from '@renderer/features/ui/button'
import { Separator } from '@renderer/features/ui/separator'
import { PlusCircleIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useProductFiltersContext } from '../contexts/product-filters-context'
import { Category, CategoryGroup } from '@renderer/../../common/types'

interface CategoriesFilterProps {
  categories: Category[]
  categoryGroups: CategoryGroup[]
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  categories,
  categoryGroups
}) => {
  const { selectedCategory, setSelectedCategory } = useProductFiltersContext()

  const [foundCategoryPath, foundCategory] = useMemo(() => {
    if (!selectedCategory) return []
    return searchCategory(categories, selectedCategory, 'slug')
  }, [selectedCategory, categories])

  const categoryMap = new Map(categoryGroups.map((g) => [g.id, g.count]))

  return (
    <CategoriesRadioMenu
      categoryMap={categoryMap}
      categories={categories}
      field="slug"
      onChange={(newValue) => {
        const slug = newValue.split('|')[0]
        if (slug === selectedCategory) setSelectedCategory(undefined)
        else setSelectedCategory(slug)
      }}
      selectedCategory={`${foundCategory?.slug}|${foundCategory?.name}`}
      trigger={
        <Button variant="outline" size="sm" className="h-8 border-dashed font-normal">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Categories
          {foundCategoryPath && foundCategoryPath?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                {foundCategoryPath.map((p) => p.name).join('/')}
              </Badge>
            </>
          )}
        </Button>
      }
    />
  )
}
