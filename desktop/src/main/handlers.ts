import { ipcMain } from 'electron'
import { FormData } from 'formdata-node'
import { fileFromPath } from 'formdata-node/file-from-path'
import mime from 'mime-types'
import path from 'path'
import { LocalFilePayload, Order, Product, ProductFormDto } from '../common/types'
import { createCategory, fetchCategoriesTree, updateCategory } from './api/categories'
import { deleteRecords } from './api/delete-records'
import { getKeyStats, getMonthlySalesInYear, getSalesByCountries } from './api/metrics'
import { fetchOrder, fetchOrders, updateDeliveryStatus } from './api/orders'
import {
  createProduct,
  deleteImages,
  updateProduct,
  fetchProduct,
  fetchProducts,
  uploadProductImages
} from './api/products'
import { getCurrentUser } from './api/users'
import { getOrderDetail, getOrders, upsertOrders } from './local-store/orders'
import { attachImages, getProductDetail, getProducts, upsertProducts } from './local-store/products'
import { deleteToken, saveToken } from './local-store/token'
import { OrderQuery, ProductQuery } from './types'
import { exportData } from './utils/export-data'
import { exportInvoice } from './utils/export-invoice'

export function initHandlers(imagesDir: string) {
  const productImagesDir = path.join(imagesDir, 'products')

  ipcMain.on('export-invoice', (_event, order) => exportInvoice(order))
  ipcMain.on('export-data', (_event, payload) => exportData(payload))

  ipcMain.handle(
    'upsert-products',
    (_event, products: Product[], options?: { overrideImages: boolean }) =>
      upsertProducts(products, options)
  )
  ipcMain.handle('upsert-orders', (_event, orders: Order[]) => upsertOrders(orders))

  ipcMain.handle('get-products', (_event, query: ProductQuery) => getProducts(query))
  ipcMain.handle('get-product-detail', (_event, slug: string) => getProductDetail(slug))

  ipcMain.handle('get-orders', (_event, query: OrderQuery) => getOrders(query))
  ipcMain.handle('get-order-detail', (_event, id: string) => getOrderDetail(id))

  ipcMain.handle(
    'upload-local-product-images',
    (_event, productId: number, files: LocalFilePayload[]) =>
      attachImages(productId, productImagesDir, files)
  )

  ipcMain.handle('fetch-order', async (_event, id: string) => {
    return await fetchOrder(id)
  })

  ipcMain.handle('fetch-orders', async (_event, query?: string) => {
    return await fetchOrders(query)
  })

  ipcMain.handle('create-product', async (_event, dto: ProductFormDto) => {
    return await createProduct(dto)
  })

  ipcMain.handle('delete-images', async (_event, productId: number, imageIds: string[]) => {
    return await deleteImages(productId, imageIds)
  })

  ipcMain.handle('fetch-product', async (_event, slug: string) => {
    return await fetchProduct(slug)
  })

  ipcMain.handle('fetch-products', async (_event, query?: string, selectedCategory?: string) => {
    return await fetchProducts(query, selectedCategory)
  })

  ipcMain.handle(
    'update-product',
    async (_event, productId: number, dto: Partial<ProductFormDto>) => {
      return await updateProduct(productId, dto)
    }
  )

  ipcMain.handle('upload-product-images', async (_event, productId: number, paths: string[]) => {
    const fd = new FormData()

    for (const filePath of paths) {
      const filename = path.basename(filePath)
      const type = mime.lookup(filename) || 'application/octet-stream'

      fd.append('images', await fileFromPath(filePath, filename, { type }))
    }

    return await uploadProductImages(productId, fd)
  })

  ipcMain.handle('create-category', async (_event, dto: any) => {
    return await createCategory(dto)
  })

  ipcMain.handle('update-category', async (_event, id: number, dto: any) => {
    return await updateCategory(id, dto)
  })

  ipcMain.handle('get-categories-tree', async (_event, query?: string) => {
    return await fetchCategoriesTree(query)
  })

  ipcMain.handle(
    'delete-records',
    async (_event, ids: (number | string)[], entityName: 'categories' | 'products') => {
      return await deleteRecords(ids, entityName)
    }
  )

  ipcMain.handle('get-monthly-sales-in-year', async (_event, year: number) => {
    return await getMonthlySalesInYear(year)
  })

  ipcMain.handle('get-key-stats', async (_event, start: Date, end: Date) => {
    return await getKeyStats(start, end)
  })

  ipcMain.handle('get-sales-by-countries', async (_event, start: Date, end: Date) => {
    return await getSalesByCountries(start, end)
  })

  ipcMain.handle('save-token', async (_event, token: string) => {
    return await saveToken(token)
  })

  ipcMain.handle('delete-token', async (_event) => {
    return await deleteToken()
  })

  ipcMain.handle('get-current-user', async () => {
    return await getCurrentUser()
  })

  ipcMain.handle('update-delivery-status', async (_event, orderId: string) => {
    return await updateDeliveryStatus(orderId)
  })
}
