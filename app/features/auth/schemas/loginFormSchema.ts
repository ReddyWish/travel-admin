import { z } from 'zod';
import { PASSWORD_REGEX } from '~/shared/constants/regexps';

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email address format'),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters long')
    .refine((password) => PASSWORD_REGEX.test(password), {
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long',
    }),
});
