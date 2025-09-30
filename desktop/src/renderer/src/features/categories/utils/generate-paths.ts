import { Category } from '@renderer/../../common/types'

export const generatePaths = (categoryTree: Category[], categoryIds: number[]): Category[] => {
  const categoryIdsSet = new Set(categoryIds)

  const categories: Category[] = []

  const dfs = (current: Category) => {
    const subCategories = current.subCategories ?? []
    for (const child of subCategories) {
      if (categoryIdsSet.has(child.id)) {
        if (!child.subCategories || child.subCategories.length === 0) categories.push(child)
        dfs(child)
      }
    }
  }

  for (const root of categoryTree) {
    dfs(root)
  }

  return categories
}
