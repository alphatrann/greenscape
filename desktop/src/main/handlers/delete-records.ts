import { ipcMain } from 'electron'
import { deleteRecords } from '../api/delete-records'

ipcMain.handle(
  'delete-records',
  async (_event, ids: (number | string)[], entityName: 'categories' | 'products') => {
    return await deleteRecords(ids, entityName)
  }
)
