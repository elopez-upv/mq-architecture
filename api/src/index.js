import env from './config/env.js'
import app from './server/index.js'
import { logger } from './utils/index.js'

const { PORT } = env

try {
    app.listen(PORT, (e) => {
        if (e) {
            logger.error(`[server] ${e}`)
            throw new Error(e)
        }
        logger.info('[server] Server started')
    })
} catch (e) {
    logger.error(`[server] ${e}`)
    throw e
}
