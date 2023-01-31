import { simpleGit, CleanOptions } from 'simple-git'
import { logger } from '../../utils/index.js'
import makeRepositoryManager from './repository-manager.js'

const git = simpleGit().clean(CleanOptions.FORCE)

const repositoryManager = makeRepositoryManager({ logger, git })

const gitClient = {
    repositoryManager
}

export default gitClient
