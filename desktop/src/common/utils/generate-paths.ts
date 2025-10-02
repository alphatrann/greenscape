import { Category } from '../types'

export const generatePaths = (categoryTree: Category[], categoryIds: number[]): Category[][] => {
  const categoryIdsSet = new Set(categoryIds)
  const paths: Category[][] = []

  const dfs = (node: Category, path: Category[]) => {
    const newPath = [...path, node]
    if (categoryIdsSet.has(node.id)) {
      paths.push(newPath)
    }
    if (node.subCategories) {
      for (const child of node.subCategories) {
        dfs(child, newPath)
      }
    }
  }

  for (const root of categoryTree) {
    dfs(root, [])
  }

  return paths
}
