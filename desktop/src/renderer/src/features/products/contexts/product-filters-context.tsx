import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { Status } from '../types'

type ProductFiltersContextType = {
  price: [number | null, number | null] // [min, max]
  status?: Status
  inStock: [number | null, number | null]
  from?: Date
  to?: Date
  selectedCategory?: string
  setPrice: Dispatch<SetStateAction<[number | null, number | null]>>
  setStatus: Dispatch<SetStateAction<Status | undefined>>
  setInStock: Dispatch<SetStateAction<[number | null, number | null]>>
  setFrom: Dispatch<SetStateAction<Date | undefined>>
  setTo: Dispatch<SetStateAction<Date | undefined>>
  setSelectedCategory: Dispatch<SetStateAction<string | undefined>>
  reset: () => void
}

const ProductFiltersContext = createContext<ProductFiltersContextType | null>(null)

export const ProductFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<[number | null, number | null]>([null, null])
  const [status, setStatus] = useState<Status | undefined>(undefined)
  const [inStock, setInStock] = useState<[number | null, number | null]>([null, null])
  const [from, setFrom] = useState<Date | undefined>(undefined)
  const [to, setTo] = useState<Date | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

  const reset = () => {
    setPrice([null, null])
    setStatus(undefined)
    setInStock([null, null])
    setFrom(undefined)
    setTo(undefined)
    setSelectedCategory(undefined)
  }

  return (
    <ProductFiltersContext.Provider
      value={{
        price,
        setPrice,
        status,
        setStatus,
        inStock,
        setInStock,
        from,
        setFrom,
        to,
        setTo,
        selectedCategory,
        setSelectedCategory,
        reset
      }}
    >
      {children}
    </ProductFiltersContext.Provider>
  )
}

export const useProductFiltersContext = () => {
  const ctx = useContext(ProductFiltersContext)
  if (!ctx) throw new Error('useProductFiltersContext must be used within a ProductFiltersProvider')
  return ctx
}
