import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type OnlineStatusContextType = boolean

const OnlineStatusContext = createContext<OnlineStatusContextType | null>(null)

export const OnlineStatusProvider = ({ children }: { children: ReactNode }) => {
  const [online, setOnline] = useState<boolean>(navigator.onLine)

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return <OnlineStatusContext.Provider value={online}>{children}</OnlineStatusContext.Provider>
}

export const useOnlineStatus = () => {
  const ctx = useContext(OnlineStatusContext)
  if (ctx === null) {
    throw new Error('useOnlineStatus must be used within OnlineStatusProvider')
  }
  return ctx
}
