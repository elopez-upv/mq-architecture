export default function makeEventService({ logger }) {
    async function newEventAction(request) {
        try {
            logger.info(`[makeEventService][newEventAction][${request.id}] hereeeee`)
            return {
                result: 'SUCCESS',
                detail: {
                    description: 'OK'
                }
            }
        } catch (e) {
            logger.error(`[makeEventService][newEventAction][${request.id}] ${e}`)
            throw e
        }
    }

    return Object.freeze({
        newEventAction
    })
}
