import winston from 'winston'
import moment from 'moment-timezone'

import makeLogger from './logger.js'
import makeDateManager from './date-manager.js'

const dateManager = makeDateManager({ moment })
const logger = makeLogger({ winston, dateManager })

export {
    logger,
    dateManager
}
