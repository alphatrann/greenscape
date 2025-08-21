import { User } from './types'

export const getCurrentUser = async () => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/auth/me-admin', {
    credentials: 'include'
  })
  const data = await response.json()

  return data.data as User | null
}
