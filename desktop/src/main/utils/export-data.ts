import fs from 'fs/promises'
import { dialog } from 'electron'
import {
  exportOrdersToCSV,
  exportOrdersToExcel,
  exportOrdersToJSON,
  getDateOnly
} from './export-orders'
import { fetchOrders } from '../api/orders'
import { fetchProducts } from '../api/products'
import { exportProductsToCSV, exportProductsToExcel, exportProductsToJSON } from './export-products'
import { fetchCategoriesTree } from '../api/categories'
import {
  exportCategoriesToCSV,
  exportCategoriesToExcel,
  exportCategoriesToJSON
} from './export-categories'
import { ExportOrdersPayload, ExportPayload } from '../../common/types'

export const exportCategories = async ({ format }: ExportPayload) => {
  const categories = await fetchCategoriesTree()
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: `Export categories as ${format.toUpperCase()}`,
    defaultPath: `categories.${format}`,
    filters: [{ name: format.toUpperCase(), extensions: [format] }]
  })

  if (canceled || !filePath) return { success: !canceled }

  if (format === 'json') {
    await fs.writeFile(filePath, exportCategoriesToJSON(categories), 'utf8')
  } else if (format === 'csv') {
    await fs.writeFile(filePath, exportCategoriesToCSV(categories), 'utf8')
  } else if (format === 'xlsx') {
    await fs.writeFile(filePath, exportCategoriesToExcel(categories))
  }
  return { success: !canceled }
}

export const exportProducts = async ({ format }: ExportPayload) => {
  const response = await fetchProducts()
  const categories = await fetchCategoriesTree()
  const data = response?.data
  if (!data) throw new Error('Failed to fetch products')

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: `Export products as ${format.toUpperCase()}`,
    defaultPath: `products.${format}`,
    filters: [{ name: format.toUpperCase(), extensions: [format] }]
  })

  if (canceled || !filePath) return { success: !canceled }

  if (format === 'json') {
    await fs.writeFile(filePath, exportProductsToJSON(data, categories), 'utf8')
  } else if (format === 'csv') {
    await fs.writeFile(filePath, exportProductsToCSV(data, categories), 'utf8')
  } else if (format === 'xlsx') {
    await fs.writeFile(filePath, exportProductsToExcel(data, categories))
  }
  return { success: !canceled }
}

export const exportOrders = async ({ format, from, to }: ExportOrdersPayload) => {
  const response = await fetchOrders(`?from=${getDateOnly(from)}&to=${getDateOnly(to)}`)
  const data = response?.data
  if (!data) throw new Error('Failed to fetch orders')

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: `Export orders as ${format.toUpperCase()}`,
    defaultPath: `orders_${getDateOnly(from)}_${getDateOnly(to)}.${format}`,
    filters: [{ name: format.toUpperCase(), extensions: [format] }]
  })

  if (canceled || !filePath) return { success: !canceled }

  if (format === 'json') {
    await fs.writeFile(filePath, exportOrdersToJSON(data), 'utf8')
  } else if (format === 'csv') {
    await fs.writeFile(filePath, exportOrdersToCSV(data), 'utf8')
  } else if (format === 'xlsx') {
    await fs.writeFile(filePath, exportOrdersToExcel(data))
  }
  return { success: !canceled }
}
