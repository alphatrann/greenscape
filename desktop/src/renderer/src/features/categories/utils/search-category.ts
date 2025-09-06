import { Category } from "../types";

export const searchCategory = (
  categories: Category[],
  target: string | number,
  by: "id" | "slug",
  path: Category[] = [],
): [Category[], Category | undefined] => {
  const foundCategory = categories.find((c) => c[by] === target);
  if (!foundCategory)
    for (const category of categories) {
      if (!category.subCategories) continue;
      const result = searchCategory(category.subCategories, target, by, [
        ...path,
        category,
      ]);
      const [newPath, foundSubCategory] = result;
      if (foundSubCategory) return [newPath, foundSubCategory];
    }
  else path.push(foundCategory);
  return [path, foundCategory];
};
