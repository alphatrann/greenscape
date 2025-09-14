import db from '../db'
import { Order } from '../types'

export async function upsertOrders(newOrders: Order[]) {
  await db.read()
  for (const o of newOrders) {
    const idx = db.data!.orders.findIndex((ord) => ord.id === o.id)
    if (idx >= 0) db.data!.orders[idx] = o
    else db.data!.orders.push(o)
  }
  await db.write()
}

export async function getOrderDetail(id: string) {
  await db.read()
  return db.data.orders.find((o) => o.id === id)
}

export type OrderQuery = {
  q?: string
  totalRange?: [number?, number?]
  shippingCost?: number
  status?: string
  countries?: string[]
  from?: Date
  to?: Date
  sortBy?: 'total' | 'shippingCost' | 'createdAt' | 'deliveredAt' | 'id'
  order?: 'asc' | 'desc'
  offset?: number
  limit?: number
}

export async function getOrders(query: OrderQuery): Promise<{ data: Order[]; count: number }> {
  await db.read()
  let orders = [...db.data!.orders]

  // --- Filtering ---
  if (query.q) {
    const qLower = query.q.toLowerCase()
    orders = orders.filter(
      (o) =>
        o.customer.toLowerCase().includes(qLower) ||
        o.email.toLowerCase().includes(qLower) ||
        o.id.toLowerCase().includes(qLower)
    )
  }
  if (query.status) {
    orders = orders.filter((o) => (o.deliveredAt ? 'Delivered' : 'Pending') === query.status)
  }
  if (query.totalRange) {
    const [min, max] = query.totalRange
    if (min != null) orders = orders.filter((o) => o.total >= min)
    if (max != null) orders = orders.filter((o) => o.total <= max)
  }
  if (query.shippingCost) {
    orders = orders.filter((o) => o.shippingCost === query.shippingCost)
  }
  if (query.countries && query.countries.length > 0) {
    orders = orders.filter((o) => o.country && query.countries!.includes(o.country))
  }
  if (query.from) {
    orders = orders.filter((o) => new Date(o.createdAt) >= query.from!)
  }
  if (query.to) {
    orders = orders.filter((o) => new Date(o.createdAt) <= query.to!)
  }

  // --- Sorting ---
  if (query.sortBy) {
    orders.sort((a, b) => {
      let v1: any = a[query.sortBy!]
      let v2: any = b[query.sortBy!]
      if (query.sortBy === 'createdAt' || query.sortBy === 'deliveredAt') {
        v1 = v1 ? new Date(v1).getTime() : 0
        v2 = v2 ? new Date(v2).getTime() : 0
      }
      if (v1 < v2) return query.order === 'desc' ? 1 : -1
      if (v1 > v2) return query.order === 'desc' ? -1 : 1
      return 0
    })
  }

  const count = orders.length

  // --- Pagination ---
  if (query.offset != null && query.limit != null) {
    orders = orders.slice(query.offset, query.offset + query.limit)
  }

  return { data: orders, count }
}
