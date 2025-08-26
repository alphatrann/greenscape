import { Button } from '@renderer/features/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@renderer/features/ui/dialog'
import { Form } from '@renderer/features/ui/form'
import { Loader2 } from 'lucide-react'
import { CategoryFormFields } from './fields'
import { CategoryParents } from './parents'
import { Category } from '../types'
import { useEditCategory, useEditCategoryModal } from '../hooks'

interface EditCategoryModalProps {
  parents: Category | null
  editCategory: (category: Category) => void
}

export function EditCategoryModal({ parents, editCategory }: EditCategoryModalProps) {
  const { isOpen, onClose, currentCategory } = useEditCategoryModal()
  const { loading, handleSubmit, form } = useEditCategory(currentCategory, editCategory)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <CategoryFormFields form={form} loading={loading} />
            <CategoryParents parents={parents} />
            <DialogFooter>
              <div className="flex items-center gap-x-4">
                <Button onClick={onClose} disabled={loading} type="button" variant="outline">
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Edit
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
