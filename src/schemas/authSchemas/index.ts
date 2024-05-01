import { z } from "zod";

export type registerBody = z.infer<typeof registerSchema>;
export const registerSchema = z.object({
    firstName: z
                .string()
                .min(2),
    lastName: z
                .string()
                .min(2),
    email: z
            .string()
            .email(),
    password: z
                .string()
                .min(6)
})