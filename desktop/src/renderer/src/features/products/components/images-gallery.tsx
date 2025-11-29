import { cn } from '@renderer/lib/utils'
import { useState } from 'react'
import { getLocalImage } from '@renderer/../../common/utils'
import { Product } from '@renderer/../../common/types'
import placeholder from '../../../../../../resources/placeholder.svg'

interface ImagesGalleryProps {
  product: Product
}

export const ImagesGallery: React.FC<ImagesGalleryProps> = ({ product }) => {
  const [pos, setPos] = useState(0)

  const shown = product.images?.[pos]?.file?.url || getLocalImage(product.images?.[pos]?.file?.id)
  return (
    <div className="space-y-6">
      <div className="w-full">
        {shown ? (
          <img
            src={shown}
            alt="Cover image"
            width={1024}
            height={1024}
            className="aspect-square h-full w-full rounded-lg object-cover"
          />
        ) : (
          <img
            src={placeholder}
            alt="Image"
            width={1024}
            height={1024}
            className="aspect-square rounded-lg h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        )}
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
      </div>
    </div>
  )
}
