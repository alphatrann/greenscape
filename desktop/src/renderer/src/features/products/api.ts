import z from 'zod'
import { GetProductsResponse, Product } from './types'
import { formSchema } from './utils/schema'

export const createProduct = async (dto: z.infer<typeof formSchema>) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(dto),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok && response.status === 400)
    return response.json() as Promise<{ message: string }>
  const data = await response.json()
  return data.data as Product
}

export const uploadImages = async (productId: number, formData: FormData) => {
  await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/upload-images`, {
    credentials: 'include',
    body: formData,
    method: 'PATCH'
  })
}

export const getProduct = async (slug: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/details/${slug}`)
  const data = await response.json()
  if (!data.success) throw new Error(data.message)
  return data.data as Product | null
}

export const getProducts = async (query = '', slug = ''): Promise<GetProductsResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products${slug ? `/category/${slug}` : ''}${query}`,
    { credentials: 'include' }
  )
  const data = (await response.json()) as GetProductsResponse
  if (!data.success) throw new Error('Error fetching products')
  return data
}

export const deleteImages = async (productId: number, deletedImageIds: string[]) => {
  await fetch(
    `${import.meta.env.VITE_API_URL}/products/${
      productId
    }/remove-images?ids=${deletedImageIds.join(',')}`,
    { credentials: 'include', method: 'DELETE' }
  )
}

export const updateProduct = async (productId: number, dto: z.infer<typeof formSchema>) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify(dto),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok && response.status === 400)
    return response.json() as Promise<{ message: string }>
  const data = await response.json()
  return data.data as Product
}

export const paginateProducts = async (query = '', slug = ''): Promise<number> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products/paginate${slug ? `/category/${slug}` : ''}${query}`,
    {
      credentials: 'include'
    }
  )
  const data = await response.json()
  return data.data as number
}

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
