import { exportInvoice } from './utils/export-invoice'

import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import fs from 'fs'
import path, { join } from 'path'
import darwinIcon from '../../resources/logo.icns?asset'
import winIcon from '../../resources/logo.ico?asset'
import linuxIcon from '../../resources/logo.png?asset'
import { getOrderDetail, getOrders, upsertOrders } from './local-store/orders'
import { attachImages, getProductDetail, getProducts, upsertProducts } from './local-store/products'
import { File, Order, OrderQuery, Product, ProductQuery } from './types'
import { exportData } from './utils/export-data'

const imagesDir = join(app.getPath('userData'), 'images')

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

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

const productImagesDir = path.join(imagesDir, 'products')

ipcMain.on('export-invoice', (_event, order) => exportInvoice(order))
ipcMain.on('export-data', (_event, payload) => exportData(payload))

ipcMain.handle('upsert-products', (_event, products: Product[]) => upsertProducts(products))
ipcMain.handle('upsert-orders', (_event, orders: Order[]) => upsertOrders(orders))

ipcMain.handle('get-products', (_event, query: ProductQuery) => getProducts(query))
ipcMain.handle('get-product-detail', (_event, slug: string) => getProductDetail(slug))

ipcMain.handle('get-orders', (_event, query: OrderQuery) => getOrders(query))
ipcMain.handle('get-order-detail', (_event, id: string) => getOrderDetail(id))

ipcMain.handle('upload-product-images', (_event, productId: number, files: File[]) =>
  attachImages(productId, productImagesDir, files)
)
