import fs from 'fs'
import path from 'path'
import { SaveImagesOfflineDto } from '../types'

export const saveImagesOffline = ({ files, imagesDir }: SaveImagesOfflineDto) => {
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  const savedPaths: string[] = []
  const uploadedAt = Date.now()

  for (const file of files) {
    const filePath = path.join(imagesDir, `${uploadedAt}_${file.filename}`)
    fs.writeFileSync(filePath, file.buffer)
    savedPaths.push(filePath)
  }

  return savedPaths
}

export const deleteImagesOffline = (paths: string[]) => {
  for (const p of paths) {
    fs.rm(p, () => {})
  }
}
