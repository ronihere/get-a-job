import {z} from 'zod'
export const jobFilterSchema = z.object({
    q: z.string().optional(),
    jobtypes: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(),
})

export type jobFilterSchemaType = z.infer<typeof jobFilterSchema>