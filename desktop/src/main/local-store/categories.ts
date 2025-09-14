import db from '../db'
import { Category } from '../types'

export async function upsertCategories(newCategories: Category[]) {
  await db.read()
  for (const c of newCategories) {
    const idx = db.data!.categories.findIndex((cat) => cat.id === c.id)
    if (idx >= 0) db.data!.categories[idx] = c
    else db.data!.categories.push(c)
  }
  await db.write()
}

export type CategoryQuery = {
  q?: string
  slug?: string
  sortBy?: 'products' | 'subCategories' | 'id'
  order?: 'asc' | 'desc'
  offset?: number
  limit?: number
}

export async function getCategories(query: CategoryQuery): Promise<{
  data: { parent: Category | null; categories: Category[] }
  count: number
}> {
  await db.read()
  let categories = [...db.data!.categories]

  // --- Filtering ---
  if (query.q) {
    const qLower = query.q.toLowerCase()
    categories = categories.filter((c) => c.name.toLowerCase().includes(qLower))
  }

  // If a slug is provided, fetch children of that category
  let parent: Category | null = null
  if (query.slug) {
    parent = categories.find((c) => c.slug === query.slug) ?? null
    if (parent) {
      categories = categories.filter((c) => c.parentCategoryId === parent!.id)
    } else {
      categories = []
    }
  } else {
    // Otherwise return top-level categories
    parent = null
    categories = categories.filter((c) => c.parentCategoryId == null)
  }

  // --- Sorting ---
  if (query.sortBy) {
    categories.sort((a, b) => {
      let v1: any
      let v2: any
      if (query.sortBy === 'products') {
        v1 = a._count.products
        v2 = b._count.products
      } else if (query.sortBy === 'subCategories') {
        v1 = a._count.subCategories
        v2 = b._count.subCategories
      } else {
        v1 = a.id
        v2 = b.id
      }
      if (v1 < v2) return query.order === 'desc' ? 1 : -1
      if (v1 > v2) return query.order === 'desc' ? -1 : 1
      return 0
    })
  }

  const count = categories.length

  // --- Pagination ---
  if (query.offset != null && query.limit != null) {
    categories = categories.slice(query.offset, query.offset + query.limit)
  }

  return {
    data: {
      parent,
      categories
    },
    count
  }
}

export async function deleteCategory(id: number) {
  if (!db.data) await db.read()
  const idx = db.data!.categories.findIndex((cat) => cat.id === id)
  if (idx >= 0) db.data!.categories.splice(idx, 1)
  await db.write()
}
