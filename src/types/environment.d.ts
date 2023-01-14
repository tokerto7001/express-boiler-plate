declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HASH_CYCLE: number
            NODE_ENV: 'production' | 'development'

            SENDGRID_API_KEY_DEV: string
            JWT_SECRET_KEY_DEV: string
            MONGODB_CONNECTION_URL_DEV: string
            PORT_DEV: 8080
            SENDGRID_FROM_DEV: string
            API_URL_DEV: string

            SENDGRID_API_KEY_PROD: string
            JWT_SECRET_KEY_PROD: string
            MONGODB_CONNECTION_URL_PROD: string
            PORT_PROD: 8080
            SENDGRID_FROM_PROD: string
            API_URL_PROD: string
        }
    }
}
export { } // This is important otherwise it does not work!!!