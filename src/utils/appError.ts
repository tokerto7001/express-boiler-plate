export class AppError extends Error {
    constructor(message: string, statusCode: number) {
        super(message)

        this.statusCode = statusCode
        this.status = statusCode >= 500 ? 'error' : 'fail'
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}