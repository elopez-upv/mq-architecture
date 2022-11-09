import { logger } from '../utils/index.js'
import makeEventController from './event.js'
import { eventService } from '../services/index.js'

const event = makeEventController({ logger, eventService })

export {
    // eslint-disable-next-line import/prefer-default-export
    event
}
