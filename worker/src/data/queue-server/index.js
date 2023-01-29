import { Kafka } from 'kafkajs'
import { logger } from '../../utils/index.js'
import env from '../../config/env.js'

import makeConsumer from './consumer.js'

const { KAFKA_CLIENT_ID, KAFKA_BROKER, KAFKA_GROUP_ID, KAFKA_TOPIC } = env

const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: [KAFKA_BROKER],
    ssl: false
})

const kafkaClient = kafka.consumer({
    groupId: KAFKA_GROUP_ID
})

async function connect() {
    try {
        await kafkaClient.connect()
        await kafkaClient.subscribe({
            topic: KAFKA_TOPIC,
            fromBeginning: true
        })
        return kafkaClient
    } catch (e) {
        logger.error(`[queue-server][consumer][connect] Error ${e}`)
        throw e
    }
}

const consumer = makeConsumer({ logger, connect })

const queueServer = {
    consumer
}

export default queueServer
