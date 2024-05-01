import { AuthHelpers } from "../helpers/authHelpers";
import { MailService } from "./mailService";
import { API_URL } from "../config";
import AppError from "../utils/appError";
import { prisma } from "../clients/db";
import { registerBody } from "../schemas/authSchemas";

const authHelpers = new AuthHelpers()
const mailService = new MailService()

export class AuthService {
    constructor() { }

    public registerUser = async (body: registerBody): Promise<void> => {
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

    // public verifyUser = async (token: string): Promise<{ token: string, cookieConfig: CookieConfigOptions }> => {
    //     const verifiedToken = authHelpers.verifyToken(token)
    //     const cookieVariables = authHelpers.createCookie(verifiedToken)
    //     const user = await User.findOne(
    //         {
    //             id: verifiedToken.id
    //         }
    //     )
    //     if (!user) throw new AppError('User not found', 400)
    //     user.isVerified = true;
    //     await user.save()
    //     return cookieVariables
    // }

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