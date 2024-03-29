import { rm } from 'fs/promises'
import env from '../config/env.js'

const { FILE_DIR } = env

export default function makeEventService({
    logger, queueServer, gitClient, codeExecutor, dateManager
}) {
    async function newEventAction(input) {
        const { id } = input
        try {
            logger.info(`[makeEventService][newEventAction][${id}] Enviando nuevo Resultado`)
            await queueServer.producer.sendToQueue(input)
            return true
        } catch (e) {
            logger.error(`[makeEventService][newEventAction][${id}] ${e}`)
            throw e
        }
    }

    async function newIncomingEvent(input) {
        const { id, url, params, fileName, createdAt, user } = input
        const path = `${FILE_DIR}/${id}`

        try {
            logger.info(`[makeEventService][newIncomingEvent][${id}] Nuevo Job Recibido`)

            await gitClient.repositoryManager.cloneRepo({ url, path, id })

            const result = await codeExecutor.executor.file({ id, path: `${path}/${fileName}`, params })

            await rm(path, { recursive: true, force: true })

            const elapsedTime = dateManager.getElapsedTime(createdAt)

            await newEventAction({
                id,
                url,
                fileName,
                user,
                createdAt,
                params,
                result: result.replace(/\r?\n|\r/g, '; '),
                elapsedTime
            })

            return true
        } catch (e) {
            logger.error(`[makeEventService][newIncomingEvent][${id}] ${e}`)

            await rm(path, { recursive: true, force: true })
            const elapsedTime = dateManager.getElapsedTime(createdAt)

            await newEventAction({
                id,
                url,
                fileName,
                user,
                createdAt,
                params,
                result: (e.message).toString().replace(/\r?\n|\r/g, '; '),
                elapsedTime
            })

            throw e
        }
    }

    return Object.freeze({
        newEventAction,
        newIncomingEvent
    })
}
