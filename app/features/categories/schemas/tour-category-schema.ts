import { z } from 'zod';

export const tourCategorySchema = z.object({
  name: z
    .string({ required_error: 'Category name is required' })
    .min(2, 'Category name must be at least 2 characters')
    .max(30, 'Category name cannot exceed 30 characters'),
  image: z
    .object({
      id: z.string().optional(),
      imageUrl: z.string().optional(),
      file: z.any().optional(),
    })
    .refine((data) => data.imageUrl || data.file, {
      message: 'Image is required',
    }),
  description: z
    .string()
    .max(300, 'Category description cannot exceed 300 characters')
    .optional(),
});
