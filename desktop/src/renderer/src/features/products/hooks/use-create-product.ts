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
import { useOnlineStatus } from '@renderer/common/hooks/use-online-status'
import { Product, Status } from '../types'

export const useCreateProduct = () => {
  const navigate = useNavigate()
  const online = useOnlineStatus()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', desc: '', status: 'Draft', categoryIds: [] }
  })
  const { clearFiles, deleteFile, createFilesFormData, dropzoneState, files } = useImagesUpload()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (files.length === 0) {
        toast.error('Please upload at least an image')
        return
      }
      const formData = createFilesFormData()
      let newProduct: Product
      if (online) {
        newProduct = await createProduct(values)
        await uploadImages(newProduct.id, formData)
      } else {
        const productId = -Math.floor(Math.random() * (2 ** 32 - 1))
        // do something
        newProduct = {
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
            buffer: Buffer.from(await f.arrayBuffer())
          }))
        )
        //@ts-ignore
        window.electronAPI.uploadProductImages(productId, filesPayload)
      }
      setLoading(true)
      form.reset()
      clearFiles()
      toast.success('Product created')
      navigate(`${AppRoute.Products}/${newProduct.slug}`)
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
    deleteFile
  }
}
