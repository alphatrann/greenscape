import xlsx from 'xlsx'
import { Order } from '../../common/types'
import { getCountryName, getShippingOption } from '../../common/utils'

export function getDateOnly(date: Date) {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const dateOfMonth = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${dateOfMonth}`
}

export function exportOrdersToJSON(orders: Order[]) {
  const exportedOrders: any[] = []
  orders.forEach((o) => {
    exportedOrders.push({
      ...o,
      country: o.country ? getCountryName(o.country) : undefined,
      subtotal: o.total / 100,
      tax: o.tax / 100,
      shippingOption: getShippingOption(o.shippingCost),
      total: (o.total + o.tax) / 100 + o.shippingCost
    })
  })
  return JSON.stringify(exportedOrders, null, 2)
}

export function exportOrdersToCSV(orders: Order[]) {
  const headers = [
    'ID',
    'Phone',
    'Email',
    'Country',
    'Shipping Option',
    'Subtotal',
    'Shipping Cost',
    'Tax',
    'Total',
    'Created At',
    'Delivered At'
  ]

  const rows = orders.map((o) => [
    o.id,
    o.phone || '',
    o.email || '',
    o.country ? getCountryName(o.country) : '',
    getShippingOption(o.shippingCost),
    o.total / 100,
    o.shippingCost,
    o.tax / 100,
    (o.total + o.tax) / 100 + o.shippingCost,
    new Date(o.createdAt).toISOString(),
    o.deliveredAt ? new Date(o.deliveredAt).toISOString() : ''
  ])

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

export function exportOrdersToExcel(orders: Order[]) {
  const rows = orders.map((o) => ({
    ID: o.id,
    Phone: o.phone || '',
    Email: o.email || '',
    Country: o.country ? getCountryName(o.country) : '',
    'Shipping Option': getShippingOption(o.shippingCost),
    Subtotal: o.total / 100,
    'Shipping Cost': o.shippingCost,
    Tax: o.tax / 100,
    Total: (o.total + o.tax) / 100 + o.shippingCost,
    'Created At': new Date(o.createdAt).toISOString(),
    'Delivered At': o.deliveredAt ? new Date(o.deliveredAt).toISOString() : ''
  }))

  const worksheet = xlsx.utils.json_to_sheet(rows)
  const workbook = xlsx.utils.book_new()

  xlsx.utils.book_append_sheet(workbook, worksheet, 'Orders')

  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}
