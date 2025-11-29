import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useOnlineStatus } from '../../../common/contexts/online-context'

export const useSetDelivered = (orderId: string, deliveredAt?: Date) => {
  const [delivered, setDelivered] = useState<Date | undefined>(undefined)
  const { online } = useOnlineStatus()

  useEffect(() => {
    setDelivered(deliveredAt)
  }, [deliveredAt])

  const onUpdateDeliveryStatus = async () => {
    try {
      if (deliveredAt) return
      if (online) {
        const { deliveredAt: now } = await window.electronAPI.updateDeliveryStatus(orderId)

        setDelivered(new Date(now))
        toast.success('Order set to delivered!')
      } else {
        setDelivered(new Date())
        await window.electronAPI.updateDeliveryStatusOffline(orderId)
        toast.success('The delivery status is due to be updated when you are online')
      }
    } catch (error) {
      toast.error('Something went wrong when updating delivery status')
    }
  }
  return { setDelivered, delivered, onUpdateDeliveryStatus }
}
