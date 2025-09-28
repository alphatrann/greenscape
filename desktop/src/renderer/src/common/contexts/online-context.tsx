import { createContext, useEffect, useState, ReactNode, useContext } from 'react'

type OnlineStatusContextType = {
  online: boolean
  lastChangedAt: Date | null
}

const OnlineStatusContext = createContext<OnlineStatusContextType | null>(null)

export const OnlineStatusProvider = ({ children }: { children: ReactNode }) => {
  const [online, setOnline] = useState<boolean>(navigator.onLine)
  const [lastChangedAt, setLastChangedAt] = useState<Date | null>(null)

  useEffect(() => {
    const goOnline = () => {
      setOnline(true)
      setLastChangedAt(new Date())
    }
    const goOffline = () => {
      setOnline(false)
      setLastChangedAt(new Date())
    }

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return (
    <OnlineStatusContext.Provider value={{ online, lastChangedAt }}>
      {children}
    </OnlineStatusContext.Provider>
  )
}

export const useOnlineStatus = () => {
  const ctx = useContext(OnlineStatusContext)
  if (ctx === null) {
    throw new Error('useOnlineStatus must be used within OnlineStatusProvider')
  }
  return ctx
}
