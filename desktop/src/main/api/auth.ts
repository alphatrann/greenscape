import { User, LoginDto } from '../../common/types'
import { getToken } from '../local-store/token'

export const getCurrentUser = async () => {
  const token = await getToken()
  const response = await fetch(import.meta.env.VITE_API_URL + '/auth/me-admin', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  return data.data as User | null
}

export const login = async (dto: LoginDto) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login-admin`, {
    method: 'POST',
    body: JSON.stringify(dto),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data as { success: boolean; accessToken: string; data: User }
}
