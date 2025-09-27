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
    fs.writeFileSync(filePath, Buffer.from(file.buffer))
    savedPaths.push(filePath)
  }

  return savedPaths
}
export async function deleteImagesOffline(paths: string[]) {
  for (const p of paths) {
    try {
      await fs.promises.rm(p, { force: true }) // force=true ignores if file doesn’t exist
    } catch (err) {
      console.error(`Failed to delete file ${p}:`, err)
    }
  }
}
