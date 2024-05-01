import { z } from "zod";

export type TRegisterBody = z.infer<typeof registerSchema>;
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
}).strict();

export type TVerifyUserParam = z.infer<typeof verifyUserSchema>;
export const verifyUserSchema = z.object({
        token: z
                .string()
                .min(30)
});