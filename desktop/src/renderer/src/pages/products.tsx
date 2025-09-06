import { getCategoriesTree } from '@renderer/features/categories/api'
import { DeleteRecordsModal } from '@renderer/common/delete-records/modal'
import { aggregateProducts, getProducts, paginateProducts } from '@renderer/features/products/api'
import { ProductsTable } from '@renderer/features/products/components/table'
import { Product, StatusGroup } from '@renderer/features/products/types'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { Button } from '@renderer/features/ui/button'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Category } from '../features/categories/types'
import { AppRoute } from '../common/app-route'
import { useFiltersContext } from '../common/contexts/filters-context'
import { useProductFiltersContext } from '../features/products/contexts/product-filters-context'
import qs from 'query-string'

export default function ProductsPage() {
  const [statusGroups, setStatusGroups] = useState<StatusGroup[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const { price, selectedCategory, status, inStock, from, to } = useProductFiltersContext()
  const { q, order, sortBy, pagination } = useFiltersContext()
  const { total: totalProductsCount, setTotal: setTotalProductsCount } = useFiltersContext()

  useEffect(() => {
    const slug = selectedCategory ?? ''
    const query = qs.stringifyUrl({
      url: '',
      query: {
        price: price.map((p) => p || '').join('-'),
        inStock: inStock.map((i) => i || '').join('-'),
        status,
        from: from?.toISOString(),
        to: to?.toISOString(),
        q,
        order,
        sortBy,
        offset: pagination.pageIndex * pagination.pageSize,
        limit: pagination.pageSize
      }
    })
    getProducts(query, slug).then((data) => setProducts(data))

    paginateProducts(query, slug).then((data) => setTotalProductsCount(data))
    aggregateProducts(query, slug).then((data) => {
      setStatusGroups(data.statusGroups)
    })

    getCategoriesTree(query).then((data) => setCategories(data))
  }, [price, status, inStock, from, to, q, order, sortBy, pagination, selectedCategory])

  return (
    <>
      <div className="container mx-auto max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: 'Products', href: '#' }]} />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-xl font-bold sm:text-3xl">Products ({totalProductsCount})</h1>

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
