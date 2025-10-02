import { ipcMain } from 'electron'
import { getMonthlySalesInYear, getKeyStats, getSalesByCountries } from '../api/metrics'

ipcMain.handle('get-monthly-sales-in-year', (_event, year: number) => getMonthlySalesInYear(year))

ipcMain.handle('get-key-stats', (_event, start: Date, end: Date) => getKeyStats(start, end))

ipcMain.handle('get-sales-by-countries', (_event, start: Date, end: Date) =>
  getSalesByCountries(start, end)
)
