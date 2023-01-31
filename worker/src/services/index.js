import { logger } from '../utils/index.js'
import { queueServer, gitClient } from '../data/index.js'
import makeEventService from './event.js'

const eventService = makeEventService({ logger, queueServer, gitClient })

export {
    // eslint-disable-next-line import/prefer-default-export
    eventService
}
