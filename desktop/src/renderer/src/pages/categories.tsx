import { CreateCategoryModal } from '@renderer/features/categories/components/create-category-modal'
import { EditCategoryModal } from '@renderer/features/categories/components/edit-category-modal'
import { Breadcrumb } from '@renderer/features/ui/breadcrumb'
import { useUserGuard } from '@renderer/features/users/hooks/use-user-guard'
import { useEffect, useState } from 'react'
import { AppRoute } from '../common/app-route'
import { DeleteRecordsModal } from '../common/delete-records/modal'
import { CategoryTree } from '../features/categories/components/tree'
import { useCategoryTree } from '../features/categories/hooks/use-category-tree'
import { CategorySortDropdown } from '../features/categories/components/sort-dropdown'
import { CategorySortBy } from '../features/categories/types'
import { SortOrder } from '../common/types'
import { Button } from '../features/ui/button'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function CategoriesPage() {
  useUserGuard()
  const {
    categories,
    order,
    sortBy,
    setOrder,
    setSortBy,
    fetchCategories,
    addCategory,
    editCategory,
    deleteCategory
  } = useCategoryTree()
  const [selectedParentId, setSelectedParentId] = useState<number | undefined>()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const sortByField = (field: CategorySortBy, order: SortOrder) => {
    setSortBy(field)
    setOrder(order)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <>
      <div className="container mx-auto max-w-3xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: 'Categories', href: `${AppRoute.Categories}` }]} />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Categories</h1>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center gap-x-3">
            <div className="grid grid-cols-6 font-medium items-center w-full py-2 pr-3 rounded-md">
              <div className="flex gap-x-2 items-center col-span-4">
                <div>Category</div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(true)
                    setSelectedParentId(undefined)
                  }}
                  size="icon"
                  className="h-8 w-8"
                >
                  <PlusIcon />
                </Button>
              </div>
              <CategorySortDropdown
                title="Products"
                field="productCount"
                sortBy={sortBy}
                order={order}
                sortByField={sortByField}
              />
              <CategorySortDropdown
                title="Sales"
                field="sales"
                sortByField={sortByField}
                sortBy={sortBy}
                order={order}
              />
            </div>
            <div className="text-right w-32 font-medium text-sm">Actions</div>
          </div>
          {categories.map((c) => (
            <CategoryTree
              key={c.id}
              category={c}
              openAddCategoryModal={(parentId) => {
                setIsCreateModalOpen(true)
                setSelectedParentId(parentId)
              }}
            />
          ))}
        </div>
      </div>
      <EditCategoryModal editCategory={editCategory} />
      <DeleteRecordsModal
        deleteInUI={(ids) => deleteCategory(ids[0] as number)}
        entityName="categories"
      />

      <CreateCategoryModal
        parentId={selectedParentId}
        addCategory={addCategory}
        isOpen={isCreateModalOpen}
        open={() => setIsCreateModalOpen(true)}
        close={() => setIsCreateModalOpen(false)}
      />
    </>
  )
}
