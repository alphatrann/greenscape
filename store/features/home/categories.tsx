import { getCategories } from "@/features/categories/actions";
import Image from "next/image";
import Link from "next/link";
import { Category } from "../categories/types";
import { getLocalImage } from "../categories/utils";

export const Categories = async () => {
  const plantsCategories = await getCategories(
    "?limit=3&sortBy=products&order=desc",
    ""
  );
  const careCategories = await getCategories(
    "?limit=2&sortBy=products&order=desc",
    "care"
  );

  return (
    <section className="lg:py-32 sm:py-24 py-16 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl container">
        <h2 className="font-bold tracking-tight text-foreground text-2xl">
          Shop by Categories
        </h2>
        <div className="mt-8 relative">
          <ul role="list" className="grid grid-cols-fit gap-4">
            {plantsCategories.map((c) => (
              <CategoryItem parentSlug="plants" category={c} key={c.id} />
            ))}
            {careCategories.map((c) => (
              <CategoryItem parentSlug="care" category={c} key={c.id} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

interface CategoryProps {
  category: Category;
  parentSlug: string;
}
const CategoryItem = ({ category, parentSlug }: CategoryProps) => {
  return (
    <li>
      <Link
        className="relative group flex justify-end flex-col p-6 h-80 overflow-hidden rounded-md"
        href={`/products/category/${parentSlug}/${category.slug}`}
      >
        <Image
          alt={category.name + " image"}
          src={
            category.products[0].images[0].file.url ||
            getLocalImage(category.products[0].images[0].file.id)
          }
          className="absolute transition-opacity group-hover:opacity-50 object-cover w-full h-full inset-0"
          width={300}
          height={400}
        />
        <div className="opacity-60 bg-gradient-to-t from-foreground h-2/3 inset-x-0 bottom-0 absolute w-full" />
        <span className="text-white relative z-20 text-center font-medium text-xl">
          {category.name}
        </span>
      </Link>
    </li>
  );
};
