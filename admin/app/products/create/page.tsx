import { getCategoriesTree } from "@/features/categories/actions";
import { CreateProduct } from "@/features/products/create-product";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create new product",
};

export default async function CreateProductPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const categories = await getCategoriesTree();

  return (
    <div className="container max-w-5xl">
      <div className="mb-8">
        <Breadcrumb
          links={[
            { name: "Products", href: "/products" },
            { name: "Create", href: "#" },
          ]}
        />
      </div>
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <div className="container max-w-5xl flex-1">
          <CreateProduct categories={categories} />
        </div>
      </main>
    </div>
  );
}
