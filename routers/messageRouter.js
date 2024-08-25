import express from 'express';
import { getMessage, addMessage, updateMessage} from '../controllers/messageController.js'

const messageRouter = express.Router()

messageRouter.get('/', getMessage)
messageRouter.post('/newMessage', addMessage)
messageRouter.patch('/updateMessage', updateMessage)

export default messageRouter;