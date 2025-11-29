import { ipcMain } from 'electron'
import { getCurrentUser } from '../api/auth'
import { getLocalUser } from '../local-store/user'

ipcMain.handle('get-current-user', getCurrentUser)
ipcMain.handle('get-local-user', getLocalUser)
