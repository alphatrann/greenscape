import { useEffect, useState } from 'react'
import { Order } from '@renderer/../../common/types'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'

export const useFetchOrder = () => {
  const [loading, setLoading] = useState(false)
  const { online } = useOnlineStatus()
  const [order, setOrder] = useState<Order | null>(null)
  const { id } = useParams()

  function getOfflineOrders(id: string) {
    window.electronAPI
      .getOfflineOrder(id)
      .then((data) => {
        if (!data) return
        setOrder(data)
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!id || typeof id !== 'string') return
    setLoading(true)
    if (online) {
      window.electronAPI
        .fetchOrder(id)
        .then((data) => {
          if (!data) return
          setOrder(data)
          window.electronAPI.upsertOfflineOrders([data])
        })
        .catch(() => {
          toast.error('Failed to get order detail. Using offline data instead')
          getOfflineOrders(id)
        })
        .finally(() => setLoading(false))
    } else {
      getOfflineOrders(id)
    }
  }, [id, online])

  return { loading, order }
}
