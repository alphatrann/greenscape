import xlsx from 'xlsx'
import { Category } from '../../common/types'

function flattenCategoryTree(categories: Category[], depth = 0): Category[] {
  const rows: Category[] = []

  for (const c of categories) {
    rows.push({
      id: c.id,
      slug: c.slug,
      name: `${'    '.repeat(depth)}${c.name}`,
      parentCategoryId: c.parentCategoryId,
      parentCategory: null,
      productCount: c.productCount,
      unitsSold: c.unitsSold,
      sales: c.sales / 100 // in cent
    })

    rows.push(...flattenCategoryTree(c.subCategories || [], depth + 1))
  }

  return rows
}

export function exportCategoriesToJSON(data: Category[]) {
  function centToUSD(categories: Category[]) {
    for (const c of categories) {
      c.sales /= 100

      centToUSD(c.subCategories ?? [])
    }
  }
  centToUSD(data)
  return JSON.stringify(data, null, 2)
}

export function exportCategoriesToCSV(categories: Category[]) {
  const headers = [
    'ID',
    'Slug',
    'Name',
    'Parent Category ID',
    'Products Count',
    'Units Sold',
    'Sales'
  ]

  const flat = flattenCategoryTree(categories)

  const rows = flat.map((c) => [
    c.id,
    c.slug,
    c.name, // already indented
    c.parentCategoryId,
    c.productCount,
    c.unitsSold,
    c.sales
  ])

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

export function exportCategoriesToExcel(categories: Category[]) {
  const flat = flattenCategoryTree(categories)

  const rows = flat.map((c) => ({
    ID: c.id,
    Slug: c.slug,
    Name: c.name, // indented
    'Parent Category ID': c.parentCategoryId,
    'Products Count': c.productCount,
    'Units Sold': c.unitsSold,
    Sales: c.sales
  }))

  const worksheet = xlsx.utils.json_to_sheet(rows)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Categories')

  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}
