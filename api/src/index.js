import { startStandaloneServer } from '@apollo/server/standalone'
import { queueServer } from './data/index.js'
import { event } from './controllers/index.js'
import server from './server/index.js'
import { logger } from './utils/index.js'

try {
    queueServer.start(event.newEventResultAction).then(async () => {
        const { url } = await startStandaloneServer(server)
        logger.info(`🚀 Server ready at ${url}`)
    })
} catch (e) {
    logger.error(`[server] ${e}`)
    throw e
}
