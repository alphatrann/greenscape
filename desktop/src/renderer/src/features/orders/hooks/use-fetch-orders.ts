import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFiltersContext } from '@renderer/common/contexts/filters-context'
import { useOrderFiltersContext } from '../contexts/order-filters-context'
import { useTable } from '@renderer/common/data-table'
import toast from 'react-hot-toast'
import { useOnlineStatus } from '@renderer/common/contexts/online-context'
import { columns } from '../components/columns'
import qs from 'query-string'
import { Order, OrdersResponse } from '@renderer/../../common/types'

export const useFetchOrders = () => {
  const { total, from, to, selectedCountries, status, shippingCost } = useOrderFiltersContext()
  const {
    q,
    pagination,
    total: totalCount,
    setTotal: setTotalCount,
    sortBy,
    order,
    reset
  } = useFiltersContext()
  const [orders, setOrders] = useState<Order[]>([])
  const [sales, setSales] = useState(0)
  const [groups, setGroups] = useState<Omit<OrdersResponse, 'sales' | 'data' | 'count'>>({
    countryGroups: [],
    shippingGroups: [],
    deliveryStatusGroups: { delivered: { count: 0, total: 0 }, pending: { count: 0, total: 0 } }
  })
  const table = useTable(columns, orders, totalCount)
  const { online } = useOnlineStatus()

  useEffect(() => {
    reset()
  }, [])

  const query = useMemo(() => {
    const validSortByColumns = ['total', 'shippingCost', 'createdAt', 'deliveredAt', 'id']
    const invalidSortBy = sortBy && !validSortByColumns.includes(sortBy)
    return {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      shippingCost,
      totalRange: total,
      from: from,
      to: to,
      countries: selectedCountries,
      status,
      sortBy: invalidSortBy ? 'createdAt' : sortBy,
      order
    }
  }, [pagination, q, total, from, to, selectedCountries, status, sortBy, order, shippingCost])

  const fetchOfflineData = useCallback(async () => {
    const { data, count, sales, ...groups } = await window.electronAPI.getOrders(query)
    setGroups(groups)
    setSales(sales)
    setTotalCount(count)
    setOrders(data)
  }, [query])

  const fetchOnlineData = useCallback(async () => {
    const queryString = qs.stringifyUrl({
      url: '',
      query: {
        ...query,
        limit: query.limit.toString(),
        offset: query.offset.toString(),
        totalRange: query.totalRange.map((p) => p || '').join('-'),
        from: query.from?.toISOString(),
        to: query.to?.toISOString(),
        countries: selectedCountries.length > 0 ? selectedCountries.join(',') : undefined
      }
    })
    try {
      const { data, count, sales, ...groups } = await window.electronAPI.fetchOrders(queryString)

      window.electronAPI.upsertOfflineOrders(data)

      setGroups(groups)
      setSales(sales)
      setTotalCount(count)
      setOrders(data)
    } catch {
      toast.error('Error fetching orders. Please try again later')
    }
  }, [query])

  useEffect(() => {
    if (online) fetchOnlineData()
    else fetchOfflineData()
  }, [online, fetchOnlineData, fetchOfflineData])
  return { sales, groups, table, totalCount }
}
