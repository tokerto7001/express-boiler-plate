import { Request, Response, NextFunction } from "express"

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const catchAsyncErrors = (func: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err: Error) => next(err))
    }
}