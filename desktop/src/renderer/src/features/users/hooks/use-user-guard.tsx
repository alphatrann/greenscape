import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store'
import { getCurrentUser } from '../api'
import { AppRoute } from '@renderer/common/app-route'
import { Loading } from '@renderer/common/components/loading'
import { useOnlineStatus } from '../../../common/contexts/online-context'

export const useUserGuard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const user = useUserStore((state) => state.user)
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  const online = useOnlineStatus()

  const [checking, setChecking] = useState(false)

  const redirectToLogin = () => {
    navigate(`${AppRoute.Login}?callback=${location.pathname}`)
  }

  useEffect(() => {
    if (!online) return
    setChecking(true)
    getCurrentUser()
      .then((data) => {
        if (data) {
          setCurrentUser(data)
          if (location.pathname === AppRoute.Login) {
            navigate(AppRoute.Home, { replace: true })
          }
        } else {
          if (location.pathname !== AppRoute.Login) redirectToLogin()
        }
      })
      .catch(() => {
        // offline / API error
        if (location.pathname !== AppRoute.Login) redirectToLogin()
      })
      .finally(() => setChecking(false))
  }, [online, location.pathname])

  // Optional: block rendering until check finishes
  if (checking && !user) return <Loading />

  return null
}
