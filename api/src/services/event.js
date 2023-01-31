const jobs = new Map()

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
            jobs.set(id, { ...input, status: 'pending' })
            return true
        } catch (e) {
            logger.error(`[makeEventService][newEventResult][${id}] ${e}`)
            throw e
        }
    }

    async function informEvents(input) {
        try {
            logger.info('[makeEventService][informEvents] Informando Eventos')
            const data = []

            jobs.forEach((value, key) => {
                if (value.status === 'pending' && value.user === input.userName) {
                    data.push(value)
                    jobs.delete(key)
                }
            })
            return data || []
        } catch (e) {
            logger.error(`[makeEventService][informEvents] ${e}`)
            throw e
        }
    }

    return Object.freeze({
        newEventAction,
        newEventResult,
        informEvents
    })
}
