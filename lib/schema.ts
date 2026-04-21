import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z
    .email({
      error: issue =>
        issue.input === undefined ? 'Email is required' : 'Not a valid format',
    })
    .min(1, { message: 'Email is required' }),
  firstName: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'First name is required'
          : 'Not a valid format',
    })
    .min(1, { message: 'First name is required' }),
  lastName: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Last name is required'
          : 'Not a valid format',
    })
    .min(1, { message: 'Last name is required' }),
});
