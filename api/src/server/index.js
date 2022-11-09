import express from 'express'
import requestID from 'express-request-id'

import router from '../routes/index.js'

const app = express()

app.use(requestID())
app.use(router)

export default app
