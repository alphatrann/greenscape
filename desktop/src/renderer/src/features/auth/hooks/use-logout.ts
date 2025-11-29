import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '@renderer/common/app-route'
import { useUserStore } from '../../users/store'

export const useLogout = () => {
  const navigate = useNavigate()
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  const onLogout = async () => {
    try {
      await window.electronAPI.logout()
      navigate(AppRoute.Login)
      toast.success('Log out successfully')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setCurrentUser(null)
    }
  }
  return { onLogout }
}
