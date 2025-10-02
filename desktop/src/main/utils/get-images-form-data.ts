import { FormData } from 'formdata-node'
import { fileFromPath } from 'formdata-node/file-from-path'
import mime from 'mime-types'
import path from 'path'

export const getImagesFormData = async (paths: string[]) => {
  const fd = new FormData()

  for (const filePath of paths) {
    const filename = path.basename(filePath)
    const type = mime.lookup(filename) || 'application/octet-stream'

    fd.append('images', await fileFromPath(filePath, filename, { type }))
  }
  return fd
}
