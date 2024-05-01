import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HASH_CYCLE, JWT_SECRET_KEY } from '../config';

export interface CookieConfigOptions {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax'
}

export interface CookieData {
    id: number;
    roleId: number;
    email: string;
    iat?: number
};

export class AuthHelpers {
    constructor() { }

    public hashPassword = async (password: string): Promise<string> => {
        const hashedPassword = await bcrypt.hash(password, HASH_CYCLE!);
        return hashedPassword;
    };

    public createCookie = (user: CookieData): { token: string, cookieConfig: CookieConfigOptions } => {
        const { id, roleId, email } = user;
        const token = jwt.sign({
            id, roleId, email
        }, JWT_SECRET_KEY!,
            {
                noTimestamp: true
            }
        );
        const cookieConfig: CookieConfigOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        }
        return { token, cookieConfig };
    }

    public verifyToken = <T>(token: string): T => {
        try {
            const verifiedToken = jwt.verify(token, JWT_SECRET_KEY)
            return verifiedToken as T
        } catch (err) {
            throw err
        }
    }

    public comparePassword = async (newPassword: string, oldPassword: string): Promise<boolean> => {
        return await bcrypt.compare(newPassword, oldPassword)
    }

    public parseCookie = async (token: string): Promise<any> => {
        if (token) {
            return jwt.verify(token, JWT_SECRET_KEY!);
        } else {
            return null;
        }
    }
}