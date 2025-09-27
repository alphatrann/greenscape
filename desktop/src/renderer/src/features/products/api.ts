import z from 'zod'
import { GetProductsResponse, Product } from './types'
import { formSchema } from './utils/schema'

export const createProduct = async (dto: z.infer<typeof formSchema>) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data as Product
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const uploadImages = async (productId: number, formData: FormData) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/upload-images`, {
      credentials: 'include',
      body: formData,
      method: 'PATCH'
    })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getProduct = async (slug: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/details/${slug}`)
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data as Product | null
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getProducts = async (query = '', slug = ''): Promise<GetProductsResponse> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products${slug ? `/category/${slug}` : ''}${query}`,
      { credentials: 'include' }
    )
    const data = (await response.json()) as GetProductsResponse
    if (!data.success) throw new Error('Error fetching products')
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const deleteImages = async (productId: number, deletedImageIds: string[]) => {
  try {
    await fetch(
      `${import.meta.env.VITE_API_URL}/products/${
        productId
      }/remove-images?ids=${deletedImageIds.join(',')}`,
      { credentials: 'include', method: 'DELETE' }
    )
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const updateProduct = async (productId: number, dto: z.infer<typeof formSchema>) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data as Product
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const paginateProducts = async (query = '', slug = ''): Promise<number> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products/paginate${slug ? `/category/${slug}` : ''}${query}`,
      {
        credentials: 'include'
      }
    )
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data as number
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function fetchProductImage(url: string, filename?: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`)

  const buffer = await res.arrayBuffer()

  return {
    filename: filename ?? url.split('/').pop() ?? 'image.jpg',
    buffer
  }
}
