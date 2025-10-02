import { ipcMain } from 'electron'
import { syncOperations } from '../api/sync'

ipcMain.handle('sync-operations', (_event) => syncOperations())
