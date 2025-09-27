import { Dropzone } from '@renderer/common/components'
import { Upload } from 'lucide-react'
import { DropzoneState } from 'react-dropzone'

interface ImageDropzoneProps {
  dropzoneState: DropzoneState
  loading: boolean
}

export const ImageDropzone = ({ dropzoneState, loading }: ImageDropzoneProps) => {
  return (
    <Dropzone disabled={loading} state={dropzoneState}>
      <Upload className="h-4 w-4 text-muted-foreground" />
      <span className="sr-only">Upload</span>
    </Dropzone>
  )
}
