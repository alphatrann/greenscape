import { Order, OrdersResponse, OrdersAggregate } from './types'

export const aggregateOrders = async (query = '') => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/aggregate${query}`, {
    credentials: 'include'
  })
  const data = await response.json()
  if (!data.success) throw new Error(data.message || 'Failed to fetch order aggregates')

  return data.data as OrdersAggregate
}

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
