import { z } from 'zod';
import { requiredString } from '../util/util';



export const editProfileSchema = z.object({
    displayName: requiredString('Display Name'),
    bio: z.string().max(1000, 'Bio must be at most 1000 characters').optional()
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>;