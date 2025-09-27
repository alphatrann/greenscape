import { getCategoriesTree } from "@/features/categories/actions";
import { DesktopLogo, MobileLogo } from "@/features/common/components/logo";
import Link from "next/link";
import { BagLink } from "./bag-link";
import { ProductsSearch } from "./products-search";
import { CategoryLinks } from "./category-links";

export async function Navbar() {
  const categories = await getCategoriesTree();

  return (
    <nav className="relative w-full border-b px-4 sm:px-6 lg:px-8">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex -ml-2 items-center gap-x-4">
          <CategoryLinks categories={categories} />
          <Link href="/" className="lg:hidden">
            <MobileLogo />
          </Link>
        </div>
        <Link href="/" className="hidden lg:block">
          <DesktopLogo />
        </Link>
        <div className="flex h-full items-center gap-x-6">
          <ProductsSearch />
          <BagLink />
        </div>
      </div>
    </nav>
  );
}
