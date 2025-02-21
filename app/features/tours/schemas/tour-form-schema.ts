import { z } from 'zod';

export function createTourFormSchema(availableCurrencyIds: string[]) {
  return z.object({
    title: z
      .string({ required_error: 'Tour Title is required' })
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must not exceed 100 characters'),

    shortDescription: z.union([
      z
        .string()
        .min(10, 'Short description must be at least 10 characters')
        .max(200, 'Short description must not exceed 200 characters'),
      z.string().length(0),
      z.undefined(),
    ]),

    description: z
      .string({ required_error: 'Description is required' })
      .min(3, 'Description must be at least 10 characters')
      .max(5000, 'Description must not exceed 5000 characters'),

    isBestSeller: z.boolean().default(false),

    location: z.union([
      z
        .string()
        .min(3, 'Location must be at least 10 characters')
        .max(30, 'Location must not exceed 30 characters'),
      z.string().length(0),
      z.undefined(),
    ]),

    durationDays: z
      .number({
        required_error: 'Duration is required and must be at least 1 day',
      })
      .int('Duration must be a whole number')
      .min(1, 'Duration must be at least 1 day')
      .max(50, 'Duration cannot exceed 50 days'),

    categoryIds: z.array(z.string()).nonempty('Select at least one category'),

    price: z
      .array(
        z.object({
          currencyId: z.string().nonempty('Currency is required'),
          amount: z
            .number()
            .positive('Price must be greater than zero')
            .max(1000000, 'Price cannot exceed 1,000,000'),
          comment: z
            .string()
            .max(200, 'Comment must not exceed 200 characters')
            .optional(),
        }),
      )
      .refine(
        (prices) => {
          return availableCurrencyIds.every((currencyId) =>
            prices.some((price) => price.currencyId === currencyId),
          );
        },
        {
          message: `Prices must be provided for all available currencies: ${availableCurrencyIds.join(', ')}`,
        },
      ),

    program: z
      .array(
        z.object({
          order: z.number().int('Order must be a whole number'),
          startTime: z
            .string()
            .min(1, 'Start time must be at least one symbol long')
            .max(30, 'Start time must not exceed 30 symbols'),
          title: z
            .string()
            .min(3, 'Title must be at least 3 characters')
            .max(100, 'Title must not exceed 3 characters'),
          description: z
            .string()
            .min(10, 'Description must be at least 10 characters')
            .max(1000, 'Description must not exceed 50 characters'),
        }),
      )
      .optional()
      .default([]),

    images: z
      .array(
        z.object({
          url: z.string().url('Invalid URL format'),
          isPrimary: z.boolean().default(false),
        }),
      )
      .optional()
      .default([]),

    inclusions: z
      .array(
        z.object({
          description: z
            .string()
            .min(3, 'Tour inclusion must be at least 3 characters')
            .max(30, 'Tour inclusion must not exceed 30 characters'),
        }),
      )
      .optional()
      .default([]),

    exclusions: z
      .array(
        z.object({
          description: z
            .string()
            .min(3, 'Tour exclusion must be at least 3 characters')
            .max(30, 'Tour exclusion must not exceed 30 characters'),
        }),
      )
      .optional()
      .default([]),

    accommodations: z
      .array(
        z.object({
          stars: z.enum(['THREE_STAR', 'FOUR_STAR', 'FIVE_STAR'], {
            errorMap: () => ({ message: 'Invalid star rating' }),
          }),
          hotelName: z
            .string()
            .min(2, 'Hotel name must be at least 2 characters')
            .max(30, 'Hotel name must not exceed 30 characters'),
        }),
      )
      .optional()
      .default([]),
  });
}
