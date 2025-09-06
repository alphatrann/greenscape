import { CategoriesResponse, Category, CategoryFormDto } from './types'

export const createCategory = async (values: CategoryFormDto) => {
  try {
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
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const updateCategory = async (id: number, values: CategoryFormDto) => {
  try {
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
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getCategories = async (query = '', slug: string = ''): Promise<CategoriesResponse> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/categories${(slug ? '/' : '') + slug}/subs?${query}`

    const response = await fetch(url, {
      credentials: 'include'
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data as CategoriesResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getCategoriesTree = async (query?: string): Promise<Category[]> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/categories/tree${query ?? ''}`

    const response = await fetch(url, {
      credentials: 'include'
    })

    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    return data.data as Category[]
  } catch (error: any) {
    throw new Error(error.message)
  }
}
