import db from '../db'
import { Product, Status, StatusGroup } from '../types'

export async function upsertProducts(newProducts: Product[]) {
  await db.read()
  for (const p of newProducts) {
    const idx = db.data!.products.findIndex((prod) => prod.id === p.id)
    if (idx >= 0) db.data!.products[idx] = p
    else db.data!.products.push(p)
  }

  await db.write()
}

export type ProductQuery = {
  q?: string
  price?: [number?, number?]
  inStock?: [number?, number?]
  status?: string
  selectedCategory?: string
  from?: Date
  to?: Date
  sortBy?: 'price' | 'inStock' | 'orders' | 'createdAt' | 'id'
  order?: 'asc' | 'desc'
  offset?: number
  limit?: number
}

export async function getProductDetali(id: number) {
  await db.read()
  return db.data.products.find((p) => p.id === id)
}

export async function getProducts(
  query: ProductQuery
): Promise<{ data: Product[]; count: number; statusGroups: StatusGroup[] }> {
  await db.read()
  let products = [...db.data!.products]

  // --- Filtering ---
  if (query.q) {
    products = products.filter((p) => p.name.toLowerCase().includes(query.q!.toLowerCase()))
  }

  if (query.price) {
    const [min, max] = query.price

    if (min != null) products = products.filter((p) => p.price >= min)
    if (max != null) products = products.filter((p) => p.price <= max)
  }
  if (query.inStock) {
    const [min, max] = query.inStock
    if (min != null) products = products.filter((p) => p.inStock >= min)
    if (max != null) products = products.filter((p) => p.inStock <= max)
  }
  if (query.from) {
    products = products.filter((p) => new Date(p.createdAt) >= query.from!)
  }
  if (query.to) {
    products = products.filter((p) => new Date(p.createdAt) <= query.to!)
  }
  if (query.selectedCategory) {
    products = products.filter((p) => p.categories.some((c) => c.slug === query.selectedCategory))
  }

  const statusGroups: StatusGroup[] = Object.values(Status).map((status) => ({
    status,
    _count: { id: products.filter((p) => p.status === status).length }
  }))

  if (query.status) {
    products = products.filter((p) => p.status === query.status)
  }

  // --- Sorting ---
  if (query.sortBy) {
    products.sort((a, b) => {
      let v1: any = a[query.sortBy!]
      let v2: any = b[query.sortBy!]
      if (query.sortBy === 'orders') {
        v1 = a._count.orders
        v2 = b._count.orders
      }
      if (v1 < v2) return query.order === 'desc' ? 1 : -1
      if (v1 > v2) return query.order === 'desc' ? -1 : 1
      return 0
    })
  }

  const count = products.length

  // --- Pagination ---
  if (query.offset != null && query.limit != null) {
    products = products.slice(query.offset, query.offset + query.limit)
  }
  return { data: products, count, statusGroups }
}
