import { logger, dateManager } from '../utils/index.js'
import { queueServer, gitClient, codeExecutor } from '../data/index.js'
import makeEventService from './event.js'

const eventService = makeEventService({ logger, queueServer, gitClient, codeExecutor, dateManager })

export {
    // eslint-disable-next-line import/prefer-default-export
    eventService
}
