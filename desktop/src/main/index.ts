import { exportInvoice } from './utils/export-invoice'

import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import darwinIcon from '../../resources/logo.icns?asset'
import winIcon from '../../resources/logo.ico?asset'
import linuxIcon from '../../resources/logo.png?asset'
import { exportData } from './utils/export-data'
import { Category, Order, Product } from './types'
import { CategoryQuery, getCategories, upsertCategories } from './local-store/categories'
import { getProductDetali, getProducts, ProductQuery, upsertProducts } from './local-store/products'
import { getOrderDetail, getOrders, OrderQuery, upsertOrders } from './local-store/orders'

const getOSIcon = () => {
  switch (process.platform) {
    case 'win32':
      return winIcon
    case 'darwin':
      return darwinIcon
    default:
      return linuxIcon
  }
}

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: getOSIcon(),
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false
    }
  })

  // Dev / Prod load
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  return mainWindow
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  createWindow()

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('export-invoice', (_event, order) => exportInvoice(order))
ipcMain.on('export-data', (_event, payload) => exportData(payload))

ipcMain.on('upsert-categories', (_event, categories: Category[]) => upsertCategories(categories))
ipcMain.on('upsert-products', (_event, products: Product[]) => upsertProducts(products))
ipcMain.on('upsert-orders', (_event, orders: Order[]) => upsertOrders(orders))

ipcMain.handle('get-categories', (_event, query: CategoryQuery) => getCategories(query))
ipcMain.handle('get-products', (_event, query: ProductQuery) => getProducts(query))
ipcMain.handle('get-product-detail', (_event, id: number) => getProductDetali(id))

ipcMain.handle('get-orders', (_event, query: OrderQuery) => getOrders(query))
ipcMain.handle('get-order-detail', (_event, id: string) => getOrderDetail(id))
