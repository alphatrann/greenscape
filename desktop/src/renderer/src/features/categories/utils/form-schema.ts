import { VALID_SLUG_REGEX } from '@renderer/common/constants'
import { z } from 'zod'
import { MAX_CATEGORY_LENGTH } from '../constants'

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Category name must be between 1 and 60 characters' })
    .max(MAX_CATEGORY_LENGTH, { message: 'Category name must be between 1 and 60 characters' }),
  slug: z
    .string()
    .min(1, { message: 'Slug must be between 1 and 60 characters' })
    .max(MAX_CATEGORY_LENGTH, { message: 'Slug must be between 1 and 60 characters' })
    .regex(VALID_SLUG_REGEX, { message: 'Invalid slug provided' })
})

export type CategoryFormSchema = z.infer<typeof formSchema>
