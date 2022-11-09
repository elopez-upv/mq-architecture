import { logger } from '../utils/index.js'

import makeEventService from './event.js'

const eventService = makeEventService({ logger })

export {
    // eslint-disable-next-line import/prefer-default-export
    eventService
}
