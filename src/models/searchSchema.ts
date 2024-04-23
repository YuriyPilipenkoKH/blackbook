import {z} from 'zod'

export const searchSchema = z.object({
    query: z
        .string()
        .min(0),
})

export type searchSchemaType = z.infer<typeof searchSchema>