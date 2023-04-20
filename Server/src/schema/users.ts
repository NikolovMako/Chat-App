import { z } from "zod"

export const userSchema = z.object({
    username: z.string().min(8, 'Username 8 chars min').max(30, 'Username 30 chars max'),
    password: z.string().min(8, 'Password 8 chars min').max(30, "Password 30 chars max")
});