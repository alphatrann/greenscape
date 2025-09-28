import path from 'path'
import db from '../db'
import { v4 } from 'uuid'
import { File, Product, ProductImage, ProductQuery, Status, StatusGroup } from '../types'
import { saveImagesOffline } from './files'

export async function upsertProducts(newProducts: Product[], options?: { uploadImages: boolean }) {
  await db.read()
  for (const p of newProducts) {
    const idx = db.data!.products.findIndex((prod) => prod.id === p.id)
    if (idx >= 0) {
      const old = db.data!.products[idx]
      db.data!.products[idx] = {
        ...old,
        ...p,
        images: options?.uploadImages ? p.images : old.images
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
    count: products.filter((p) => p.status === status).length
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

export async function attachImages(productId: number, imagesDir: string, files: File[]) {
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
        filename: `${id}${ext === 'jpeg' ? 'jpg' : ext}`
      }
    })

    const paths = saveImagesOffline({
      files: uploadedFiles,
      imagesDir
    })

    const newImages: ProductImage[] = paths.map((p, i) => ({
      file: {
        id: uploadedFiles[i].id,
        url: p
      }
    }))

    db.data.products[idx].images = product.images.concat(newImages)
  }

  await db.write()
}
