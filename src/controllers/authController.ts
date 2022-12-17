import { RequestHandler } from "express";
import { AuthService } from "../services/authService";
const authService = new AuthService();

export const registerUser: RequestHandler = (req, res, next) => {
    try {
        const result = authService.registerUser(req.body)
        res.send({ status: 'success', message: 'User register is successsful', result })
    } catch (error) {
        console.log(error)
    }
}