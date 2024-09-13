import express from 'express'
import { getEvent, addEvent, deleteEvent } from '../controllers/eventController.js'

const eventsRouter = express.Router()
eventsRouter.get('/', getEvent)
eventsRouter.post('/newEvent', addEvent)
eventsRouter.delete('/:id', deleteEvent)

export default eventsRouter;