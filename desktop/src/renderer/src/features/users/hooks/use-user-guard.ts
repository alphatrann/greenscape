import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store'
import { getCurrentUser } from '../api'
import { AppRoute } from '@renderer/common/app-route'

export const useUserGuard = () => {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  const location = useLocation()

  const redirectToLogin = () => {
    navigate(`${AppRoute.Login}?callback=${location.pathname}`)
  }

  useEffect(() => {
    if (user) {
      if (location.pathname === AppRoute.Login) navigate(AppRoute.Home)
      return
    }
    getCurrentUser().then((data) => {
      if (data) {
        setCurrentUser(data)

        if (location.pathname === AppRoute.Login) navigate(AppRoute.Home)
      } else {
        if (location.pathname !== AppRoute.Login) redirectToLogin()
      }
    })
  }, [user, location.pathname])

  return null
}
