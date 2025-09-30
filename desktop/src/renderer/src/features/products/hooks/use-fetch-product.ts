import { Product } from '@renderer/../../common/types'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { fetchProductImage } from '@renderer/common/api'
import { getLocalImage } from '@renderer/../../common/utils'

export const useFetchProduct = () => {
  const { slug } = useParams()

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const { online } = useOnlineStatus()
  const hasFetched = useRef<string | null>(null)

  const fetchProductDetailOffline = async () => {
    if (!slug) return
    const productDetail = await window.electronAPI.getProductDetail(slug)
    return productDetail
  }

  useEffect(() => {
    if (!slug) return
    if (hasFetched.current === slug) return // already handled this slug
    hasFetched.current = slug

    setLoading(true)
    if (online) {
      window.electronAPI
        .fetchProduct(slug!)
        .then(async (data) => {
          if (!data) {
            return
          }

          await window.electronAPI.upsertProducts([{ ...data, images: [] }])

          const images = await Promise.all(
            data.images.map((i) => fetchProductImage(i.file.url || getLocalImage(i.file.id)!))
          )

          await window.electronAPI.uploadLocalProductImages(
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
