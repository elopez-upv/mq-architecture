import { Kafka, Partitioners } from 'kafkajs'
import { logger } from '../../utils/index.js'
import env from '../../config/env.js'
import makeProducer from './producer.js'
import makeConsumer from './consumer.js'

const { KAFKA_CLIENT_ID, KAFKA_BROKER, KAFKA_GROUP_ID, KAFKA_TOPIC } = env

const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: [KAFKA_BROKER],
    ssl: false
})

const kafkaProducerClient = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
})

const kafkaConsumerClient = kafka.consumer({ groupId: KAFKA_GROUP_ID })

async function connect() {
    try {
        await kafkaProducerClient.connect()
        return kafkaProducerClient
    } catch (e) {
        logger.error(`[queue-server][producer][connect] Error ${e}`)
        throw e
    }
}

async function start(action) {
    try {
        const consumer = makeConsumer({ logger, action })

        await kafkaConsumerClient.connect()
        await kafkaConsumerClient.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true })
        await kafkaConsumerClient.run({
            eachMessage: async ({ message }) => {
                await consumer.handleMessage(message)
            }
        })
    } catch (e) {
        logger.error(`[queue-server][consumer][start] Error ${e}`)
        throw e
    }
}

const producer = makeProducer({ logger, connect })

const queueServer = {
    producer,
    start
}

export default queueServer
