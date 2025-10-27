import { ipcMain } from 'electron'
import { LoginDto } from '../../common/types'
import { login } from '../api/auth'
import { deleteToken, saveToken } from '../local-store/token'
import { setLocalUser } from '../local-store/user'

ipcMain.handle('login', async (_event, dto: LoginDto) => {
  const response = await login(dto)
  if (response.accessToken) await saveToken(response.accessToken)
  const loggedInUser = response.data
  setLocalUser(loggedInUser)
  return loggedInUser
})

ipcMain.handle('logout', async () => {
  await deleteToken()
  setLocalUser(null)
})
