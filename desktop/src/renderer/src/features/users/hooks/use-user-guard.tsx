import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store'
import { AppRoute } from '@renderer/common/app-route'
import { Loading } from '@renderer/common/components/loading'
import { useOnlineStatus } from '../../../common/contexts/online-context'

export const useUserGuard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const user = useUserStore((state) => state.user)
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  const { online } = useOnlineStatus()

  const [checking, setChecking] = useState(false)

  const redirectToLogin = () => {
    navigate(`${AppRoute.Login}?callback=${location.pathname}`)
  }

  const loadLocalUser = async () => {
    const storedUser = await window.electronAPI.getLocalUser()
    console.log({ storedUser })
    if (storedUser) {
      try {
        setCurrentUser(storedUser)
        navigate(location.pathname === AppRoute.Login ? AppRoute.Home : location.pathname, {
          replace: true
        })
      } catch {
        navigate(`${AppRoute.Login}?callback=${location.pathname}`, { replace: true })
        return false
      }
    }
    return false
  }

  useEffect(() => {
    if (!online) {
      loadLocalUser()
      return
    }
    setChecking(true)
    window.electronAPI
      .getCurrentUser()
      .then((data) => {
        if (data) {
          console.log({ data })

          setCurrentUser(data)
          if (location.pathname === AppRoute.Login) {
            navigate(AppRoute.Home, { replace: true })
          }
        } else {
          if (location.pathname !== AppRoute.Login) redirectToLogin()
        }
      })
      .catch(loadLocalUser)
      .finally(() => setChecking(false))
  }, [online, location.pathname])

  // Optional: block rendering until check finishes
  if (checking && !user) return <Loading />

  return null
}
