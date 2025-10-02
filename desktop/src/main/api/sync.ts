import { Category, Product } from '../../common/types'
import db from '../db'
import { SyncActionType, SyncOperation } from '../types'
import { getImagesFormData } from '../utils/get-images-form-data'
import { createCategory, updateCategory } from './categories'
import { updateDeliveryStatus } from './orders'
import { createProduct, updateProduct, uploadProductImages } from './products'

function mapCategories(payload: Product, categoryMappings: Map<number, number>) {
  const { categories }: Product = payload
  const mappingIds = categories.map((c) => {
    const mapping = categoryMappings.get(c.id)
    return mapping ?? c.id
  })
  return mappingIds
}

async function updateRefs(
  ops: SyncOperation[],
  categoryMappings: Map<number, number>,
  productMappings: Map<number, number>
) {
  for (const op of ops) {
    switch (op.actionType) {
      case SyncActionType.CreateCategory:
        const { parentCategoryId }: Category = op.payload

        if (parentCategoryId) {
          op.payload.parentCategoryId = categoryMappings.get(parentCategoryId) ?? parentCategoryId
        }
        break
      case SyncActionType.UpdateCategory:
        op.payload.id = categoryMappings.get(op.payload.id) ?? op.payload.id
        break
      case SyncActionType.UploadProductImages:
        op.payload.productId = productMappings.get(op.payload.productId) ?? op.payload.productId
        break
      case SyncActionType.CreateProduct:
        const categoryMappingIds = mapCategories(op.payload, categoryMappings)
        op.payload.categories = categoryMappingIds.map((id) => ({ id }))
        break
      case SyncActionType.UpdateProduct:
        const updateMappingIds = mapCategories(op.payload, categoryMappings)
        op.payload.categories = updateMappingIds.map((id) => ({ id }))
        op.payload.id = productMappings.get(op.payload.id) ?? op.payload.id
        break
    }
  }
}

export async function syncOperations() {
  await db.read()

  const ops = db.data.ops
  const categoryMappings = new Map<number, number>()
  const productMappings = new Map<number, number>()

  ops.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  while (ops.length > 0) {
    const op = ops.at(-1)!
    console.log(`Start syncing ${op.actionType}`)
    try {
      switch (op.actionType) {
        case SyncActionType.CreateCategory:
          const response = await createCategory(op.payload)

          if ('id' in response) {
            categoryMappings.set(op.payload.id, response.id)
            const localCategoryIndex = db.data.categories.findIndex((c) => c.id === op.payload.id)
            if (localCategoryIndex >= 0) db.data.categories[localCategoryIndex].id = response.id
            db.data.categories.forEach((c) => {
              if (c.parentCategoryId && c.parentCategoryId === op.payload.id) {
                c.parentCategoryId = response.id
              }
            })
          } else throw new Error(response.message)

          break
        case SyncActionType.UpdateCategory:
          const category: Category = op.payload
          const mappingId = categoryMappings.get(category.id)
          await updateCategory(mappingId ?? category.id, {
            name: category.name,
            slug: category.slug
          })
          break
        case SyncActionType.CreateProduct:
          const { inStock, name, desc, price, slug, status }: Product = op.payload
          const createMappingIds = mapCategories(op.payload, categoryMappings)
          const newProduct = await createProduct({
            categoryIds: createMappingIds,
            status,
            slug,
            desc,
            name,
            price,
            inStock
          })
          if ('id' in newProduct) {
            productMappings.set(op.payload.id, newProduct.id)
            const localProductIndex = db.data.products.findIndex((p) => p.id === op.payload.id)
            if (localProductIndex >= 0) db.data.products[localProductIndex].id = newProduct.id
          }
          break
        case SyncActionType.UpdateProduct:
          const { id: updatedId, categories: updatedCategories, ...updateDto }: Product = op.payload
          const mappedProductId = productMappings.get(updatedId)
          const updateMappingIds = updatedCategories.map((c) => {
            const mapping = categoryMappings.get(c.id)
            return mapping ?? c.id
          })
          await updateProduct(mappedProductId ?? updatedId, {
            ...updateDto,
            categoryIds: updateMappingIds
          })
          break
        case SyncActionType.UploadProductImages:
          const { paths, productId: imagesProductId } = op.payload as {
            paths: string[]
            productId: number
          }
          const mapped = productMappings.get(imagesProductId) ?? imagesProductId
          const fd = await getImagesFormData(paths)
          await uploadProductImages(mapped, fd)
          break
        case SyncActionType.UpdateDeliveryStatus:
          const { deliveredAt } = await updateDeliveryStatus(op.payload.orderId)
          const localOrderIndex = db.data.orders.findIndex((o) => o.id === op.payload.orderId)
          if (localOrderIndex >= 0) {
            db.data.orders[localOrderIndex].deliveredAt = new Date(deliveredAt)
          }
          break
        default:
          throw new Error(`Unknown action type: ${op.actionType}`)
      }
    } catch (error) {
      throw error
    }

    ops.pop()
    await updateRefs(ops, categoryMappings, productMappings)

    await db.write()
  }
}
