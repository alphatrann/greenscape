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

export const useCreateProduct = () => {
  const navigate = useNavigate()
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
      const newProduct = await createProduct(values)
      await uploadImages(newProduct.id, formData)
      setLoading(true)
      form.reset()
      clearFiles()
      toast.success('Product created')
      navigate(AppRoute.Products)
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
    deleteFile
  }
}
