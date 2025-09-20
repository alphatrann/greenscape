import { Order, OrdersResponse } from './types'

export const getOrder = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/details/${id}`, {
    credentials: 'include'
  })
  const data = await response.json()

  return data.data as Order | undefined
}

export const getOrders = async (query = ''): Promise<OrdersResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders${query}`, {
    credentials: 'include'
  })
  const data = (await response.json()) as OrdersResponse

  return data
}

export const updateDeliveryStatus = async (orderId: string) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ deliveredAt: new Date().toISOString() }),
      credentials: 'include'
    })
  } catch {}
}
