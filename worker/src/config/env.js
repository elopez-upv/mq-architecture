import dotenv from 'dotenv'

dotenv.config()

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_NAME: process.env.APP_NAME || 'WORKER',
    LOG_FILENAME: process.env.LOG_FILENAME || 'worker',
    ENABLE_LOG_FILE: process.env.ENABLE_LOG_FILE || 'false',
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'git-events',
    KAFKA_BROKER: process.env.KAFKA_BROKER || 'localhost:9092',
    KAFKA_TOPIC: process.env.KAFKA_TOPIC || 'git-events',
    KAFKA_TOPIC_RESULTS: process.env.KAFKA_TOPIC_RESULTS || 'git-events-results',
    KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || 'worker-consumer',
    FILE_DIR: process.env.FILE_DIR || './files'
}

export default env
