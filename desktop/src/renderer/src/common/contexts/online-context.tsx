import { createContext, useEffect, useState, ReactNode, useContext, useRef } from 'react'
import toast from 'react-hot-toast'

type OnlineStatusContextType = {
  online: boolean
  syncing: boolean
}

const OnlineStatusContext = createContext<OnlineStatusContextType | null>(null)

export const OnlineStatusProvider = ({ children }: { children: ReactNode }) => {
  const [online, setOnline] = useState<boolean>(navigator.onLine)
  const [syncing, setSyncing] = useState(false)
  const didInitialSync = useRef(false)

  const sync = async () => {
    setSyncing(true)
    try {
      await window.electronAPI.syncOperations()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setSyncing(false)
    }
  }

  useEffect(() => {
    if (navigator.onLine && !didInitialSync.current) {
      sync()
      didInitialSync.current = true
    }

    const goOnline = () => {
      setOnline(true)
      sync()
    }
    const goOffline = () => {
      setOnline(false)
    }

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return (
    <OnlineStatusContext.Provider value={{ online, syncing }}>
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
