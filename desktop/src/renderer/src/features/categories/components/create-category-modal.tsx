import { Button } from '@renderer/features/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/features/ui/dialog'
import { Form } from '@renderer/features/ui/form'
import { CategoryFormFields } from './fields'
import { Loader2 } from 'lucide-react'
import { Category } from '../types'
import { useCreateCategory } from '../hooks'
import { ReactEventHandler, useState } from 'react'
import { CategoryParents } from './parents'
import { PlusIcon } from '@heroicons/react/24/outline'

interface CreateCategoryModalProps {
  parents: Category | null
  addCategory: (newCategory: Category) => void
}

export function CreateCategoryModal({ parents, addCategory }: CreateCategoryModalProps) {
  const { loading, handleSubmit, form } = useCreateCategory(addCategory, parents?.id)
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit: ReactEventHandler<HTMLFormElement> = async (e) => {
    await handleSubmit(e)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>Create new category for better products filtering</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <CategoryFormFields form={form} loading={loading} />
            <CategoryParents parents={parents} />

            <DialogFooter>
              <div className="flex items-center gap-x-4">
                <Button
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                  type="reset"
                  variant="outline"
                >
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
