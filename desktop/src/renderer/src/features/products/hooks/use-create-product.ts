import { formSchema } from '@renderer/features/products/utils/schema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '@renderer/common/app-route'
import { createProduct, uploadImages } from '../api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useImagesUpload } from './use-images-upload'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { Product, Status } from '../types'

export const useCreateProduct = () => {
  const navigate = useNavigate()
  const { online } = useOnlineStatus()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', desc: '', status: Status.Draft, categoryIds: [] }
  })
  const { clearFiles, deleteFile, createFilesFormData, dropzoneState, files } = useImagesUpload()

  const [loading, setLoading] = useState(false)

  const createOfflineProduct = async (
    filesPayload: {
      filename: string
      buffer: ArrayBuffer
    }[],
    newProduct: Product
  ) => {
    // @ts-ignore
    await window.electronAPI.upsertProducts([newProduct])

    // @ts-ignore
    await window.electronAPI.uploadProductImages(newProduct.id, filesPayload)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const productId = -Date.now()
    let newProduct: Product = {
      id: productId,
      _count: { orders: 0 },
      ...values,
      categories: values.categoryIds.map((id) => ({ id })),
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
      status: values.status as Status
    }
    const filesPayload = await Promise.all(
      files.map(async (f) => ({
        filename: f.name,
        buffer: await f.arrayBuffer()
      }))
    )
    if (files.length === 0) {
      toast.error('Please upload at least an image')
      return
    }
    const formData = createFilesFormData()
    setLoading(true)
    try {
      if (online) {
        const response = await createProduct(values)
        if ('message' in response) {
          form.setError('slug', response)
          return
        } else {
          newProduct = response
        }
        await uploadImages(newProduct.id, formData)
      }
      await createOfflineProduct(filesPayload, newProduct)
      form.reset()
      clearFiles()
      toast.success('Product created')
      navigate(`${AppRoute.Products}/${newProduct.slug}`)
    } catch (error: any) {
      if (online) {
        toast.error('Failed to create product. Please try again')
        await createOfflineProduct(filesPayload, newProduct)
      } else toast.error(`Failed to create product in offline mode. Reason: ${error.message}`)
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
    deleteFile
  }
}
