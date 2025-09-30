import { EditProduct } from '@renderer/features/products/components/edit-product'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { AppRoute } from '../common/app-route'
import NotFound from '../common/components/not-found'
import { useCategoryTreeStore } from '../features/categories/hooks/use-category-tree'
import { useFetchCategories } from '../features/categories/hooks/use-fetch-categories'
import { useFetchProduct } from '../features/products/hooks/use-fetch-product'
import { Loading } from '../common/components/loading'

export default function ProductSettingsPage() {
  useFetchCategories()
  const { loading, product } = useFetchProduct()
  const categories = useCategoryTreeStore((state) => state.categories)

  if (loading) return <Loading />
  if (!product) return <NotFound />

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="mb-8">
        <Breadcrumb
          links={[
            { name: 'Products', href: AppRoute.Products },
            { name: product.name, href: '#' }
          ]}
        />
      </div>
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <div className="container mx-auto max-w-5xl flex-1">
          <EditProduct categories={categories} product={product} />
        </div>
      </main>
    </div>
  )
}
