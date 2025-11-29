import { CategoryFormDto, Category } from '../../common/types'
import { getToken } from '../local-store/token'

export const createCategory = async (values: CategoryFormDto) => {
  const token = await getToken({ throw: true })

  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  if (!response.ok) {
    if (response.status === 400) return data as Promise<{ message: string }>
    else throw new Error(data.message)
  }
  return data.data as Category
}

export const updateCategory = async (id: number, values: CategoryFormDto) => {
  const token = await getToken({ throw: true })
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  if (!response.ok) {
    if (response.status === 400) return data as Promise<{ message: string }>
    else throw new Error(data.message)
  }
  return data.data as Category
}

export const fetchCategoriesTree = async (query?: string): Promise<Category[]> => {
  const url = `${import.meta.env.VITE_API_URL}/categories/tree${query ?? ''}`

  const response = await fetch(url)

  const data = await response.json()

  return data.data as Category[]
}
