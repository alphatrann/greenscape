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

  useEffect(() => {
    if (!id || typeof id !== 'string') return
    setLoading(true)
    if (online) {
      window.electronAPI
        .fetchOrder(id)
        .then((data) => {
          if (!data) return
          setOrder(data)
          // @ts-ignore
          window.electronAPI.upsertOfflineOrders([data])
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setLoading(false))
    } else {
      window.electronAPI
        .getOfflineOrder(id)
        .then((data) => {
          if (!data) return
          setOrder(data)
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setLoading(false))
    }
  }, [id, online])

  return { loading, order }
}
