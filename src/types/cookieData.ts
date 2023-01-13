import { Role } from "../models/user";

export interface CookieData {
    id: string;
    role: Role;
    email: string;
    iat?: number
};