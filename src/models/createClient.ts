
import { z, ZodType } from 'zod';

export const createClientSchema: ZodType<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

}> = z.object({
    firstName: z
    .string()
    .min(3, 'FirstName should be at least 3 characters long')
    .regex(/^[a-zA-Z]+$|^[0-9]+$|^[\w\s]+$|^[\w\s_]+$/, { 
        message: "Use letters, numbers & underscore" 
    }),      
    lastName: z
    .string()
    .min(3, 'LastName should be at least 3 characters long')
    .regex(/^[a-zA-Z]+$|^[0-9]+$|^[\w\s]+$|^[\w\s_]+$/, { 
        message: "Use letters, numbers & underscore" 
    }),
    email: z
    .string()
    .email('Email is not valid')
    .refine((val) => !val.toLowerCase().startsWith('admin'), {
        message: 'Enter a different email address'
      })  
    .refine((val) => !val.endsWith('.ru'), {
        message: 'Domain is not supported'
      })
    // .refine(async (fieldValue) => {
    //     const result = await emailAvailable(fieldValue);
    //     return result === undefined;
    // }, {
    //     message: 'Email already exists'
    // })  
    ,      
    phone: z
    .string()
    .min(10, "Valid phone format: 095 345 6789")
    .refine((val) => val === '' || /^\d{10}$/.test(val), { 
        // Remove regex if field is empty
        message: "Valid phone format: 095 345 6789"
    }),

    
})

export type createClientSchemaType = z.infer<typeof createClientSchema>

