import { Card, CardContent, CardHeader, CardTitle } from '@renderer/features/ui/card'
import { FormField, FormItem, FormLabel } from '@renderer/features/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/features/ui/select'
import { UseFormReturn } from 'react-hook-form'
import { ProductFormDto, Status } from '@renderer/../../common/types'

interface StatusSelectProps {
  form: UseFormReturn<ProductFormDto, any, ProductFormDto>
  loading: boolean
}

export const StatusSelect = ({ form, loading }: StatusSelectProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="status"
            render={() => (
              <FormItem className="grid gap-3">
                <FormLabel htmlFor="status">Status</FormLabel>
                <Select
                  onValueChange={(value) => value && form.setValue('status', value as Status)}
                  value={form.getValues('status')}
                  disabled={loading}
                >
                  <SelectTrigger className="w-full" id="status" aria-label="Select status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Status).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
