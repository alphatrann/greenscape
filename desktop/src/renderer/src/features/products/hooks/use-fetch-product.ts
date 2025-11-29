import { Product } from '@renderer/../../common/types'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { fetchProductImage } from '@renderer/common/api'
import { getLocalImage } from '@renderer/../../common/utils'
import toast from 'react-hot-toast'

export const useFetchProduct = (options?: { storeImages: boolean }) => {
  const { slug } = useParams()

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const { online } = useOnlineStatus()
  const hasFetched = useRef<string | null>(null)

  const fetchProductDetailOffline = async () => {
    setLoading(true)
    try {
      if (!slug) return
      const productDetail = await window.electronAPI.getProductDetail(slug)
      setProduct(productDetail)
    } catch (error: any) {
      toast.error(error?.message ?? 'Failed to fetch offline product detail')
    } finally {
      setLoading(false)
    }
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
          await window.electronAPI.upsertOfflineProducts([{ ...data, images: [] }], {
            overrideImages: true
          })

          if (options?.storeImages) {
            const images = await Promise.all(
              data.images.map((i) => fetchProductImage(i.file.url || getLocalImage(i.file.id)!))
            )

            await window.electronAPI.uploadLocalProductImages(
              data.id,
              images.map((image, i) => ({
                ...image,
                id: data.images[i].file.id
              })),
              { synced: true }
            )
          }

          setProduct(data)
        })
        .catch(async () => {
          toast.error('Failed to fetch products. Using local data instead...')
          await fetchProductDetailOffline()
        })
        .finally(() => setLoading(false))
    } else {
      fetchProductDetailOffline()
    }
  }, [slug, online])

  return { loading, product }
}
