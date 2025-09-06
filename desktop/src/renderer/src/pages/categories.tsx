import { getCategories } from '@renderer/features/categories/api'
import { CategoriesTable } from '@renderer/features/categories/components/table'
import { generatePaths } from '@renderer/features/categories/utils'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { CreateCategoryModal } from '@renderer/features/categories/components/create-category-modal'
import { EditCategoryModal } from '@renderer/features/categories/components/edit-category-modal'
import { DeleteRecordsModal } from '../common/delete-records/modal'
import { useUserGuard } from '@renderer/features/users/hooks/use-user-guard'
import { useEffect, useState } from 'react'
import { Category } from '../features/categories/types'
import { useParams } from 'react-router-dom'
import { useFiltersContext } from '../common/contexts/filters-context'
import qs from 'query-string'

export default function CategoriesPage() {
  useUserGuard()
  const { total, setTotal, q, pagination, sortBy, order } = useFiltersContext()
  const [parents, setParents] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const { slug } = useParams()

  useEffect(() => {
    const queryString = qs.stringify({
      q,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sortBy,
      order
    })
    getCategories(queryString, slug)
      .then((data) => {
        setTotal(data.count)
        setParents(data.data.parents)
        setCategories(data.data.categories)
      })
      .catch((e) => console.log(e))
  }, [slug, q, pagination, sortBy, order])

  const generateBreadcrumb = () => {
    let route = '/categories'
    const links = [{ name: 'Categories', href: route }]
    const paths = generatePaths(parents)
    paths.forEach((path) => {
      route += '/' + path.slug
      links.push({ name: path.name, href: route })
    })
    return links
  }

  return (
    <>
      <div className="container mx-auto max-w-3xl">
        <div className="mb-4">
          <Breadcrumb links={generateBreadcrumb()} />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Categories ({total})</h1>

          <CreateCategoryModal
            addCategory={(category) => setCategories((prev) => [...prev, category])}
            parents={parents}
          />
        </div>

        <div className="mt-6 space-y-8">
          <CategoriesTable categories={categories} count={total} />
        </div>
      </div>
      <EditCategoryModal
        editCategory={(category) =>
          setCategories((prev) =>
            prev.map((c) => (category.id === c.id ? { ...category, _count: c._count } : c))
          )
        }
        parents={parents}
      />
      <DeleteRecordsModal
        deleteInUI={(ids) => setCategories((prev) => prev.filter((c) => !ids.includes(c.id)))}
        entityName="categories"
      />
    </>
  )
}
