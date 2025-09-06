import z from 'zod'
import { Product, ProductsResponse } from './types'
import { formSchema } from './utils/schema'

export const aggregateProducts = async (query = '', slug = ''): Promise<ProductsResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products/aggregate${slug ? `/${slug}` : ''}${query}`,
    { credentials: 'include' }
  )
  const data = (await response.json()) as ProductsResponse
  return data
}

export const createProduct = async (dto: z.infer<typeof formSchema>) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(dto),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data.data as Product
}

export const uploadImages = async (productId: number, formData: FormData) => {
  await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/upload-images`, {
    credentials: 'include',
    body: formData,
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getProduct = async (slug: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/details/${slug}`)
  const data = await response.json()
  return data.data as Product | null
}

export const getProducts = async (query = '', slug = ''): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${slug ? `/category/${slug}` : slug}${query}`,
      { credentials: 'include' }
    )
    const data = await response.json()
    return data.data as Product[]
  } catch (error: any) {
    return []
  }
}

export const deleteImages = async (productId: number, deletedImageIds: number[]) => {
  await fetch(
    `${import.meta.env.VITE_API_URL}/products/${
      productId
    }/remove-images?ids=${deletedImageIds.join(',')}`,
    { credentials: 'include' }
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
  const data = await response.json()
  return data.data as Product
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
    return data.count as number
  } catch (error) {
    return 0
  }
}
