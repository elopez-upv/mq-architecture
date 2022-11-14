export default function makeEventService({ logger, queueServer }) {
    async function newEventAction(params) {
        try {
            logger.info(`[makeEventService][newEventAction][${params.id}] hereeeee`)

            const { url } = params
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
