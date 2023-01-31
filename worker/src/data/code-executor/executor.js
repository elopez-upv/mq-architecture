export default function makeExecutor({ logger, exec }) {
    function file({ id, path, params }) {
        try {
            const args = params || ''
            logger.info(`[makeExecutor][file][${id}] -> Starting action`)
            return new Promise((resolve) => {
                exec(`bash ${path} ${args}`, (error, stdout, stderr) => {
                    if (error) {
                        throw new Error(error)
                    }
                    resolve(stdout || stderr)
                })
            })
        } catch (e) {
            logger.error(`[makeExecutor][file][${id}] -> Error ${e}`)
            throw e
        }
    }

    return Object.freeze({
        file
    })
}
