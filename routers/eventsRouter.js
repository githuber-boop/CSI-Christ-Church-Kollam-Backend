import express from 'express'
import { getEvent, addEvent } from '../controllers/eventController.js'
const eventsRouter = express.Router()

eventsRouter.get('/', getEvent)
eventsRouter.post('/newEvent', addEvent)

export default eventsRouter;