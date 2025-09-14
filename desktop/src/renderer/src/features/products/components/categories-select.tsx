import { CategoriesCheckboxMenu } from '@renderer/features/categories/components/checkbox-menu'
import { Category } from '@renderer/features/categories/types'
import { Badge } from '@renderer/features/ui/badge'
import { Button } from '@renderer/features/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/features/ui/card'
import { FormField } from '@renderer/features/ui/form'
import { Separator } from '@renderer/features/ui/separator'
import { UseFormReturn } from 'react-hook-form'
import { searchCategory } from '@renderer/features/categories/utils'
import { ProductFormDto } from '../types'

interface CategoriesSelectProps {
  form: UseFormReturn<ProductFormDto, any, ProductFormDto>
  categories: Category[]
  loading: boolean
}

const MAX_CATEGORY_DEPTH = 3

export const CategoriesSelect = ({ form, categories, loading }: CategoriesSelectProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="categoryIds"
          render={({ field }) => (
            <CategoriesCheckboxMenu
              trigger={
                <Button variant="outline" type="button" disabled={loading} className="gap-2">
                  Select categories
                  <Separator orientation="vertical" />
                  <Badge variant="secondary" className="rounded-sm">
                    {field.value.length} selected
                  </Badge>
                </Button>
              }
              categories={categories}
              selectedCategories={field.value}
              onChange={(newValues) => {
                const categoryIdsWithParents = new Set<number>()
                for (const value of newValues) {
                  const [path] = searchCategory(categories, value, 'id')
                  path.forEach((category) => {
                    if (!categoryIdsWithParents.has(category.id))
                      categoryIdsWithParents.add(category.id)
                  })
                }

                form.setValue(
                  'categoryIds',
                  categoryIdsWithParents.size < MAX_CATEGORY_DEPTH
                    ? []
                    : Array.from(categoryIdsWithParents)
                )
              }}
              field="id"
            />
          )}
        />
      </CardContent>
    </Card>
  )
}
