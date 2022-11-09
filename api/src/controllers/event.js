export default function makeEventController({ logger, eventService }) {
    async function newEventAction() {
        try {
            logger.info('newEventAction')
            await eventService.newEventAction()
            return {
                statusCode: 200,
                body: 'OK'
            }
        } catch (e) {
            logger.error(`[makeEventController][newEventAction] ${e}`)
            throw e
        }
    }

    return Object.freeze({
        newEventAction
    })
}
