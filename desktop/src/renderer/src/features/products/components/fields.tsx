import { Category } from '@renderer/features/categories/types'
import { memo } from 'react'
import { DropzoneState } from 'react-dropzone'
import { UseFormReturn } from 'react-hook-form'
import { FilePreview, ProductFormDto, ProductImage } from '../types'
import { CategoriesSelect } from './categories-select'
import { ImagesUpload } from './images-upload'
import { ProductOverview } from './overview'
import { SlugInput } from './slug-input'
import { StatusSelect } from './status-select'

interface ProductFormFieldsProps {
  form: UseFormReturn<ProductFormDto, any, ProductFormDto>
  categories: Category[]
  loading: boolean
  dropzoneState: DropzoneState
  files: FilePreview[]
  existingImages?: ProductImage[]
  deleteImage: (url: string) => void
}

export const ProductFormFields = memo(
  ({
    form,
    loading,
    categories,
    dropzoneState,
    files,
    existingImages,
    deleteImage
  }: ProductFormFieldsProps) => {
    return (
      <div className="grid gap-4 md:grid-cols-[1fr_300px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <ProductOverview form={form} loading={loading} />
          <CategoriesSelect form={form} categories={categories} loading={loading} />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <StatusSelect form={form} loading={loading} />
          <ImagesUpload
            dropzoneState={dropzoneState}
            files={files}
            loading={loading}
            existingImages={existingImages}
            deleteImage={deleteImage}
          />
          <SlugInput form={form} loading={loading} />
        </div>
      </div>
    )
  }
)
