import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export const useSetDelivered = (orderId: string, deliveredAt?: Date) => {
  const [delivered, setDelivered] = useState<Date | undefined>(undefined)

  useEffect(() => {
    setDelivered(deliveredAt)
  }, [deliveredAt])

  const onUpdateDeliveryStatus = async () => {
    try {
      if (deliveredAt) return
      const now = await window.electronAPI.updateDeliveryStatus(orderId)

      setDelivered(now)
      toast.success('Order set to delivered!')
    } catch (error) {
      toast.error('Something went wrong when updating delivery status')
    }
  }
  return { setDelivered, delivered, onUpdateDeliveryStatus }
}
