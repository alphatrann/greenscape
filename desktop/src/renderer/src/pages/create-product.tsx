import { getCategoriesTree } from '@renderer/features/categories/api'
import { CreateProduct } from '@renderer/features/products/components/create-product'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { useEffect, useState } from 'react'
import { Category } from '../features/categories/types'

export default function CreateProductPage() {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    getCategoriesTree().then(setCategories)
  }, [])

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
