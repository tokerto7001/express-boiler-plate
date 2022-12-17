import { User, UserDoc } from "../models/user";
import bcrypt from 'bcrypt';

export interface RegisterBody {
    firstName: string
    lastName: string
    email: string
    password: string
}

export class AuthService {
    constructor() { }

    public registerUser = async (body: RegisterBody): Promise<UserDoc> => {
        const { firstName, lastName, email, password } = body;
        const alreadyExist = await User.findOne({ email });
        if (alreadyExist) throw Error('User already registered')
        const hashedPassword = await this.hashPassword(password);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        return user;
    };

    private hashPassword = async (password: string): Promise<string> => {
        const hashedPassword = await bcrypt.hash(password, +process.env.HASH_CYCLE!);
        return hashedPassword;
    };
}