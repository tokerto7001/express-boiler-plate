import { User, UserDoc } from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserAttributes } from '../models/user';
import { CookieConfigOptions } from "../types/cookieConfigOptions";

export class AuthService {
    constructor() { }

    public registerUser = async (body: UserAttributes): Promise<UserDoc> => {
        const { firstName, lastName, email, password } = body;
        const alreadyExist = await User.findOne({ email });
        if (alreadyExist) throw Error('User already registered')
        const hashedPassword = await this.hashPassword(password);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        return user;
    };

    public loginUser = async (body: UserAttributes): Promise<{ token: string, cookieConfig: CookieConfigOptions }> => {
        const { email, password } = body;
        const user = await User.findOne({ email });
        if (!user) throw Error('User not found!');
        const doesMatch = await bcrypt.compare(password, user.password);
        if (!doesMatch) throw Error('Wrong password!');
        const { token, cookieConfig } = this.createCookie(user);
        return { token, cookieConfig };
    };

    private hashPassword = async (password: string): Promise<string> => {
        const hashedPassword = await bcrypt.hash(password, +process.env.HASH_CYCLE!);
        return hashedPassword;
    };

    private createCookie = (user: UserDoc): { token: string, cookieConfig: CookieConfigOptions } => {
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
}