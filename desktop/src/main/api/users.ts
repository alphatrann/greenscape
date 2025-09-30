import { User } from '../../common/types'
import { getToken } from '../local-store/token'

export const getCurrentUser = async () => {
  try {
    const token = await getToken()
    const response = await fetch(import.meta.env.VITE_API_URL + '/auth/me-admin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()

    return data.data as User | null
  } catch {
    return null
  }
}
