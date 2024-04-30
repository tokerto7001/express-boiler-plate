import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import AppError from './appError';

export default class ErrorHandler {
    static convert = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return async (err: any, req: Request, res: Response, next: NextFunction) => {
            let error = err;
            if (!(error instanceof AppError)) {
                switch (error.name) {
                    case 'AxiosError':
                        error.statusCode =
                            error?.response?.data?.error?.statusCode ||
                            httpStatus.INTERNAL_SERVER_ERROR;
                        error.message =
                            error?.response?.data?.message ||
                            'Something went wrong';
                        error.isOperational = false;
                        break;
                    default:
                        error.statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
                        error.code = error.code || error.errorCode || 1000;
                        error.isOperational = false;
                        break;
                }
                // recreate the error object with the new arguments
                error = new AppError(
                    error.statusCode,
                    error.message,
                    error.isOperational,
                    error.name,
                    error.stack,
                );
            }
            // pass the error to the actual error handler middleware
            next(error);
        };
    };

    static handle = () => {
        return async (err: AppError, req: Request, res: Response, _next: NextFunction) => {
            // clear cookie if authorized
            console.log('ENV:', process.env.NODE_ENV);
            if (process.env.NODE_ENV === 'production') {
                this.sendErrorProd(err, req, res);
            } else {
                this.sendErrorDev(err, res);
            }
        };
    };

    private static sendErrorDev = (err: AppError, res: Response) => {
        // 1) log error to console
        console.log(`💥💥💥💥💥💥💥💥💥💥💥💥💥${err.name}💥💥💥💥💥💥💥💥💥💥💥💥💥`);
        console.log('headersSent: ?', res.headersSent);
        console.log('isOperational: ?', err.isOperational);
        console.log(err.message);
        console.log('-------------stack----------------');
        console.log(err.stack);
        console.log('💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥');

        // 2) send error message to client
        if (res.headersSent) return;
        res.status(err.statusCode).send({
            status: err.status,
            data: [],
            meta: {},
            error: {
                detail: err.message,
            },
            stack: err.stack,
        });
    };

    private static sendErrorProd = (err: AppError, req: Request, res: Response) => {
        // console.log(err)
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            // check if the headers is sent
            if (res.headersSent) {
                console.log(`💥💥💥💥💥💥💥💥💥💥💥💥💥${err.name}💥💥💥💥💥💥💥💥💥💥💥💥💥`);
                console.log('headersSent: ?', res.headersSent);
                console.log('isOperational: ?', err.isOperational);
                console.log(err.message);
                console.log('-------------stack----------------');
                console.log(err.stack);
                console.log('💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥');
            } else {
                res.status(err.statusCode).send({
                    status: err.status,
                    data: [],
                    meta: {},
                    error: {
                        detail: 'Something went wrong!',
                    },
                });
            }
            // Programming or other unknown error: don't leak error details
        } else {
            console.log(`💥💥💥💥💥💥💥💥💥💥💥💥💥${err.name}💥💥💥💥💥💥💥💥💥💥💥💥💥`);
            console.log('headersSent: ?', res.headersSent);
            console.log('isOperational: ?', err.isOperational);
            console.log(err.message);
            console.log('-------------stack----------------');
            console.log(err.stack);
            console.log('💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥');
            // check if the headers is sent
            if (!res.headersSent) {
                // send generic message
                res.status(500).send({
                    status: 'error',
                    data: [],
                    meta: {},
                    error: {
                        detail: err.message,
                    },
                });
            }
        }
    };
}
