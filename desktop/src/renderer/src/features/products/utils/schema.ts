import { z } from 'zod'
import { VALID_SLUG_REGEX } from '@renderer/common/constants'

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Product name is empty' })
    .max(120, { message: 'Product name is too long' }),
  slug: z
    .string()
    .min(1, { message: 'Product slug is empty' })
    .max(120, { message: 'Product slug is too long' })
    .regex(VALID_SLUG_REGEX, { message: 'Invalid slug' }),
  desc: z.string().nonempty({ message: 'Please provide a description' }),
  price: z.coerce
    .number<number>({ message: 'Price must be a number' })
    .gte(0.01, { message: 'Price cannot be less than 0.01' }),
  inStock: z.coerce
    .number<number>({ message: 'In stock must not be empty' })
    .nonnegative({
      message: 'The number of products in stock must be non-negative'
    })
    .int({ message: 'Please provide how many products in stock' }),
  categoryIds: z
    .number()
    .int()
    .gte(1)
    .array()
    .min(1, { message: 'Please select at least 1 category' }),
  status: z.enum(['Active', 'Draft', 'Archived'])
})
