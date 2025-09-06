import { CategoriesRadioMenu } from '@renderer/features/categories/components/radio-menu'
import { Category } from '@renderer/features/categories/types'
import { searchCategory } from '@renderer/features/categories/utils'
import { Badge } from '@renderer/features/ui/badge'
import { Button } from '@renderer/features/ui/button'
import { Separator } from '@renderer/features/ui/separator'
import { PlusCircleIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useProductFiltersContext } from '../contexts/product-filters-context'

interface CategoriesFilterProps {
  categories: Category[]
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({ categories }) => {
  const { selectedCategory, setSelectedCategory } = useProductFiltersContext()

  const [foundCategoryPath, foundCategory] = useMemo(() => {
    if (!selectedCategory) return []
    return searchCategory(categories, selectedCategory, 'slug')
  }, [selectedCategory, categories])

  return (
    <CategoriesRadioMenu
      categories={categories}
      field="slug"
      onChange={(newValue) => {
        const slug = newValue.split('|')[0]
        if (slug === selectedCategory) setSelectedCategory(null)
        else setSelectedCategory(slug)
      }}
      selectedCategory={`${foundCategory?.slug}|${foundCategory?.name}`}
      trigger={
        <Button variant="outline" size="sm" className="h-8 border-dashed">
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
