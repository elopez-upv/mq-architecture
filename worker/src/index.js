import { logger } from './utils/index.js'
import { queueServer } from './data/index.js'
import { eventService } from './services/index.js'

try {
    queueServer.start(eventService.newIncomingEvent).then(async () => {
        logger.info('🚀 Server Successfully started')
    })
} catch (e) {
    logger.error(`[server] Error while starting ${e}`)
    throw e
}
