import { NextFunction, Request, Response, RequestHandler } from "express"
import AppError from "../utils/appError";
import { ZodError, z } from "zod"

export const validateRequestBody = (validationSchema: z.ZodSchema): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try{
            validationSchema.parse(req.body);
            next();
        }catch(err: unknown){
            if(err instanceof ZodError) {
                const fieldErrors = err.flatten().fieldErrors;
                let errorMessage = '';
                Object.keys(fieldErrors).length && Object.keys(fieldErrors).map((fieldErrorKey, index) => {
                    errorMessage += fieldErrorKey + ' ' + fieldErrors[fieldErrorKey]?.join('') + ', ';
                    if(index === Object.keys(fieldErrors).length - 1) errorMessage = errorMessage.slice(0, -2);
                })
                next(new AppError(500, errorMessage || 'Something went wrong!'));
            }else {
                next(new AppError(500, 'Something went wrong!'));
            }
        }
    }
}