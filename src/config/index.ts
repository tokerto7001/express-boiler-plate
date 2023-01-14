let PORT: number
let MONGODB_CONNECTION_URL: string
let HASH_CYCLE: number
let JWT_SECRET_KEY: string
let SENDGRID_API_KEY: string
let SENDGRID_FROM: string
let NODE_ENV: string
let API_URL: string

if (process.env.NODE_ENV === 'development') {
    PORT = +process.env.PORT_DEV
    MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL_DEV
    HASH_CYCLE = +process.env.HASH_CYCLE
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY_DEV
    SENDGRID_API_KEY = process.env.SENDGRID_API_KEY_DEV
    SENDGRID_FROM = process.env.SENDGRID_FROM_DEV
    NODE_ENV = process.env.NODE_ENV
    API_URL = process.env.API_URL_DEV
} else {
    PORT = +process.env.PORT_PROD
    MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL_DEV
    HASH_CYCLE = +process.env.HASH_CYCLE
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY_DEV
    SENDGRID_API_KEY = process.env.SENDGRID_API_KEY_DEV
    SENDGRID_FROM = process.env.SENDGRID_FROM_DEV
    NODE_ENV = process.env.NODE_ENV
    API_URL = process.env.API_URL_DEV
}

export {
    PORT,
    MONGODB_CONNECTION_URL,
    HASH_CYCLE,
    JWT_SECRET_KEY,
    SENDGRID_API_KEY,
    SENDGRID_FROM,
    NODE_ENV,
    API_URL
}