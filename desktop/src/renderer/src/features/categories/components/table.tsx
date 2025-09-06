import {
  useTable,
  DataTable,
  DataTablePagination,
  DataTableViewOptions
} from '@renderer/common/data-table'
import { Input } from '@renderer/features/ui/input'
import React from 'react'
import { Category } from '../types'
import { columns } from './columns'
import { useFiltersContext } from '@renderer/common/contexts/filters-context'

interface CategoriesTableProps {
  categories: Category[]
  count: number
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories, count }) => {
  const { q, setQ } = useFiltersContext()
  const table = useTable(columns, categories, count)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search categories..."
            className="h-8 w-[250px]"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}
