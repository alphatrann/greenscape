import { ipcMain } from 'electron'
import {
  ExportPayload,
  LocalFilePayload,
  Product,
  ProductFormDto,
  SyncOptions
} from '../../common/types'
import {
  createProduct,
  deleteImages,
  fetchProduct,
  fetchProducts,
  updateProduct,
  uploadProductImages
} from '../api/products'
import { getImagesFormData } from '../utils/get-images-form-data'
import {
  createOfflineProduct,
  updateOfflineProduct,
  attachImages,
  getProductDetail,
  getProducts,
  upsertProducts,
  deleteOfflineProducts
} from '../local-store/products'
import { ProductQuery } from '../types'
import { productImagesDir } from './images'
import { exportProducts } from '../utils/export-data'

ipcMain.handle('export-products', (_event, payload: ExportPayload) => exportProducts(payload))

ipcMain.handle('get-products', (_event, query: ProductQuery) => getProducts(query))

ipcMain.handle('get-product-detail', (_event, slug: string) => getProductDetail(slug))
ipcMain.handle('create-offline-product', (_event, product: Product) =>
  createOfflineProduct(product)
)
ipcMain.handle('update-offline-product', (_event, product: Product) =>
  updateOfflineProduct(product)
)

ipcMain.handle(
  'upload-local-product-images',
  (_event, productId: number, files: LocalFilePayload[], syncOptions: SyncOptions) =>
    attachImages(productId, productImagesDir, files, syncOptions)
)

ipcMain.handle('create-product', async (_event, dto: ProductFormDto) => createProduct(dto))

ipcMain.handle(
  'upsert-offline-products',
  (_event, products: Product[], options?: { overrideImages: boolean }) =>
    upsertProducts(products, options)
)

ipcMain.handle('delete-images', (_event, productId: number, imageIds: string[]) =>
  deleteImages(productId, imageIds)
)

ipcMain.handle('fetch-product', (_event, slug: string) => fetchProduct(slug))

ipcMain.handle('fetch-products', (_event, query?: string, selectedCategory?: string) =>
  fetchProducts(query, selectedCategory)
)

ipcMain.handle('update-product', (_event, productId: number, dto: Partial<ProductFormDto>) =>
  updateProduct(productId, dto)
)

ipcMain.handle('upload-product-images', async (_event, productId: number, paths: string[]) => {
  const fd = await getImagesFormData(paths)
  return uploadProductImages(productId, fd)
})

ipcMain.handle('delete-offline-products', async (_event, ids: number[]) =>
  deleteOfflineProducts(ids)
)
