import express from 'express'

import requestHandler from './request-handler.js'

import { event } from '../controllers/index.js'

const router = express.Router()

router.post('/git/event', [express.json()], requestHandler(event.newEventAction))

export default router
