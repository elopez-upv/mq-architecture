export default function makeConsumer({ logger, action }) {
    async function handleMessage(msg) {
        try {
            const event = JSON.parse(msg.value.toString())
            const { id } = event
            logger.info(`[makeSubscriber][handleMessage][${id}] -> Starting action`)

            await action(event)

            return true
        } catch (e) {
            logger.error(`[makeSubscriber][handleMessage] -> Error ${e}`)
            throw e
        }
    }
    return Object.freeze({
        handleMessage
    })
}
