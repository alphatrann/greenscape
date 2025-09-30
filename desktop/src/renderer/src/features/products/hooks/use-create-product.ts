import { zodResolver } from '@hookform/resolvers/zod'
import { Product, ProductFormDto, Status } from '@renderer/../../common/types'
import { AppRoute } from '@renderer/common/app-route'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { formSchema } from '@renderer/features/products/utils/schema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { useImagesUpload } from './use-images-upload'

export const useCreateProduct = () => {
  const navigate = useNavigate()
  const { online } = useOnlineStatus()
  const form = useForm<ProductFormDto>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', desc: '', slug: '', status: Status.Draft, categoryIds: [] }
  })
  const { clearFiles, deleteFile, dropzoneState, files } = useImagesUpload()

  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    try {
      if (online) {
        const response = await window.electronAPI.createProduct({
          ...values,
          status: values.status as Status
        })

        if ('message' in response) {
          form.setError('slug', response)
          return
        } else {
          newProduct = response
        }
      }
      await window.electronAPI.upsertProducts([newProduct])
      const paths = await window.electronAPI.uploadLocalProductImages(newProduct.id, filesPayload)
      console.log({ paths })

      try {
        await window.electronAPI.uploadProductImages(newProduct.id, paths)
      } catch (error) {
        // rollback
        await window.electronAPI.deleteRecords([newProduct.id], 'products')
        throw error
      }
      form.reset()
      clearFiles()
      toast.success('Product created')
      navigate(`${AppRoute.Products}/${newProduct.slug}`)
    } catch (error: any) {
      toast.error(`Failed to create product. Please try again. Reason: ${error.message}`)
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
