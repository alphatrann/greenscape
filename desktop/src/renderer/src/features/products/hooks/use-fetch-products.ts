import { Product, StatusGroup } from '@renderer/../../common/types'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useFiltersContext } from '../../../common/contexts/filters-context'
import { useOnlineStatus } from '../../../common/contexts/online-context'
import { useProductFiltersContext } from '../contexts/product-filters-context'
import qs from 'query-string'
import { useCategoryTreeStore } from '../../categories/hooks/use-category-tree'
import { searchCategory } from '../../categories/utils'

export const useFetchProducts = () => {
  const [statusGroups, setStatusGroups] = useState<StatusGroup[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const { categories, fetchCategories } = useCategoryTreeStore()
  const { price, selectedCategory, status, inStock, from, to } = useProductFiltersContext()
  const { q, order, sortBy, pagination } = useFiltersContext()
  const { total: totalProductsCount, setTotal: setTotalProductsCount, reset } = useFiltersContext()

  useEffect(() => {
    reset()
  }, [])

  const query = useMemo(() => {
    const validSortByColumns = ['price', 'inStock', 'orders', 'createdAt', 'id']
    const invalidSortBy = sortBy && !validSortByColumns.includes(sortBy)

    const query = {
      selectedCategory,
      status,
      price,
      inStock,
      from: from?.toISOString(),
      to: to?.toISOString(),
      q,
      order,
      sortBy: invalidSortBy ? 'createdAt' : sortBy,
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination.pageSize
    }
    return query
  }, [price, status, inStock, from, to, q, order, sortBy, pagination, selectedCategory])

  const fetchOfflineData = useCallback(async () => {
    const { data, count, statusGroups } = await window.electronAPI.getProducts({
      ...query,
      selectedCategory: query.selectedCategory
        ? searchCategory(categories, query.selectedCategory, 'slug')[1]?.id
        : undefined
    })
    setProducts(data)
    setTotalProductsCount(count)
    setStatusGroups(statusGroups)
  }, [query])

  const fetchData = useCallback(async () => {
    const { selectedCategory, inStock, price, ...queryData } = query
    const queryString = qs.stringifyUrl({
      url: '',
      query: {
        ...queryData,
        price: price.map((p) => p ?? '').join('-'),
        inStock: inStock.map((i) => i ?? '').join('-'),
        slug: selectedCategory
      }
    })
    window.electronAPI.fetchProducts(queryString, selectedCategory).then((data) => {
      setProducts(data.data)
      setStatusGroups(data.statusGroups)
      setTotalProductsCount(data.count)
      window.electronAPI.upsertProducts(data.data)
    })

    fetchCategories(queryString)
  }, [query])

  const { online } = useOnlineStatus()
  useEffect(() => {
    if (online) fetchData()
    else fetchOfflineData()
  }, [online, fetchData, fetchOfflineData])

  return { categories, statusGroups, products, totalProductsCount, setProducts }
}
