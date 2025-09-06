import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import { Product, Status } from '../types'
import { formSchema } from '../utils/schema'
import { useImagesUpload } from './use-images-upload'
import { deleteImages, updateProduct, uploadImages } from '../api'
import { AppRoute } from '@renderer/common/app-route'

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

      await updateProduct(product.id, values)
      if (files.length > 0) {
        const formData = createFilesFormData()
        await uploadImages(product.id, formData)
      }

      const existingImageIds = new Set(prevImages.map((img) => img.file.id))
      const deletedImages = product.images
        .map((image) => image.file.id)
        .filter((imageId) => !existingImageIds.has(imageId))
      if (deletedImages.length > 0) await deleteImages(product.id, deletedImages)
      toast.success('Product updated')
      form.reset({
        name: '',
        desc: '',
        categoryIds: [],
        slug: '',
        status: Status.Draft
      })
      navigate(`${AppRoute.Products}/${product.slug}`)
      clearFiles()
    } catch (error: any) {
      toast.error(error.response.data.message)
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
