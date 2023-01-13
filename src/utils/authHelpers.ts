import jwt from 'jsonwebtoken';
import { CookieConfigOptions } from "../types/cookieConfigOptions";
import bcrypt from 'bcrypt';
import { UserDoc } from "../models/user";
import { CookieData } from '../types/cookieData';

export class AuthHelpers {
    constructor() { }

    public hashPassword = async (password: string): Promise<string> => {
        const hashedPassword = await bcrypt.hash(password, +process.env.HASH_CYCLE!);
        return hashedPassword;
    };

    public createCookie = async (user: UserDoc): Promise<{ token: string, cookieConfig: CookieConfigOptions }> => {
        const { id, role, email } = user;
        const token = jwt.sign({
            id, role, email
        }, process.env.JWT_SECRET_KEY!);
        const cookieConfig: CookieConfigOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        }
        return { token, cookieConfig };
    }

    public comparePassword = async (newPassword: string, oldPassword: string): Promise<boolean> => {
        return await bcrypt.compare(newPassword, oldPassword)
    }

    public parseCookie = async (token: string): Promise<any> => {
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET_KEY!);
        } else {
            return null;
        }
    }
}