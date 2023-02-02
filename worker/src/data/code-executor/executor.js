export default function makeExecutor({ logger, exec }) {
    function file({ id, path, params }) {
        return new Promise((resolve, reject) => {
            const args = params || ''
            logger.info(`[makeExecutor][file][${id}] -> Starting action`)
            exec(`sh ${path} ${args}`, (error, stdout, stderr) => {
                if (error) {
                    logger.error(`[makeExecutor][file][${id}] -> Error ${error}`)
                    reject(error)
                }
                resolve(stdout || stderr)
            })
        })
    }

    return Object.freeze({
        file
    })
}
