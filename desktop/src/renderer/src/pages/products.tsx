import { DeleteRecordsModal } from '@renderer/common/delete-records/modal'
import { ProductsTable } from '@renderer/features/products/components/table'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { Button } from '@renderer/features/ui/button'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppRoute } from '../common/app-route'
import { ExportButton } from '../common/export/export-button'
import { useFetchProducts } from '../features/products/hooks/use-fetch-products'

export default function ProductsPage() {
  const { totalProductsCount, categories, statusGroups, products, setProducts } = useFetchProducts()

  return (
    <>
      <div className="container mx-auto max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: 'Products', href: '#' }]} />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-xl font-bold sm:text-3xl">Products ({totalProductsCount})</h1>
          <div className="flex items-center gap-x-3">
            <ExportButton entityType="products" />
            <Button>
              <Link to={AppRoute.CreateProduct} className="flex items-center">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add
              </Link>
            </Button>
          </div>
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
