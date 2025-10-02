import { Category } from '@renderer/../../common/types'
import { Form } from '@renderer/features/ui/form'
import React, { useEffect } from 'react'
import { useCreateProduct } from '../hooks/use-create-product'
import { ProductFormFields } from './fields'
import { ProductFormHeader } from './header'
import { ProductFormSubmit } from './submit'

interface CreateProductProps {
  categories: Category[]
}

export const CreateProduct: React.FC<CreateProductProps> = ({ categories }) => {
  const { loading, form, handleSubmit, files, dropzoneState, deleteFile } = useCreateProduct()
  const productName = form.watch('name')

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file?.preview || ''))
      form.unregister('name')
    }
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <ProductFormHeader loading={loading} heading={productName || 'Create new product'} />
          <ProductFormFields
            deleteImage={deleteFile}
            files={files}
            categories={categories}
            form={form}
            loading={loading}
            dropzoneState={dropzoneState}
          />
          <ProductFormSubmit loading={loading} className="flex justify-center md:hidden" />
        </div>
      </form>
    </Form>
  )
}
