export default function makeEventService({ logger }) {
    async function newEventAction() {
        try {
            logger.info('hereeeee')
        } catch (e) {
            logger.error(`[makeEventService][newEventAction] ${e}`)
            throw e
        }
    }

    return Object.freeze({
        newEventAction
    })
}
