import { User, UserDoc } from "../models/user";
import { UserAttributes } from '../models/user';
import { CookieConfigOptions } from "../types/cookieConfigOptions";
import { AuthHelpers } from "../utils/authHelpers";
const authHelpers = new AuthHelpers()

export class AuthService {
    constructor() { }

    public registerUser = async (body: UserAttributes): Promise<UserDoc> => {
        const { firstName, lastName, email, password } = body;
        const alreadyExist = await User.findOne({ email });
        if (alreadyExist) throw Error('User already registered')
        const hashedPassword = await authHelpers.hashPassword(password.toString());
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        return user;
    };

    public loginUser = async (body: UserAttributes): Promise<{ token: string, cookieConfig: CookieConfigOptions }> => {
        const { email, password } = body;
        const user = await User.findOne({ email });
        if (!user) throw Error('User not found!');
        const doesMatch = await authHelpers.comparePassword(password, user.password);
        if (!doesMatch) throw Error('Wrong password!');
        const { token, cookieConfig } = await authHelpers.createCookie(user);
        return { token, cookieConfig };
    };

    public passwordChange = async (oldPassword: string, newPassword: string, newPasswordConfirm: string): Promise<{}> => {

        return {}
    }

}