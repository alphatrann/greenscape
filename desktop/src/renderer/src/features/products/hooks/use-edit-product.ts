import { zodResolver } from '@hookform/resolvers/zod'
import {
  FilePreview,
  LocalFilePayload,
  Product,
  ProductImage,
  Status
} from '@renderer/../../common/types'
import { AppRoute } from '@renderer/common/app-route'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import * as z from 'zod'
import { formSchema } from '../utils/schema'
import { useImagesUpload } from './use-images-upload'
import { getLocalImage } from '@renderer/../../common/utils'

export const useEditProduct = (product: Product) => {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      desc: '',
      categoryIds: [],
      slug: '',
      status: Status.Draft
    }
  })
  const [loading, setLoading] = useState(false)
  const { prevImages, files, dropzoneState, deleteFile, populateImages, clearFiles } =
    useImagesUpload()
  const { online } = useOnlineStatus()

  useEffect(() => {
    populateImages(product.images)
  }, [populateImages])

  useEffect(() => {
    if (online) {
      const categoryIds = form.getValues('categoryIds')
      form.setValue(
        'categoryIds',
        categoryIds.filter((id) => id > 0)
      )
    }
  }, [online, form.getValues('categoryIds')])

  useEffect(() => {
    form.reset({
      categoryIds: product.categories.map((c) => c.id),
      slug: product.slug,
      desc: product.desc,
      name: product.name,
      inStock: product.inStock,
      price: product.price,
      status: product.status
    })
  }, [product])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let slug = online || product.slug === values.slug ? values.slug : `${values.slug}-${v4()}`
    if (online && prevImages.length + files.length === 0) {
      toast.error('Please upload at least an image')
      return
    }
    let updated = {
      id: product.id,
      name: values.name,
      slug,
      status: values.status,
      categories: values.categoryIds.map((id) => ({ id })),
      createdAt: product.createdAt,
      desc: values.desc,
      images: product.images,
      inStock: values.inStock,
      ordersMade: product.ordersMade,
      price: values.price,
      updatedAt: product.updatedAt
    }
    const filesPayload = await Promise.all(
      files.map(async (f) => ({
        filename: f.name,
        buffer: await f.arrayBuffer()
      }))
    )
    const existingImageIds = new Set(prevImages.map((img) => img.file.id))

    const deletedImages = product.images
      .map((image) => image.file.id)
      .filter((imageId) => !existingImageIds.has(imageId))
    try {
      setLoading(true)

      if (online) {
        const response = await window.electronAPI.updateProduct(product.id, values)
        if ('message' in response) {
          form.setError('slug', response)
          return
        } else updated = response
        if (deletedImages.length > 0) {
          await window.electronAPI.deleteImages(product.id, deletedImages)
          const toDeleteImages = product.images.filter((image) =>
            deletedImages.includes(image.file.url || getLocalImage(image.file.id))
          )
          for (const image of toDeleteImages) {
            deleteFile(image.file.url || getLocalImage(image.file.id))
          }
        }
      } else {
        await window.electronAPI.updateOfflineProduct(updated)
      }

      toast.success('Product updated')
    } catch (error: any) {
      toast.error(`${error.message}. Saving an offline version instead...`)
      await window.electronAPI.updateOfflineProduct(updated)
    } finally {
      setLoading(false)
      await window.electronAPI.upsertOfflineProducts([updated])
      await Promise.all([
        uploadProductImages(updated.id, files, filesPayload, online),
        deleteProductImages(product.id, prevImages, deletedImages)
      ])

      form.reset({
        name: '',
        desc: '',
        categoryIds: [],
        slug: '',
        status: Status.Draft
      })
      navigate(`${AppRoute.Products}/${slug}`)
      clearFiles()
    }
  }

  return {
    loading,
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    dropzoneState,
    files,
    deleteFile,
    prevImages
  }
}
async function uploadProductImages(
  productId: number,
  files: FilePreview[],
  filesPayload: LocalFilePayload[],
  online: boolean
) {
  if (files.length > 0) {
    const paths = await window.electronAPI.uploadLocalProductImages(productId, filesPayload, {
      synced: online
    })

    if (online) {
      if (paths.length > 0) {
        const ids = await window.electronAPI.uploadProductImages(productId, paths)
        await window.electronAPI.syncProductImageIds(productId, ids)
      } else throw new Error('Failed to upload images from disk')
    }
  }
}

async function deleteProductImages(
  productId: number,
  prevImages: ProductImage[],
  deletedImages: string[]
) {
  if (prevImages.length > 0 && deletedImages.length > 0) {
    await window.electronAPI.deleteLocalProductImages(productId, deletedImages)
  }
}
