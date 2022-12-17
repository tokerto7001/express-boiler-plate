import { NextFunction, Request, Response } from "express";

export const checkBodyProperties = (bodyElements: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const lackingFields: string[] = [];
        bodyElements.map((element: string) => {
            if (!req.body[element]) {
                lackingFields.push(element);
            }
        })
        if (lackingFields.length) {
            return res.status(400).send({ status: 'fail', message: `Properties ${lackingFields.toString()} not provided` });
        }
        next();
    };
};