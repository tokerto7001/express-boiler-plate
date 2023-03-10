import { User } from "../models/user";
import { UserAttributes } from '../models/user';
import { CookieConfigOptions } from "../types/cookieConfigOptions";
import { AuthHelpers } from "../helpers/authHelpers";
import { MailService } from "./mailService";
import { API_URL } from "../config";
import { CookieData } from "../types/cookieData";
import { AppError } from "../utils/appError";

const authHelpers = new AuthHelpers()
const mailService = new MailService()

export class AuthService {
    constructor() { }

    public registerUser = async (body: UserAttributes): Promise<string> => {
        const { firstName, lastName, email, password } = body;
        const alreadyExist = await User.findOne({ email });
        if (alreadyExist) throw new AppError('User already registered', 400)
        const hashedPassword = await authHelpers.hashPassword(password.toString());
        const user = await User.create(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        );
        const { token } = authHelpers.createCookie(user as CookieData)
        const verificationUrl = `${API_URL}/api/auth/verify/${token}`
        await mailService.sendWelcomeMail(email, firstName!, lastName!, verificationUrl)
        delete user.password
        return 'ok';
    };

    public verifyUser = async (token: string): Promise<{ token: string, cookieConfig: CookieConfigOptions }> => {
        const verifiedToken = authHelpers.verifyToken(token)
        const cookieVariables = authHelpers.createCookie(verifiedToken)
        const user = await User.findOne(
            {
                id: verifiedToken.id
            }
        )
        if (!user) throw new AppError('User not found', 400)
        user.isVerified = true;
        await user.save()
        return cookieVariables
    }

    public loginUser = async (body: UserAttributes): Promise<{ token: string, cookieConfig: CookieConfigOptions }> => {
        const { email, password } = body;
        const user = await User.findOne({ email });
        if (!user) throw new AppError('User not found!', 400);
        const doesMatch = await authHelpers.comparePassword(password, user.password!);
        if (!doesMatch) throw new AppError('Wrong password!', 400);
        const { token, cookieConfig } = authHelpers.createCookie(user);
        return { token, cookieConfig };
    };

    public passwordChange = async (oldPassword: string, newPassword: string, newPasswordConfirm: string): Promise<{}> => {

        return {}
    }

}