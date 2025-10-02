import xlsx from 'xlsx'
import { Category, Product } from '../../common/types'
import { flattenCategories } from '../../common/utils'

function buildCategoryMap(categories: Category[]) {
  const map = new Map<number, Category>()
  function recurse(data: Category[]) {
    for (const c of data) {
      map.set(c.id, c)
      recurse(c.subCategories ?? [])
    }
  }
  recurse(categories)
  return map
}

export function getLocalImage(id: string) {
  return `${import.meta.env.VITE_API_URL}/files/${id}`
}
type ProductCategory = Pick<Category, 'id' | 'name' | 'slug'>

export function exportProductsToJSON(products: Product[], categories: Category[]) {
  const categoryMap = buildCategoryMap(categories)
  const exportedProducts: (Product & {
    categories: ProductCategory[]
  })[] = []
  products.forEach((prod) => {
    const exportedProduct = { ...prod, categories: [] as ProductCategory[] }
    prod.categories.map((c) => {
      const categoryInfo = categoryMap.get(c.id)
      if (categoryInfo) {
        const { id, name, slug } = categoryInfo
        exportedProduct.categories.push({
          id,
          name,
          slug
        })
      }
    })
    exportedProducts.push(exportedProduct)
  })
  return JSON.stringify(exportedProducts, null, 2)
}

export function exportProductsToCSV(products: Product[], categories: Category[]) {
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
    Array.from(new Set(flattenCategories(categories).map((c) => c.name))).join(','),
    p.images[0]?.file?.url || getLocalImage(p.images[0]?.file?.id),
    p.ordersMade
  ])

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

export function exportProductsToExcel(products: Product[], categories: Category[]) {
  const rows = products.map((p) => ({
    ID: p.id,
    Slug: p.slug,
    Name: p.name,
    'In Stock': p.inStock,
    Price: p.price,
    'Created At': new Date(p.createdAt).toISOString(),
    Status: p.status,
    Categories: Array.from(new Set(flattenCategories(categories).map((c) => c.name))).join(','),
    'Image URL': p.images[0]?.file?.url || getLocalImage(p.images[0]?.file?.id),
    'Orders Made': p.ordersMade
  }))

  const worksheet = xlsx.utils.json_to_sheet(rows)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Products')

  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}
