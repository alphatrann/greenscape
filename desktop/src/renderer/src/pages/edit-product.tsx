import { getCategoriesTree } from '@renderer/features/categories/api'
import { getProduct } from '@renderer/features/products/api'
import { EditProduct } from '@renderer/features/products/components/edit-product'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { Product } from '../features/products/types'
import { useState, useEffect } from 'react'
import { redirect, useParams } from 'react-router-dom'
import { Category } from '../features/categories/types'
import { AppRoute } from '../common/app-route'

export default function ProductSettingsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    getCategoriesTree().then(setCategories)
  }, [])

  const { slug } = useParams()

  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!slug) return

    getProduct(slug!).then(setProduct)
  }, [slug])

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
