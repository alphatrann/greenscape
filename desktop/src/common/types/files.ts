export interface LocalFilePayload {
  id?: string
  filename: string
  buffer: ArrayBuffer
}

export interface FilePayload {
  name: string
  path: string
  type: string
  size: number
  buffer: ArrayBuffer
}
