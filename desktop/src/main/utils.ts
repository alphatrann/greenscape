import xlsx from 'xlsx'

export function getDateOnly(date: Date) {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const dateOfMonth = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${dateOfMonth}`
}

export function exportToJSON(data: any[]) {
  return JSON.stringify(data, null, 2)
}

export function exportProductsToCSV(products: any[]) {
  const headers = [
    'ID',
    'Slug',
    'Name',
    'In Stock',
    'Price',
    'Created At',
    'Status',
    'Categories',
    'Image URL',
    'Orders Made'
  ]

  const rows = products.map((p) => [
    p.id,
    p.slug,
    p.name,
    p.inStock,
    p.price,
    new Date(p.createdAt).toISOString(),
    p.status,
    p.categories.map((c) => c.name).join('/'),
    p.images[0]?.file?.url || getLocalImage(p.images[0]?.file?.id),
    p._count.orders
  ])

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

export function exportProductsToExcel(products: any[]) {
  const rows = products.map((p) => ({
    ID: p.id,
    Slug: p.slug,
    Name: p.name,
    'In Stock': p.inStock,
    Price: p.price,
    'Created At': new Date(p.createdAt).toISOString(),
    Status: p.status,
    Categories: p.categories.map((c) => c.name).join('/'),
    'Image URL': p.images[0]?.file?.url || getLocalImage(p.images[0]?.file?.id),
    'Orders Made': p._count.orders
  }))

  const worksheet = xlsx.utils.json_to_sheet(rows)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Products')

  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })
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

export function getLocalImage(id: number) {
  return `${import.meta.env.VITE_API_URL}/files/${id}`
}
