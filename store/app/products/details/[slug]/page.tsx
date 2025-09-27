import { getProduct, getRelatedProducts } from "@/features/products/actions";
import { redirect } from "next/navigation";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import {
  AddToBag,
  ProductDescription,
  ImagesGallery,
} from "@/features/products/product";
import { formatPrice } from "@/features/products/utils";
import { ProductList } from "@/features/products/product-list";

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

  const relatedProducts = await getRelatedProducts([product.id]);

  return (
    <>
      <main className="lg:px-8 pt-16 pb-10 sm:px-6 px-4 container max-w-7xl">
        <Breadcrumb
          links={[
            { name: "Products", href: "/products" },
            { name: product.name, href: "#" },
          ]}
        />
        <section className="grid relative mt-6 sm:grid-cols-2 gap-x-8">
          <div className="sm:sticky sm:top-6 h-fit">
            <ImagesGallery product={product} />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl lg:text-4xl tracking-tight text-secondary-foreground">
              {formatPrice(product.price)}
            </p>
            <ProductDescription desc={product.desc} />
            <AddToBag product={product} />
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section aria-labelledby="related-heading" className="lg:mt-24 mt-16">
            <h2 className="tracking-tight font-medium text-gray-900">
              Customers also purchased
            </h2>
            <ProductList
              products={relatedProducts}
              className="mt-6 sm:grid-cols-2 lg:grid-cols-4"
            />
          </section>
        )}
      </main>
    </>
  );
}
