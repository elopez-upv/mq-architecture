import { Kafka, Partitioners } from 'kafkajs'
import { logger } from '../../utils/index.js'
import env from '../../config/env.js'

import makeProducer from './producer.js'

const { KAFKA_CLIENT_ID, KAFKA_BROKER } = env

const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: [KAFKA_BROKER],
    ssl: false
})

const kafkaClient = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
})

async function connect() {
    try {
        await kafkaClient.connect()
        return kafkaClient
    } catch (e) {
        logger.error(`[queue-server][producer][connect] Error ${e}`)
        throw e
    }
}

const producer = makeProducer({ logger, connect })

const queueServer = {
    producer
}

export default queueServer
