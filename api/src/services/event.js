export default function makeEventService({ logger, queueServer }) {
    async function newEventAction(input) {
        const { id } = input
        try {
            logger.info(`[makeEventService][newEventAction][${id}] Enviando nuevo evento`)
            await queueServer.producer.sendToQueue(input)

            return true
        } catch (e) {
            logger.error(`[makeEventService][newEventAction][${id}] ${e}`)
            throw e
        }
    }

    async function newEventResult(input) {
        const { id } = input
        try {
            logger.info(`[makeEventService][newEventResult][${id}] Nuevo Resultado de Evento`)
            return true
        } catch (e) {
            logger.error(`[makeEventService][newEventResult][${id}] ${e}`)
            throw e
        }
    }

    return Object.freeze({
        newEventAction,
        newEventResult
    })
}
