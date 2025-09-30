import { Button } from '@renderer/features/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@renderer/features/ui/dialog'
import { Form } from '@renderer/features/ui/form'
import { CategoryFormFields } from './fields'
import { Loader2 } from 'lucide-react'
import { Category } from '@renderer/../../common/types'
import { useCreateCategory } from '../hooks'

interface CreateCategoryModalProps {
  parentId?: number
  addCategory: (newCategory: Category) => void
  isOpen: boolean
  open: () => void
  close: () => void
}

export function CreateCategoryModal({
  parentId,
  addCategory,
  isOpen,
  open,
  close
}: CreateCategoryModalProps) {
  const { loading, handleSubmit, form } = useCreateCategory(addCategory, close, parentId)

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? close : open}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>Create new category for better products filtering</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <CategoryFormFields form={form} loading={loading} />

            <DialogFooter>
              <div className="flex items-center gap-x-4">
                <Button onClick={close} disabled={loading} type="reset" variant="outline">
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
