import { getProduct } from '@renderer/features/products/api'
import { EditProduct } from '@renderer/features/products/components/edit-product'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom'
import { AppRoute } from '../common/app-route'
import { useCategoryTreeStore } from '../features/categories/hooks/use-category-tree'
import { useFetchCategories } from '../features/categories/hooks/use-fetch-categories'
import { Product } from '../features/products/types'

export default function ProductSettingsPage() {
  const { slug } = useParams()

  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!slug) return

    getProduct(slug!).then(setProduct)
  }, [slug])
  useFetchCategories()
  const categories = useCategoryTreeStore((state) => state.categories)

  if (!product) {
    redirect('/not-found')
    return null
  }

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
