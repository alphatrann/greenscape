import { zodResolver } from '@hookform/resolvers/zod'
import { Product, ProductFormDto, Status } from '@renderer/../../common/types'
import { AppRoute } from '@renderer/common/app-route'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { formSchema } from '@renderer/features/products/utils/schema'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { useImagesUpload } from './use-images-upload'
import { v4 } from 'uuid'

export const useCreateProduct = () => {
  const navigate = useNavigate()
  const { online } = useOnlineStatus()
  const form = useForm<ProductFormDto>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', desc: '', slug: '', status: Status.Draft, categoryIds: [] }
  })
  const { clearFiles, deleteFile, dropzoneState, files } = useImagesUpload()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (online) {
      const categoryIds = form.getValues('categoryIds')
      form.setValue(
        'categoryIds',
        categoryIds.filter((id) => id > 0)
      )
    }
  }, [online, form.getValues('categoryIds')])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (files.length === 0) {
      toast.error('Please upload at least an image')
      return
    }
    let slug = online ? values.slug : `${values.slug}-${v4()}`
    const productId = -Date.now()
    let newProduct: Product = {
      id: productId,
      ordersMade: 0,
      ...values,
      slug,
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
    setLoading(true)
    try {
      if (online) {
        const response = await window.electronAPI.createProduct({
          ...values,
          status: values.status
        })

        if ('message' in response) {
          form.setError('slug', response)
          return
        } else {
          newProduct = response
        }
      } else {
        await window.electronAPI.createOfflineProduct(newProduct)
      }
    } catch (error: any) {
      await window.electronAPI.createOfflineProduct(newProduct)
      toast.error(`${error.message}. Saving an offline version instead...`)
    } finally {
      setLoading(false)
      await window.electronAPI.upsertOfflineProducts([newProduct])
      const paths = await window.electronAPI.uploadLocalProductImages(newProduct.id, filesPayload, {
        synced: online
      })
      if (online) {
        if (paths.length > 0) {
          try {
            const ids = await window.electronAPI.uploadProductImages(newProduct.id, paths)
            await window.electronAPI.syncProductImageIds(newProduct.id, ids)
          } catch (error) {
            // rollback
            await window.electronAPI.deleteRecords([newProduct.id], 'products')
            throw error
          }
        } else throw new Error('Failed to upload images from disk')
      }

      form.reset()
      clearFiles()
      toast.success('Product created')
      navigate(`${AppRoute.Products}/${slug}`)
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
