import { Role } from "../models/user";

declare global {
    namespace Express {
        interface Request {
            userId: string
            role: Role
            email: string
        }
    }
}