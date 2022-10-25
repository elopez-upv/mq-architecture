import dotenv from 'dotenv'

dotenv.config()

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_NAME: process.env.APP_NAME || 'API',
    PORT: process.env.PORT || '3000',
    LOG_FILENAME: process.env.LOG_FILENAME || 'api',
    ENABLE_LOG_FILE: process.env.ENABLE_LOG_FILE || 'false'
}

export default env
