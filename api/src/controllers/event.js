export default function makeEventController({ logger, eventService }) {
    async function newEventAction(request) {
        try {
            const params = {
                id: request.id,
                ...request.body
            }
            const result = await eventService.newEventAction(params)

            return result ? {
                statusCode: 200,
                body: result
            } : null
        } catch (e) {
            logger.error(`[makeEventController][newEventAction][${request.id}] ${e}`)
            return null
        }
    }

    return Object.freeze({
        newEventAction
    })
}
