import { startStandaloneServer } from '@apollo/server/standalone'

import server from './server/index.js'
import { logger } from './utils/index.js'

try {
    const { url } = await startStandaloneServer(server)
    logger.info(`🚀 Server ready at ${url}`)
} catch (e) {
    logger.error(`[server] ${e}`)
    throw e
}
