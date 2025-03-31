import { z } from 'zod';
import { PASSWORD_REGEX } from '~/shared/constants/regexps';

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email address format'),

  password: z.string({
    required_error: 'Password is required',
  }),
});
