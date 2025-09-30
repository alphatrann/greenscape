import db from '../db'
import {
  CountryGroup,
  DeliveryStatus,
  DeliveryStatusGroups,
  Order,
  OrdersResponse,
  ShippingGroup
} from '../../common/types'
import { OrderQuery } from '../types'

export async function upsertOrders(newOrders: Order[]) {
  await db.read()
  for (const o of newOrders) {
    const idx = db.data!.orders.findIndex((ord) => ord.id === o.id)
    if (idx >= 0) db.data!.orders[idx] = { ...db.data.orders[idx], ...o }
    else db.data!.orders.push({ ...o, products: o?.products ?? [] })
  }
  await db.write()
}

export async function getOrderDetail(id: string) {
  await db.read()
  return db.data.orders.find((o) => o.id === id)
}

export async function getOrders(query: OrderQuery): Promise<OrdersResponse> {
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
  if (query.totalRange) {
    const [min, max] = query.totalRange
    if (min != null) orders = orders.filter((o) => o.total >= min * 100)
    if (max != null) orders = orders.filter((o) => o.total <= max * 100)
  }
  if (query.from) {
    orders = orders.filter((o) => new Date(o.createdAt) >= query.from!)
  }
  if (query.to) {
    orders = orders.filter((o) => new Date(o.createdAt) <= query.to!)
  }

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

  let ordersWithoutCountriesFilter = [...orders]
  let ordersWithoutStatusFilter = [...orders]
  let ordersWithoutShippingCostFilter = [...orders]
  if (query.countries && query.countries.length > 0) {
    orders = orders.filter((o) => o.country && query.countries!.includes(o.country))
    ordersWithoutStatusFilter = [...orders]
    ordersWithoutShippingCostFilter = [...orders]
  }
  if (query.status) {
    orders = orders.filter(
      (o) => (o.deliveredAt ? DeliveryStatus.Delivered : DeliveryStatus.Pending) === query.status
    )
    ordersWithoutCountriesFilter = [...orders]
    ordersWithoutShippingCostFilter = [...orders]
  }
  if (query.shippingCost !== undefined) {
    orders = orders.filter((o) => o.shippingCost === query.shippingCost)
    ordersWithoutCountriesFilter = [...orders]
    ordersWithoutStatusFilter = [...orders]
  }

  const countryGroups: CountryGroup[] = []
  const countryMap = new Map<string, CountryGroup>()
  for (const o of ordersWithoutCountriesFilter) {
    if (!o.country) continue
    if (!countryMap.has(o.country)) {
      countryMap.set(o.country, { country: o.country, count: 0, total: 0 })
    }
    const group = countryMap.get(o.country)!
    group.count += 1
    group.total += o.total
  }
  countryGroups.push(...countryMap.values())

  const deliveryStatusGroups: DeliveryStatusGroups = {
    delivered: {
      count: ordersWithoutStatusFilter.filter((o) => !!o.deliveredAt).length,
      total: ordersWithoutStatusFilter
        .filter((o) => !!o.deliveredAt)
        .reduce((sum, o) => sum + o.total, 0)
    },
    pending: {
      count: ordersWithoutStatusFilter.filter((o) => !o.deliveredAt).length,
      total: ordersWithoutStatusFilter
        .filter((o) => !o.deliveredAt)
        .reduce((sum, o) => sum + o.total, 0)
    }
  }

  const shippingGroups: ShippingGroup[] = []
  const shippingMap = new Map<number, ShippingGroup>()
  for (const o of ordersWithoutShippingCostFilter) {
    if (!shippingMap.has(o.shippingCost)) {
      shippingMap.set(o.shippingCost, { shippingCost: o.shippingCost, count: 0, total: 0 })
    }
    const group = shippingMap.get(o.shippingCost)!
    group.count += 1
    group.total += o.total
  }
  shippingGroups.push(...shippingMap.values())

  const count = orders.length

  const sales = orders.reduce((sum, o) => sum + o.total, 0)
  if (query.offset != null && query.limit != null) {
    orders = orders.slice(query.offset, query.offset + query.limit)
  }

  return { data: orders, count, countryGroups, deliveryStatusGroups, sales, shippingGroups }
}
