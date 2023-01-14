import { Role } from "../models/user";

declare global {
    interface Error {
        status: string
        statusCode: number
        isOperational?: boolean
    }
    namespace Express {
        interface Request {
            userId: string
            role: Role
            email: string
        }

    }
}