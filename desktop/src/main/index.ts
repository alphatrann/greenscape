import fs from 'fs/promises'
import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import linuxIcon from '../../resources/logo.png?asset'
import winIcon from '../../resources/logo.ico?asset'
import darwinIcon from '../../resources/logo.icns?asset'
import { exportOrdersToCSV, exportOrdersToExcel, getDateOnly } from './utils/export-orders'
import { exportProductsToCSV, exportProductsToExcel } from './utils/export-products'
import { exportToJSON } from './utils/export-json'
import { exportInvoice } from './utils/export-invoice'

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

function createWindow(): void {
  // Create the browser window.
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

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

interface ExportDataPayload {
  type: 'products' | 'orders'
  format: 'csv' | 'json' | 'xlsx'
  from?: Date
  to?: Date
  data: any[]
}

ipcMain.on('export-invoice', async (_event, order) => {
  await exportInvoice(order)
})

ipcMain.on('export-data', async (_event, { type, format, from, to, data }: ExportDataPayload) => {
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
})
