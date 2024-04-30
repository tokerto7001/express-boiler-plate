// import { RequestHandler } from "express";
// import { AuthService } from "../services/authService";
// import { catchAsyncErrors } from "../utils/catchAsyncErrors";
// const authService = new AuthService();

// export const registerUser: RequestHandler = catchAsyncErrors(async (req, res, next) => {
//     const result = await authService.registerUser(req.body)
//     res.status(201).send({ status: 'success', message: 'User register is successsful', result })
// });

// export const verifyUser: RequestHandler = catchAsyncErrors(async (req, res, next) => {
//     const result = await authService.verifyUser(req.params.token)
//     res
//         .cookie('token', result.token, result.cookieConfig)
//         .redirect('/client-url')
// });

// export const loginUser: RequestHandler = catchAsyncErrors(async (req, res, next) => {
//     const result = await authService.loginUser(req.body);
//     res
//         .cookie('token', result.token, result.cookieConfig)
//         .status(201).send({ status: 'success', message: 'User login is successsful', result: {} })
// });