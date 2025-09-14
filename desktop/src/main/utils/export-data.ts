import fs from 'fs/promises'
import { dialog } from 'electron'
import { exportOrdersToCSV, exportOrdersToExcel, getDateOnly } from './export-orders'
import { exportToJSON } from './export-json'
import { exportProductsToCSV, exportProductsToExcel } from './export-products'

interface ExportDataPayload {
  type: 'products' | 'orders'
  format: 'csv' | 'json' | 'xlsx'
  from?: Date
  to?: Date
  data: any[]
}

export const exportData = async ({ type, format, from, to, data }: ExportDataPayload) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: `Export ${type} as ${format.toUpperCase()}`,
    defaultPath: `${type}${from && to ? `_${getDateOnly(from)}_${getDateOnly(to)}` : ''}.${format}`,
    filters: [{ name: format.toUpperCase(), extensions: [format] }]
  })

  if (canceled || !filePath) return

  if (format === 'json') {
    await fs.writeFile(filePath, exportToJSON(data), 'utf8')
  } else {
    if (format === 'csv') {
      await fs.writeFile(
        filePath,
        type === 'products' ? exportProductsToCSV(data) : exportOrdersToCSV(data),
        'utf8'
      )
    } else if (format === 'xlsx') {
      await fs.writeFile(
        filePath,
        type === 'products' ? exportProductsToExcel(data) : exportOrdersToExcel(data)
      ) // buffer
    }
  }
}
