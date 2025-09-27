import { toast } from 'react-hot-toast'
import { redirect } from 'react-router-dom'
import { logout } from '../api'
import { AppRoute } from '@renderer/common/app-route'

export const useLogout = () => {
  const onLogout = async () => {
    try {
      await logout()
      redirect(AppRoute.Login)
      toast.success('Log out successfully')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  return { onLogout }
}
