import { CreateProduct } from '@renderer/features/products/components/create-product'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { useFetchCategories } from '../features/categories/hooks/use-fetch-categories'
import { useCategoryTreeStore } from '../features/categories/hooks/use-category-tree'

export default function CreateProductPage() {
  useFetchCategories()
  const categories = useCategoryTreeStore((state) => state.categories)

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="mb-8">
        <Breadcrumb
          links={[
            { name: 'Products', href: '/products' },
            { name: 'Create', href: '#' }
          ]}
        />
      </div>
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <div className="container mx-auto max-w-5xl flex-1">
          <CreateProduct categories={categories} />
        </div>
      </main>
    </div>
  )
}
