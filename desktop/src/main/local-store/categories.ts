import { Category } from '../../common/types'
import db from '../db'
import { SyncActionType } from '../types'

export async function getCategoriesTree() {
  await db.read()
  return db.data.categories
}

export async function setCategoriesOffline(categories: Category[]) {
  await db.read()
  db.data.categories = categories
  await db.write()
}

export async function createCategoryOffline(category: Category) {
  await db.read()
  db.data.ops.push({
    actionType: SyncActionType.CreateCategory,
    payload: category,
    timestamp: new Date().toISOString()
  })
  await db.write()
}

export async function updateCategoryOffline(category: Category) {
  await db.read()
  db.data.ops.push({
    actionType: SyncActionType.UpdateCategory,
    payload: category,
    timestamp: new Date().toISOString()
  })
  await db.write()
}
