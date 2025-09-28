import { zodResolver } from '@hookform/resolvers/zod'
import { AppRoute } from '@renderer/common/app-route'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { deleteImages, updateProduct, uploadImages } from '../api'
import { Product, Status } from '../types'
import { formSchema } from '../utils/schema'
import { useImagesUpload } from './use-images-upload'
import { v4 } from 'uuid'

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
  const {
    prevImages,
    files,
    dropzoneState,
    createFilesFormData,
    deleteFile,
    populateImages,
    clearFiles
  } = useImagesUpload()
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

      const deletedImages = product.images
        .map((image) => image.file.id)
        .filter((imageId) => !existingImageIds.has(imageId))
      let updated: Product

      if (online) {
        const response = await updateProduct(product.id, values)
        if ('message' in response) {
          form.setError('slug', response)
          return
        } else updated = response
        if (files.length > 0) {
          const formData = createFilesFormData()
          await uploadImages(product.id, formData)
        }
        if (deletedImages.length > 0) await deleteImages(product.id, deletedImages)
      }
      updated = {
        ...product,
        ...values,
        slug: values.slug !== product.slug ? `${values.slug}-${v4()}` : product.slug,
        status: values.status as Status
      }
      // @ts-ignore
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
