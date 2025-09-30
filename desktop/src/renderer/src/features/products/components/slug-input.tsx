import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/features/ui/card'
import { FormField, FormItem, FormMessage } from '@renderer/features/ui/form'
import { Input } from '@renderer/features/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { ProductFormDto } from '@renderer/../../common/types'

interface SlugInputProps {
  form: UseFormReturn<ProductFormDto, any, ProductFormDto>
  loading: boolean
}

export const SlugInput = ({ form, loading }: SlugInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Slug</CardTitle>
        <CardDescription>Unique, URL-friendly name for the product</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <Input {...field} disabled={loading} placeholder="snake-plant" />
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
