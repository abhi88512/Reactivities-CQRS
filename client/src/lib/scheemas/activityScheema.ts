import { z } from 'zod';

export const activityScheema = z.object({
    title: z.string().min(1,{message: 'Title is required'})
})

export type ActivityScheema = z.infer<typeof activityScheema>;