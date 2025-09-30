import { slugify } from '@renderer/../../common/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/features/ui/form'
import { Input } from '@renderer/features/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { CategoryFormSchema } from '../utils'

interface CategoryFormProps {
  form: UseFormReturn<CategoryFormSchema, any, CategoryFormSchema>
  loading: boolean
}

export const CategoryFormFields = ({ form, loading }: CategoryFormProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="py-4">
            <div className="grid grid-cols-4 items-center">
              <FormLabel className="flex-1">Category</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="New Plant Species"
                  {...field}
                  onBlur={() => {
                    field.onBlur()
                    if (!form.getValues('slug')) form.setValue('slug', slugify(field.value))
                  }}
                  className="col-span-3 w-full"
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem className="py-4">
            <div className="grid grid-cols-4 items-center">
              <FormLabel className="flex-1">Slug</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="new-plant-species"
                  {...field}
                  className="col-span-3 w-full"
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
