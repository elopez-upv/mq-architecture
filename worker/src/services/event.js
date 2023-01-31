export default function makeEventService({ logger, queueServer, gitClient }) {
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

    async function newIncomingEvent(input) {
        const { id, url, params } = input
        try {
            logger.info(`[makeEventService][newIncomingEvent][${id}] Nuevo Resultado de Evento`)
            await gitClient.repositoryManager.cloneRepo(url)
            return true
        } catch (e) {
            logger.error(`[makeEventService][newIncomingEvent][${id}] ${e}`)
            throw e
        }
    }

    return Object.freeze({
        newEventAction,
        newIncomingEvent
    })
}
