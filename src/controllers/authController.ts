import { RequestHandler } from "express";
import { AuthService } from "../services/authService";
const authService = new AuthService();

export const registerUser: RequestHandler = async (req, res, next) => {
    try {
        const result = await authService.registerUser(req.body)
        res.status(200).send({ status: 'success', message: 'User register is successsful', result })
    } catch (error: any) {
        res.send({ status: 'fail', message: error.message, result: null })
    }
};

export const loginUser: RequestHandler = async (req, res, next) => {
    try {
        const result = await authService.loginUser(req.body);
        res
            .cookie('token', result.token, result.cookieConfig)
            .status(201).send({ status: 'success', message: 'User login is successsful', result: {} })
    } catch (error: any) {
        res.send({ status: 'fail', message: error.message, result: null })
    }
}