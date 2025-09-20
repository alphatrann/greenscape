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

export interface ShippingGroup {
  shippingCost: number
  count: number
  total: number
}

export interface CountryGroup {
  country: string
  count: number
  total: number
}

export interface DeliveryStatusGroups {
  delivered: {
    count: number
    total: number
  }
  pending: {
    count: number
    total: number
  }
}

export interface OrdersResponse {
  data: Order[]
  count: number
  sales: number
  deliveryStatusGroups: DeliveryStatusGroups
  shippingGroups: ShippingGroup[]
  countryGroups: CountryGroup[]
}

export enum DeliveryStatus {
  Pending = 'pending',
  Delivered = 'delivered'
}
