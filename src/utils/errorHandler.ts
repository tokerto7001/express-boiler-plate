import { ErrorRequestHandler, Response } from "express"
import { NODE_ENV } from "../config"
import { AppError } from "./appError"

export const errorHandler = ((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (NODE_ENV === 'production') {
        let error = { ...err } // copy the err object
        if (error.name === 'CastError') error = handleCastErrorDB(error)
        sendErrorProd(error, res)
    }

}) as ErrorRequestHandler

const sendErrorDev = (err: Error, res: Response) => {
    res.status(err.statusCode).send({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}

const sendErrorProd = (err: Error, res: Response) => {
    if (err.isOperational) { // onyl send the error details if it is handled by us
        res.status(err.statusCode).send({
            status: err.status,
            message: err.message,
        })
    } else {
        console.error('ERROR 💥', err)

        res.status(err.statusCode).send({
            status: 500,
            message: 'Something went very wrong!',
        })
    }

}

const handleCastErrorDB = (err: Error) => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}