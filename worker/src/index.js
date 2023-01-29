import { logger } from './utils/index.js'
import { queueServer } from './data/index.js'

try {
    queueServer.consumer.start()
    logger.info('[server] Successfully started')
} catch (e) {
    logger.error(`[server] Error while starting ${e}`)
    throw e
}
