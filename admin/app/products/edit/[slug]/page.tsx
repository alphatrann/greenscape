import { getCategoriesTree } from "@/features/categories/actions";
import { getProduct } from "@/features/products/actions";
import { EditProduct } from "@/features/products/edit-product";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";

interface ProductSettingsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: ProductSettingsPageProps) => {
  const { slug } = await params;
  const { data: product } = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: "Update product - " + product.name };
};

export default async function ProductSettingsPage({
  params,
}: ProductSettingsPageProps) {
  const { slug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const categories = await getCategoriesTree();
  const { data: product } = await getProduct(slug);
  if (!product) redirect("/not-found");

  return (
    <div className="container max-w-7xl">
      <div className="mb-8">
        <Breadcrumb
          links={[
            { name: "Products", href: "/products" },
            { name: product.name, href: "#" },
          ]}
        />
      </div>
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <div className="container max-w-5xl flex-1">
          <EditProduct categories={categories} product={product} />
        </div>
      </main>
    </div>
  );
}
