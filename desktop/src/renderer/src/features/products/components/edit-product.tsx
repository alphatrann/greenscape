import { Form } from '@renderer/features/ui/form'
import React, { useEffect } from 'react'
import { ProductFormFields } from './fields'
import { Category, Product } from '@renderer/../../common/types'
import { useEditProduct } from '../hooks/use-edit-product'
import { ProductFormHeader } from './header'
import { ProductFormSubmit } from './submit'

interface EditProductProps {
  categories: Category[]
  product: Product
}

export const EditProduct: React.FC<EditProductProps> = ({ categories, product }) => {
  const { loading, form, handleSubmit, files, dropzoneState, prevImages, deleteFile } =
    useEditProduct(product)

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
          <ProductFormHeader loading={loading} heading={productName || 'Edit product'} />
          <ProductFormFields
            deleteImage={deleteFile}
            files={files}
            categories={categories}
            form={form}
            loading={loading}
            dropzoneState={dropzoneState}
            existingImages={prevImages}
          />
          <ProductFormSubmit loading={loading} className="flex justify-center md:hidden" />
        </div>
      </form>
    </Form>
  )
}
