import { XMarkIcon } from '@heroicons/react/24/outline'
import { useFiltersContext } from '@renderer/common/contexts/filters-context'
import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  useTable
} from '@renderer/common/data-table'
import { Category } from '@renderer/features/categories/types'
import { Button } from '@renderer/features/ui/button'
import { Input } from '@renderer/features/ui/input'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductFiltersContext } from '../contexts/product-filters-context'
import { Product, StatusGroup } from '@renderer/../../common/types'
import { CategoriesFilter } from './categories-filter'
import { columns } from './columns'
import { InStockFilter } from './in-stock-filter'
import { PriceFilter } from './price-filter'
import { StatusFilter } from './status-filter'
import { DateRangeSelect } from '@renderer/common/components'

interface ProductsTableProps {
  products: Product[]
  count: number
  categories: Category[]
  statusGroups: StatusGroup[]
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  count,
  products,
  categories,
  statusGroups
}) => {
  const { q, setQ, reset: resetFilters } = useFiltersContext()
  const table = useTable(columns, products, count)
  const { slug } = useParams()
  const {
    price,
    inStock,
    selectedCategory,
    status,
    from,
    to,
    setFrom,
    setTo,
    reset: resetProductFilters
  } = useProductFiltersContext()

  const reset = () => {
    table.resetPageIndex()
    resetFilters()
    resetProductFilters()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-x-2 gap-y-4 lg:flex-1 lg:flex-row">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="h-8 w-[250px]"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <CategoriesFilter categories={categories} />
            <DateRangeSelect from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
            <StatusFilter statusGroups={statusGroups} />
            <PriceFilter />
            <InStockFilter />
            {(slug ||
              price.filter(Boolean).length > 0 ||
              inStock.filter(Boolean).length > 0 ||
              from ||
              to ||
              q ||
              selectedCategory ||
              status) && (
              <Button variant="ghost" onClick={reset} className="h-8 px-2 lg:px-3">
                Reset
                <XMarkIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}
