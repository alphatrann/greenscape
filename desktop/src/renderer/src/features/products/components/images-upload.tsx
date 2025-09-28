import { getLocalImage } from '@renderer/common/utils'
import { FilePreview, ProductImage } from '@renderer/features/products/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/features/ui/card'
import { memo, useMemo } from 'react'
import { DropzoneState } from 'react-dropzone'
import { MAX_FILES } from '../constants'
import { ImageDropzone } from './image-dropzone'
import { PreviewImage } from './preview-image'
import { useOnlineStatus } from '../../../common/contexts/online-context'

interface ImagesUploadProps {
  dropzoneState: DropzoneState
  files: FilePreview[]
  existingImages?: ProductImage[]
  deleteImage: (url: string) => void
  loading: boolean
}

export const ImagesUpload: React.FC<ImagesUploadProps> = memo(
  ({ dropzoneState, files, loading, existingImages, deleteImage }) => {
    const { online } = useOnlineStatus()
    const urls = useMemo(
      () =>
        (existingImages || [])
          .map((image) => image.file.url || getLocalImage(image.file.id))
          .filter(Boolean)
          .concat(files.map((file) => file.preview)) as string[],
      [files, existingImages]
    )
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>Upload up to 4 images displaying the product</CardDescription>
        </CardHeader>
        <CardContent>
          {!existingImages || online ? (
            <div className="grid gap-2">
              {urls.length > 0 ? (
                <PreviewImage deleteImage={deleteImage} url={urls[0]} size="lg" />
              ) : files.length > 0 ? (
                <PreviewImage deleteImage={deleteImage} url={urls[0]} size="lg" />
              ) : (
                <ImageDropzone loading={loading} dropzoneState={dropzoneState} />
              )}
              <div className="grid grid-cols-3 gap-2">
                {urls.slice(1).map((url: string) => (
                  <PreviewImage
                    deleteImage={deleteImage}
                    loading={loading}
                    key={url}
                    size="sm"
                    url={url}
                  />
                ))}

                {urls.length > 0 && urls.length < MAX_FILES && (
                  <ImageDropzone loading={loading} dropzoneState={dropzoneState} />
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Product image upload is unavailable in offline mode.
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
