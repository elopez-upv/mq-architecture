export default function makeConsumer({ logger, connect }) {
    async function start() {
        try {
            const consumer = await connect()

            await consumer.run({
                eachMessage: async ({ partition, message }) => {
                    console.log({
                        partition,
                        offset: message.offset,
                        value: message.value.toString()
                    })
                }
            })
            return true
        } catch (e) {
            logger.error(`[makeConsumer][start] ${e}`)
            throw e
        }
    }
    return Object.freeze({
        start
    })
}
