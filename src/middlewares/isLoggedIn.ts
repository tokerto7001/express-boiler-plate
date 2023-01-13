import { RequestHandler } from "express";
import { AuthHelpers } from "../utils/authHelpers";
const authHelpers = new AuthHelpers();

export const isLoggedIn: RequestHandler = async (req, res, next) => {
    const token = await authHelpers.parseCookie(req.cookies.token)
    if (token) {
        req.userId = token.id;
        req.role = token.role;
        req.email = token.email;
        return next()
    } else {
        res.status(401).send({ status: 'fail', message: 'Unauthorized', result: null })
    }
}