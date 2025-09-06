import { ColumnDef, VisibilityState, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useFiltersContext } from '../contexts/filters-context'

export const useTable = <TData>(columns: ColumnDef<TData>[], data: TData[], count: number) => {
  const { pagination, setPagination } = useFiltersContext()
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const pageCount = useMemo(
    () => Math.ceil(count / pagination.pageSize),
    [count, pagination.pageSize]
  )

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { columnVisibility, rowSelection, pagination },
    onPaginationChange: setPagination,
    enableRowSelection: true,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel()
  })

  return table
}
