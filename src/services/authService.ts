import { AuthHelpers, CookieData, CookieConfigOptions } from "../helpers/authHelpers";
import { MailService } from "./mailService";
import { API_URL } from "../config";
import AppError from "../utils/appError";
import { prisma } from "../clients/db";
import { TRegisterBody } from "../schemas/authSchemas";

const authHelpers = new AuthHelpers()
const mailService = new MailService()

interface ICookieData {
    token: string;
    cookieConfig: CookieConfigOptions;
}
export class AuthService {
    constructor() { }

    public registerUser = async (body: TRegisterBody): Promise<void> => {
        const { firstName, lastName, email, password } = body;

        const alreadyExist = await prisma.user.findFirst({ where: {email} });
        if (alreadyExist) throw new AppError(400, 'User already registered');

        const hashedPassword = await authHelpers.hashPassword(password!.toString());
        const user = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                roleId: 1
            }
        });

        const { token } = authHelpers.createCookie({id: user.id, roleId: 1, email: email});
        const verificationUrl = `${API_URL}/api/auth/verify/${token}`
        await mailService.sendWelcomeMail(email, firstName, lastName, verificationUrl);
    };

    public verifyUser = async (token: string): Promise<ICookieData> => {
        const verifiedToken = authHelpers.verifyToken<CookieData>(token);
        const cookieVariables = authHelpers.createCookie(verifiedToken);
        const user = await prisma.user.findFirst(
            {
                where: {
                    id: verifiedToken.id
                }
            }
        )
        if (!user) throw new AppError(400, 'User not found');
        
        await prisma.user.update({
            where: {
                id: verifiedToken.id
            },
            data: {
                isVerified: true
            }
        });
        return cookieVariables;
    }

    // public loginUser = async (body: UserAttributes): Promise<{ token: string, cookieConfig: CookieConfigOptions }> => {
    //     const { email, password } = body;
    //     const user = await User.findOne({ email });
    //     if (!user) throw new AppError('User not found!', 400);
    //     const doesMatch = await authHelpers.comparePassword(password, user.password!);
    //     if (!doesMatch) throw new AppError('Wrong password!', 400);
    //     const { token, cookieConfig } = authHelpers.createCookie(user);
    //     return { token, cookieConfig };
    // };

    // public passwordChange = async (oldPassword: string, newPassword: string, newPasswordConfirm: string): Promise<{}> => {

    //     return {}
    // }

}