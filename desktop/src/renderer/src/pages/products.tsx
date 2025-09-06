import { getCategoriesTree } from '@renderer/features/categories/api'
import { DeleteRecordsModal } from '@renderer/common/delete-records/modal'
import { aggregateProducts, getProducts, paginateProducts } from '@renderer/features/products/api'
import { ProductsTable } from '@renderer/features/products/components/products-table'
import { InStockGroup, Product, StatusGroup } from '@renderer/features/products/types'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { Button } from '@renderer/features/ui/button'
import { PlusIcon } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Category } from '../features/categories/types'
import { AppRoute } from '../common/app-route'

export const metadata = {
  title: 'Products'
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const [inStockGroups, setInStockGroups] = useState<InStockGroup[]>([])
  const [statusGroups, setStatusGroups] = useState<StatusGroup[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [totalProductsCount, setTotalProductsCount] = useState(0)

  useEffect(() => {
    const queryString = searchParams.toString()
    getProducts(queryString).then((data) => setProducts(data))

    paginateProducts(queryString).then((data) => setTotalProductsCount(data))
    aggregateProducts(queryString).then((data) => {
      setInStockGroups(data.inStockGroups)
      setStatusGroups(data.statusGroups)
    })

    getCategoriesTree(queryString).then((data) => setCategories(data))
  }, [searchParams])

  return (
    <>
      <div className="container max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: 'Products', href: '#' }]} />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Products ({totalProductsCount})
          </h1>

          <Button>
            <Link to={AppRoute.CreateProduct} className="flex items-center">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add
            </Link>
          </Button>
        </div>
        <div className="mt-6 space-y-3">
          <ProductsTable
            categories={categories}
            statusGroups={statusGroups}
            count={totalProductsCount}
            products={products}
            inStockGroups={inStockGroups}
          />
        </div>
      </div>
      <DeleteRecordsModal
        deleteInUI={(ids) => setProducts((prev) => prev.filter((p) => !ids.includes(p.id)))}
        entityName="products"
      />
    </>
  )
}
