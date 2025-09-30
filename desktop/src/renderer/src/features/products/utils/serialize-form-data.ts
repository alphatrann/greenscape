import { FilePayload } from '@renderer/../../common/types'

export async function prepareFiles(files: File[]) {
  const serialized: FilePayload[] = []
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    serialized.push({
      name: file.name,
      path: file.webkitRelativePath,
      type: file.type,
      size: file.size,
      buffer: arrayBuffer // 👈 already a Node Buffer
    })
  }
  return serialized
}
