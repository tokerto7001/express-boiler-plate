import jwt, { JwtPayload } from 'jsonwebtoken';
import { CookieConfigOptions } from "../types/cookieConfigOptions";
import bcrypt from 'bcrypt';
import { UserDoc } from "../models/user";

export class AuthHelpers {
    constructor() { }

    public hashPassword = async (password: string): Promise<string> => {
        const hashedPassword = await bcrypt.hash(password, +process.env.HASH_CYCLE!);
        return hashedPassword;
    };

    public createCookie = (user: UserDoc): { token: string, cookieConfig: CookieConfigOptions } => {
        const { id, role, email } = user;
        const token = jwt.sign({
            id, role, email
        }, process.env.JWT_SECRET_KEY!,
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
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            return verifiedToken as UserDoc
        } catch (err) {
            throw err
        }
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