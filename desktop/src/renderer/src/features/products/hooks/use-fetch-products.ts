import { Product } from '../types'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useFiltersContext } from '../../../common/contexts/filters-context'
import { useOnlineStatus } from '../../../common/hooks/use-online-status'
import { getProducts, paginateProducts, aggregateProducts } from '../api'
import { useProductFiltersContext } from '../contexts/product-filters-context'
import { StatusGroup } from '../types'
import qs from 'query-string'
import { useCategoryTree } from '../../categories/hooks/use-category-tree'

export const useFetchProducts = () => {
  const [statusGroups, setStatusGroups] = useState<StatusGroup[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const { categories, fetchCategories } = useCategoryTree()
  const { price, selectedCategory, status, inStock, from, to } = useProductFiltersContext()
  const { q, order, sortBy, pagination } = useFiltersContext()
  const { total: totalProductsCount, setTotal: setTotalProductsCount } = useFiltersContext()

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
    // @ts-ignore
    const { data, count, statusGroups } = (await window.electronAPI.getProducts(query)) as {
      data: Product[]
      count: number
      statusGroups: StatusGroup[]
    }

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
    getProducts(queryString, selectedCategory).then((data) => {
      setProducts(data)
      // @ts-ignore
      window.electronAPI.upsertProducts(data)
    })

    paginateProducts(queryString, selectedCategory).then((data) => setTotalProductsCount(data))
    aggregateProducts(queryString, selectedCategory).then(setStatusGroups)
    fetchCategories(queryString)
  }, [query])

  const online = useOnlineStatus()
  useEffect(() => {
    if (online) fetchData()
    else fetchOfflineData()
  }, [online, fetchData, fetchOfflineData])

  return { categories, statusGroups, products, totalProductsCount, setProducts }
}
