import xlsx from 'xlsx'

export function getLocalImage(id: number) {
  return `${import.meta.env.VITE_API_URL}/files/${id}`
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
