import { Order, OrdersResponse } from '../../common/types'
import { getToken } from '../local-store/token'

export const fetchOrder = async (id: string) => {
  const token = await getToken({ throw: true })
  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  return data.data as Order | undefined
}

export const fetchOrders = async (query = ''): Promise<OrdersResponse> => {
  const token = await getToken({ throw: true })
  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders${query}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = (await response.json()) as OrdersResponse

  return data
}

export const updateDeliveryStatus = async (orderId: string) => {
  const token = await getToken({ throw: true })
  const now = new Date()
  await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ deliveredAt: now.toISOString() })
  })
  return now
}
