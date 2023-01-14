import { Role } from "../models/user";

declare global {
    interface Error {
        status: string
        statusCode: number
        isOperational?: boolean
        path?: string
        value?: string
        code?: number
        errmsg?: string
    }
    namespace Express {
        interface Request {
            userId: string
            role: Role
            email: string
        }

    }
}