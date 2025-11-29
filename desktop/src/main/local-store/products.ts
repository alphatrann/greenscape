import path from 'path'
import { v4 } from 'uuid'
import {
  CategoryGroup,
  GetProductsResponse,
  LocalFilePayload,
  Product,
  ProductImage,
  Status,
  StatusGroup,
  SyncOptions
} from '../../common/types'
import db from '../db'
import { ProductQuery, SyncActionType } from '../types'
import { saveImagesOffline } from './files'

export async function upsertProducts(
  newProducts: Product[],
  options?: { overrideImages: boolean }
) {
  await db.read()
  for (const p of newProducts) {
    const idx = db.data!.products.findIndex((prod) => prod.id === p.id)
    if (idx >= 0) {
      const old = db.data!.products[idx]
      db.data!.products[idx] = {
        ...old,
        ...p,
        images: options?.overrideImages ? p.images : old.images
      }
    } else {
      p.images = p?.images ?? []
      db.data!.products.push(p)
    }
  }
  await db.write()
}

export async function getProductDetail(slug: string) {
  await db.read()
  const product = db.data.products.find((p) => p.slug === slug)

  if (product?.images) {
    product.images = product.images.map((i) => ({
      file: { id: i.file.id, url: i.file.url ? `file://${i.file.url}` : undefined }
    }))
  }

  return product
}

export async function getProducts(query: ProductQuery): Promise<GetProductsResponse> {
  await db.read()
  // Base filters (q, price, stock, date) apply to both
  let products = [...db.data!.products]

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

  // Two "views":
  const productsForCategoryGroups = query.status
    ? products.filter((p) => p.status === query.status)
    : products

  const productsForStatusGroups = query.selectedCategory
    ? products.filter((p) => p.categories.some((c) => c.id === query.selectedCategory))
    : products

  // Category groups (ignore status filter)
  const categoryMap = new Map<number, number>()
  for (const p of productsForCategoryGroups) {
    for (const c of p.categories) {
      categoryMap.set(c.id, (categoryMap.get(c.id) ?? 0) + 1)
    }
  }
  const categoryGroups: CategoryGroup[] = Array.from(categoryMap.entries()).map(([id, count]) => ({
    id,
    count
  }))

  // Status groups (ignore category filter)
  const statusGroups: StatusGroup[] = Object.values(Status).map((status) => ({
    status,
    count: productsForStatusGroups.filter((p) => p.status === status).length
  }))

  // Final product list applies both filters
  let finalProducts = [...products]
  if (query.selectedCategory) {
    finalProducts = finalProducts.filter((p) =>
      p.categories.some((c) => c.id === query.selectedCategory)
    )
  }
  if (query.status) {
    finalProducts = finalProducts.filter((p) => p.status === query.status)
  }

  // --- Sorting ---
  if (query.sortBy) {
    finalProducts.sort((a, b) => {
      let v1: any = a[query.sortBy!]
      let v2: any = b[query.sortBy!]
      if (query.sortBy === 'orders') {
        v1 = a.ordersMade
        v2 = b.ordersMade
      }
      if (v1 < v2) return query.order === 'desc' ? 1 : -1
      if (v1 > v2) return query.order === 'desc' ? -1 : 1
      return 0
    })
  }

  const count = finalProducts.length

  // --- Pagination ---
  if (query.offset != null && query.limit != null) {
    finalProducts = finalProducts.slice(query.offset, query.offset + query.limit)
  }
  return { success: true, data: finalProducts, count, statusGroups, categoryGroups }
}

export async function attachImages(
  productId: number,
  imagesDir: string,
  files: LocalFilePayload[],
  options: SyncOptions = { synced: true }
) {
  await db.read()
  const idx = db.data!.products.findIndex((prod) => prod.id === productId)

  if (idx >= 0) {
    const product = { ...db.data!.products[idx] }
    product.images = product?.images ?? []

    const uploadedFiles = files.map((file) => {
      const ext = path.extname(file.filename)
      const id = file?.id ?? v4()
      return {
        id,
        buffer: file.buffer,
        filename: `${id}${ext === '.jpeg' ? '.jpg' : ext}`
      }
    })

    const paths = await saveImagesOffline({
      files: uploadedFiles,
      imagesDir
    })

    const newImages: ProductImage[] = paths.map((p, i) => ({
      file: {
        id: uploadedFiles[i].id,
        url: p
      }
    }))

    if (!options.synced)
      db.data.ops.push({
        actionType: SyncActionType.UploadProductImages,
        payload: { productId, paths },
        timestamp: new Date().toISOString()
      })

    db.data.products[idx].images = product.images.concat(newImages)
    await db.write()
    return paths
  }

  return []
}

export async function detachImages(productId: number, imageIds: string[]) {
  await db.read()
  const idx = db.data!.products.findIndex((p) => p.id === productId)
  if (idx < 0) return []

  const product = { ...db.data!.products[idx] }
  product.images = product.images ?? []

  const imagesToRemove = product.images.filter((i) => imageIds.includes(i.file.id))
  const remainingImages = product.images.filter((i) => !imageIds.includes(i.file.id))

  // collect local file paths to try to remove from disk
  const paths: string[] = imagesToRemove
    .map((i) => i.file.url)
    .filter((u): u is string => typeof u === 'string' && u.length > 0)
    .map((u) => (u.startsWith('file://') ? u.replace(/^file:\/\//, '') : u))

  if (paths.length > 0) {
    try {
      const fs = await import('fs/promises')
      await Promise.all(
        paths.map(async (p) => {
          try {
            await fs.unlink(p)
          } catch {
            // ignore individual file deletion errors
          }
        })
      )
    } catch {
      // ignore if fs import or deletions fail
    }
  }

  db.data!.products[idx] = { ...product, images: remainingImages }

  db.data!.ops.push({
    actionType: SyncActionType.DeleteProductImages,
    payload: { productId, imageIds },
    timestamp: new Date().toISOString()
  })
  await db.write()
  return paths
}

export async function syncProductImageIds(productId: number, imageIds: string[]) {
  await db.read()
  const productIndex = db.data.products.findIndex((p) => p.id === productId)
  if (productIndex > -1) {
    const images = db.data.products[productIndex].images
    images.forEach((i) => {
      if (imageIds.includes(i.file.id)) {
        i.file.id = imageIds.find((id) => id === i.file.id) ?? i.file.id
      }
    })
  }
  await db.write()
}

export async function createOfflineProduct(product: Product) {
  await db.read()
  db.data.ops.push({
    actionType: SyncActionType.CreateProduct,
    payload: product,
    timestamp: new Date().toISOString()
  })
  await db.write()
}

export async function updateOfflineProduct(product: Product) {
  await db.read()
  db.data.ops.push({
    actionType: SyncActionType.UpdateProduct,
    payload: product,
    timestamp: new Date().toISOString()
  })
  await db.write()
}
