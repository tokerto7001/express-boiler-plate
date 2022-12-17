
export interface RegisterBody {
    firstName: string
    lastName: string
    email: string
    password: string
}

export class AuthService {
    constructor() { }

    public registerUser(body: RegisterBody): string | null {
        try {
            return 'ok';
        } catch (error) {
            return null;
        }
    }
}