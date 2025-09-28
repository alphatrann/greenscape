import { cn } from '@renderer/lib/utils'
import { useState } from 'react'
import { getLocalImage } from '@renderer/common/utils'
import { Product } from '../types'
import placeholder from '../../../../../../resources/placeholder.jpg'
import { MAX_FILES } from '../constants'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'

interface ImagesGalleryProps {
  product: Product
}

export const ImagesGallery: React.FC<ImagesGalleryProps> = ({ product }) => {
  const [pos, setPos] = useState(0)
  const { online } = useOnlineStatus()

  return (
    <div className="space-y-6">
      <div className="w-full rounded-md bg-gray-200/50">
        <img
          src={
            product.images?.[pos]?.file?.url ||
            getLocalImage(product.images?.[pos]?.file?.id) ||
            placeholder
          }
          alt="Cover image"
          width={1024}
          height={1024}
          className="aspect-square h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="grid h-fit w-full grid-cols-4 gap-6">
        {product.images.map((image, i) => (
          <div
            onClick={() => setPos(i)}
            className={cn(
              'cursor-pointer',
              pos === i && 'h-fit rounded ring-2 ring-primary ring-offset-2'
            )}
            key={image.file.id}
          >
            <img
              width={200}
              height={200}
              className={cn('aspect-square rounded object-cover', pos !== i && 'opacity-50')}
              src={image.file?.url || getLocalImage(image.file.id)}
              alt={product.name}
            />
          </div>
        ))}

        {!online &&
          Array(MAX_FILES - (product.images?.length ?? 0))
            .fill(null)
            .map((_, i) => (
              <div
                onClick={() => setPos(i + MAX_FILES - product.images.length)}
                className={cn(
                  'cursor-pointer',
                  pos === i + MAX_FILES - product.images.length &&
                    'h-fit rounded ring-2 ring-primary ring-offset-2'
                )}
                key={i}
              >
                <img
                  width={200}
                  height={200}
                  className={cn(
                    'aspect-square rounded object-cover',
                    pos !== i + MAX_FILES - product.images.length && 'opacity-50'
                  )}
                  src={placeholder}
                  alt="Placeholder"
                />
              </div>
            ))}
      </div>
    </div>
  )
}
