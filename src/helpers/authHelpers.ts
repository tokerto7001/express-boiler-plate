import jwt from 'jsonwebtoken';
import { CookieConfigOptions } from "../types/cookieConfigOptions";
import bcrypt from 'bcrypt';
import { HASH_CYCLE, JWT_SECRET_KEY } from '../config';
import { CookieData } from '../types/cookieData';

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

    public verifyToken = (token: string) => {
        try {
            const verifiedToken = jwt.verify(token, JWT_SECRET_KEY)
            return verifiedToken as CookieData
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