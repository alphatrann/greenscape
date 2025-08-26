import { CategoriesResponse, Category, CategoryFormDto } from './types'

export const createCategory = async (values: CategoryFormDto) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  const data = await response.json()
  if (!data.success) throw new Error(data.message)
  return data.data as Category
}

export const updateCategory = async (id: number, values: CategoryFormDto) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  const data = await response.json()
  if (!data.success) throw new Error(data.message)
  return data.data as Category
}

export const getCategories = async (query = '', slug: string = '') => {
  const url = `${import.meta.env.VITE_API_URL}/categories${(slug ? '/' : '') + slug}/subs?${query}`

  const response = await fetch(url, {
    credentials: 'include'
  })
  return (await response.json()) as CategoriesResponse
}
