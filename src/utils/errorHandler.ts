import { ErrorRequestHandler } from "express"

export const errorHandler = ((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).send({
        status: err.status,
        message: err.message
    })
}) as ErrorRequestHandler