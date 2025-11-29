import { ipcMain } from 'electron'
import { CategoryFormDto, Category, ExportPayload } from '../../common/types'
import { createCategory, updateCategory, fetchCategoriesTree } from '../api/categories'
import {
  createCategoryOffline,
  updateCategoryOffline,
  setCategoriesOffline,
  getCategoriesTree
} from '../local-store/categories'
import { exportCategories } from '../utils/export-data'

ipcMain.handle('export-categories', (_event, payload: ExportPayload) => exportCategories(payload))

ipcMain.handle('set-categories', (_event, categories: Category[]) =>
  setCategoriesOffline(categories)
)

ipcMain.handle('create-category', (_event, dto: CategoryFormDto) => createCategory(dto))

ipcMain.handle('update-category', (_event, id: number, dto: CategoryFormDto) =>
  updateCategory(id, dto)
)

ipcMain.handle('create-category-offline', (_event, category: Category) =>
  createCategoryOffline(category)
)

ipcMain.handle('update-category-offline', (_event, category: Category) =>
  updateCategoryOffline(category)
)

ipcMain.handle('fetch-categories-tree', (_event, query?: string) => fetchCategoriesTree(query))
ipcMain.handle('get-categories-tree', (_event) => getCategoriesTree())
