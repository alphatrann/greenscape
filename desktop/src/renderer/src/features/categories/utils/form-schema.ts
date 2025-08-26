import { VALID_SLUG_REGEX } from '@renderer/common/constants'
import { z } from 'zod'

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Category name must be between 1 and 60 characters' })
    .max(60, { message: 'Category name must be between 1 and 60 characters' }),
  slug: z
    .string()
    .min(1, { message: 'Slug must be between 1 and 60 characters' })
    .max(60, { message: 'Slug must be between 1 and 60 characters' })
    .regex(VALID_SLUG_REGEX, { message: 'Invalid slug provided' })
})
