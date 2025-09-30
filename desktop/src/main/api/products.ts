import { GetProductsResponse, Product, ProductFormDto } from '../../common/types'
import { FormData } from 'formdata-node'
import { getToken } from '../local-store/token'

export const createProduct = async (dto: ProductFormDto) => {
  const token = await getToken({ throw: true })
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
    method: 'POST',
    body: JSON.stringify(dto),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok && response.status === 400)
    return response.json() as Promise<{ message: string }>
  const data = await response.json()
  return data.data as Product
}

export const uploadProductImages = async (productId: number, formData: FormData) => {
  const token = await getToken({ throw: true })
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products/${productId}/upload-images`,
    {
      body: formData as any,
      method: 'PATCH',
      headers
    }
  )
  const data = await response.json()
  if (!response.ok) throw new Error(data?.message ?? 'Error uploading products')
}

export const fetchProduct = async (slug: string) => {
  const token = await getToken({ throw: true })
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/details/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  if (!data.success) throw new Error(data.message)
  return data.data as Product | null
}

export const fetchProducts = async (query = '', slug = ''): Promise<GetProductsResponse> => {
  const token = await getToken({ throw: true })
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products${slug ? `/category/${slug}` : ''}${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data = (await response.json()) as GetProductsResponse
  return data
}

export const deleteImages = async (productId: number, deletedImageIds: string[]) => {
  const token = await getToken()
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products/${
      productId
    }/remove-images?ids=${deletedImageIds.join(',')}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data = await response.json()
  if (!response.ok) throw new Error(data?.message ?? '')
  return data
}

export const updateProduct = async (productId: number, dto: Partial<ProductFormDto>) => {
  const token = await getToken()
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
    method: 'PATCH',

    body: JSON.stringify(dto),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok && response.status === 400)
    return response.json() as Promise<{ message: string }>
  const data = await response.json()
  return data.data as Product
}
