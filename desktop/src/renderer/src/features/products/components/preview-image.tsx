import { Button } from '@renderer/features/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/features/ui/tooltip'
import { cn } from '@renderer/lib/utils'
import { Trash2 } from 'lucide-react'

interface PreviewImageProps {
  size: 'sm' | 'lg'
  url: string
  deleteImage: (url: string) => void
  loading?: boolean
}

const sizeClasses = {
  sm: 'max-w-[84px] max-h-[84px]',
  lg: 'max-w-[300px] max-h-[300px]'
}

export const PreviewImage = ({ size, url, deleteImage, loading = false }: PreviewImageProps) => {
  return (
    <div className={cn('group relative rounded-md', sizeClasses[size])}>
      <div className="absolute left-0 top-0 z-10 h-full w-full object-cover transition-colors group-hover:bg-background/80" />
      <img
        alt="Product image"
        className="aspect-square w-full rounded-md object-cover"
        height={size === 'sm' ? 150 : 400}
        src={url}
        width={size === 'sm' ? 150 : 400}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => deleteImage(url)}
              variant="destructive"
              size="icon"
              className="absolute right-1 top-1 z-20 h-6 w-6 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              type="button"
              disabled={loading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete image</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
