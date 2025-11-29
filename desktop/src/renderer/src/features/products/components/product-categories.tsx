import { Category } from '@renderer/../../common/types'
import { Badge } from '../../ui/badge'

interface ProductCategoriesProps {
  categories: Category[]
}

const categoryColors = [
  'border-red-300 dark:border-red-600 text-red-900 dark:text-red-100 bg-red-100 dark:bg-red-900',
  'border-rose-300 dark:border-rose-600 text-rose-900 dark:text-rose-100 bg-rose-100 dark:bg-rose-900',
  'border-blue-300 dark:border-blue-600 text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-900',
  'border-green-300 dark:border-green-600 text-green-900 dark:text-green-100 bg-green-100 dark:bg-green-900',
  'border-yellow-300 dark:border-yellow-600 text-yellow-900 dark:text-yellow-100 bg-yellow-100 dark:bg-yellow-900',
  'border-purple-300 dark:border-purple-600 text-purple-900 dark:text-purple-100 bg-purple-100 dark:bg-purple-900',
  'border-pink-300 dark:border-pink-600 text-pink-900 dark:text-pink-100 bg-pink-100 dark:bg-pink-900',
  'border-indigo-300 dark:border-indigo-600 text-indigo-900 dark:text-indigo-100 bg-indigo-100 dark:bg-indigo-900',
  'border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 bg-orange-100 dark:bg-orange-900',
  'border-teal-300 dark:border-teal-600 text-teal-900 dark:text-teal-100 bg-teal-100 dark:bg-teal-900'
]

function getCategoryColor(id: number) {
  return categoryColors[id % categoryColors.length]
}

export function ProductCategories({ categories }: ProductCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <Badge className={getCategoryColor(c.id)} key={c.id}>
          {c.name}
        </Badge>
      ))}
    </div>
  )
}
