import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { updateDeliveryStatus } from '../api'

export const useSetDelivered = (orderId: string, deliveredAt?: Date) => {
  const [delivered, setDelivered] = useState(false)

  useEffect(() => {
    setDelivered(!!deliveredAt)
  }, [deliveredAt])

  const onUpdateDeliveryStatus = async () => {
    try {
      if (deliveredAt) return
      if (delivered) {
        await updateDeliveryStatus(orderId)
        toast.success('Order set to delivered!')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  return { setDelivered, delivered, onUpdateDeliveryStatus }
}
