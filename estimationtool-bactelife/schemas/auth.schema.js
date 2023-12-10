import { z } from 'zod';

export const authSchema = z.object({
    user: z.string({
        required_error: 'User is required'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(5, {
        message: 'Password must be at 5 characters'
    })
});

export const authUpdateSchema = z.object({
    user: z.string({
        required_error: 'User is required'
    }).optional(),
    password: z.string({
        required_error: 'Password is required'
    }).min(5, {
        message: 'Password must be at 5 characters'
    }).optional()
});