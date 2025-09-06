import { PaginationState } from '@tanstack/react-table'
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

type FiltersContextType = {
  total: number
  q: string
  sortBy: string
  order: 'asc' | 'desc'
  pagination: PaginationState
  setQ: Dispatch<SetStateAction<string>>
  setSortBy: Dispatch<SetStateAction<string>>
  setOrder: Dispatch<SetStateAction<'asc' | 'desc'>>
  setPagination: Dispatch<SetStateAction<PaginationState>>
  setTotal: Dispatch<SetStateAction<number>>
}

const FiltersContext = createContext<FiltersContextType | null>(null)

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [q, setQ] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [sortBy, setSortBy] = useState<string>('id')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [total, setTotal] = useState(0)

  return (
    <FiltersContext.Provider
      value={{
        q,
        setQ,
        pagination,
        setPagination,
        total,
        setTotal,
        sortBy,
        order,
        setSortBy,
        setOrder
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export const useFiltersContext = () => {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error('useFiltersContext must be used within a FiltersProvider')
  return ctx
}
