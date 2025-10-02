import { formatPrice } from '@renderer/../../common/utils'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { Loading } from '../common/components/loading'
import { AddToBag } from '../features/products/components/add-to-bag'
import { ImagesGallery } from '../features/products/components/images-gallery'
import { ProductDescription } from '../features/products/components/product-description'
import { useFetchProduct } from '../features/products/hooks/use-fetch-product'
import NotFound from '../common/components/not-found'

export default function ProductPage() {
  const { loading, product } = useFetchProduct({ storeImages: true })
  if (loading) return <Loading />
  if (!product) return <NotFound />

  return (
    <>
      <main className="container max-w-7xl mx-auto px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <Breadcrumb
          links={[
            { name: 'Products', href: '/products' },
            { name: product.name, href: '#' }
          ]}
        />
        <section className="relative mt-6 grid gap-x-8 sm:grid-cols-2">
          <div className="h-fit sm:sticky sm:top-6">
            {product.images.length > 0 && <ImagesGallery product={product} />}
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
  )
}
