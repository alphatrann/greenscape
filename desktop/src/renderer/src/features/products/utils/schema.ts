import { z } from 'zod'
import { VALID_SLUG_REGEX } from '@renderer/common/constants'

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { error: 'Product name is empty' })
    .max(120, { error: 'Product name is too long' }),
  slug: z
    .string()
    .min(1, { error: 'Product slug is empty' })
    .max(120, { error: 'Product slug is too long' })
    .regex(VALID_SLUG_REGEX, { error: 'Invalid slug' }),
  desc: z.string().nonempty({ error: 'Please provide a description' }),
  price: z.coerce
    .number<number>({ error: 'Price must be a number' })
    .gte(0.01, { error: 'Price cannot be less than 0.01' }),
  inStock: z.coerce
    .number<number>()
    .nonnegative({
      error: 'The number of products in stock must be non-negative'
    })
    .int({ error: 'Please provide how many products in stock' }),
  categoryIds: z
    .number()
    .int()
    .gte(1)
    .array()
    .min(1, { error: 'Please select at least 1 category' }),
  status: z.enum(['Active', 'Draft', 'Archived'])
})
