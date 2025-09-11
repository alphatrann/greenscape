export interface Order {
  id: string
  customer: string
  email: string
  line1: string
  line2?: string
  state?: string
  city?: string
  postalCode?: string
  country?: string
  phone: string
  products: OrdersOnProducts[]
  shippingCost: number
  total: number
  createdAt: Date
  deliveredAt?: Date
  tax: number
}

interface OrdersOnProducts {
  productId: number
  orderId: string
  qty: number
  product: {
    name: string
    price: number
    category: { name: string }
  }
}

export interface StatusGroup {
  _count: { id: number }
  deliveredAt: null | Date
}

export interface CountryGroup {
  _count: { id: number }
  country: string
}
export interface ShippingOptionGroup {
  _count: { id: number }
  shippingCost: number
}

export interface OrdersAggregate {
  statusGroups: StatusGroup[]
  countryGroups: CountryGroup[]
  shippingOptionGroups: ShippingOptionGroup[]
}

export interface OrdersResponse {
  data: Order[]
  count: number
}

export enum DeliveryStatus {
  Pending = 'pending',
  Delivered = 'delivered'
}
