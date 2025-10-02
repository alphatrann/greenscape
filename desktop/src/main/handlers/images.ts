import { app } from 'electron'
import fs from 'fs'
import path from 'path'

const imagesDir = path.join(app.getPath('userData'), 'images')
export const productImagesDir = path.join(imagesDir, 'products')

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}
