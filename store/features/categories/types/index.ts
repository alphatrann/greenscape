import { Product } from "@/features/products/types";

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentCategory: Category | null;
  parentCategoryId: number | null;
  subCategories: Category[];
  products: Product[];
  unitsSold: number;
  sales: number;
}
