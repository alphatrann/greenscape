import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { DeliveryStatus } from '../types'

type OrderFiltersContextType = {
  total: [number | null, number | null]
  status?: DeliveryStatus
  selectedCountries: string[]
  from?: Date
  to?: Date
  shippingCost?: number

  setTotal: Dispatch<SetStateAction<[number | null, number | null]>>
  setStatus: Dispatch<SetStateAction<DeliveryStatus | undefined>>
  setFrom: Dispatch<SetStateAction<Date | undefined>>
  setTo: Dispatch<SetStateAction<Date | undefined>>
  setShippingCost: Dispatch<SetStateAction<number | undefined>>
  setSelectedCountries: Dispatch<SetStateAction<string[]>>
}

const OrderFiltersContext = createContext<OrderFiltersContextType | null>(null)

export const OrderFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [total, setTotal] = useState<[number | null, number | null]>([null, null])
  const [status, setStatus] = useState<DeliveryStatus | undefined>(undefined)
  const [from, setFrom] = useState<Date | undefined>(undefined)
  const [to, setTo] = useState<Date | undefined>(undefined)
  const [shippingCost, setShippingCost] = useState<number | undefined>()
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])

  return (
    <OrderFiltersContext.Provider
      value={{
        total,
        setTotal,
        status,
        setStatus,
        from,
        setFrom,
        to,
        setTo,
        selectedCountries,
        setSelectedCountries,
        shippingCost,
        setShippingCost
      }}
    >
      {children}
    </OrderFiltersContext.Provider>
  )
}

export const useOrderFiltersContext = () => {
  const ctx = useContext(OrderFiltersContext)
  if (!ctx) throw new Error('useOrderFiltersContext must be used within a OrderFiltersProvider')
  return ctx
}
