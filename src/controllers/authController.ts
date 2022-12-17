import { RequestHandler } from "express";
import { AuthService } from "../services/authService";
const authService = new AuthService();

export const registerUser: RequestHandler = async (req, res, next) => {
    try {
        const result = await authService.registerUser(req.body)
        res.send({ status: 'success', message: 'User register is successsful', result })
    } catch (error: any) {
        res.send({ status: 'fail', message: error.message, result: null })
    }
}