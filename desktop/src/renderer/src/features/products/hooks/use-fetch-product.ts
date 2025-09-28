import { Product } from '../types'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { getLocalImage } from '@renderer/common/utils'
import { getProduct, fetchProductImage } from '../api'

export const useFetchProduct = () => {
  const { slug } = useParams()

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const { online } = useOnlineStatus()
  const hasFetched = useRef<string | null>(null)

  const fetchProductDetailOffline = async () => {
    // @ts-ignore
    const productDetail = (await window.electronAPI.getProductDetail(
      slug
    )) as Promise<Product | null>
    return productDetail
  }

  useEffect(() => {
    if (!slug) return
    if (hasFetched.current === slug) return // already handled this slug
    hasFetched.current = slug

    setLoading(true)
    if (online) {
      getProduct(slug!)
        .then(async (data) => {
          if (!data) {
            return
          }

          // @ts-ignore
          await window.electronAPI.upsertProducts([{ ...data, images: [] }], { uploadImages: true })

          // @ts-ignore
          const images = await Promise.all(
            data.images.map((i) => fetchProductImage(i.file.url || getLocalImage(i.file.id)!))
          )

          // @ts-ignore
          await window.electronAPI.uploadProductImages(
            data.id,
            images.map((image, i) => ({
              ...image,
              id: data.images[i].file.id
            }))
          )

          setProduct(data)
        })
        .finally(() => setLoading(false))
    } else {
      fetchProductDetailOffline()
        .then((data) => {
          if (!data) {
            return
          }
          setProduct(data)
        })
        .finally(() => setLoading(false))
    }
  }, [slug, online])

  return { loading, product }
}
