import xlsx from 'xlsx'

export function getDateOnly(date: Date) {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const dateOfMonth = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${dateOfMonth}`
}

export function exportOrdersToCSV(orders: any[]) {
  const headers = [
    'ID',
    'Total',
    'Phone',
    'Email',
    'Country',
    'Shipping Cost',
    'Shipping Option',
    'Created At',
    'Delivered At'
  ]

  const rows = orders.map((o) => [
    o.id,
    o.total,
    o.phone || '',
    o.email || '',
    o.country || '',
    o.shippingCost,
    o.shippingOption,
    new Date(o.createdAt).toISOString(),
    o.deliveredAt ? new Date(o.deliveredAt).toISOString() : ''
  ])

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

export function exportOrdersToExcel(orders: any[]) {
  const rows = orders.map((o) => ({
    ID: o.id,
    Total: o.total,
    Phone: o.phone || '',
    Email: o.email || '',
    Country: o.country || '',
    'Shipping Cost': o.shippingCost,
    'Shipping Option': o.shippingOption,
    'Created At': new Date(o.createdAt).toISOString(),
    'Delivered At': o.deliveredAt ? new Date(o.deliveredAt).toISOString() : ''
  }))

  const worksheet = xlsx.utils.json_to_sheet(rows)
  const workbook = xlsx.utils.book_new()

  xlsx.utils.book_append_sheet(workbook, worksheet, 'Orders')

  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}
