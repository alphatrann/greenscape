import { ipcMain } from 'electron'
import { getCurrentUser, login } from '../api/auth'
import { saveToken, deleteToken } from '../local-store/token'
import { LoginDto } from '../../common/types'

ipcMain.handle('login', async (_event, dto: LoginDto) => {
  const response = await login(dto)
  if (response.accessToken) await saveToken(response.accessToken)
  return response.data
})

ipcMain.handle('logout', () => deleteToken())

ipcMain.handle('get-current-user', () => getCurrentUser())
