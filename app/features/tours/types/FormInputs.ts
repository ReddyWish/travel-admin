import { z } from 'zod';
import { createTourFormSchema } from '~/features/tours/schemas/tour-form-schema';

export type Inputs = z.infer<ReturnType<typeof createTourFormSchema>>;
