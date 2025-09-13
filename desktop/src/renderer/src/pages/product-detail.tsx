import { formatPrice } from '@renderer/common/utils'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { useParams } from 'react-router-dom'
import { Product } from '../features/products/types'
import { useEffect, useState } from 'react'
import { getProduct } from '../features/products/api'
import { ImagesGallery } from '../features/products/components/images-gallery'
import { ProductDescription } from '../features/products/components/product-description'
import { AddToBag } from '../features/products/components/add-to-bag'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../common/components/loading'

export default function ProductPage() {
  const { slug } = useParams()

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getProduct(slug!)
      .then((data) => {
        if (!data) {
          navigate('/404')
          return
        }
        setProduct(data)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <Loading />
  if (!product) {
    return null
  }

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
