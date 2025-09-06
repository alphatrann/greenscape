import { User } from '../users/types'
import { LoginDto } from './types'

export const login = async (dto: LoginDto) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login-admin`, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()
    return data.user as User | null
  } catch (error) {
    return null
  }
}

export const logout = async () => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    })
  } catch {}
}
