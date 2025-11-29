import db from '../db'
import {
  CountryGroup,
  DeliveryStatus,
  DeliveryStatusGroups,
  Order,
  OrdersResponse,
  ShippingGroup
} from '../../common/types'
import { OrderQuery, SyncActionType } from '../types'

export async function upsertOrders(newOrders: Order[]) {
  await db.read()
  for (const o of newOrders) {
    const idx = db.data!.orders.findIndex((ord) => ord.id === o.id)
    if (idx >= 0) db.data!.orders[idx] = { ...db.data.orders[idx], ...o }
    else db.data!.orders.push({ ...o, products: o?.products ?? [] })
  }
  await db.write()
}

export async function updateDeliveryStatusOffline(orderId: string) {
  await db.read()
  db.data.ops.push({
    actionType: SyncActionType.UpdateDeliveryStatus,
    payload: { orderId },
    timestamp: new Date().toISOString()
  })
  await db.write()
}

export async function getOrderDetail(id: string) {
  await db.read()
  return db.data.orders.find((o) => o.id === id)
}

export async function getOrders(query: OrderQuery): Promise<OrdersResponse> {
  await db.read()
  let baseOrders = [...db.data!.orders]

  // --- Base filters (apply to ALL groups + final list) ---
  if (query.totalRange) {
    const [min, max] = query.totalRange
    if (min != null) baseOrders = baseOrders.filter((o) => o.total >= min * 100)
    if (max != null) baseOrders = baseOrders.filter((o) => o.total <= max * 100)
  }
  if (query.from) {
    baseOrders = baseOrders.filter((o) => new Date(o.createdAt) >= query.from!)
  }
  if (query.to) {
    baseOrders = baseOrders.filter((o) => new Date(o.createdAt) <= query.to!)
  }

  // --- Parallel datasets for groups ---
  const ordersForCountryGroups =
    query.status || query.shippingCost !== undefined
      ? baseOrders.filter((o) => {
          if (query.status) {
            const status = o.deliveredAt ? DeliveryStatus.Delivered : DeliveryStatus.Pending
            if (status !== query.status) return false
          }
          if (query.shippingCost !== undefined && o.shippingCost !== query.shippingCost) {
            return false
          }
          return true
        })
      : baseOrders

  const ordersForStatusGroups =
    (query.countries && query.countries.length > 0) || query.shippingCost !== undefined
      ? baseOrders.filter((o) => {
          if (
            query.countries &&
            query.countries.length > 0 &&
            (!o.country || !query.countries.includes(o.country))
          ) {
            return false
          }
          if (query.shippingCost !== undefined && o.shippingCost !== query.shippingCost) {
            return false
          }
          return true
        })
      : baseOrders

  const ordersForShippingGroups =
    (query.countries && query.countries.length > 0) || query.status
      ? baseOrders.filter((o) => {
          if (
            query.countries &&
            query.countries.length > 0 &&
            (!o.country || !query.countries.includes(o.country))
          ) {
            return false
          }
          if (query.status) {
            const status = o.deliveredAt ? DeliveryStatus.Delivered : DeliveryStatus.Pending
            if (status !== query.status) return false
          }
          return true
        })
      : baseOrders

  // --- Build groups ---
  // Country groups
  const countryMap = new Map<string, CountryGroup>()
  for (const o of ordersForCountryGroups) {
    if (!o.country) continue
    if (!countryMap.has(o.country)) {
      countryMap.set(o.country, { country: o.country, count: 0, total: 0 })
    }
    const g = countryMap.get(o.country)!
    g.count += 1
    g.total += o.total
  }
  const countryGroups = [...countryMap.values()]

  // Delivery status groups
  const deliveryStatusGroups: DeliveryStatusGroups = {
    delivered: {
      count: ordersForStatusGroups.filter((o) => !!o.deliveredAt).length,
      total: ordersForStatusGroups
        .filter((o) => !!o.deliveredAt)
        .reduce((sum, o) => sum + o.total, 0)
    },
    pending: {
      count: ordersForStatusGroups.filter((o) => !o.deliveredAt).length,
      total: ordersForStatusGroups
        .filter((o) => !o.deliveredAt)
        .reduce((sum, o) => sum + o.total, 0)
    }
  }

  // Shipping groups
  const shippingMap = new Map<number, ShippingGroup>()
  for (const o of ordersForShippingGroups) {
    if (!shippingMap.has(o.shippingCost)) {
      shippingMap.set(o.shippingCost, { shippingCost: o.shippingCost, count: 0, total: 0 })
    }
    const g = shippingMap.get(o.shippingCost)!
    g.count += 1
    g.total += o.total
  }
  const shippingGroups = [...shippingMap.values()]

  // --- Final orders list (apply ALL filters) ---
  let finalOrders = [...baseOrders]
  if (query.countries && query.countries.length > 0) {
    finalOrders = finalOrders.filter((o) => o.country && query.countries!.includes(o.country))
  }
  if (query.status) {
    finalOrders = finalOrders.filter(
      (o) => (o.deliveredAt ? DeliveryStatus.Delivered : DeliveryStatus.Pending) === query.status
    )
  }
  if (query.shippingCost !== undefined) {
    finalOrders = finalOrders.filter((o) => o.shippingCost === query.shippingCost)
  }

  // Sorting
  if (query.sortBy) {
    finalOrders.sort((a, b) => {
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

  const count = finalOrders.length
  const sales = finalOrders.reduce((sum, o) => sum + o.total, 0)

  if (query.offset != null && query.limit != null) {
    finalOrders = finalOrders.slice(query.offset, query.offset + query.limit)
  }

  return { data: finalOrders, count, countryGroups, deliveryStatusGroups, sales, shippingGroups }
}
