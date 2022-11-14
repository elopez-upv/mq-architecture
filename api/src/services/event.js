export default function makeEventService({ logger, queueServer }) {
    async function newEventAction(params) {
        try {
            const { url } = params
            logger.info(`[makeEventService][newEventAction][${params.id}] Enviando nuevo evento para ${params.url}`)
            await queueServer.producer.sendToQueue({ url })
            logger.info(`clonando repo ${url}`)
            return {
                result: 'SUCCESS',
                detail: {
                    description: 'OK'
                }
            }
        } catch (e) {
            logger.error(`[makeEventService][newEventAction][${params.id}] ${e}`)
            throw e
        }
    }

    return Object.freeze({
        newEventAction
    })
}
