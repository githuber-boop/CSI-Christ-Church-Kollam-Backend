import express from 'express';
import { getUsers, addUser, getUserById, updateUserbyID , deleteUser, getUserWithFamily, login} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.post('/newUser', addUser)
// userRouter.get('/:id',getUserById)
userRouter.put('/:id',updateUserbyID)
userRouter.delete('/:id',deleteUser)
userRouter.get('/:id',getUserWithFamily)
userRouter.post('/login', login)


export default userRouter;