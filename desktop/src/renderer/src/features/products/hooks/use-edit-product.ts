import { zodResolver } from '@hookform/resolvers/zod'
import { Product, ProductFormDto, Status } from '@renderer/../../common/types'
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
    if (prevImages.length + files.length === 0) {
      toast.error('Please upload at least an image')
      return
    }

    try {
      setLoading(true)

      const existingImageIds = new Set(prevImages.map((img) => img.file.id))
      const filesPayload = await Promise.all(
        files.map(async (f) => ({
          filename: f.name,
          buffer: await f.arrayBuffer()
        }))
      )
      const deletedImages = product.images
        .map((image) => image.file.id)
        .filter((imageId) => !existingImageIds.has(imageId))
      let updated: Product

      if (online) {
        const response = await window.electronAPI.updateProduct(
          product.id,
          values as ProductFormDto
        )
        if ('message' in response) {
          form.setError('slug', response)
          return
        } else updated = response
        if (files.length > 0) {
          const paths = await window.electronAPI.uploadLocalProductImages(product.id, filesPayload)
          await window.electronAPI.uploadProductImages(product.id, paths)
        }
        if (deletedImages.length > 0)
          await window.electronAPI.deleteImages(product.id, deletedImages)
      } else {
        updated = {
          ...product,
          ...values,
          slug: values.slug !== product.slug ? `${values.slug}-${v4()}` : product.slug,
          status: values.status as Status
        }
      }

      await window.electronAPI.upsertProducts([updated])
      toast.success('Product updated')
      form.reset({
        name: '',
        desc: '',
        categoryIds: [],
        slug: '',
        status: Status.Draft
      })
      navigate(`${AppRoute.Products}/${values.slug}`)
      clearFiles()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
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
