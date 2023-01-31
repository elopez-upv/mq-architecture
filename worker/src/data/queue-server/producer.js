import env from '../../config/env.js'

const { KAFKA_TOPIC_RESULTS } = env

export default function makeProducer({ logger, connect }) {
    async function sendToQueue(msg) {
        try {
            const producer = await connect()
            await producer.send({
                topic: KAFKA_TOPIC_RESULTS,
                messages: [{
                    value: Buffer.from(JSON.stringify(msg))
                }]
            })
            return true
        } catch (e) {
            logger.error(`[makeProducer][sendToQueue] ${e}`)
            throw e
        }
    }
    return Object.freeze({
        sendToQueue
    })
}
