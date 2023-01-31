export default function makeRepositoryManager({ logger, git }) {
    async function cloneRepo(repositoryUrl) {
        try {
            const url = 'https://github.com/elopez-upv/test.git'

            await git.clone(url, './files')
            console.log('todo nicee')
            // logger.info(`[makeSubscriber][handleMessage][${id}] -> Starting action`)

            return true
        } catch (e) {
            logger.error(`[makeRepositoryManager][cloneRepo] -> Error ${e}`)
            throw e
        }
    }
    return Object.freeze({
        cloneRepo
    })
}
