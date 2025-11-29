import { ipcMain } from 'electron'
import { ExportOrdersPayload, Order } from '../../common/types'
import { fetchOrder, fetchOrders, updateDeliveryStatus } from '../api/orders'
import {
  getOrderDetail,
  getOrders,
  updateDeliveryStatusOffline,
  upsertOrders
} from '../local-store/orders'
import { exportOrders } from '../utils/export-data'
import { exportInvoice } from '../utils/export-invoice'

ipcMain.handle('export-invoice', (_event, id: string) => exportInvoice(id))

ipcMain.handle('export-orders', (_event, payload: ExportOrdersPayload) => exportOrders(payload))

ipcMain.handle('get-orders', (_event, query: Record<string, any>) => getOrders(query))

ipcMain.handle('fetch-orders', (_event, query?: string) => fetchOrders(query))

ipcMain.handle('upsert-offline-orders', (_event, orders: Order[]) => upsertOrders(orders))

ipcMain.handle('update-delivery-status', (_event, orderId: string) => updateDeliveryStatus(orderId))

ipcMain.handle('update-delivery-status-offline', (_event, orderId: string) =>
  updateDeliveryStatusOffline(orderId)
)

ipcMain.handle('get-offline-order', (_event, id: string) => getOrderDetail(id))

ipcMain.handle('fetch-order', (_event, id: string) => fetchOrder(id))
