import { Category } from '../types'

export function flattenCategories(categories: Category[]) {
  const result: Category[] = []

  function recurse(cats: Category[]) {
    for (const cat of cats) {
      result.push(cat)
      if (cat.subCategories && cat.subCategories.length > 0) {
        recurse(cat.subCategories)
      }
    }
  }

  recurse(categories)
  return result
}
