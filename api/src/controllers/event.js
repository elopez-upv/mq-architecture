export default function makeEventController({ logger, eventService }) {
    async function newEventAction(input) {
        try {
            const params = {
                ...input
            }

            await eventService.newEventAction(params)

            return {
                result: 'success',
                msg: 'job created'
            }
        } catch (e) {
            logger.error(`[makeEventController][newEventAction] ${e}`)
            return {
                result: 'error',
                msg: 'internal server error'
            }
        }
    }

    async function newEventResultAction(input) {
        try {
            const params = {
                ...input
            }

            await eventService.newEventResult(params)

            return {
                result: 'success',
                msg: 'job executed'
            }
        } catch (e) {
            logger.error(`[makeEventController][newEventResultAction] ${e}`)
            return {
                result: 'error',
                msg: 'internal server error'
            }
        }
    }

    return Object.freeze({
        newEventAction,
        newEventResultAction
    })
}
