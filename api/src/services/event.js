export default function makeEventService({ logger, queueServer }) {
    async function newEventAction(input) {
        const { id } = input
        try {
            logger.info(`[makeEventService][newEventAction][${id}] Enviando nuevo evento`)
            await queueServer.producer.sendToQueue(input)

            return {
                result: 'SUCCESS',
                detail: {
                    description: 'OK'
                }
            }
        } catch (e) {
            logger.error(`[makeEventService][newEventAction][${id}] ${e}`)
            throw e
        }
    }

    return Object.freeze({
        newEventAction
    })
}
