import { formatPrice } from "@/features/common/utils";
import { getProduct } from "@/features/products/actions";
import {
  AddToBag,
  ImagesGallery,
  ProductDescription,
} from "@/features/products/details";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import { redirect } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateMetadata = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const { data: product } = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: "Products - " + product.name };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { data: product } = await getProduct(slug);
  if (!product) redirect("/not-found");

  return (
    <>
      <main className="container max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <Breadcrumb
          links={[
            { name: "Products", href: "/products" },
            { name: product.name, href: "#" },
          ]}
        />
        <section className="relative mt-6 grid gap-x-8 sm:grid-cols-2">
          <div className="h-fit sm:sticky sm:top-6">
            <ImagesGallery product={product} />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl tracking-tight text-secondary-foreground lg:text-4xl">
              {formatPrice(product.price)}
            </p>
            <ProductDescription desc={product.desc} />
            <AddToBag product={product} />
          </div>
        </section>
      </main>
    </>
  );
}
