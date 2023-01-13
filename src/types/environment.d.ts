declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SENDGRID_API_KEY: string
            JWT_SECRET_KEY: string
            HASH_CYCLE: number
            MONGODB_CONNECTION_URL: string
            PORT: 8080
            SENDGRID_TO: string
            NODE_ENV: 'production' | 'development'
            API_URL: string
        }
    }
}
export { } // This is important otherwise it does not work!!!