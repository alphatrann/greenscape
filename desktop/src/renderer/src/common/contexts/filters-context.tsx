import { PaginationState } from '@tanstack/react-table'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'
import { useLocation } from 'react-router-dom'

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
  reset: () => void
}

const FiltersContext = createContext<FiltersContextType | null>(null)

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [q, setQ] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const location = useLocation()
  const [sortBy, setSortBy] = useState<string>('id')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [total, setTotal] = useState(0)
  const reset = () => {
    setQ('')
    setSortBy('id')
    setOrder('asc')
  }

  useEffect(() => {
    reset()
  }, [location.pathname])

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
        setOrder,
        reset
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
