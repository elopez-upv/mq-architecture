// eslint-disable-next-line camelcase
import child_process from 'child_process'
import { logger } from '../../utils/index.js'
import makeExecutor from './executor.js'

// eslint-disable-next-line camelcase, prefer-destructuring
const exec = child_process.exec

const executor = makeExecutor({ logger, exec })

const codeExecutor = {
    executor
}

export default codeExecutor
