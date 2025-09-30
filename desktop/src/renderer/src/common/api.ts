export async function fetchProductImage(url: string) {
  const res = await fetch(url)

  const buffer = await res.arrayBuffer()
  const contentType = res.headers.get('content-type') || ''
  let extension = 'jpg'
  if (contentType) {
    const match = contentType.match(/image\/([a-zA-Z0-9]+)/)
    if (match && match[1]) {
      extension = match[1] === 'jpeg' ? 'jpg' : match[1]
    }
  }
  return {
    filename: `image.${extension}`,
    buffer
  }
}
