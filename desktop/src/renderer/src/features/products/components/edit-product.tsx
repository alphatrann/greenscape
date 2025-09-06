'use client'

import { Category } from '@renderer/features/categories/types'
import { Form } from '@renderer/features/ui/form'
import React, { useEffect } from 'react'
import { ProductFormFields } from './fields'
import { Product } from '../types'
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

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file?.preview || ''))
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <ProductFormHeader loading={loading} heading={product.name || 'Edit product'} />
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
