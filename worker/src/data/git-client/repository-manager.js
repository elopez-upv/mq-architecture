export default function makeRepositoryManager({ logger, git }) {
    async function cloneRepo({ url, path, id }) {
        try {
            logger.info(`[makeRepositoryManager][cloneRepo][${id}] -> Starting action`)
            await git.clone(url, path)
            return true
        } catch (e) {
            logger.error(`[makeRepositoryManager][cloneRepo][${id}] -> Error ${e}`)
            throw e
        }
    }
    return Object.freeze({
        cloneRepo
    })
}
